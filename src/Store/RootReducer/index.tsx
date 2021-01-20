import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit"
import { useQuery, gql } from "@apollo/client"
import { UserState } from "./index.interface"
import { isFulfilledAction, isPendingAction, isRejectedAction } from "../helper"
import { GET_TODOS } from "../../Apollo/queries"

const initialState: UserState = {
  loading: false,
  error: null,
  todos: null,
}
const getTodos = createAsyncThunk(
  "root/getTodos",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const { data, loading, error } = useQuery(GET_TODOS, {
        variables: {
          userId,
        },
      })
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
const addTodo = createAsyncThunk(
  "root/addTodo",
  async (params, { rejectWithValue }) => {
    try {
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const markTodoAsCompleted = createAsyncThunk(
  "root/markTodoAsCompleted",
  async (x: undefined, { rejectWithValue }) => {
    try {
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const slice = createSlice({
  name: "root",
  initialState: initialState,
  reducers: {
    clearErrors: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {})

      .addMatcher(isPendingAction("root/"), state => {
        state.loading = true
        state.error = ""
      })
      .addMatcher(isRejectedAction("root/"), (state, action) => {
        state.loading = false
        state.error = action.payload
        console.log(action.payload)
      })
      .addMatcher(isFulfilledAction("root/"), state => {
        state.loading = false
        state.error = ""
      })
  },
})
const { clearErrors } = slice.actions
export { clearErrors, addTodo, markTodoAsCompleted, getTodos }
export default slice.reducer
