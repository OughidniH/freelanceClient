import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFreelances } from "../../Redux/actions/freelanceAction";
import "./Style/FreelanceStyle.css";
import Cardfreelance from "./Cardfreelance";

const Freelance = ({ name, rating, filterAvailability, filterExperience }) => {
  const freelances = useSelector((state) => state.freelanceReducer.freelances);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFreelances());
  }, [dispatch]);

  return (
    <>
      <div className="nbrFreelance">
        {/* <h1>{freelances.length} freelances</h1> */}
      </div>
      <div className="container">
        {freelances.length === 0 ? (
          <h3>There are no freelances</h3>
        ) : (
          freelances
          .filter((freelance) =>
            freelance.firstName.toLowerCase().trim().includes(name.toLowerCase().trim()) &&
            freelance.rating >= rating &&
            (filterExperience === "" || freelance.experience === filterExperience) &&
            (filterAvailability === "" || freelance.availability === filterAvailability)
          )
          .map((freelance) => (
            <Cardfreelance key={freelance.id} freelance={freelance} />
          ))
      )}
    </div>
    </>
  );
};
export default Freelance;
