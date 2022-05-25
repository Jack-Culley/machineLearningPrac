import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../store/authActions';



export default function TopBar(props) {
  const isAuthenticated = useSelector((state) => state.auth.token !== null && typeof state.auth.token !== 'undefined');
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();
    dispatch(actions.authLogout());
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" variant="outlined" sx={{ flexGrow: 1, justifyContent: "space-between" }} href="/">
            Iris Species Predictor
          </Button>
          {isAuthenticated ? <Button color="inherit" variant="outlined" onClick={handleClick} sx={{ flexGrow: 1, justifyContent: "space-between" }}>Logout</Button> : null}
          {isAuthenticated ? <Button color="inherit" variant="outlined" href="/update_password/" sx={{ flexGrow: 1, justifyContent: "space-between" }}>Change Password</Button> : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
