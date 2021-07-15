import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Button, CircularProgress, Fade, Grid, TextField, Typography } from '@material-ui/core'

//styles 
import useStyles from './styles';

//logo 
import logo from './logo.svg';


export default function Login() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState("admin@example.com")
    const [password, setPassword] = useState("admin123")
    const history = useHistory();
    const login = () => {
        setIsLoading(true);
        setError(false);
        if (email === "admin@example.com" && password === "admin123") {
            setTimeout(() => {
                localStorage.setItem("accessToken", true)
                history.replace("/")
                setError(null)
                setIsLoading(false)
            }, 1000);
        } else {
            /* alert("Wrong email or password!") */
            setError(true);
            setIsLoading(false);
        }
    }
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
                            id="email"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderLine,
                                    input: classes.textField
                                }
                            }}

                            value={email}
                            margin="normal"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email Address"
                            type="email"
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
                                    disabled={email.length === 0 || password.length === 0}
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
