/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { AppBar, Grid, IconButton, InputLabel, Toolbar } from '@material-ui/core'
import { withRouter, useHistory } from 'react-router'
import { PowerSettingsNew as PowerSettingsNewIcon } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { signOut, showProfile, hideProfile } from '../../redux/user/userAction'
import PopupUsers from '../../pages/users/components/PopupUsers'
import PopupPass from '../../pages/users/components/PopupPass'
import { Menu, Dropdown } from 'antd'
import { LoadingDialog } from '../LoadingDialog'
import useStyles from './styles'

function Header () {
  const profileChange = useSelector(state => state.user.profile)
  const isShowProfile = useSelector(state => state.user.showProfile)
  const isAvatar = useSelector(state => state.user.isAvatar)
  const isLoading = useSelector(state => state.user.loading)

  const classes = useStyles()
  const history = useHistory()
  const [name, setName] = useState('No Name')
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
  const [isShowDialogProfile, setDialogProfile] = useState(false)
  const [isShowAvatar, setShowAvatar] = useState(false)
  const [isChangePass, setChangePass] = useState(false)

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(signOut(history))
  }

  const toProfile = () => {
    dispatch(showProfile(false))
  }

  useEffect(() => {
    const localProfile = JSON.parse(localStorage.getItem('profile'))
    setProfile(localProfile)
    setName(localProfile.username)
  }, [profileChange])

  useEffect(() => {
    console.log(isShowProfile === 1)
    setDialogProfile(isShowProfile === 1)
    setShowAvatar(isAvatar)
  }, [isShowProfile])

  const menu = (
    <Menu>
      <Menu.Item onClick={() => toProfile()}>
        <a target="_blank" rel="noopener noreferrer">
          profile
        </a>
      </Menu.Item>
      <Menu.Item onClick={() => setChangePass(!isChangePass)}>
        <a target="_blank" rel="noopener noreferrer">
          change password
        </a>
      </Menu.Item>
      <Menu.Item onClick={() => logout()}>
        <a target="_blank" rel="noopener noreferrer">
          logout
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={classes.root}>
      <PopupPass showDialog={isChangePass}/>
      <PopupUsers visible={isShowDialogProfile} isAvatar={isShowAvatar}/>
      <AppBar position="fixed"className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item sm>
            </Grid>
          </Grid>
          <InputLabel style={{ color: 'white', marginRight: 10 }}>{name}</InputLabel>
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <PowerSettingsNewIcon />
          </Dropdown>
        </Toolbar>
      </AppBar>
      <LoadingDialog isLoading={isLoading === 1} />
    </div>
  )
}
export default withRouter(Header)
