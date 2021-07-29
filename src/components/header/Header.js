import React, { useEffect, useState } from 'react';
import { AppBar, Grid, IconButton, InputLabel, Toolbar } from '@material-ui/core';
import {withRouter,useHistory} from 'react-router';
import {PowerSettingsNew as PowerSettingsNewIcon,
} from '@material-ui/icons'
import { useDispatch } from 'react-redux';
import { signOut } from '../../redux/user/userAction';

import useStyles from './styles'
function Header() {

    const classes = useStyles();
    const history = useHistory();
    const [name, setName] = useState('No Name');

    const dispatch = useDispatch();
  
    const logout = () => {
      dispatch(signOut(history))
    }

    useEffect(() => {
      const profileExist =  JSON.parse(localStorage.getItem('profile'));
      if (profileExist) {
        setName(profileExist.username);
      }
    }, [])

    return (
    <div className={classes.root}>
      <AppBar position="fixed"className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item sm>
            </Grid>
          </Grid>
          <InputLabel style={{color: 'white'}}>{name}</InputLabel>
          <IconButton color="inherit" onClick={()=>logout()}>
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
    )
}
export default withRouter(Header);