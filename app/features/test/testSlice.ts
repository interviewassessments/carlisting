import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const testSlice = createSlice({
  name: "test",
  initialState: {
    message: ""
  },
  reducers: {
    sayHello(state, action: PayloadAction<string>) {
      state.message = action.payload
    }
  }
})

export const { sayHello } = testSlice.actions
export default testSlice.reducer