import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { FormControlLabel, Checkbox, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';


import { connect } from 'react-redux';
import * as actions from '../store/authActions';

function Login() {

  const dispatch = useDispatch();

  const [username, setuserName] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const handleFormFieldChange = (event) => {
    switch (event.target.id) {
      case 'username': setuserName(event.target.value); break;
      case 'password': setPassword(event.target.value); break;
      default: return null;
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.authLogin(username, password));
  }

  // React.useEffect(() => {
  //   if(isAuthenticated) { navigate('/', {replace: true}) } 
  // }, [])

  return (
    <Container component="main" maxWidth="xs">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleFormFieldChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleFormFieldChange}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Container>
    );
  }
  
  export default connect(null, null)(Login);