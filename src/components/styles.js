import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    height: "100%",
  },
  toolbar: {
    height: "70px",
  },
  content: {
    flexGrow: "1",
    padding: "2em",
    width: "100%",
    marginLeft: "252px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0 !important",
    }
  },
}));
