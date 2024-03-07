import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useValue } from "../../context/ContextProvider";

const PropertyType = () => {
  const {
    state: {
      details: { propertyType },
    },
    dispatch,
  } = useValue();

  const handlePropertyTypeChange = (e) => {
    dispatch({
      type: "UPDATE_DETAILS",
      payload: { propertyType: e.target.value },
    });
  };

  return (
    <div className="search-bar-item">
      <FormControl fullWidth>
        <InputLabel id="property-type-label">Propriété</InputLabel>
        <Select
          labelId="property-type-label"
          id="property-type"
          value={propertyType || []}
          onChange={handlePropertyTypeChange}
          label="Type de Propriété"
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
    </div>
  );
};

export default PropertyType;
