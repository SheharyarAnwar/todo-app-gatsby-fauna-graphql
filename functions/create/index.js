const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })
const typeDefs = gql`
  type Todo {
    userId: String!
    title: String!
    isCompleted: Boolean!
    docId: String!
  }
  type Query {
    todos: [Todo]!
  }
  type Mutation {
    addTodo(title: String!): Todo!
    markAsCompleted(docId: ID!): Todo!
  }
`
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: async (parent, args, context, info) => {
      try {
        const userId = context?.user?.sub
        const results = await client.query(
          q.Map(
            q.Paginate(q.Match(q.Index("todos-search-by-userId"), userId)),
            q.Lambda("todo", q.Get(q.Var("todo")))
          )
        )
        const faunaResults = results.data.map(val => {
          return { ...val.data, docId: val.ref.id }
        })
        return faunaResults
      } catch (err) {
        throw new Error("Couldnt Get Tasks")
      }
    },
  },
  Mutation: {
    addTodo: async (parent, args, context) => {
      try {
        const userId = context?.user?.sub
        if (!userId) {
          throw new Error("User Not Aunthenticated")
        }
        const results = await client.query(
          q.Create(q.Collection("todos"), {
            data: {
              userId,
              isCompleted: false,
              title: args.title,
            },
          })
        )

        return { ...results.data, docId: results.ref.id }
      } catch (err) {
        console.log(err)
        throw new Error("Couldnt create Task")
      }
    },
    markAsCompleted: async (parent, args, context) => {
      try {
        const results = await client.query(
          q.Update(q.Ref(q.Collection("todos"), args.docId), {
            data: {
              isCompleted: true,
            },
          })
        )
        return { ...results.data, docId: results.ref.id }
      } catch (err) {
        throw new Error("Couldnt update Task")
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => context?.clientContext,
})

exports.handler = server.createHandler()
