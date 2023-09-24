import React, { useContext } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { UserContext } from '../../context/UserContext';


const AuthDetails = () => {
    const user = useContext(UserContext);

    const userSignOut = () => {
        signOut(auth)
    }

    return (
        <div>
            <h3>User is {user.isAuthenticated ? 'Logged In' : 'Logged Out'}</h3>
            { user.isAuthenticated && (
                <>
                    <p>Email is {user.email}</p>
                    <button onClick={userSignOut}>Log out</button>
                </>
            )}
        </div>
    )
}

export default AuthDetails;