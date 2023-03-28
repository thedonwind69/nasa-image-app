import mongoose from "mongoose";
const {Schema} = mongoose;

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unavailableDates: {
        type: Array,
        required: true,
        default: []
    },
    hotelId: {
        type: Schema.Types.ObjectId,
        ref: "Hotel"
    }

}, {timestamps: true})

export default mongoose.model("Room", RoomSchema);