import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { postFreelance } from "../../../Redux/actions/freelanceAction";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "./style.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddEditFreelance = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  // Handling file input change

  // Adding new freelance
  const [newfreelance, setNewfreelance] = useState({
    photo: "",
    firstName: "",
    lastName: "",
    slogan: "",
    email: "",
    place: "",
    phone: "",
    price: "",
    expriance: "",
    availability: "",
    competence: "",
    rating: "",
    shortBio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewfreelance((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  const handleRatingChange = (newValue) => {
    setNewfreelance((prevFormData) => ({
      ...prevFormData,
      rating: newValue,
    }));
  };
  // console.log(newfreelance);
  const [selectedFile, setSelectedFile] = useState("");
  const handleUpload = async (callback) => {
    if (!selectedFile) {
      alert("Please upload an image first!");
      return;
    }

    const storageRef = ref(storage, `/files/${selectedFile.name + v4()}`);
    try {
      const snapshot = await uploadBytes(storageRef, selectedFile);
      // Construire l'URL de téléchargement manuellement
      const downloadURL = `https://storage.googleapis.com/${storageRef.bucket}/${snapshot.ref.fullPath}`;
      callback(downloadURL); // Appel de la fonction de rappel avec l'URL de téléchargement
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddFreelance = async () => {
    try {
      const imageUrl = await new Promise((resolve, reject) => {
        handleUpload(resolve, reject); // Passer les fonctions de résolution et de rejet à handleUpload
      });
      console.log(imageUrl);
      // Mettre à jour freelance.photo avec l'URL de téléchargement
      setNewfreelance((prevFormData) => ({
        ...prevFormData,
        photo: imageUrl,
      }));

      // Envoyer les données à la base de données
      dispatch(postFreelance(newfreelance));

      // Fermer le formulaire
      onClose();
    } catch (error) {
      console.error("Error adding freelance:", error);
    }
  };
  // Edit
  const reducerFreelance = useSelector(
    (state) => state.freelanceReducer.onefreelance
  );
  console.log(reducerFreelance);
  const edit = useSelector((state) => state.editReducer.edit);
  useEffect(() => {
    edit
      ? setNewfreelance(reducerFreelance)
      : setNewfreelance({
          photo: "",
          firstName: "",
          lastName: "",
          slogan: "",
          email: "",
          place: "",
          phone: "",
          price: "",
          expriance: "",
          availability: "",
          competence: "",
          rating: "",
          shortBio: "",
        });
  }, [reducerFreelance, edit]);
  if (!isOpen) return null;
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            className="addTitle"
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            <h1>ADD Freelancer</h1>
          </Typography>

          <img
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #A8DADC",
              float: "right",
              marginTop: "-50px",
            }}
            src={selectedFile ? URL.createObjectURL(selectedFile) : ""}
            alt=""
          />

          <input type="file" onChange={handleFileChange} />

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              id="standard-basic"
              label="First Name"
              required
              variant="standard"
              name="firstName"
              value={newfreelance.firstName}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Last Name"
              required
              variant="standard"
              name="lastName"
              value={newfreelance.lastName}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Slogan"
              required
              variant="standard"
              name="slogan"
              value={newfreelance.slogan}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Email"
              required
              variant="standard"
              name="email"
              value={newfreelance.email}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Place"
              required
              variant="standard"
              name="place"
              value={newfreelance.place}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Phone"
              required
              variant="standard"
              name="phone"
              value={newfreelance.phone}
              onChange={handleChange}
            />
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              className="styleSelect"
            >
              <InputLabel id="demo-simple-select-standard-label" required>
                Expriance
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={newfreelance.expriance}
                onChange={handleChange}
                name="expriance"
              >
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Intermediary">Intermediary</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
                <MenuItem value="Expert">Expert</MenuItem>
              </Select>
            </FormControl>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              className="styleSelect"
            >
              <InputLabel id="demo-simple-select-standard-label" required>
                Availability
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={newfreelance.availability}
                onChange={handleChange}
                label="availability"
                name="availability"
              >
                <MenuItem value="1day/week">1day/week</MenuItem>
                <MenuItem value="2day/week">2day/week</MenuItem>
                <MenuItem value="3day/week">3day/week</MenuItem>
                <MenuItem value="4day/week">4day/week</MenuItem>
                <MenuItem value="5day/week">5day/week</MenuItem>
                <MenuItem value="6day/week">6day/week</MenuItem>
                <MenuItem value="7day/week">7day/week</MenuItem>
              </Select>
            </FormControl>

            <TextField
              id="standard-basic"
              label="Competence"
              required
              variant="standard"
              name="competence"
              value={newfreelance.competence}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Price"
              variant="standard"
              required
              name="price"
              value={newfreelance.price}
              onChange={handleChange}
            />

            <TextField
              id="standard-multiline-static"
              label="ShortBio"
              multiline
              rows={4}
              variant="standard"
              name="shortBio"
              value={newfreelance.shortBio}
              required
              onChange={handleChange}
            />
            <Typography component="legend">Rating</Typography>

            <Rating
              name="rating"
              value={newfreelance.rating}
              onChange={(e, newValue) => {
                handleRatingChange(newValue);
              }}
            />
          </Typography>
          <div className="btn_ModalAdd">
            <Button
              variant="contained"
              className="btnAddFree"
              onClick={handleAddFreelance}
            >
              Add New
            </Button>
            <Button
              variant="contained"
              className="btnAddFree"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AddEditFreelance;
