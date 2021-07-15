import React from 'react';
import { AppBar, Grid, IconButton, Toolbar } from '@material-ui/core';
import {withRouter,useHistory} from 'react-router';
import {PowerSettingsNew as PowerSettingsNewIcon,
    
} from '@material-ui/icons'
import useStyles from './styles'
function Header() {
    const classes = useStyles();
    const history = useHistory();
  
    const logout = () => {
        localStorage.removeItem("accessToken")
        history.replace("/login")
    }

    return (
    <div className={classes.root}>
      <AppBar position="fixed"className={classes.appBar}>
        <Toolbar>
          <Grid container>
            <Grid item sm>
            </Grid>
          </Grid>
          <IconButton color="inherit" onClick={()=>logout()}>
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
    )
}
export default withRouter(Header);