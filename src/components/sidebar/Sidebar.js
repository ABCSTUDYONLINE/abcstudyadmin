/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { withRouter, NavLink } from 'react-router-dom'
import { Divider, Drawer, List } from '@material-ui/core'
import listMenuAdmin from './ListMenuAdminItem'
import listMenuTeacher from './ListMenuTeacherItem'
import useStyles from './styles'
import MenuItem from './MenuItem'

import Logo from '../../logo.svg'
function Sidebar () {
  const classes = useStyles()

  const [role, setRole] = useState('admin')

  useEffect(() => {
    const profileExist = JSON.parse(localStorage.getItem('profile'))
    if (profileExist) {
      setRole(profileExist.role)
    }
  }, [])

  return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <img src={Logo} alt="ABClogo" className={classes.imgToolbar}/>
        </div>
        <Divider/>
        <List className={classes.listItem}>
          { (role === 'admin' ? listMenuAdmin : listMenuTeacher).map(item => (
            <NavLink to={item.path} exact={item.excat} className={classes.menuLink} key={item.path}>
                <MenuItem name={item.name} divider/>
            </NavLink>
          ))}
        </List>
      </Drawer>
  )
}

export default withRouter(Sidebar)
