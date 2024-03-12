import mongoose from "mongoose";

const roomSchema = mongoose.Schema (
        {
            roomID: {
                type: String,
                required: true,
            },

            building: {
                type: String,
                required: true,
            },

            floor: {
                type: Number,
                required: true,
            }
        }
    );

export const Room = mongoose.model('Room', roomSchema)