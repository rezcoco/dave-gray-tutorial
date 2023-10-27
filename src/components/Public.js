import React from 'react'
import { Link } from 'react-router-dom'

const Public = () => {
    return (
        <main>
            <h1>Hey! this is Public Page</h1>
            <p>Please login first to see the content <Link to="/login">Login</Link></p>
        </main>
    )
}

export default Public