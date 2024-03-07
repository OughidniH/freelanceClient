import React, { useEffect, useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import Freelance from "./Freelance";
import { useDispatch, useSelector } from "react-redux";
import { getFreelances } from "../../../Redux/actions/freelanceAction";
import "./style.css";
import AddEditFreelance from "./AddEditFreelance";
import { toggleFalse } from "../../../Redux/actions/editActions";

const ListFreelances = ({user}) => {
  const freelances = useSelector((state) => state.freelanceReducer.freelances);
  console.log(freelances)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFreelances());
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const openModalAdd = () => {
    setOpen(true);
  };
  const closeModalAdd = () => {
    setOpen(false);
  };

  return (
    <>
      <section className="list_section">
        <div className="table">
          <div className="table_header">
            <h2> Manage Freelances </h2>
            <div>
              <input placeholder="fleelance" />
              <button className="add_new" onClick={() =>{dispatch(toggleFalse()) ;openModalAdd()} }>
                + Add New
              </button>
              {open && (
                <AddEditFreelance isOpen={open} onClose={closeModalAdd} />
              )}
            </div>
          </div>
          <div className="table_section">
            <table>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Competence</th>
                  <th>Experience</th>
                  <th>Place</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {freelances.length > 0 &&
                  freelances.map((freelance) => (
                    <Freelance freelance={freelance} key={freelance._id} user={user} />
                  ))}
              </tbody>
            </table>
            <div className="pagination">
              <div>
                {" "}
                <KeyboardDoubleArrowLeftIcon />
              </div>
              <div>
                {" "}
                <ArrowBackIosIcon />
              </div>
              <div>1</div>
              <div> 2</div>
              <div>
                {" "}
                <ArrowForwardIosIcon />
              </div>
              <div>
                {" "}
                <KeyboardDoubleArrowRightIcon />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListFreelances;
