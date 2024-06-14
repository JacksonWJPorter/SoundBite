import React from 'react';
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import {format} from 'date-fns';
const serverURL = "";

const theme = createTheme({
    palette: {
      background: {
        default: '#3388ff',
      },
      text: {
        primary: '#3388ff',
      },
      primary: {
        main: '#33ccff',
      },
      secondary: {
        main: '#b552f7',
      },
    },
  });


const ChatGPT = () => {
  const [contents, setContents] = React.useState("");
  const [soundbiteID, setSoundbiteID] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [date_created, setDate_Created] = React.useState("")
  const [userID, setUserID] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("An Error occured");

  //Sets the states 
  const handleCreateSoundBite = () => {
    var today = format(new Date(), 'yyyy-MM-dd hh:mm:ss');
    console.log(today);
    setTitle("Test Title");       //need a front end to get input for title
    setDate_Created(today);
    setUserID(1);
    setContents("Test contents");
  }

  const handleStoreSoundBite = () => {
    callApiStoreSoundBite();
  }

  const callApiStoreSoundBite = async () => {
    const url = serverURL + "/api/StoreSoundBite";
    const response = await fetch(url, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: contents,
        title: title,
        date_created: date_created,
        userID: userID
      })
    });
  }

    return (
        <div>
        <MuiThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar>
                <Button color="inherit" onClick={() => history.push('/')} > Home </Button>
                <Button color="inherit" onClick={() => history.push('/ChatGPT')} > ChatGPT </Button>
            </Toolbar>
            </AppBar>
            </Box>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3" color="inherit" noWrap style={{"margin-top": "25px", "margin-left": "25px"}}>
                    <b>ChatGPT</b> 
                </Typography>
                <Typography variant="h5" color="inherit" noWrap style={{"margin-top": "25px", "margin-left": "25px"}}>
                    This is a page for testing the ChatGPT API
                </Typography>
            </Grid>
              <Button color="inherit" onClick={handleCreateSoundBite} > Create a soundbite </Button>
              <Button color="inherit" onClick={handleStoreSoundBite} > Save a soundbite </Button>
            </Grid>
        </MuiThemeProvider>
        </div>
    );
}
export default ChatGPT