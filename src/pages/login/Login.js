/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from "react-router-dom";
import { Button, CircularProgress, Fade, Grid, TextField, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';

import { signIn, getMe } from '../../redux/user/userAction';

//styles 
import useStyles from './styles';

//logo 
import logo from './logo.svg';


const Login = (props) => {

    const dispatch = useDispatch();

    const history = useHistory();
    let message = props.message;
    const token = props.token;
    const profile = props.profile;

    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const firstUpdateMessage = useRef(true);
    const firstUpdateToken = useRef(true);
    const firstUpdateProfile = useRef(true);
    const login = () => {
        setIsLoading(true);
        setError(false);
        if (userName !== "" && password !== "") {
            dispatch(signIn({
                payload: {
                    'username': userName,
                    'password': password
                }, history, dispatch
            }))
        } else {
            alert("Wrong username or password!")
            setError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const tokenExist = localStorage.getItem('token')
        if (tokenExist) {
            const profileExist =  JSON.parse(localStorage.getItem('profile'));
            if (profileExist) {
                switch(profileExist.role) {
                    case 'admin':
                        history.push('/dashboard/admin/categories')
                        break;
                    case 'teacher': 
                        history.push('/dashboard/teacher/courses')
                        break;
                    default: 
                        message = 'Student cannot accesss!';
                        break;
                }
            }
        }
    }, [])

    useEffect(() => {
        if (firstUpdateMessage.current) {
            firstUpdateMessage.current = false;
            return;
        }
        if (message !== '') {
            setError(true);
            setIsLoading(false);
        }
    }, [message])

    useEffect(() => {
        if (firstUpdateToken.current) {
            firstUpdateToken.current = false;
            return;
        }
        localStorage.setItem('token', token);
        dispatch(getMe({history}));
    }, [token])

    useEffect(() => {
        if (firstUpdateProfile.current) {
            firstUpdateProfile.current = false;
            return;
        }
        const profileExist =  profile;
        if (profileExist) {
            switch(profileExist.role) {
                case 'admin':
                    history.push('/dashboard/admin/categories')
                    break;
                case 'teacher': 
                    history.push('/dashboard/teacher/courses')
                    break;
                default: 
                    localStorage.removeItem("token");
                    localStorage.removeItem("profile");
                    message = 'Student cannot accesss!';
                    setError(true);
                    setIsLoading(false);
                    break;
            }
        }
    }, [profile])

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
                                {message}
                            </Typography>
                        </Fade>
                        <TextField
                            id="username"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderLine,
                                    input: classes.textField
                                },
                                readOnly: isLoading
                            }}
                            value={userName}
                            margin="normal"
                            onChange={e => setUserName(e.target.value)}
                            placeholder="User name"
                            type="text"
                            fullWidth
                        />
                        <TextField
                            id="password"
                            InputProps={{
                                classes: {
                                    underline: classes.textFieldUnderLine,
                                    input: classes.textField
                                },
                                readOnly: isLoading
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
                                    disabled={userName.length === 0 || password.length === 0}
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

const mapStateToProps = (state) => ({
    message: state.user.message,
    token: state.user.token,
    profile: state.user.profile,
});

export default connect(mapStateToProps)(Login);
