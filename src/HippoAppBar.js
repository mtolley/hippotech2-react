import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import { useAuth } from './Auth';
import server from './server';

export default function HippoAppBar() {
  const navigate = useNavigate();
  //const { user, setUser } = React.useContext(UserContext);
  const { user, signin, signout } = useAuth();

  async function handleLogout() {
    await signout();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            // sx={{ mr: 2 }}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={ () => navigate('/') }>
            HippoTech
          </Typography>
          { 
            !!user ? <Button color="inherit" onClick={ async () =>  await handleLogout() }>Logout</Button> 
                             : <Button color="inherit" onClick={ () => navigate('/login') }>Login</Button>
          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}