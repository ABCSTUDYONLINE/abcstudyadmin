/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, CircularProgress, Fade, Grid, TextField, Typography } from '@material-ui/core'
import { useDispatch, connect, useSelector } from 'react-redux'
import PopupConfirm from './PopupConfirm'
import PopupForgetPass from './PopupForgetPass'
import { signIn, getMe } from '../../redux/user/userAction'
import { LoadingDialog } from '../../components/LoadingDialog'

// styles
import useStyles from './styles'

// logo
import logo from './logo.svg'

const Login = (props) => {
  const dispatch = useDispatch()

  const sendSuccess = useSelector(state => state.user.sendSuccess)
  const confirmSuccess = useSelector(state => state.user.confirmSuccess)
  const userLoading = useSelector(state => state.user.loading)
  const forgetPassValue = useSelector(state => state.user.forgetPassValue)

  const history = useHistory()
  let message = props.message
  const token = props.token
  const refreshToken = props.refreshToken
  const profile = props.profile

  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const firstUpdateMessage = useRef(true)
  const firstUpdateToken = useRef(true)
  const firstUpdateProfile = useRef(true)
  const firstUpdateSend = useRef(true)
  const firstUpdateConfirm = useRef(true)
  const firstUpdatePass = useRef(true)
  const [isConfirm, setConfirm] = useState(null)
  const [isShow, showConfirm] = useState(false)
  const [isShowDialog, showShowDialog] = useState(false)
  const [valueForgetPass, setValueForgetPass] = useState(0)

  const login = () => {
    setIsLoading(true)
    setError(false)
    if (userName !== '' && password !== '') {
      dispatch(signIn({
        payload: {
          username: userName,
          password: password
        },
        history,
        dispatch
      }))
    } else {
      alert('Wrong username or password!')
      setError(true)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const tokenExist = localStorage.getItem('token')
    const refreshTokenExist = localStorage.getItem('refreshToken')
    if (tokenExist && refreshTokenExist) {
      dispatch(getMe({ history }))
    }
  }, [])

  useEffect(() => {
    if (firstUpdateMessage.current) {
      firstUpdateMessage.current = false
      return
    }
    console.log(message)
    if (message === 'Please confirm user account! user unconfirm!') {
      showConfirm(!isShow)
      setConfirm(false)
    }
    if (message !== '') {
      setError(true)
      setIsLoading(false)
    }
  }, [message])

  useEffect(() => {
    if (firstUpdateSend.current) {
      firstUpdateSend.current = false
      return
    }
    showConfirm(!isShow)
    setConfirm(true)
  }, [sendSuccess])

  useEffect(() => {
    if (firstUpdateConfirm.current) {
      firstUpdateConfirm.current = false
      return
    }
    login()
  }, [confirmSuccess])

  useEffect(() => {
    if (firstUpdateToken.current) {
      firstUpdateToken.current = false
      return
    }
    console.log(token)
    console.log(refreshToken)
    localStorage.setItem('token', token)
    localStorage.setItem('refreshToken', refreshToken)
    dispatch(getMe({ history }))
  }, [token])

  useEffect(() => {
    if (firstUpdateProfile.current) {
      firstUpdateProfile.current = false
      return
    }
    switch (profile.role) {
      case 'admin':
        history.push('/dashboard/admin/categories')
        break
      case 'teacher':
        history.push('/dashboard/teacher/courses')
        break
      default:
        localStorage.removeItem('token')
        localStorage.removeItem('profile')
        localStorage.removeItem('refreshToken')
        message = 'Student cannot accesss!'
        setError(true)
        setIsLoading(false)
        break
    }
  }, [profile])

  useEffect(() => {
    if (firstUpdatePass.current === true) {
      firstUpdatePass.current = false
      return
    }
    setValueForgetPass(forgetPassValue)
    showShowDialog(!isShowDialog)
  }, [forgetPassValue])

  const forgetPass = () => {
    setValueForgetPass(0)
    showShowDialog(!isShowDialog)
  }

  return (
        <Grid container className={classes.container}>
            <PopupForgetPass forgetPassValue={valueForgetPass} isShow={isShowDialog}/>
            <PopupConfirm isConfirm={isConfirm} isShow={isShow}/>
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
                            {isLoading
                              ? (<CircularProgress size={26} className={classes.loginLoader} />
                                )
                              : (
                                <>
                                <Button
                                  disabled={userName.length === 0 || password.length === 0}
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  onClick={() => login()}
                                >
                                  Login
                                </Button>
                                <Button
                                  style={{ marginLeft: 10 }}
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  onClick={() => forgetPass()}
                                >
                                  Forget Pass
                                </Button>
                                </>
                                )}
                        </div>
                    </React.Fragment>
                </div>
            </div>
            <LoadingDialog isLoading={userLoading === 1} />
        </Grid>
  )
}

const mapStateToProps = (state) => ({
  message: state.user.message,
  token: state.user.token,
  refreshToken: state.user.refreshToken,
  profile: state.user.profile
})

export default connect(mapStateToProps)(Login)
