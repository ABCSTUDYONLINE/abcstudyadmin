import React from 'react';
import { useHistory } from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root:{
        justifyContent:'center',
        textAlign:'center',
    }
})
export default function Error() {
    const classes = useStyles();
    let history = useHistory();
    return (
        <div className={classes.root}>
            <h2>404 Not Found</h2>
            <button onClick={() => history.goBack()}>Go Home</button>
        </div>
    )
}
