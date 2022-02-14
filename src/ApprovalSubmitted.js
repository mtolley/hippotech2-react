import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function ApprovalSubmitted() {
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
            src="hippo-back.svg"
          />
  
          <Typography variant="h5" align="center" color="text.secondary" component="p">
          You're all set! The HippoTech Hippo will review your request for approval of a mortgate agreement in principal and get back to you within 24 hours. Fingers crossed!
          </Typography>
          <br/>
          <Button 
            sx={{ fontSize: 20 }} 
            variant="contained"
            onClick={ () => navigate('/') }>
            Home
          </Button>
 
        </Grid>
      </>
    );
  }