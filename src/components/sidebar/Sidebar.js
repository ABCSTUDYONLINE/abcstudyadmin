import React from 'react';
import {withRouter} from 'react-router-dom';
import { Divider, Drawer, List } from '@material-ui/core';
import listMenu from './ListItem';
import useStyles from './styles'
import MenuItem from './MenuItem';
import { NavLink } from "react-router-dom";

import Logo from "../../logo.svg"
function Sidebar() {
    const classes = useStyles();
    
    
    return (
        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <img src={Logo} alt="ABClogo" className={classes.imgToolbar}/>
        </div>
        <Divider/>
        <List className={classes.listItem}>
          {listMenu.map(item => (
            <NavLink to={item.path} exact={item.excat} className={classes.menuLink} key={item.path}>
                <MenuItem name={item.name} divider/>
            </NavLink>
            
          ))}
        </List>
        
      </Drawer>
    )
}

export default withRouter(Sidebar)