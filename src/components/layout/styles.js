import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: theme.mixins.toolbar,
  wrapperContent: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    height: '100%',
  },
  wrapper:{
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
  }
}));
export default useStyles