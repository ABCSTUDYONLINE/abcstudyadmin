import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button, CircularProgress, Fade, Grid, TextField, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';

import { signIn } from '../../redux/user/userAction';

//styles 
import useStyles from './styles';

//logo 
import logo from './logo.svg';


export default function Login() {

    const dispatch = useDispatch();

    const history = useHistory();

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const login = () => {
        setIsLoading(true);
        setError(false);
        if (username != "" && password != "") {
            dispatch(signIn({
                payload: {
                    'username': username,
                    'password': password
                }, history, dispatch
            }))
        } else {
            /* alert("Wrong username or password!") */
            setError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            history.push('/dashboard/categories')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Grid container className={classes.container}>
            <div className={classes.logotypeContainer}>
                <img src={logo} alt="logo" className={classes.logotypeImage} />
                <Typography className={classes.logotypeText}>ABCStudy Admin</Typography>
            </div>
            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <Typography className={classes.textLogin}>LOGIN</Typography>
                    <React.Fragment>
                        <Fade in={error}>
                            <Typography color="secondary" className={classes.messageError}>
                                Something is wrong with your login or password!
                            </Typography>
                        </Fade>
                        <TextField
                            id="username"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderLine,
                                    input: classes.textField
                                }
                            }}

                            value={username}
                            margin="normal"
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            fullWidth
                        />
                        <TextField
                            id="password"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderLine,
                                    input: classes.textField
                                }
                            }}
                            value={password}
                            margin="normal"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            type="password"
                            fullWidth
                        />
                        <div className={classes.formButtons}>
                            {isLoading ? (<CircularProgress size={26} className={classes.loginLoader} />
                            ) : (
                                <Button
                                    disabled={username.length === 0 || password.length === 0}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => login()}
                                >
                                    Login
                                </Button>
                            )}

                        </div>
                    </React.Fragment>
                </div>
            </div>
        </Grid>

    )
}
