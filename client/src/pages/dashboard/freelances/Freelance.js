import React, { useState } from "react";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
// import img from "./Images/images.jpg";
import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getFreelance } from "../../../Redux/actions/freelanceAction";
import { Link } from "react-router-dom";
import { deleteFreelance } from "../../../Redux/actions/freelanceAction";
import { toggleTrue } from "../../../Redux/actions/editActions";
import AddEditFreelance from "./AddEditFreelance";
// import { useDispatch } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Freelance = ({ freelance }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const handleFreelance = () => {
    dispatch(getFreelance(freelance._id));
  };
  console.log(freelance.photo);

  const [openModal, setOpenModal] = useState(false);
  const openModalAdd = () => {
    setOpenModal(true);
  };
  const closeModalAdd = () => {
    setOpenModal(false);
  };
  // const user = useSelector((state) => state.freelanceReducer.user);
 
   return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You sure you want to delete this freelance?
          </Typography>
          <div style={{ float: "right", paddingTop: "10px" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              className="btn-delete"
              onClick={() => dispatch(deleteFreelance(freelance._id))}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
      <tr>
        <td>
          <img src={freelance.photo} alt="" />
        </td>
        <td>
          {freelance.lastName} {freelance.firstName}
        </td>
        <td>{freelance.competence}</td>
        <td>{freelance.experience}</td>
        <td>{freelance.place}</td>
        <td>{freelance.price}</td>
        <td>
          <Link to={`/freelances/${freelance._id}`}>
            <button onClick={handleFreelance()}>
              <PreviewIcon />
            </button>
          </Link>
          <button
            onClick={() => {
              openModalAdd();
              dispatch(getFreelance(freelance._id));
              dispatch(toggleTrue());
            }}
          >
            <EditNoteOutlinedIcon />
          </button>
          {openModal && (
            <AddEditFreelance isOpen={openModal} onClose={closeModalAdd} />
          )}
          <button>
            <DeleteIcon onClick={handleOpen} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default Freelance;
