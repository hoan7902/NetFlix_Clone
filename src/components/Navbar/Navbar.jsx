import React, { useContext, useEffect, useState } from 'react';
import {
  AppBar,
  IconButton,
  Button,
  Toolbar,
  Drawer,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useTheme } from '@mui/material/styles';
import { Search, Sidebar } from '../';
import { createSessionId, fetchToken, moviesApi } from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, setUser } from '../../features/auth';
import { ColorModeContext } from '../../utils/ToggleColorMode';

const Navbar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [openMobile, setOpenMobile] = useState(false);
  const token = localStorage.getItem('request_token');
  const sessionIdFromLocal = localStorage.getItem('session_id');
  const { user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const colorMode = useContext(ColorModeContext)

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdFromLocal) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocal}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token, dispatch, sessionIdFromLocal]);

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              className={classes.menuButton}
              onClick={() => setOpenMobile((pre) => !pre)}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!localStorage.getItem('session_id') ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
              >
                {!isMobile && <span>My Movies &nbsp;</span>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="avatar"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
        <div>
          <nav className={classes.drawer}>
            {isMobile ? (
              <Drawer
                variant="temporary"
                anchor="right"
                open={openMobile}
                classes={{ paper: classes.drawerPaper }}
                onClose={() => setOpenMobile((pre) => !pre)}
                ModalProps={{ keepMounted: true }}
              >
                <Sidebar setOpenMobile={setOpenMobile} />
              </Drawer>
            ) : (
              <Drawer classes={classes.drawerPaper} variant="permanent" open>
                <Sidebar setOpenMobile={setOpenMobile} />
              </Drawer>
            )}
          </nav>
        </div>
      </AppBar>
    </div>
  );
};

export default Navbar;