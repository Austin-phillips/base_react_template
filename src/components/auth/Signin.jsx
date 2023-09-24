import React, { useState } from "react";
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = '/';
        }).catch((err) => console.log("ERROR", err))
    }

    return (
        <Stack display={'flex'} justifyContent={'center'} alignItems={'center'} width={'100%'} height={'100vh'}>
            <Stack sx={(theme) => ({
                width: '550px',
                height: '500px',
                border: '2px solid',
                borderColor: theme.palette.primary.main,
                alignSelf: 'center',
                borderRadius: '10px',
                padding: '30px'
            })}>
                <Typography 
                    variant="h3" 
                    textAlign={'center'}
                    sx={{
                        marginTop: '50px'
                    }}
                >
                    Log In
                </Typography>
                <Box onSubmit={signIn} component={'form'} sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'space-around',
                    height: '80%',
                }}>
                    <TextField id="email" label="Email" type="email" variant="outlined" sx={{
                        marginTop: '30px'
                    }} onChange={(e) => setEmail(e.target.value)}/>
                    <TextField id="password" label="Password" type="password" variant="outlined" sx={{
                        marginTop: '30px'
                    }} onChange={(e) => setPassword(e.target.value)}/>
                    <Button type="submit" sx={(theme) => ({
                        marginTop: '30px',
                        backgroundColor: theme.palette.primary.main,
                        color: 'white'
                    })}>Login</Button>
                    <Typography textAlign={'center'} sx={{
                        marginTop: '30px'
                    }}>Don't have an account? click <Link to={'/signup'}>Here</Link></Typography>
                </Box>
            </Stack>
        </Stack>
    )
}