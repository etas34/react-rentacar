import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import "./vehicleList.css";
import { Grid } from "@mui/material";
import Vehicle from "../Vehicle/Vehicle";

const BASE_URL='http://127.0.0.1:8000/'

const Vehicles = () => {
  

  const [vehicles, setVehicles] = useState([]);

  useEffect(()=> {
    fetch(BASE_URL + 'vehicle')
    .then( response => {
      const json= response.json()
      if(response.ok) {
        return json
      }
      throw response
    })
    .then(data => {
      setVehicles(data)
    })
    .catch(error=> {
      console.error();
      alert(error)
    })
      
  }, [])


  return (
    <div className="fp">
      <Grid container spacing={2}>
      {vehicles.map((car, index) => (
         <Grid key={index}
         item
         xs={12} md={3}
         sx={{ flex: 1, display: "flex", flexDirection: "column" }}
       >
       <Vehicle key={index} car={car} />
       </Grid>
        
      ))}
      
      </Grid>
    </div>
  );
};

export default Vehicles;
