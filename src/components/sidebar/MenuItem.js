import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";


const MenuItem = (props) => {
    const { path, icon, name,className }= props;
    return (
            <ListItem 
                className={className}
                button
                to={path}
                {...props}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{name}</ListItemText>
            </ListItem>
    )
}
export default MenuItem