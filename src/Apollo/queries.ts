import { gql } from "@apollo/client"

export const GET_TODOS = gql`
  query {
    todos(userId: "123456") {
      isCompleted
      userId
      ref
      title
    }
  }
`
