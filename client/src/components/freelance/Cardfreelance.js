import React from "react";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { getFreelance } from "../../Redux/actions/freelanceAction";
import { useDispatch } from "react-redux";

const Cardfreelance = ({ freelance }) => {
  const dispatch = useDispatch();

  const handleFreelance = () => {
    dispatch(getFreelance(freelance._id));
  };
  console.log(freelance);
  return (
    <Link
      to={`/freelances/${freelance._id}`}
      onClick={handleFreelance}
      className="box"
    >
      <article className="card cardPhoto">
        <div className="content">
          <h3 className="title">{freelance.firstName}</h3>
          <div className="flex">
            <h4 className="subtitle">{freelance.competence}</h4>
            <div className="subtitle rating">
              <Rating
                name="half-rating-read"
                value={freelance.rating}
                precision={0.5}
                readOnly
              />
            </div>
          </div>
          <p className="description">{freelance.shortBio}</p>
        </div>
      </article>
    </Link>
  );
};

export default Cardfreelance;
