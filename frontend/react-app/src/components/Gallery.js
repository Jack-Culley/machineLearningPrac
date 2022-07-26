import React from 'react'
import axios from 'axios';
import * as settings from '../settings';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const useStyles = makeStyles((theme) => ({
    gallery: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      textAlign: 'center',
    },
    image: {
      borderRadius: 3,
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
    const token = useSelector((state) => state.auth.token)
    const classes = useStyles();
    //TODO fix the redundant API calls
    useEffect(() => {
        handleDownload()
    }, []);


    //TODO put loading screen up
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
                console.log(res.data)
            }).catch(
                error => {alert(error)}
                )
    }

    const handleDelete = (event) => {
        console.log(event.props)
        //Axios variables required to call the upload API
        let headers = { 'Authorization': `Token ${token}`, "Content-Type": "multipart/form-data" };
        let url = settings.API_SERVER + '/api/image/delete/';
        let method = 'delete';
        let image = new FormData();
        image.append("image_url", event.target.attributes.form.value)
        let config = { headers, method, url, data: image };

        //Axios upload API call
        axios(config).then(
            res => {
                console.log(res.data)
                window.location.reload()
            }).catch(
                error => {alert(error)}
                )
    }
    
    const path = 'http://127.0.0.1:8000/'

    if(images == null){
        return (
            <h1>You have no images yet :(</h1>
        )
    } else {
        return (
            <ImageList gap={5} cols={4} sx={{ width: '100%', height: '100%', '& .MuiImageList-quilted':{paddingTop: '5px', paddingBottom:'5px'}}} variant='quilted'>
                {images.map(image => (
                    <ImageListItem key={image.id}>
                        <img
                            // src={`${item.img}?w=248&fit=crop&auto=format`}
                            // srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={path.concat(image.image_url)}
                            alt={image.title}
                            loading="lazy"
                            className={classes.image}
                        />
                        <ImageListItemBar
                            title={image.title}
                            subtitle={`Classification: ${image.pred_label}`}
                            uploaddate={image.upload_date}
                            sx={{height: '20%', '& .MuiImageListItemBar-subtitle':{paddingTop: '5px'}}}
                            actionIcon={
                            <IconButton
                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                aria-label={`Delete ${image.title}`}
                                onClick={handleDelete}
                                id={image.image_url}
                            >
                                <DeleteIcon />
                            </IconButton>
                            }
                        />
                        {/* <button onClick={handleDelete} form={image.image_url}>
                            Delete
                        </button> */}
                    </ImageListItem>
                ))}
            </ImageList>
        )
    }
}

export default Gallery