import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { logOut, setCredentials } from "../../features/auth/authSlice"

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3500",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }

        return headers
    }
})

const baseQuertWithReauth = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)
    console.log(result)

    if (result?.error?.originalStatus === 403) {
        const refreshResult = await baseQuery("/refreshToken", api, extraOptions)
        console.log(refreshResult.data)

        if (refreshResult?.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({ accessToken: refreshResult.data.data.accessToken, user }))

            await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQuertWithReauth,
    endpoints: (build) => ({})
})