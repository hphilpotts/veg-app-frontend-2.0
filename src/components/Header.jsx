import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { UserContext } from '../App'

export const Header = ({ signOut }) => {

    const user = useContext(UserContext)

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
