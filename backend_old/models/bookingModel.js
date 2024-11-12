import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
        {
            bookingStartDate: {
                type: Date,
                required: true,
            },
            bookingEndDate: {
                type: Date,
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