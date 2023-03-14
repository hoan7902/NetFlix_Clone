import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  moviesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      marginLeft: 0,
      width: "100% !important",
    },
  },
}));
