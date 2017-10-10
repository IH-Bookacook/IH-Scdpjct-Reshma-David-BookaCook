const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CUISINE = ['French', 'Indian', 'Italian','Chinese', 'Lebanese','Mexican']
const EXP = ['less than 2 years', 'between 2 years and 5 years', 'between 5 years and 10 years', 'more than 10 years' ]

const userSchema = new Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
  phone: { type: String },
  address: { type: String },
  isCook: { type: Boolean, default: false },
  cookData: {
    cuisine: {
      type: String,
      enum: CUISINE,
      default: 'French'
    },
    experience: {
      type: String,
      enum: EXP,
          }
    description: {type: String},
    location: {type: String},
    availability: { type: Boolean, default: true },
  }
});

userSchema.set('timestamps', true);

const User = mongoose.model("User", userSchema);

module.exports = User;
