import '../App.css';
import { CssBaseline } from '@mui/material';
import { Switch, Route } from "react-router-dom";
import { Actors, Movies, MoviesInformation, Navbar, Profile } from './'
import useStyles from './styles.js'

function App() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Navbar/>
      <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Switch>
          <Route exact path='/movie/:id'>
            <MoviesInformation/>
          </Route>
          <Route exact path='/actor/:id'>
            <Actors/>
          </Route>
          <Route exact path='/'>
            <Movies/>
          </Route>
          <Route exact path='/profile/:id'>
            <Profile/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
