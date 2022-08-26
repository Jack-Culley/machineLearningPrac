import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import * as settings from '../settings';
import { useSelector } from 'react-redux';



const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.success.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    success: {
      color: theme.palette.success.main,
    }
  }));
  
  function PasswordUpdate() {
    const classes = useStyles();
    const [new_password1, setNewPassword1] = React.useState(null);
    const [new_password2, setNewPassword2] = React.useState(null);
    const [success, setSuccess] = React.useState(false);

    const token = useSelector((state) => state.auth.token)

    const handleFormFieldChange = (event) => {
      setSuccess(false);
      switch (event.target.id) {
        case 'new_password1': setNewPassword1(event.target.value); break;
        case 'new_password2': setNewPassword2(event.target.value); break;
        default: return null;
      }
  
    };
  
    const containsNumber = new RegExp('[0-9]')
    const containsLetter = new RegEx('[a-zA-Z]')

    const handleSubmit = (e) => {
      e.preventDefault();
      if (new_password1 !== new_password2) {
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
        let url = settings.API_SERVER + '/api/auth/update_password/';
        let passwordFormData = new FormData();
        passwordFormData.append("new_password1", new_password1);
        passwordFormData.append("new_password2", new_password2);
        let config = { headers, method, url, data: passwordFormData};
        //Axios update_password API call
        axios(config).then(res => {
          setSuccess(true);
        }).catch(
          error => {
            alert(error)
          })
      }
  
    }
  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {success ? <Typography variant="button" className={classes.success} gutterBottom>Password update successful!</Typography> : null}
          <Avatar className={classes.avatar}>
            <VpnKeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Password
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="new_password1"
              label="Enter New Password"
              type="password"
              id="new_password1"
              onChange={handleFormFieldChange}
              error={new_password1 !== new_password2}
              helperText={new_password1 !== new_password2 ? "Passwords don't match" : "Password must contain both letters and numbers and be 8 characters long"}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="new_password2"
              label="Enter Your Password Again"
              type="password"
              id="new_password2"
              onChange={handleFormFieldChange}
              error={new_password1 !== new_password2}
              helperText={new_password1 !== new_password2 ? "Passwords don't match" : null}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Update Password
            </Button>
          </form>
        </div>
      </Container>
    );
  }
  
  
  export default PasswordUpdate;