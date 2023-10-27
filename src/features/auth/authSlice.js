import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        logOut: (state, action) => {
            return initialState
        }
    }
})

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer