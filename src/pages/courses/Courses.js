/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { withRouter } from 'react-router-dom'
import TableSrs from './components/TableSrs'
import PageHeader from '../../components/PageHeader'
import PopupSrs from './components/PopupSrs'
import TableTops from './components/TableTops'
import TableLes from './components/TableLes'
import PopupTops from './components/PopupTops'
import PopupLes from './components/PopupLes'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  pageContent: {
    // margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

function Courses () {
  const classes = useStyles()
  const goto = useSelector(state => state.courses.goto)
  const Greeting = (props) => {
    if (JSON.parse(localStorage.getItem('profile')).role === 'admin') {
      return (
        <div>
          <PopupSrs />
          <TableSrs />
        </div>
      )
    } {
      const next = props.goto
      if (next === 0) {
        return (
        <div>
          <PopupSrs />
          <TableSrs />
        </div>
        )
      } else if (next === 1) {
        return (
        <div>
          <PopupTops />
          <TableTops />
        </div>
        )
      } else {
        return (
        <div>
          <PopupLes />
          <TableLes />
        </div>
        )
      }
    }
  }

  const title = () => {
    if (JSON.parse(localStorage.getItem('profile')).role === 'admin') {
      return 'Courses management'
    } else {
      if (goto === 0) {
        return 'Courses management'
      } else if (goto === 1) {
        return 'Topics management'
      } else {
        return 'Lessons management'
      }
    }
  }

  return (
    <div>
      <PageHeader title={title()}/>
      <Paper className={classes.pageContent}>
        <Greeting goto={goto}/>
      </Paper>
    </div>
  )
}
export default withRouter(Courses)
