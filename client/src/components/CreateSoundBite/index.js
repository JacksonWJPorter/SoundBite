import React from 'react';
import useState from 'react';
import Typography from "@material-ui/core/Typography";
import history from '../Navigation/history';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";
import { Configuration, OpenAIApi } from "openai";
import { env } from 'process';
import {format} from 'date-fns';

const serverURL = ""

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

const SoundBiteTitle = (props) =>  {
  const handleChange = (event) => {
    props.setTitleChoice(event.target.value);
  };
  return(
    <form>
      <TextField style={{"margin-top": "25px", "margin-left": "25px"}} id = "standard-basic" label = "SoundBite Title" onChange = {handleChange}> </TextField>
    </form>
  )
}

const SoundBitePrompt = (props) => {
  const handleChange = (event) => {
    props.setPromptChoice(event.target.value);
  };
  return(
    <form>
        <TextField id="outlined-basic" label="Input bite to summarize" variant="outlined" multiline defaultValue = "" onChange = {handleChange} rows={10} style={{"width": "750px", "margin-top": "25px", "margin-left": "25px"}} />   
    </form>
  )
}

                  
function CreateSoundBite() {

  const [response, setResponse] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [contents, setContents] = React.useState("");
  const [soundbiteID, setSoundbiteID] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [date_created, setDate_Created] = React.useState("")
  const [userID, setUserID] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("Please fill all fields");
  const [showForm, setShowForm] = React.useState(false);

  const callChatgptApi = async () => {

    const url = serverURL + '/api/chatGPT';

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //authorization: `Bearer ${this.state.token}`
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    setResponse(body.message)
  }
  
    const handleStoreSoundBite = () => {
      callApiStoreSoundBite();
    }
  
    const callApiStoreSoundBite = async () => {
      const url = serverURL + "/api/StoreSoundBite";
      const res = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: response,
          title: title,
          date_created: date_created,
          userID: userID
        })
      });
    }

    const handleClickForm = () => {
      setShowForm(true)
    }
      
    return (    
      <div>
        <MuiThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar>
                <Button color="inherit" onClick={() => history.push('/')} > Home </Button>
                <Button color="inherit" onClick={() => history.push('/CreateSoundBite')} > SoundBite Generator  </Button>
            </Toolbar>
            </AppBar>
            </Box>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h3" color="inherit" noWrap style={{"margin-top": "25px", "margin-left": "25px"}}>
                    <b>SoundBite Generator</b> 
                </Typography>
                <Typography variant="h5" color="inherit" noWrap style={{"margin-top": "25px", "margin-left": "25px"}}>
                    This is a page for testing the ChatGPT API
                </Typography>
                {
                  showForm
                  ? <> 
                      <SoundBiteTitle setTitleChoice = {setTitle}/>
                      <SoundBitePrompt setPromptChoice = {setPrompt}/>
                      <Button variant= "contained" onClick={callChatgptApi} style={{"margin-top": "25px", "margin-left": "25px"}}>Generate SoundBite</Button>
                      <Typography style={{"margin-top": "25px", "margin-left": "25px"}}>
                        <b><u>{title}</u></b> <br></br>
                        {response} 
                      </Typography>
                      <Button variant="contained" color="inherit" onClick={handleStoreSoundBite} style={{"margin-top": "25px", "margin-left": "25px"}} > Save Soundbite </Button>
                    </>
                  : <Button variant="contained" color="inherit" onClick={handleClickForm} style={{"margin-top": "25px", "margin-left": "25px"}}> Create a soundbite </Button>
                }
            </Grid>
            </Grid>
        </MuiThemeProvider>
      </div>
    );
}
export default CreateSoundBite