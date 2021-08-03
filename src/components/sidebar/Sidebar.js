/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { withRouter, NavLink, useHistory } from 'react-router-dom'
import { Divider, Drawer, List } from '@material-ui/core'
import listMenuAdmin from './ListMenuAdminItem'
import listMenuTeacher from './ListMenuTeacherItem'
import useStyles from './styles'
import MenuItem from './MenuItem'
import { Card } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Logo from '../../logo.svg'
import { showProfile, signOut } from '../../redux/user/userAction'

const { Meta } = Card
function Sidebar () {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const profileChange = useSelector(state => state.user.profile)
  const [role, setRole] = useState('admin')
  const [image, setImage] = useState(null)
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    const localProfile = JSON.parse(localStorage.getItem('profile'))
    setProfile(localProfile)
    setRole(localProfile.role)
    setImage(localProfile.avatarLink !== null ? localProfile.avatarLink : Logo)
  }, [profileChange])

  return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <Card
          onClick={() => dispatch(showProfile(true))}
          hoverable
          cover={<img src={image} style={{ height: 100 }} alt="ABClogo"/>}
        >
          <Meta title={profile === null ? dispatch(signOut(history)) : `${profile.firstName} ${profile.lastName}`} description={profile.email} />
        </Card>
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
