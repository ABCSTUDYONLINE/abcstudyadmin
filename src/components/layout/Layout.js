import React from "react";
import { 
    CssBaseline,
} from "@material-ui/core";
import { ThemeProvider,createTheme } from '@material-ui/core/styles';
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import useStyles from './styles'    
import { Route, Switch } from "react-router-dom";
import Categories from '../../pages/categories/Categories'
import Courses from '../../pages/sourses/Courses'
import Users from '../../pages/users/Users'

const theme = createTheme({
    palette: {
        primary: {
            light: "#7986cb",
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
            light: "#ff4081",
        },
        background: {
            default: "#f4f5fd",
        }
    },
    shape: {
        borderRadius: '12px',
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)'
            }
        }
    },
    props: {
        MuiIconButton: {
            disableRipple: true,
        }
    }
})


export default function Layout(props) {
    const classes = useStyles();
    
  return (
    <ThemeProvider theme={theme} className={classes.root}>
        <CssBaseline />
        <Header/>  
        <div className={classes.wrapper}>
        <Sidebar/>  
        <div className={classes.wrapperContent}>
            <div className={classes.toolbar} />   
            <Switch>
                <Route exact path="/" component={Categories}/>
                <Route exact path="/sourses" component={Courses}/>
                <Route exact path="/users" component={Users}/>
            </Switch>
        </div>
        </div>
        
    </ThemeProvider>
  );
}