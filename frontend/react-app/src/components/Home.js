import React from 'react'
import axios from 'axios';
import * as settings from '../settings';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Button } from '@material-ui/core';

// ########################################################
// Material UI inline styles
// ########################################################
const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: "75%",
        marginTop: "15vh",
        marginBottom: "10vh",
        borderRadius: '6px',
        backgroundColor: theme.palette.action.disabledBackground,
    },
    title: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2), paddingLeft: theme.spacing(4),
        color: theme.palette.primary.main,
    },
    sliders: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    slidertop: {
        marginTop: theme.spacing(4),
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

    // React hook state variable - Prediction
    const [prediction, setPrediction] = React.useState("No Prediction")

    const handleFileSelect = event => {
        setImage(event.target.files[0])
    };

    const handleUpload = () => {

        console.log(new Date())

        //Axios variables required to call the upload API
        let headers = { 'Authorization': `Token ${token}`, "Content-Type": "multipart/form-data" };
        let url = settings.API_SERVER + '/api/image/upload/';
        let method = 'post';
        let imageData = new FormData();
        imageData.append("image_url", image.name);
        let ind = image.name.indexOf('.');
        imageData.append("title", image.name.substring(ind));
        let now = new Date();
        imageData.append("upload_date", now.toISOString())
        
        let config = { headers, method, url, data: imageData };

        //Axios upload API call
        axios(config).then(
            res => {
                console.log(res.data)
            }).catch(
                error => {alert(error)}
                )
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed className={classes.container}>
            
            <div>
                <input type="file" accept="image/jpeg, image/png" onChange={handleFileSelect} />
                <button onClick={handleUpload}>
                  Upload
                </button>
                {prediction}NodeJs - Axios
            </div>

            

            </Container>
        </React.Fragment>
    )
}

export default Home