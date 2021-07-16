import React from 'react'
import TableCate from './components/TableCate'
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader'
import { Paper } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import PopupCate from './components/PopupCate'
const useStyles = makeStyles(theme => ({
  pageContent:{
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

function Categories() {
  const classes = useStyles();
    return (
      <div>
        <PageHeader title="Table Fields"/>
        <Paper className={classes.pageContent}>
            <PopupCate/>
            <TableCate/> 
        </Paper>
         
      </div>
    )
}
export default withRouter(Categories)