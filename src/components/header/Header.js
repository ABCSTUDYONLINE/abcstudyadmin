/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { AppBar, Grid, IconButton, InputLabel, Toolbar } from '@material-ui/core'
import { withRouter, useHistory } from 'react-router'
import { PowerSettingsNew as PowerSettingsNewIcon } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { signOut } from '../../redux/user/userAction'
import { Menu, Dropdown } from 'antd'

import useStyles from './styles'
function Header () {
  const classes = useStyles()
  const history = useHistory()
  const [name, setName] = useState('No Name')

  const dispatch = useDispatch()

  const logout = () => {
    dispatch(signOut(history))
  }

  useEffect(() => {
    const profileExist = JSON.parse(localStorage.getItem('profile'))
    if (profileExist) {
      setName(profileExist.username)
    }
  }, [])

  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer">
          profile
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
    </div>
  )
}
export default withRouter(Header)
