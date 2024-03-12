import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
        {
            bookingStartDate: {
                type: Number,
                required: true,
            },
            bookingEndDate: {
                type: Number,
                required: true, 
            },
            roomId: {
                type: String,
                required: true,
            },
        },
        {
            timestamps: true,
        }
    );

export const Booking = mongoose.model('Booking', bookingSchema);