
import { useState } from 'react';
import { useAddPostMutation } from '../features/posts/postsApi';
import { Container, TextField, Button, Paper, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [addPost] = useAddPostMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      body: content,
      userId: author || 'Anonymous', // userId used as author name here
    };

    await addPost(newPost);
    router.push('/');
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h5" gutterBottom>Add New Post</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            margin="normal"
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Add Post
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
    
  );
}
