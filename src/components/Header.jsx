import React from 'react'

import { Link } from 'react-router-dom'

export const Header = ({ user, signOut }) => {

    const signOutHandler = () => signOut()

    return (
        <div>
            <h1>Hello, {user.name}</h1>
            {user.loggedIn ?
                <button onClick={signOutHandler}>logout</button> :
                <button ><Link to={'/signin/'}>sign in</Link></button>}
        </div>
    )
}
