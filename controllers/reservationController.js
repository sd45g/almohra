// controllers/reservationController.js
const Reservation = require('../models/Reservation');

// Create a new reservation
exports.createReservation = async (req, res) => {
    try {
        const { customerName, customerPhone, decoration_id, classification, numberOfChairs, bookingDate, user_id, price } = req.body;

        const newReservation = new Reservation({
            customerName,
            customerPhone,
            decoration_id,
            classification,
            numberOfChairs,
            bookingDate,
            user_id,
            price,
            status: price === 0 ? 'temporary' : 'confirmed' // تحديد الحالة بناءً على المدفوعات
        });

        await newReservation.save();

        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create reservation', error });
    }
};

// Get all reservations
exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find()
            .populate('decoration_id', 'name')
            .populate('user_id', 'name');
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve reservations', error });
    }
};

// Get a specific reservation by ID
exports.getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id)
            .populate('decoration_id', 'name')
            .populate('user_id', 'name');
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve reservation', error });
    }
};

// Update a reservation by ID
exports.updateReservation = async (req, res) => {
    try {
        const { customerName, customerPhone, decoration_id, classification, numberOfChairs, bookingDate, price, status } = req.body;

        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { customerName, customerPhone, decoration_id, classification, numberOfChairs, bookingDate, price, status },
            { new: true }
        );

        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }

        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update reservation', error });
    }
};

// Delete a reservation by ID
exports.deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete reservation', error });
    }
};
