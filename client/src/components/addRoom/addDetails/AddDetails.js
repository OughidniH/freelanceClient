import React from "react";
import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useValue } from "../../../context/ContextProvider";
import InfoField from "./InfoField";

const facilityOptions = [
  "Wifi",
  "la télé",
  "Transport public",
  "Métro",
  "Supermarché",
  "les pharmacies",
  "Station d'essence",
  "Piscine",
  "Parking",
  "Climatiseur",
  "Espace fumeur",
  "Services de nettoyage",
  "Services en chambre",
];

const AddDetails = () => {
  const {
    state: {
      details: {
        title,
        description,
        price,
        type,
        propertyType,
        numberOfRooms,
        surfaceArea,
        facilities,
      },
    },
    dispatch,
  } = useValue();

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    if (inputName === "costType") {
      const selectedType = inputValue;
      let defaultPrice = 0;

      if (selectedType === "rent") {
        defaultPrice = 500;
      } else if (selectedType === "sale") {
        defaultPrice = 500000;
      } else if (selectedType === "auction") {
        // Set the starting price for auction
        defaultPrice = 1000;
      }

      dispatch({
        type: "UPDATE_DETAILS",
        payload: { price: defaultPrice, type: selectedType },
      });
    } else {
      dispatch({
        type: "UPDATE_DETAILS",
        payload: { [inputName]: inputValue },
      });
    }
    console.log(`Input Name: ${inputName}, Input Value: ${inputValue}`);
  };

  const handleCheckboxChange = (e) => {
    const option = e.target.name;
    const isChecked = e.target.checked;
    console.log(`Input Name: ${option}, Input Value: ${isChecked}`);
    dispatch({
      type: "UPDATE_DETAILS",
      payload: {
        facilities: {
          ...facilities,
          [option]: isChecked,
        },
      },
    });
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
    >
      <div className="add-details-form">
        <FormControl>
          <RadioGroup
            name="costType"
            value={type || "rent"}
            row
            onChange={handleInputChange}
          >
            <FormControlLabel
              value="rent"
              control={<Radio />}
              label="À Louer"
            />
            <FormControlLabel
              value="sale"
              control={<Radio />}
              label="À Vendre"
            />
            <FormControlLabel
              value="auction"
              control={<Radio />}
              label="Enchère"
            />
            <FormControlLabel
              value="exchange"
              control={<Radio />}
              label="Échange"
            />
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Publique"
            />
            <FormControlLabel
              value="hypothèque"
              control={<Radio />}
              label="Hypothèque"
            />
          </RadioGroup>
          {["rent", "sale", "auction"].includes(type) && (
            <TextField
              sx={{ width: "auto" }}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">DZD</InputAdornment>
                ),
              }}
              inputProps={{ type: "number", min: 1, max: 50000000 }}
              value={price}
              onChange={handleInputChange}
              name="price"
              label={
                type === "rent"
                  ? "Prix mensuel"
                  : type === "sale"
                  ? "Prix de vente"
                  : "Prix initial de l'enchère"
              }
            />
          )}
        </FormControl>

        <FormControl className="property-type">
          <InputLabel id="property-type-label">Type de propriété</InputLabel>
          <Select
            labelId="property-type-label"
            id="property-type"
            value={propertyType || []}
            onChange={handleInputChange}
            label="Type de propriété"
            name="propertyType"
            multiple
          >
            <MenuItem value="">
              <em>Aucun</em>
            </MenuItem>
            <h3>- Terrain:</h3>
            <MenuItem value="Terrain Résidentiel">Terrain Résidentiel</MenuItem>
            <MenuItem value="Terrain Agricole">Terrain Agricole</MenuItem>
            <MenuItem value="Terrain Commercial">Terrain Commercial</MenuItem>
            <MenuItem value="Terrain Industriel">Terrain Industriel</MenuItem>
            <h3>- Résidentiel:</h3>
            <MenuItem value="Maison">Maison</MenuItem>
            <MenuItem value="Appartement">Appartement</MenuItem>
            <MenuItem value="Duplex">Duplex</MenuItem>
            <MenuItem value="Maison de Campagne">Maison de Campagne</MenuItem>
            <MenuItem value="Maison mobile">Maison mobile</MenuItem>
            <h3>- Commercial:</h3>
            <MenuItem value="Bureaux">Bureaux</MenuItem>
            <MenuItem value="Espace Multifonctionnel">
              Espace Multifonctionnel
            </MenuItem>
            <MenuItem value="Entrepôt">Entrepôt</MenuItem>
            <MenuItem value="Restaurant">Restaurant</MenuItem>
            <MenuItem value="Espace Médical">Espace Médical</MenuItem>
            <MenuItem value="Hébergement">Hébergement</MenuItem>
            <MenuItem value="Espace de Loisirs">Espace de Loisirs</MenuItem>
            <MenuItem value="parcs">parcs</MenuItem>
            <h3>- Industriel:</h3>
            <MenuItem value="Usine">Usine</MenuItem>
            <MenuItem value="Atelier">Atelier</MenuItem>
            <MenuItem value="Entrepôt Industriel">Entrepôt Industriel</MenuItem>
            <MenuItem value="Laboratoire Industriel">
              Laboratoire Industriel
            </MenuItem>
            <MenuItem value="Site de Production Alimentaire">
              Site de Production Alimentaire
            </MenuItem>
            <MenuItem value="Parc Industriel">Parc Industriel</MenuItem>
            <MenuItem value="Zone Franche Industrielle">
              Zone Franche Industrielle
            </MenuItem>
            <MenuItem value="Centre de Recherche et Développement">
              Centre de Recherche et Développement
            </MenuItem>
            <MenuItem value="Terminal Logistique">Terminal Logistique</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="standard"
          inputProps={{ type: "number", min: 1, max: 100 }}
          value={numberOfRooms}
          onChange={handleInputChange}
          name="numberOfRooms"
          label="Nombre de chambres"
        />

        <InfoField
          mainProps={{ name: "title", label: "Titre", value: title }}
          minLength={5}
        />
        <InfoField
          mainProps={{
            name: "description",
            label: "Description",
            value: description,
          }}
          minLength={15}
          optionalProps={{ multiline: true, rows: 4 }}
        />

        <TextField
          variant="standard"
          inputProps={{ type: "number", min: 1, max: 10000 }}
          value={surfaceArea}
          onChange={handleInputChange}
          name="surfaceArea"
          label="Surface (m²)"
        />

        <FormControl>
          <FormLabel component="legend">
            Installations de la propriété
          </FormLabel>
          <FormGroup>
            {facilityOptions.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={facilities[option] || false}
                    onChange={handleCheckboxChange}
                    name={option}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </FormControl>
      </div>
    </Stack>
  );
};

