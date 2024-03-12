import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Willkommen ');
});

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