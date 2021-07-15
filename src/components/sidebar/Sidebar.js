import React from 'react';
import {withRouter} from 'react-router-dom';
import { Drawer, List } from '@material-ui/core';
import listMenu from './ListItem';
import useStyles from './styles'
import MenuItem from './MenuItem';
import { NavLink } from "react-router-dom";


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
        <div className={classes.toolbar} />
        <List className={classes.listItem}>
          {listMenu.map(item => (
            <NavLink to={item.path} exact={item.excat} className={classes.menuLink} activeClassName={classes.menuLinkActive} key={item.path}>
                <MenuItem icon={item.icon} name={item.name}/>
            </NavLink>
            
          ))}
        </List>
        
      </Drawer>
    )
}

export default withRouter(Sidebar)