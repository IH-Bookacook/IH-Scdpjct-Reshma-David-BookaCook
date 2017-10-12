const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const STATUS = ["Pending", "Done"];

const bookingSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  cook: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  numberOfPeople: { type: String, required: true },
  specRequirements: { type: String },
  price: { type: String },
  status: {
    type: String,
    enum: STATUS,
    default: "Pending"
  },
  review: { type: String }
});

bookingSchema.set("timestamps", true);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
