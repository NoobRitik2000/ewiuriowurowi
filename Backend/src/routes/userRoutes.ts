// backend/routes/userRoutes.ts
import { Router } from 'express';
import {
    loginUser,
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    addLibrarian
} from '../controllers/userController';
// import { authenticateToken } from '../middlewares/authMiddleware';

const router: Router = Router();
// User login route
router.post('/login', loginUser);
router.post('/signup', createUser); // Create a new user
router.get('/users', getAllUsers); // Get all users
router.put('/users/:id', updateUser); // Update user by ID
router.delete('/users/:id', deleteUser); // Delete user by ID
router.post('/librarians', addLibrarian);

export default router;
