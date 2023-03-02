import { makeStyles } from '@mui/styles';

const drawerWidth = 240

export default makeStyles((theme) => ({
    toolbar: {
        display: 'flex', 
        justifyContent: 'space-between',
        height: '80px',
        marginLeft: '80px',
        [theme.breakpoints.down('sm')]: {
            // display: 'none !important',
            marginLeft: 0,
            flexWrap: 'wrap'
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: drawerWidth
    },
    linkButton: {
        '&:hover': {
            color: 'white !important',
            textDecoration: 'none'
        }
    }
}))