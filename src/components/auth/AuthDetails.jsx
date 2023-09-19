import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';


const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user);
                console.log("USER", user)
            } else {
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }

    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => window.location.href = '/login').catch((err) => console.log("ERROR SIGNING OUT", err));
    }

    return (
        <div>{ authUser ? <>
            <p>{`Signed In as ${authUser.email}`}</p>
            <button onClick={userSignOut}>Sign Out</button>
        </> : <p>Signed Out</p>}</div>
    )
}

export default AuthDetails;