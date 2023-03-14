import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));
