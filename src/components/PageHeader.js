import { Paper, Typography } from '@material-ui/core'
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>({
    root:{
        backgroundColor: '#fff',
        borderRadius:'10px',
    },
    pageHeader:{
        padding: theme.spacing(4),
        display: 'flex',
        marginBottom: theme.spacing(3)
    }
}))

export default function PageHeader(props) {
    const classes = useStyles();
    const {title}= props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Typography component="div" variant="h4">
                    {title}
                </Typography>
            </div>
        </Paper>
    )
}
