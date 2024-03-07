import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
// import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  Select,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const SearchFilter = ({
  setFilterAvailability,
  setFilterExperience,
  rating,
  setRating,
  setName,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <header className="headerSearch">
        <div className="filterModal">
          <span onClick={handleOpen}>Filter</span>
        </div>
        <div className="searchBox">
          <input
            type="text"
            placeholder="Search here ...."
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <span className="icon">
            <SearchIcon />
          </span>
        </div>
      </header>

      {/* *********MODAL-FILTER********************** */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="ModalFilter">
          <span className="filter-span">Filter</span>
          <div className="divider"></div>
          <div className="filter-data">
            <span className="titleRating">Rating</span>
            <Rating
              className="filterRating"
              style={{ marginLeft: "60", marginTop: 6 }}
              name="simple-controlled"
              value={rating}
              onChange={(e, newValue) => {
                setRating(newValue);
              }}
            />
            <div className="divider"></div>
            <span className="titleExprience">Experience</span>
            <FormControl>
              <RadioGroup
                style={{ marginLeft: "60", marginTop: 6 }}
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultValue="Junior"
                name="radio-buttons-group"
                onChange={(e) => {
                  setFilterExperience(e.target.value);
                }}
              >
                <FormControlLabel
                  value="Junior"
                  control={<Radio />}
                  label="Junior"
                />
                <FormControlLabel
                  value="Intermediary"
                  control={<Radio />}
                  label="Intermediary"
                />
                <FormControlLabel
                  value="Senior"
                  control={<Radio />}
                  label="Senior"
                />
                <FormControlLabel
                  value="Expert"
                  control={<Radio />}
                  label="Expert"
                />
              </RadioGroup>
            </FormControl>
            <div className="divider"></div>
            <span className="titleAvailability">Availability</span>
            <FormControl sx={{ m: 1, minWidth: "100%" }} size="small">
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                onChange={(e) => {
                  setFilterAvailability(e.target.value);
                }}
                className="filterSelect"
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
            <div className="divider"></div>
            <div className="filterBtn">
              <Button variant="outlined" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SearchFilter;
