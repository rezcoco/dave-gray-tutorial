import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'


const Login = () => {
    const userRef = React.useRef()
    const errRef = React.useRef()
    const [user, setUser] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [errMessage, setErrMessage] = React.useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    React.useEffect(() => {
        userRef.current.focus()
    }, [])

    React.useEffect(() => {
        setErrMessage("")
    }, [user, password])

    const isDisable = [user, password].every(Boolean) && !isLoading

    async function handleSubmit(e) {
        if (!isDisable) return
        e.preventDefault()

        try {
            const userData = await login({ username: user, password }).unwrap()
            dispatch(setCredentials({ accessToken: userData.data.accessToken, user }))

            setUser("")
            setErrMessage("")
            setPassword("")
            navigate("/welcome")
        } catch (error) {
            if (!error?.response) {
                setErrMessage("No server response")
            } else if (error?.response.status === 400) {
                setErrMessage("Missing user or password field")
            } else if (error?.response.status === 401) {
                setErrMessage("Unauthorized")
            } else {
                setErrMessage("Login failed")
            }
            errRef.current.focus()
        }
    }

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            <p ref={errRef}>{errMessage}</p>
            <h2>Employee login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='user'>User</label>
                <input ref={userRef} onChange={e => setUser(e.target.value)} type="text" id="user" name="user" value={user} />
                <label htmlFor="password">password</label>
                <input onChange={e => setPassword(e.target.value)} type="password" id="password" name="password" value={password} />
                <button disabled={!isDisable} type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login