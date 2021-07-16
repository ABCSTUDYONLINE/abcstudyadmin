import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
    Divider,
    IconButton,
    TextField
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles"
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));
export default function PopupCate() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <IconButton size="small" flexed>
          <AddIcon />
          <Typography>Add new</Typography>
        </IconButton>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"New Field"}</DialogTitle>
        <Divider />
        <DialogContent>
          <form className={classes.root}>
            <TextField
              id="outlined-basic"
              label="Field Name"
              variant="outlined"
              type="text"
              fullWidth
            />
            <TextField
              id="outlined-basic"
              label="Num Of Counts"
              variant="outlined"
              type="number"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus type="submit">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}
