import express from 'express';
import { Booking } from '../models/bookingModel.js';

const router = express.Router();

// create a new booking
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.bookingStartDate ||
            !req.body.bookingEndDate ||
            !req.body.roomId
        ) {
            return res.status(400).send({ message: 'Booking details are incomplete' });
        }
        const newBooking = {
            bookingStartDate: req.body.bookingStartDate,
            bookingEndDate: req.body.bookingEndDate,
            roomId: req.body.roomId,
        };

        const booking = await Booking.create(newBooking);
        return res.status(201).send(booking);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
});

// Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find({});
        return res.status(200).json(bookings);
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Booking.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        return res.status(200).send({ message: 'Booking deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
});

export default router;