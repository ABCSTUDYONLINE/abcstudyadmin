import { ListItem, ListItemText } from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() =>({
    cName:{
        textAlign: 'center',
    }
}))
const MenuItem = (props) => {
    const { path,name }= props;
    const classes= useStyles();
    return (
            <ListItem 
                button
                to={path}
                {...props}
                className={classes.cName}
            >
                <ListItemText>{name}</ListItemText>
            </ListItem>
    )
}
export default MenuItem