import mongoose from "mongoose";

const roomSchema = mongoose.Schema(
  {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
    price: { type: Number, min: 0, max: 50000000000, default: 0 },
    type: { type: String, required: true },
    title: { type: String, required: true, minLength: 5, maxLength: 150 },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    images: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    uid: { type: String, required: true },
    uName: { type: String, required: true },
    uPhoto: { type: String, default: "" },
    costType: { type: String }, // New field for costType
    propertyType: { type: String }, // New field for propertyType
    numberOfRooms: { type: Number }, // New field for numberOfRooms
    surfaceArea: { type: Number }, // New field for surfaceArea
    facilities: { type: Object }, // New field for facilities
  },
  { timestamps: true }
);

const Room = mongoose.model("rooms", roomSchema);

export default Room;

/*
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const roomSchema = mongoose.Schema(
  {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
    price: { type: Number, min: 0, max: 50000000000, default: 0 },
    type: { type: String, required: true },
    title: { type: String, required: true, minLength: 5, maxLength: 150 },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
    images: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    uid: { type: String, required: true },
    uName: { type: String, required: true },
    uPhoto: { type: String, default: "" },
  },
  { timestamps: true }
);

const Room = mongoose.model("rooms", roomSchema);

export default Room;
*/