export default AddDetails;

// original //
/*
import React from "react";
import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useValue } from "../../../context/ContextProvider";
import InfoField from "./InfoField";

const AddDetails = () => {
  const {
    state: {
      details: { title, description, price, type },
    },
    dispatch,
  } = useValue();

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    console.log(`Input Name: ${inputName}, Input Value: ${inputValue}`);

    if (inputName === "costType") {
      const selectedType = inputValue;
      const defaultPrice = selectedType === "rent" ? 500 : 500000;

      console.log(`Selected Type: ${selectedType}`);

      dispatch({
        type: "UPDATE_DETAILS",
        payload: { price: defaultPrice, type: selectedType },
      });
    } else if (inputName === "price") {
      dispatch({ type: "UPDATE_DETAILS", payload: { price: inputValue } });
    }
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": { width: "100%", maxWidth: 500, m: 1 },
      }}
    >
      <FormControl>
        <RadioGroup
          name="costType"
          value={type || "rent"}
          row
          onChange={handleInputChange}
        >
          <FormControlLabel value="rent" control={<Radio />} label="À Louer" />
          <FormControlLabel value="sale" control={<Radio />} label="À Vendre" />
        </RadioGroup>
        {type === "rent" && (
          <TextField
            sx={{ width: "auto" }}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">DZD</InputAdornment>
              ),
            }}
            inputProps={{ type: "number", min: 1, max: 50000000 }}
            value={price}
            onChange={handleInputChange}
            name="price"
            label="Prix mensuel"
          />
        )}
        {type === "sale" && (
          <TextField
            sx={{ width: "auto" }}
            variant="standard"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">DZD</InputAdornment>
              ),
            }}
            inputProps={{ type: "number", min: 1, max: 50000000 }}
            value={price}
            onChange={handleInputChange}
            name="price"
            label="Prix de vente"
          />
        )}
      </FormControl>

      <InfoField
        mainProps={{ name: "title", label: "Title", value: title }}
        minLength={5}
      />
      <InfoField
        mainProps={{
          name: "description",
          label: "Description",
          value: description,
        }}
        minLength={15}
        optionalProps={{ multiline: true, rows: 4 }}
      />
    </Stack>
  );
};

export default AddDetails;

 */
