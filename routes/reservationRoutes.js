// routes/reservation.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

const { authMiddleware, authorizeRoles } = require('../middleware/auth');

// Apply authentication middleware
router.use(authMiddleware);

// Routes
router.post('/', authorizeRoles('admin', 'customer'), reservationController.createReservation);
router.get('/', authorizeRoles('admin', 'customer'), reservationController.getAllReservations);
router.get('/:id', authorizeRoles('admin', 'customer'), reservationController.getReservationById);
router.put('/:id', authorizeRoles('admin'), reservationController.updateReservation);
router.delete('/:id', authorizeRoles('admin'), reservationController.deleteReservation);

module.exports = router;
