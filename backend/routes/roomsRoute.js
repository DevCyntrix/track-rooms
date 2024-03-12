import express from 'express';
import { Room } from '../models/roomModel.js';

const router = express.Router();

// create a new room
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.roomID ||
            !req.body.building ||
            !req.body.floor
        ) {
            return res.status(400).send({ message: 'Room details are incomplete' });
        }
        const newRoom = {
            roomID: req.body.roomID,
            building: req.body.building,
            floor: req.body.floor,
        };

        const room = await Room.create(newRoom);
        return res.status(201).send(room);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
});

// Get all rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find({});
        return res.status(200).json(rooms);
    }  catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
});

// Delete a room
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Room.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.status(200).send({ message: 'Room deleted successfully' });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
});

export default router;