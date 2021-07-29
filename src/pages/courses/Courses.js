import React, {useEffect, useState, useLayoutEffect} from 'react';
import {withRouter} from 'react-router-dom'
import TableSrs from './components/TableSrs'
import PageHeader from '../../components/PageHeader'
import PopupSrs from './components/PopupSrs';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  pageContent: {
    // margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

function Courses() {
  const classes = useStyles();
  return (
    <div>
      <PageHeader title="Courses management"/>
      <Paper className={classes.pageContent}>
        <PopupSrs />
        <TableSrs />
      </Paper>
    </div>
  );
}
export default withRouter(Courses)