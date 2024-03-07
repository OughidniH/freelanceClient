import Login from "../../components/user/Login";
import NavBar from "../../components/NavBar";
import Freelance from "../../components/freelance/Freelance";
import SearchFilter from "../../components/freelance/SearchFilter";
import { useState } from "react";

export default function Works() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [filterExperience, setFilterExperience] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");

  return (
    <>
      <Login />
      <NavBar />
      <SearchFilter
        setName={setName}
        rating={rating}
        setRating={setRating}
        setFilterExperience={setFilterExperience}
        setFilterAvailability={setFilterAvailability}
      />

      <Freelance
        name={name}
        rating={rating}
        filterExperience={filterExperience}
        filterAvailability={filterAvailability}
      />
    </>
  );
}
