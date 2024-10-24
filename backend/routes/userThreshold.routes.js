import express from 'express';
import { createThreshold } from '../api/userThreshold.api.js'; // Import the API functions

const router = express.Router();

// Route to create a new user threshold
router.post('/createThreshold', createThreshold);

export default router;
