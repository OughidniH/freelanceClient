import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useValue } from "../../context/ContextProvider";

const CostType = () => {
  const {
    state: {
      details: { costType },
    },
    dispatch,
  } = useValue();

  const handleCostTypeChange = (e) => {
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { costType: e.target.value },
    });
  };

  return (
    <div className="search-bar-item">
      <FormControl fullWidth>
        <InputLabel id="cost-type-label">Transaction</InputLabel>
        <Select
          labelId="cost-type-label"
          id="cost-type"
          value={costType || []}
          onChange={handleCostTypeChange}
          label="Type de Transaction"
          multiple
        >
          <MenuItem value="rent">À Louer</MenuItem>
          <MenuItem value="sale">À Vendre</MenuItem>
          <MenuItem value="auction">Enchère</MenuItem>
          <MenuItem value="exchange">Échange</MenuItem>
          <MenuItem value="public">Publique</MenuItem>
          <MenuItem value="mortgage">Hypothèque</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default CostType;
