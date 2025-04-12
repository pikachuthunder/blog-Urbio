import { useGetPostsQuery } from '../features/posts/postsApi';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Box,
  CardMedia,
  Stack,
} from '@mui/material';
import { format } from 'date-fns';

export default function Home() {
  const { data: posts = [], isLoading, error } = useGetPostsQuery();

 // getting some random dates
  const getRandomDate = (id: number) => {
    const now = new Date();
    const randomDaysAgo = id * 3;
    return format(new Date(now.setDate(now.getDate() - randomDaysAgo)), 'PPP');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            My Blog
          </Typography>
          <Box>
            <Link href="/"><Button color="inherit" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Home</Button></Link>
            <Link href="/add-post"><Button color="inherit" sx={{ fontSize: '1rem', fontWeight: 'bold' }}>Add Post</Button></Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Blog Posts
        </Typography>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Typography color="error">Failed to load posts.</Typography>}

        {!isLoading && !error && (
          <Box sx={{ maxHeight: '80vh', overflowY: 'auto', pr: 1 }}>
            <Stack spacing={3}>
              {posts.map((post) => (
                <Card
                  key={post.id}
                  sx={{
                    width: '100%',
                    backgroundColor: '#f9f9f9',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  elevation={2}
                >
                  <CardMedia
                    component="img"
                    height="100"
                    image={`https://picsum.photos/seed/${post.id}/1200/400`}
                    alt="Blog image"
                  />

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                        {post.title}
                      </Typography>

                      <Typography variant="body2" sx={{ minHeight: '60px' }}>
                        {post.body.slice(0, 100)}...
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                          By {typeof post.userId === 'string' ? post.userId : `User ${post.userId}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          • {getRandomDate(post.id)}
                        </Typography>
                      </Stack>

                      <Link href={`/posts/${post.id}`}>
                        <Button
                          size="medium"
                          variant="contained"
                          color="primary"
                          fullWidth
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            mt: 1,
                            py: 1.2,
                          }}
                        >
                          Read More
                        </Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        )}
      </Container>

      <Box sx={{ textAlign: 'center', py: 3, backgroundColor: '#f0f0f0', mt: 5 }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} My Blog. Built with ❤️ by Hasna.
        </Typography>
      </Box>
    </>
  );
}
