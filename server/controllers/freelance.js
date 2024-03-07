import Freelance from "../models/Freelance.js";
import tryCatch from "./utils/tryCatch.js";

export const postFreelance = tryCatch(async (req, res) => {
  const {
    firstName: firstName,
    lastName: lastName,
    photo: photo,
    slogan: slogan,
    email: email,
    place: place,
    shortBio: shortBio,
    priceHour: priceHour,
    phone: phone,
    rating: rating,
    exprience: exprience,
    availability: availability,
    competence: competence,
  } = req.body;
  // test if freelance has a firstNameame
  if (!firstName) {
    res.status(400).send({ message: "firstName is required" });
    return;
  }
  // test if freelance has a lastName
  if (!lastName) {
    res.status(400).json({ message: "lastName is required" });
    return;
  }
  // test if freelance has a Email
  if (!email) {
    res.status(400).send({ message: "Email is required" });
    return;
  }
  // test if the email already exists
  const existingfreelance = await Freelance.findOne({
    email: email.toLowerCase(),
  });
  if (existingfreelance) {
    res.status(400).json({ message: "freelance already exists" });
    return;
  }
  // Create new Freelance instance
  const newFreelance = new Freelance({
    firstName,
    lastName,
    photo,
    slogan,
    email: email.toLowerCase(), // Normalize email to lowercase
    place,
    shortBio,
    priceHour,
    phone,
    rating,
    exprience,
    availability,
    competence,
  });
  try {
    // save Freelance
    await newFreelance.validate();
    await newFreelance.save();
    res.status(201).send({
      message: "Freelance created successfully",
      Freelance: newFreelance,
    });
  } catch (error) {
    res.status(500).send({ message: "server Error" });
    console.log(error);
  }
});

export const getFreelances = tryCatch(async (req, res) => {
  const freelances = await Freelance.find().sort({
    updateAy: -1,
    createAt: -1,
  });
  // const freelances = await Freelance.find();
  // console.log(freelances);
  res.status(200).send({ freelances });
});

export const getOneFreelance = tryCatch(async (req, res) => {
  const oneFreelance = await Freelance.findById(req.params.id);
  // const oneFreelance = await Freelance.findOne({ _id: req.params.id });
  if (!oneFreelance) {
    return res.status(404).send({ message: "Freelance not found" });
  }
  res.status(200).send({ oneFreelance });
  console.log(oneFreelance);
});

export const updateFreelance = tryCatch(async (req, res) => {
  const {
    firstName,
    lastName,
    photo,
    slogan,
    email: place,
    shortBio,
    priceHour,
    phone,
    rating,
    exprience,
    availability,
    competence,
  } = req.body;
  let freelance = await Freelance.findById(req.params.id);
  if (!freelance) {
    return res.status(404).send({ message: "Freelance not found" });
  }

  freelance.firstName = firstName || freelance.firstName;
  freelance.lastName = lastName || freelance.lastName;
  freelance.photo = photo || freelance.photo;
  freelance.slogan = slogan || freelance.slogan;
  freelance.email = email || freelance.email;
  freelance.place = place || freelance.place;
  freelance.shortBio = shortBio || freelance.shortBio;
  freelance.priceHour = priceHour || freelance.priceHour;
  freelance.phone = phone || freelance.phone;
  freelance.rating = rating || freelance.rating;
  freelance.exprience = exprience || freelance.exprience;
  freelance.availability = availability || freelance.availability;
  freelance.competence = competence || freelance.competence;

  freelance = await freelance.save();
  res.status(200).send({ message: "Freelance updated successfully" });
});

export const deleteFreelance = tryCatch(async (req, res) => {
  const freelanceId = await Freelance.findById(req.params.id);
  if (!freelanceId) {
    return res.status(404).send({ message: "freelance not found" });
  }
  await freelanceId.deleteOne({ _id: freelanceId._id });
  res.status(200).send({ message: "Freelance deleted successfully" });
});
