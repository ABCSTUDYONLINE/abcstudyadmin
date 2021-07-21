import React, { useState, useEffect } from 'react';
import TableCate from './components/TableCate';
import { withRouter } from 'react-router-dom';
import PageHeader from '../../components/PageHeader'
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PopupCate from './components/PopupCate';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/category/categoryAction';

const useStyles = makeStyles(theme => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  }
}))

function Categories() {
  const classes = useStyles();

  // const dataCategory = useSelector(state => state.category.categories);

  // const dispatch = useDispatch();
  // const getDataCategory = () => {
  //   dispatch(getCategories(1, 1))
  // }
  // useEffect(() => {
  //   getDataCategory()
  // }, [])

  return (
    <div>
      <PageHeader title="Table Category" />
      <Paper className={classes.pageContent}>
        <PopupCate />
        <TableCate/>
      </Paper>

    </div>
  )
}
export default withRouter(Categories)