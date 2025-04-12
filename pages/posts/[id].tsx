import { useRouter } from 'next/router';
import { useGetPostsQuery } from '../../features/posts/postsApi';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';
import Link from 'next/link';
import { format } from 'date-fns';

export default function PostDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data: posts = [], isLoading, error } = useGetPostsQuery();

  const post = posts.find((p) => p.id === Number(id));

  const getRandomDate = (id: number) => {
    const now = new Date();
    const randomDaysAgo = id * 3;
    return format(new Date(now.setDate(now.getDate() - randomDaysAgo)), 'PPP');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !post) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          Post not found.
        </Typography>
      </Container>
    );
  }

  return (
    <>
      {/* Menu bar */}
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">My Blog</Typography>
          <Box>
            <Link href="/" passHref>
              <Button color="inherit">Home</Button>
            </Link>
            <Link href="/add-post" passHref>
              <Button color="inherit">Add Post</Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Card sx={{ maxWidth: '100%', mb: 4 }} elevation={3}>
          <CardMedia
            component="img"
            height="400"
            image={`https://picsum.photos/seed/${post.id}/1200/400`}
            alt="Post image"
          />
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {post.title}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontStyle: 'italic' }}>
                By {typeof post.userId === 'string' ? post.userId : `User ${post.userId}`}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                • {getRandomDate(post.id)}
              </Typography>
            </Stack>

            <Typography variant="body1" paragraph sx={{ whiteSpace: 'pre-line' }}>
              {post.body}
            </Typography>

            <Link href="/" passHref>
              <Button variant="contained" color="primary">
                Back to Posts
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', py: 3, backgroundColor: '#f0f0f0' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} My Blog. Built with ❤️ by Hasna.
        </Typography>
      </Box>
    </>
  );
}
