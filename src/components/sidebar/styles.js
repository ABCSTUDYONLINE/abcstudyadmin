import {makeStyles} from '@material-ui/core/styles';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#fff',
  },
  toolbar: {
    height: theme.spacing(8),
    
  },
  imgToolbar:{
    marginTop: theme.spacing(1),
    height: '70%',
    marginLeft: theme.spacing(12),
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
  menuLink:{
    textDecoration:'none',
    color: theme.palette.primary.light,
  },
  listItem:{
    paddingTop:theme.spacing(0),
  }
}))

export default useStyles