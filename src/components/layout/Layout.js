/* eslint-disable no-unused-vars */
import React from 'react'
import {
  CssBaseline
} from '@material-ui/core'
import { ThemeProvider, createTheme } from '@material-ui/core/styles'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'
import useStyles from './styles'
import { Switch } from 'react-router-dom'
import AuthenticationRoute from '../auth/AuthenticationRoute'

const theme = createTheme({
  palette: {
    primary: {
      light: '#7986cb',
      main: '#3f51b5'
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081'
    },
    background: {
      default: '#f4f5fd'
    }
  },
  shape: {
    borderRadius: '12px'
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
      disableRipple: true
    }
  }
})

function RouteWithSubRoutes (route) {
  return (
      <AuthenticationRoute {...route} />
  )
}

export default function Layout ({ routes }) {
  const classes = useStyles()

  return (
        <ThemeProvider theme={theme} className={classes.root}>
            <CssBaseline />
            <Header />
            <div className={classes.wrapper}>
                <Sidebar />
                <div className={classes.wrapperContent}>
                    <div className={classes.toolbar} />
                    <Switch>
                        {routes.map((route, index) => (
                            <RouteWithSubRoutes key={index} {...route} />
                        ))}
                    </Switch>
                </div>
            </div>
        </ThemeProvider>
  )
}
