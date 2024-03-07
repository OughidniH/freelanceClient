import mongoose from "mongoose";

const freelanceSchema = mongoose.Schema({
  photo: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  slogan: { type: String },
  email: { type: String, required: true },
  place: { type: String, required: true },
  shortBio: { type: String },
  price: { type: String },
  phone: { type: String },
  rating: { type: Number },
  experience: {
    type: String,
    enum: ["Junior", "Intermediary", "Senior", "Expert"],

    default: "Junior",
  },
  availability: {
    type: String,
    enum: [
      "1day/week",
      "2day/week",
      "3day/week",
      "4day/week",
      "5day/week",
      "6day/week",
      "7day/week",
    ],

    default: "1day/week",
  },
  competence: { type: String },
  uid: { type: String, required: true },
  uName: { type: String, required: true },
  uPhoto: { type: String, default: "" },
});
const Freelance = mongoose.model("freelance", freelanceSchema);

export default Freelance;
