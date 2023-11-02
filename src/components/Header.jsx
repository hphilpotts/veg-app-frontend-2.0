import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { UserContext } from '../App'

export const Header = ({ signOut }) => {

    const user = useContext(UserContext)

    const signOutHandler = () => signOut()

    return (
        <div>
            <Link to={'/'}>Home</Link>
            <h1>Hello, {user.name}</h1>
            {user.loggedIn ?
                <>
                <button ><Link to={'/foodIndex/'}>index</Link></button>
                <button onClick={signOutHandler}>logout</button>
                </> :
                <>
                    <button ><Link to={'/signin/'}>sign in</Link></button>
                    <button ><Link to={'/signup/'}>sign up</Link></button>
                </>
            }
        </div>
    )
}