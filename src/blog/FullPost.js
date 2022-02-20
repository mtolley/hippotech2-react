import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from '../Copyright';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import server from '../server.js';
import { useParams } from "react-router-dom";

const post = {
  title: 'Where next for house prices?',
  description:
    "Boiling hot house prices in the Netherlands may be a sign of things to come in rich, densely populated countries.",
  image: 'blog1.jpg',
  imageText: 'main image description',
  linkText: 'Continue reading…',
  fullText: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  comments: [
    {
      email: "joost@ns.nl",
      text: "I'm Dutch, and I just could not disagree more. So I won't!"
    },
    {
      email: "xavierb@synopsys.com",
      text: "Je suis entièrement d'accord avec ce sentiment."
    }
  ]
};

function useForceUpdate(){
  const [value, setValue] = React.useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const theme = createTheme();

export default function FullPost() {
  let params = useParams();
  let [comment, setComment]= React.useState("");
  const forceUpdate = useForceUpdate();

  console.log('render');
  const [post, setPost] = React.useState();
  React.useEffect(() => {
    async function loadData() {
      console.log(params.blogId);
      const result = await server.getBlogPostAsync(params.blogId);
      console.log(result);
      setPost(result);
    }
    loadData();
  }, [params]);

  const handleChange = (event) => {
    setComment(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    async function postComment() {
      await server.submitCommentAsync(params.blogId, data.get('comment'));
      const newPost = await server.getBlogPostAsync(params.blogId);
      console.log(newPost);
      setPost(newPost);
      forceUpdate();
    }

    // eslint-disable-next-line no-console
    console.log(data.get('comment'))
    postComment();
    setComment("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("../blog1.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        
          {
            post && <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.description}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.fullText}
            </Typography>
            <br/>
          
            {
              post.comments && post.comments.map((c, i) => <Paper key={"post"+i} elevation={2} sx={{ padding: '5px', margin: '5px' }}>
                <Typography variant="subtitle2" color="text.primary">
                  {c.email}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {c.text}
                </Typography>
              </Paper>)
            }

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="comment"
              label="Leave a comment - get involved!"
              name="comment"
              value={comment}
              onChange={handleChange}
              autoComplete="Your comment"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={handleSubmit}
            >
              Post
            </Button>
          </Box>




          </CardContent>
        </Card>
          }
      
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}