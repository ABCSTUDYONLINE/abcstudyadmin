/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
// import Loader from "react-loader";
import LoadingOverlay from 'react-loading-overlay'
// import BounceLoader from "react-spinners/BounceLoader";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    display: ({ isLoading }) => isLoading === true ? 'flex' : 'none', /* Show or Hidden by default */
    position: 'fixed', /* Stay in place */
    alignItems: 'center',
    zIndex: 999, /* Sit on top */
    left: 0,
    top: 0,
    justifyContent: 'center',
    width: '100%', /* Full width */
    height: '100%', /* Full height */
    overflow: 'auto', /* Enable scroll if needed */
    background: 'rgba(0, 0, 0, 0.4)' /* Black w/ opacity */
  }
}))

export const LoadingDialog = (props) => {
  const classes = useStyles({ isLoading: props.isLoading })
  return (
    <div className={classes.container}>
    <LoadingOverlay
      active={props.isLoading}
          // spinner={<BounceLoader />}
      spinner
    >
      {/* <p>Some content or children or something.</p> */}
    </LoadingOverlay>
    </div>
  )
}

export default LoadingDialog
