import express from 'express';

import {getAllFlights,AdminFlights } from '../controllers/flightController.js';



const router = express.Router();

// GET /api/flights
router.get('/', getAllFlights);
router.post('/admin', AdminFlights); 

export default router;