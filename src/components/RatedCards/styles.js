import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));
