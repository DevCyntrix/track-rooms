import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Booking } from './models/bookingModel.js';
import { Room } from './models/roomModel.js';
import bookingsRoute from './routes/bookingsRoute.js';
import roomsRoute from './routes/roomsRoute.js'
import cors from 'cors'

const app = express();

app.use(express.json());

app.use(cors());

app.use(
    cors({
        origin: 'localhost:3000',
        methods:['GET', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Willkommen to the backend');
});

app.use('/bookings', bookingsRoute)
app.use('/rooms', roomsRoute)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
          });
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err);
    });