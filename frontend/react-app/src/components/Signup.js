import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../store/authActions';
import axios from 'axios';
import * as settings from '../settings';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    form: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
}));

function Signup() {

  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setuserName] = React.useState(null);
  const [password1, setPassword1] = React.useState(null);
  const [password2, setPassword2] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);


  const handleFormFieldChange = (event) => {
    switch (event.target.id) {
      case 'username': setuserName(event.target.value); break;
      case 'password1': setPassword1(event.target.value); break;
      case 'password2': setPassword2(event.target.value); break;
      case 'email' : setEmail(event.target.value); break;
      case 'firstName' : setFirstName(event.target.value); break;
      case 'lastName' : setLastName(event.target.value); break;
      default: return null;
    }
  };

  const token = useSelector((state) => state.auth.token)

  const containsNumber = new RegExp('[0-9]')
  const containsLetter = new RegExp('[a-zA-Z]')

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName && !lastName && !username && !email && !password1 && !password2){
      alert("All fields marked with * are required")
    } else if (password1 !== password2) {
        alert("Passwords don't match")
    } else if (!containsNumber.test(password1)) {
        alert("Password must contain a number")
    } else if(!containsLetter.test(password1)) {
        alert("Password must contain a letter")
    } else if(password1.length < 8){
        alert("Password must be at least 8 characters long")
      } else {
        let headers = { 'Authorization': `Token ${token}` };
        let method = 'post';
        let url = settings.API_SERVER + '/api/auth/sign-up/';
        let passwordFormData = new FormData();
        passwordFormData.append("password", password1);
        passwordFormData.append("firstname", firstName);
        passwordFormData.append("lastname", lastName);
        passwordFormData.append("username", username);
        passwordFormData.append("email", email);
        let config = { headers, method, url, data: passwordFormData};
        //Axios sign-up API call
        axios(config).then(res => {
            dispatch(actions.authLogin(username, password1));
            console.log(res)
        }).catch(
          error => {
            console.log(error)
          })
      }
  }

  return (
    <Container component="main" maxWidth="md">
        <Container component="main" maxWidth="md">
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
              Sign up
            </Typography>
            <form noValidate onSubmit={handleSubmit} className={classes.form}>
            <Container component="main" maxWidth="md" sx={{ display: 'flex', flexDirection: 'row' }}>    
                <Container component="main" maxWidth="md">
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoComplete="first_name"
                        autoFocus
                        onChange={handleFormFieldChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        onChange={handleFormFieldChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password1"
                        label="Password"
                        type="password"
                        id="password1"
                        onChange={handleFormFieldChange}
                        error={password1 !== password2}
                        helperText={password1 !== password2 ? "Passwords don't match" : "Password must contain both letters and numbers and be 8 characters long"}
                    />
                </Container>
                <Container component="main" maxWidth="xs">
                <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        autoComplete="last_name"
                        onChange={handleFormFieldChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="User Name"
                        name="username"
                        autoComplete="username"
                        onChange={handleFormFieldChange}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password2"
                        label="Confirm Password"
                        type="password"
                        id="password2"
                        onChange={handleFormFieldChange}
                        error={password1 !== password2}
                        helperText={password1 !== password2 ? "Passwords don't match" : null}
                    />
                </Container>
              </Container>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 6, width: '25%' }}
              >
                Sign Up
              </Button>
            </form>
          </Box>
        </Container>
      </Container>
    );
  }

export default connect(null, null)(Signup);