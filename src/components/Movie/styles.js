import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  movie: {
    padding: '10px',
  },
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '230px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '10px',
    marginBottom: 0,
    textAlign: 'center',
  },
  links: {
    alignItems: 'center',
    fontWeight: 'bolder',
    textDecoration: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'none',
    },
  },
  image: {
    borderRadius: '20px',
    height: '300px',
    marginBottom: '10px',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
      animationName: '$animateScale',
      animationDuration: '0.4s',
      animationTimingFunction: 'ease',
      animationFillMode: 'forwards',
    },
  },
  '@keyframes animateScale': {
    '0%': {
      transform: 'scale(1)',
    },
    '100%': {
      transform: 'scale(1.05)',
    },
  },
}));
