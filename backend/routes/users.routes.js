import express from 'express';
import { getAllUsers, createUser, updateUser } from '../api/users.api.js';

const router = express.Router();

// GET /users - Get all users
router.get('/getAllUsers', getAllUsers);

// POST /users - Create a new user
router.post('/createUser', createUser);

// PATCH /users/:id - Update user preferences
router.patch('/updateUser/:email', updateUser);

// DELETE /users/:id - Delete a user
// router.delete('/:id', deleteUser);

export default router;
