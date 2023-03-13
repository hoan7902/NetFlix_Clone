import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    width: '252px',
    height: '130px',
  },
  image: {
    width: '70%',
    backgroundColor: theme.palette.mode === 'dark' && 'black',
    // filter: theme.palette.mode === 'dark' && 'brightness(10%) contrast(90%)',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
  },
}));
