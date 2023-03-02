import React, { useState } from 'react'
import { AppBar, IconButton, Button, Toolbar, Drawer, Avatar, useMediaQuery } from '@mui/material'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import { useTheme } from '@mui/material/styles'
import { Sidebar } from '../'

const Navbar = () => {
  const theme = useTheme()
  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width: 600px)')
  const isAuthenticated = true
  const [openMobile, setOpenMobile] = useState(false)

  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color='inherit'
              edge='start'
              style={{ outline: 'none'}}
              className={classes.menuButton}
              onClick={() => setOpenMobile(pre => !pre)}
            >
              <Menu/>
            </IconButton>
          )}
          <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.theme === 'dark' ? <Brightness7/> : <Brightness4/>}
          </IconButton>
          {!isMobile && 'Search ...'}
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={() => {}}>
                Login &nbsp; <AccountCircle/>
              </Button>
            ) : (
              <Button
                color='inherit'
                component={Link}
                to='/profile/:id'
                className={classes.linkButton}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar 
                  style={{ width: 30, height: 30}}
                  alt='avatar'
                  src='https://znews-photo.zingcdn.me/w660/Uploaded/natmzz/2023_02_25/xv_2.JPG'

                />
              </Button>
            )}
          </div>
          {!isMobile && 'Search ...'}
        </Toolbar>
        <div>
          <nav className={classes.drawer}>
              {isMobile ? (
                <Drawer
                  variant='temporary'
                  anchor='right'
                  open={openMobile}
                  classes={{ paper: classes.drawerPaper}}
                  onClose={() => setOpenMobile(pre => !pre)}
                  ModalProps={{ keepMounted: true }}
                >
                  <Sidebar setOpenMobile={setOpenMobile}/>
                </Drawer>
              ) : (
                <Drawer classes={classes.drawerPaper} variant='permanent' open>
                  <Sidebar setOpenMobile={setOpenMobile}/>
                </Drawer>
              )}
          </nav>
        </div>
      </AppBar>
    </div>
  )
}

export default Navbar