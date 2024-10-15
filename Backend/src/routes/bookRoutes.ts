// backend/routes/bookRoutes.ts
import { Router } from 'express';
import {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    fetchBooks
} from '../controllers/bookController';

const router = Router();

// Define the routes
router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
// Route to fetch books based on search criteria
router.get('/books', fetchBooks);
export default router;
