/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import TablePros from './components/TablePros'
import { withRouter } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PopupPros from './components/PopupPros'

const useStyles = makeStyles(theme => ({
  pageContent: {
    // margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

function Promotions () {
  const classes = useStyles()

  return (
    <div>
      <PageHeader title="Promotion management" />
      <Paper className={classes.pageContent}>
        <PopupPros />
        <TablePros/>
      </Paper>
    </div>
  )
}
export default withRouter(Promotions)
