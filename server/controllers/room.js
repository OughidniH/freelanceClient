import Room from "../models/Room.js";
import tryCatch from "./utils/tryCatch.js";

export const createRoom = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;

  // Extract relevant details from the request body
  const {
    type,
    lng,
    lat,
    price,
    title,
    description,
    images,
    costType, // New field
    propertyType, // New field
    numberOfRooms, // New field
    surfaceArea, // New field
    facilities, // New field
  } = req.body;

  // Validate and save the room details
  const newRoom = new Room({
    uid,
    uName,
    uPhoto,
    type,
    lng,
    lat,
    price,
    title,
    description,
    images,
    costType,
    propertyType,
    numberOfRooms,
    surfaceArea,
    facilities,
  });

  try {
    // Validate and save the room
    await newRoom.validate();
    await newRoom.save();

    res.status(201).json({ success: true, result: newRoom });
  } catch (error) {
    // Handle validation errors
    res.status(400).json({ success: false, message: error.message });
  }
});

export const getRooms = tryCatch(async (req, res) => {
  const rooms = await Room.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: rooms });
});

export const deleteRoom = tryCatch(async (req, res) => {
  const { _id } = await Room.findByIdAndDelete(req.params.roomId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateRoom = tryCatch(async (req, res) => {
  const updatedRoom = await Room.findByIdAndUpdate(
    req.params.roomId,
    req.body,
    { new: true }
  );
  res.status(200).json({ success: true, result: updatedRoom });
});

/*
import Room from "../models/Room.js";
import tryCatch from "./utils/tryCatch.js";

export const createRoom = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;

  // Extract relevant details from the request body
  const { type, lng, lat, price, title, description, images } = req.body;

  // Validate and save the room details
  const newRoom = new Room({
    uid,
    uName,
    uPhoto,
    type,
    lng,
    lat,
    price,
    title,
    description,
    images,
  });

  try {
    // Validate and save the room
    await newRoom.validate();
    await newRoom.save();

    res.status(201).json({ success: true, result: newRoom });
  } catch (error) {
    // Handle validation errors
    res.status(400).json({ success: false, message: error.message });
  }
});

export const createRoom1 = tryCatch(async (req, res) => {
  const { id: uid, name: uName, photoURL: uPhoto } = req.user;

  const newRoom = new Room({ uid, uName, uPhoto });
  await newRoom.save();
  res.status(201).json({ success: true, result: newRoom });
});

export const getRooms = tryCatch(async (req, res) => {
  const rooms = await Room.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: rooms });
});

export const deleteRoom = tryCatch(async (req, res) => {
  const { _id } = await Room.findByIdAndDelete(req.params.roomId);
  res.status(200).json({ success: true, result: { _id } });
});

export const updateRoom = tryCatch(async (req, res) => {
  const updatedRoom = await Room.findByIdAndUpdate(
    req.params.roomId,
    req.body,
    { new: true }
  );
  res.status(200).json({ success: true, result: updatedRoom });
});
*/
