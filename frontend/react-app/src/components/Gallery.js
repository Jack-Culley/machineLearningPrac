import React from 'react'
import axios from 'axios';
import * as settings from '../settings';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';




function Gallery() {
    const [images, setImages] = useState(null)
    const token = useSelector((state) => state.auth.token)

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
        console.log(event.target.attributes.form)
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
            <React.Fragment>
                {images.map(image => (
                    <React.Fragment key={image.id}>
                        <img src={path.concat(image.image_url)} alt={image.title} />
                        <h2>{image.title}</h2>
                        <h3>Prediction: {image.pred_label}</h3>
                        <p>Uploaded on: {image.upload_date}</p>
                        <button onClick={handleDelete} form={image.image_url}>
                            Delete
                        </button>
                        <br></br>
                    </React.Fragment>
                ))}
            </React.Fragment>
        )
    }
}

export default Gallery