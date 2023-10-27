import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../features/auth/authSlice'

const Welcome = () => {
    const user = useSelector(selectCurrentUser)
    return (
        <div>
            <h2>{`Welcome ${user}!`}</h2>
        </div>
    )
}

export default Welcome