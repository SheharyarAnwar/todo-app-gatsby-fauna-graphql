const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })
const typeDefs = gql`
  type Todo {
    userId: String!
    title: String!
    isCompleted: Boolean!
    ref: String!
  }
  type Query {
    todos(userId: ID!): [Todo]!
  }
  type Mutation {
    addTodo(title: String!, userId: ID!): Todo!
    markAsCompleted(ref: ID!): Todo!
  }
`
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: async (parent, args, context, info) => {
      console.log(context)
      const results = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("todos-search-by-userId"), args.userId)),
          q.Lambda("todo", q.Get(q.Var("todo")))
        )
      )
      const faunaResults = results.data.map(val => {
        return { ...val.data, ref: val.ref.id }
      })
      return faunaResults
    },
  },
  Mutation: {
    addTodo: async () => {},
    markAsCompleted: () => {},
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => context,
})

exports.handler = server.createHandler()
