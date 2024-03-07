import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFreelance,
  deleteFreelance,
  // getFreelance,
  // getFreelance,
  getFreelances,
  postFreelance,
  // patchFreelance,
  // postFreelance,
} from "../../../Redux/actions/freelanceAction";
import MaterialTable from "material-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import img from "./Images/avatarIcon.png";
import { Link } from "react-router-dom";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import "../freelances/style.css";

const DashFreeList = ({ freelance }) => {
  // Fetching data and handling state

  const freelances = useSelector((state) => state.freelanceReducer.freelances);

  console.log(freelances);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFreelances());
  }, [dispatch]);

  // Table columns configuration

  const columns = [
    {
      title: "Photo",
      field: "photo",
      render: (rowData) => (
        <img
          src={selectedFile.name}
          style={{ width: 50, height: 50, borderRadius: "50%" }}
          alt="Avatar"
        />
      ),
    },
    {
      title: "First Name",
      field: "firstName",
      validate: (rowData) =>
        rowData.firstName === undefined || rowData === "" ? "Required" : true,
    },
    {
      title: "Last Name",
      field: "lastName",
      validate: (rowData) =>
        rowData.lastName === undefined || rowData === "" ? "Required" : true,
    },

    {
      title: "Email",
      field: "email",
      validate: (rowData) =>
        rowData.email === undefined || rowData === "" ? "Required" : true,
    },
    {
      title: "Place",
      field: "place",
      validate: (rowData) =>
        rowData.place === undefined || rowData === "" ? "Required" : true,
    },
    {
      title: "Phone",
      field: "phone",
      validate: (rowData) =>
        rowData.phone === undefined || rowData === "" ? "Required" : true,
    },
    {
      title: "Expriance",
      field: "expriance",
      validate: (rowData) =>
        rowData.expriance === undefined || rowData === "" ? "Required" : true,
    },
    {
      title: "Competence",
      field: "competence",
      validate: (rowData) =>
        rowData.competence === undefined || rowData === "" ? "Required" : true,
    },
    {
      title: "Rating",
      field: "rating",
      validate: (rowData) =>
        rowData.rating === undefined || rowData === "" ? "Required" : true,
    },
  ];
  // Modal styles and state
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

  const styleDelete = {
    position: "absolute",
    top: "50% !important",
    left: "50% !important",
    transform: "translate(-50%, -50%)",
    width: 480,
    bgcolor: "background.paper",
    borderRadius: "25px",
    boxShadow: 24,
    p: 4,
    padding: " 15px !important",
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  // Handling file input change
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Please upload an imae first!");
    }
    const storageRef = ref(storage, `/files/${selectedFile.name + v4()}`);
    uploadBytes(storageRef, selectedFile);
    console.log(selectedFile.name);
  };

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

  const handleAddFreelance = async () => {
    const imageUrl = await handleUpload();
    setNewfreelance((prevFormData) => ({
      ...prevFormData,
      photo: imageUrl,
    }));
    dispatch(postFreelance(newfreelance));
    handleClose();
  };

  // const freelance = useSelector((state) => state.freelanceReducer.freelance);

  const handleFreelance = (id) => {
    dispatch(getFreelance(id));
  };

  return (
    <>
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          title="Freelancers Manager"
          columns={columns}
          data={freelances}
          options={{
            search: true,
            exportButton: true,
            selection: false,
            columnsButton: true,
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          actions={[
            {
              icon: () => (
                <IconButton>
                  <AddBoxIcon />
                </IconButton>
              ),
              tooltip: "Add Freelance",
              isFreeAction: true,
              onClick: (newFreelance) => {
                handleOpen();

                dispatch(postFreelance(newFreelance));
              },
            },
            {
              icon: () => (
               <Link to={"/profile/addFreelacnce"}>
                 <IconButton>
                   <EditIcon style={{ color: "blue", opacity: "0.6" }} />
                 </IconButton>
               </Link>
              ),
              tooltip: "Edit Freelance",
              onClick: () => {},
            },
            {
              icon: (freelance) => (
                <Link to={`/profile/${freelance._id}`}>
                  <IconButton onClick={() => handleFreelance(freelance._id)}>
                    <VisibilityIcon
                      style={{ color: "green", opacity: "0.6" }}
                    />
                  </IconButton>
                </Link>
              ),
              tooltip: "Edit Freelance",
            },
            {
              icon: () => (
                <IconButton>
                  <DeleteIcon style={{ color: "red", opacity: "0.6" }} />
                </IconButton>
              ),
              tooltip: "Delete Freelance",
              onClick: () => {
                handleOpenDelete();
              },
            },
          ]}
        />
      </div>
      {/* ******************************************MODAL-Delete******************************************************* */}
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleDelete}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            <DeleteIcon /> Delete !
            <div className="divider" style={{ margin: "10px" }}></div>
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this row?
          </Typography>

          <div style={{ float: "right", marginBottom: 5 }}>
            <Button
              variant="outlined"
              color="success"
              style={{ margin: 10 }}
              onClick={handleCloseDelete}
            >
              No
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => dispatch(deleteFreelance(freelance.id))}
            >
              Delete!
            </Button>
          </div>
        </Box>
      </Modal>

      {/* ******************************************MODAL-ADD-EDIT******************************************************* */}
      <Modal
        open={open}
        onClose={handleClose}
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
            src={selectedFile.name}
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
            <Button
              variant="contained"
              className="btnAddFree"
              onClick={handleAddFreelance}
            >
              Add Freelancer
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default DashFreeList;
