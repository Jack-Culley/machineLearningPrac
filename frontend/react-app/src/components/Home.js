import React from 'react'
import axios from 'axios';
import * as settings from '../settings';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, Typography, Slider, Button } from '@material-ui/core';

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

    // React hook state variable - Dimensions
    const [image, setImage] = React.useState(null);

    // React hook state variable - Prediction
    const [prediction, setPrediction] = React.useState("No Prediction")

    // Function to update the Dimensions state upon slider value change
    const handleFileSelect = event => {
        setImage(event.target.files[0])
    };

    // Function to make the predict API call and update the state variable - Prediction 
    const handlePredict = event => {
        //const formData = new FormData();

        //formData.append("file", image, image.name);

        console.log(props.token)

        //Axios variables required to call the predict API
        let headers = { 'Authorization': `Token ${token}` };
        let url = settings.API_SERVER + '/api/predict/';
        let method = 'post';
        let predictionData = new FormData();
        predictionData.append("image", image);
        let config = { headers, method, url, data: predictionData };

        //Axios predict API call
        axios(config).then(
            res => {setPrediction(res.data["Predicted Object"])
            }).catch(
                error => {alert(error)}
                )

        return (
            <div>
                <h2>File Details:</h2>
                    <p>File Name: {image.name}</p>             
                    <p>File Type: {image.type}</p>
            </div>
        );
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed className={classes.container}>
                


            <div>
                <input type="file" onChange={handleFileSelect} />
                <button onClick={handlePredict}>
                  Upload!
                </button>
                {prediction}
            </div>

            

            </Container>
        </React.Fragment>
    )
}

export default Home