import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
  moviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    // marginLeft: drawerWidth,
    justifyContent: "space-around",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      marginLeft: 0,
      width: "100% !important",
    },
  },
}));
