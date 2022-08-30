import React from 'react'
import axios from 'axios';
import * as settings from '../settings';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';

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
  
  const popupStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 700,
    overflow: 'hidden',
    bgcolor: 'background.gray',
    border: '2px solid #000000b3',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
  };

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
    },
    gallery: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
    },
    image: {
      borderRadius: 3,
      alignSelf: 'center',
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    upload: {
      margin: theme.spacing(3, 0, 2),
    },
    success: {
      color: theme.palette.success.main,
    }
  }));

function Gallery() {
    const [images, setImages] = useState(null)
    const [image, setImage] = useState(null);
    const [og_images, setOGImages] = useState(null)
    const [open, setOpen] = useState(false);
    const [focusedImage, setFocusedImage] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const classes = useStyles();
    const token = useSelector((state) => state.auth.token)

    useEffect(() => {
        handleDownload()
    }, [])

    const handleFileSelect = event => {
        setImage(event.target.files[0])
    };

    const handleSearch = (event) => {
        let word = event.target.value
        let new_images = og_images.filter(element => element.pred_label.includes(word) == true || element.title.includes(word) == true)
        setImages(new_images)
    }

    const handleUpload = () => {

        if(!token){
            alert("Session timed out. Log back in")
        }
        //Axios variables required to call the upload API
        let headers = { 'Authorization': `Token ${token}`, "Content-Type": "multipart/form-data" };
        let url = settings.API_SERVER + '/api/image/upload/';
        let method = 'post';
        let imageData = new FormData();
        imageData.append("image_url", image);
        let ind = image.name.indexOf('.');
        let title = image.name
        // let title = image.name.substring(0, ind)
        // title = title.charAt(0) + title.slice(1);
        imageData.append("title", title);
        let now = new Date();
        imageData.append("upload_date", now.toISOString())
        
        let config = { headers, method, url, data: imageData };

        //Axios upload API call
        axios(config).then(
            res => {
                console.log(res.data)
                handleDownload()
            }).catch(
                error => {alert(error)}
                  )
    }

    const handleDownload = () => {
        //Axios variables required to call the upload API
        let headers = { 'Authorization': `Token ${token}`, "Content-Type": "multipart/form-data" };
        let url = settings.API_SERVER + '/api/image/get/';
        let method = 'get';
        let config = { headers, method, url };

        //Axios upload API call
        axios(config).then(
            res => {
                setImages(res.data)
                setOGImages(res.data)
                console.log(res.data)
            }).catch(
                error => {alert(error)}
                )
    }

    const handleDelete = (event) => {
        console.log(event.target.parentElement.id)
        console.log(event)
        //Axios variables required to call the upload API
        let image_url = event.target.id;
        if(image_url === ""){
            image_url = event.target.parentElement.id
            console.log(image_url)
        } 
        if(image_url === "") {
            image_url = event.target.parentElement.parentElement.id
            console.log(image_url)
        }
        let headers = { 'Authorization': `Token ${token}`, "Content-Type": "multipart/form-data" };
        let url = settings.API_SERVER + '/api/image/delete/';
        let method = 'delete';
        let image = new FormData();
        image.append("image_url", image_url)
        let config = { headers, method, url, data: image };

        //Axios upload API call
        axios(config).then(
            res => {
                console.log(res.data)
                handleDownload()
            }).catch(
                error => {alert(error)}
                )
    }
    
    const focusImage = (image) => {
        console.log(image)
        setFocusedImage(image.target.src)
        handleOpen()
    }

    const path = 'http://127.0.0.1:8000/'

    if(images == null){
        return (
            <h1>Loading...</h1>
        )
    } else {
        return (
            <React.Fragment>
            <Box sx={{ mt: 1.5, flexGrow: 1, height: "10", flexDirection: 'column', alignItems: 'center', position: 'sticky', width: '100%', top: 0, zIndex: 10 }}>
                <AppBar position="sticky" className={classes.secondaryBar} sx={{ top: 0 , alignItems: 'center', backgroundColor: '#000000b3' }}>
                    <Toolbar>
                        <Search sx={{  }}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearch}
                        />
                        </Search>
                    <Input type="file" accept="image/jpeg, image/png" onChange={handleFileSelect} sx={{color: 'white'}}/>
                    <Button variant='contained' onClick={handleUpload}>
                    Upload
                    </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <ImageList gap={5} cols={4} sx={{ width: '100%', height: '100%', '& .MuiImageList-quilted':{paddingTop: '5px', paddingBottom:'5px'}}} variant='quilted'>
                {images.map(image => (
                    <ImageListItem key={image.id}>
                        <img
                            src={path.concat(image.image_url)}
                            alt={image.title}
                            loading="lazy"
                            className={classes.image}
                            onClick={focusImage}
                        />
                        <ImageListItemBar
                            title={image.title}
                            subtitle={`Classification: ${image.pred_label}`}
                            uploaddate={image.upload_date}
                            sx={{height: '20%', '& .MuiImageListItemBar-subtitle':{paddingTop: '5px'}}}
                            actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)', mr: 1 }}
                                aria-label={`Delete ${image.title}`}
                                onClick={handleDelete}
                                id={image.image_url}
                            >
                                <DeleteIcon />
                            </IconButton>
                            }
                        />
                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                            timeout: 500,
                            }}
                            >
                            <Fade in={open}>
                                <Box sx={popupStyle}>
                                    <img
                                        src={focusedImage}
                                        alt={focusedImage}
                                        loading="lazy"
                                        width='75%'
                                        className={classes.image}
                                    />
                                </Box>
                            </Fade>
                        </Modal>
                    </ImageListItem>
                ))}
            </ImageList>
            </React.Fragment>
        )
    }
}

export default Gallery