import React from 'react'
import axios from 'axios';
import * as settings from '../settings';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Gallery from './Gallery.js';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


// ########################################################
// Material UI inline styles
// ########################################################

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "75%",
        marginTop: "15vh",
        marginBottom: "10vh",
        marginRight: "15vh",
        marginLeft: "15vh",
        borderRadius: '5px',
        backgroundColor: theme.palette.action.disabledBackground,
        paddingTop: "1.5vh",
        paddingBottom: "1.5vh",
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2), paddingLeft: theme.spacing(4),
        color: theme.palette.primary.main,
    },
    secondaryBar: {
        backgroundColor: theme.palette.action.disabledBackground,
    }
}));

// ########################################################
// The main Home component returned by this Module
// ########################################################
function Home(props) {
    // Material UI Classes 
    const classes = useStyles();
    const token = useSelector((state) => state.auth.token)

    // React hook state variable - Image
    const [image, setImage] = React.useState(null);

    const handleFileSelect = event => {
        setImage(event.target.files[0])
    };

    const handleUpload = () => {

        console.log(image)
        //Axios variables required to call the upload API
        let headers = { 'Authorization': `Token ${token}`, "Content-Type": "multipart/form-data" };
        let url = settings.API_SERVER + '/api/image/upload/';
        let method = 'post';
        let imageData = new FormData();
        imageData.append("image_url", image);
        let ind = image.name.indexOf('.');
        let title = image.name.substring(0, ind)
        title = title.charAt(0) + title.slice(1);
        imageData.append("title", title);
        let now = new Date();
        imageData.append("upload_date", now.toISOString())
        
        let config = { headers, method, url, data: imageData };

        //Axios upload API call
        axios(config).then(
            res => {
                console.log(res.data)
                window.location.reload()
            }).catch(
                error => {alert(error)}
                  )

        
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Box sx={{ flexGrow: 1, height: "10"}}>
                <AppBar position="sticky" className={classes.secondaryBar} sx={{ top: 0 , alignItems: 'center', backgroundColor: '#fff' }}>
                    <Toolbar>
                    
                        <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        </Search>
          
                    <Input type="file" accept="image/jpeg, image/png" onChange={handleFileSelect} />
                
                    <Button variant='contained' onClick={handleUpload}>
                    Upload
                    </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container className={classes.container}>
                <Gallery/>
            </Container>
        </React.Fragment>
    )
}

export default Home