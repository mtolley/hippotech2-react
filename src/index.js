import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import HippoAppBar from './HippoAppBar';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Link as RouterLink } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import SignIn from './SignIn';
import ApprovalRequest from './ApprovalRequest';
import ApprovalSubmitted from './ApprovalSubmitted';

const theme = createTheme({
  palette: {
    primary: {
      main: "#791b89",
    },
    secondary: {
      main: blue[500],
    },
  },
});

function Home() {
  const navigate = useNavigate();

  return (
    <>      
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="top"
        style={{ minHeight: '100vh', padding: '50px' }}
      >
        <Box
          align="center"
          component="img"
          sx={{
            height: 200,
            width: 200,
            padding:5
            // maxHeight: { xs: 233, md: 167 },
            // maxWidth: { xs: 350, md: 250 },
          }}
          alt="The house from the offer."
          src="hippo-front.svg"
        />

        <Typography variant="h5" align="center" color="text.secondary" component="p">
        Don't waste your precious time filling in loads of boring old forms ... get an agreement in principle with HippoTech today!
        </Typography>
        <br/>
        <Button 
          sx={{ fontSize: 20 }} 
          variant="contained"
          onClick={ () => navigate('login') }>
          Get me a mortgage!
        </Button>
        <ArrowUpwardIcon sx={{ fontSize: 80 }} color="primary"></ArrowUpwardIcon>
      </Grid>
    </>
  );
}

function Login() {
  const navigate = useNavigate();

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="top"
        style={{ minHeight: '100vh', padding: '50px' }}
      >
        <SignIn />
      </Grid>
    </>
  );
}

function App() {
  return <ThemeProvider theme={theme}>  
    <BrowserRouter>
      <HippoAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="approval" element={<ApprovalRequest />} />
        <Route path="approvalSubmitted" element={<ApprovalSubmitted />} />
      </Routes>
      {/* <Button variant="contained">Hello World</Button> */}
    </BrowserRouter>
  </ThemeProvider>;
}

ReactDOM.render(
  <App />
, document.querySelector('#root'));