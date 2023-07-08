import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  name: "",
}
export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.name = action.payload.name
    },
    unSetUserInfo: (state, action) => {
      state.name = action.payload.name
    },
  }
})

export const { setUserInfo, unSetUserInfo } = userSlice.actions
export default userSlice.reducer