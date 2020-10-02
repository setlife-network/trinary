import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    SwipeableDrawer,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const NAV_ITEMS = [
    {
        text: 'Home',
        route: '/',
    },
    {
        text: 'LoginPage',
        route: '/login',
    },
    {
        text: 'Clients List Page',
        route: '/clients'
    },
    {
        text: 'ClientDetailPage',
        route: '/clients/1',
    },
    {
        text: 'AddClientPage',
        route: '/client/add',
    },
    {
        text: 'ProjectDetailPage',
        route: '/projects/1',
    },
    {
        text: 'AddProjectPage',
        route: '/project/add'
    }
]

const useStyles = makeStyles({
    list: {
        width: 250,
    }
});

const Navigation = (props) => {
    const history = useHistory()
    const classes = useStyles();
    const [opened, setOpened] = useState(false);

    const toggleDrawer = (event, opened) => {
        // Allow for tab presses without closing
        // the drawer
        if (
            event && 
            event.type === 'keydown' && 
            event.key === 'Tab'
        ) {
            return;
        }

        setOpened(opened);
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={1}>
                    <IconButton onClick={(e) => toggleDrawer(e, true)}>
                        <MenuIcon/>
                    </IconButton>
                </Grid>
            </Grid>
            
            <SwipeableDrawer
                anchor='left'
                open={opened}
                onClose={(e) => toggleDrawer(e, false)}
                onOpen={(e) => toggleDrawer(e, true)}
            >
                <div
                    className={classes.list}
                    role='presentation'
                    onClick={(e) => toggleDrawer(e, false)}
                    onKeyDown={(e) => toggleDrawer(e, false)}
                >
                    <List>
                        {NAV_ITEMS.map((item, index) => (
                            <ListItem
                                button
                                key={`nli-${index}`}
                                onClick={(e) => {
                                    toggleDrawer(e, false)
                                    history.push(item.route)
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </SwipeableDrawer>
        </div>
    );
}

Navigation.defaultProps = {
    
};

export default Navigation;
