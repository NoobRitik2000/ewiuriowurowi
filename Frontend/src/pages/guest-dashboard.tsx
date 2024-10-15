import { useState } from 'react';
import { Box, Typography, TextField, Button, Container, CircularProgress, Grid, Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { fetchBooks } from '../pages/api/api'; // Import the API function

const GuestDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bookDetails, setBookDetails] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setBookDetails([]);

    try {
      const response = await fetchBooks(searchQuery);

      // Only update book details if there are results
      if (response.data && response.data.length > 0) {
        setBookDetails(response.data);
      } else {
        setError('No books found');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleOpenDialog = (book: any) => {
    setSelectedBook(book);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5, position: 'relative' }}>
      <Typography variant="h4" gutterBottom>
        Guest User Dashboard
      </Typography>
      <Typography variant="h6" gutterBottom>
        Book Search
      </Typography>
      <TextField
        label="Search for books"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
        Search
      </Button>

      {error && (
        <Typography color="error" mt={2}>{error}</Typography>
      )}

      {/* Loading Overlay */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(255, 255, 255, 0.9)', // More opaque white background
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <CircularProgress sx={{ color: 'primary.main', mb: 2 }} size={60} />
          <Typography variant="h6" color="primary">
            Loading...
          </Typography>
        </Box>
      )}

      <Grid container spacing={4} mt={4}>
        {bookDetails.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.book_id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" gutterBottom>{book.title}</Typography>
                <Typography variant="subtitle1">Author: {book.author}</Typography>
                {book.cover_image_url && (
                  <Box sx={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                )}
                {/* Button to open dialog */}
                <Button
                  variant="outlined"
                  sx={{ mt: 2 }}
                  onClick={() => handleOpenDialog(book)}
                >
                  See Book Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Book Details */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedBook?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Author: {selectedBook?.author}</Typography>
          {selectedBook?.cover_image_url && (
            <Box sx={{ height: '200px', overflow: 'hidden', mb: 2 }}>
              <img
                src={selectedBook.cover_image_url}
                alt={selectedBook.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          )}
          <Typography variant="body1">Description: {selectedBook?.description || 'No description available.'}</Typography>
          <Typography variant="body2">Available Copies: {selectedBook?.available_copies}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* See More Button */}
      {bookDetails.length > 0 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="outlined" color="primary">
            See More
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default GuestDashboard;
