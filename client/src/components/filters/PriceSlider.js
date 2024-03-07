import { Box, Slider, Typography } from "@mui/material";
import React from "react";
import { useValue } from "../../context/ContextProvider";

const marks = [
  { value: 500, label: "DA500" },
  { value: 50000000, label: "DA50M" },
];

const PriceSlider = () => {
  const {
    state: { priceFilter },
    dispatch,
  } = useValue();

  return (
    <Box sx={{ p: "5px" }}>
      <Typography
        sx={{
          m: " 0",
          p: "5px 5px",
          color: "#19135a",
          borderRadius: "5px",
          fontSize: "12px",
          backdropFilter: "blur(5px)",
          fontWeight: "600",
        }}
      >
        {"DA " + priceFilter}
      </Typography>
      <Slider
        min={500}
        max={50000000}
        defaultValue={50000000}
        valueLabelDisplay="auto"
        marks={marks.map((mark) => ({
          ...mark,
          label: (
            <Typography
              key={mark.value}
              sx={{ color: "#000", fontWeight: 700, fontSize: "12px" }}
            >
              {mark.label}
            </Typography>
          ),
        }))}
        value={priceFilter}
        onChange={(e, price) =>
          dispatch({ type: "FILTER_PRICE", payload: price })
        }
        sx={{
          "& .MuiSlider-track": {
            backgroundColor: "#19135a",
            height: "6px",
          },
          "& .MuiSlider-thumb": {
            backgroundColor: "#19135a",
          },
        }}
      />
    </Box>
  );
};

export default PriceSlider;
