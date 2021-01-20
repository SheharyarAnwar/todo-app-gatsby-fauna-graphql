const { ApolloServer, gql } = require("apollo-server-lambda")
const faunadb = require("faunadb")
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET })
const typeDefs = gql`
  type Todo {
    userId: String!
    title: String!
    isCompleted: Boolean!
  }
  type Query {
    todos(userId: ID!): [Todo]!
  }
`
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: async (parent, args, context, info) => {
      console.log(process.env.FAUNADB_SECRET)
      const results = await client.query(
        q.Map(
          q.Paginate(q.Match(q.Index("todos-search-by-userId"), args.userId)),
          q.Lambda("todo", q.Get(q.Var("todo")))
        )
      )
      return results.data
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

exports.handler = server.createHandler()
