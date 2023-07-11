import React, {useState, useEffect} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import "./list.css"
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Vehicle from "../../components/Vehicle/Vehicle";
import { useLocation } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";

const API_URL='http://127.0.0.1:8000/'


const List = () => {

  

  const locationx = useLocation();
  const searchParams = locationx.state && locationx.state.searchParams;
  
  
  const [vehicles, setVehicles] = useState([]);



  useEffect(() => {
      
    console.log(searchParams)
    let url=`${API_URL}vehicle/?seats=${ searchParams.seats}&start_date=${searchParams.start}&end_date=${searchParams.end}`
    if (searchParams.location!=='' ) {
      url+=`&location=${searchParams.location}`
    }
    if (searchParams.fuel.length!==0 ) {
      searchParams.fuel.map(e=>{

        url+=`&fuel=${e}`
      })
    }
    if (searchParams.transmission.length!==0 ) {
      url+=`&transmission=${searchParams.transmission.join(",")}`
    }



    fetch(url)
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        setVehicles(data);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to fetch vehicles.');
      });
    
  },[]);
  


  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [location, setLocation] = useState("");
  const [transmissionFilter, setTransmissionFilter] = useState({
    automatic: false,
    manual: false,
  });

  const [fuelFilter, setFuelFilter] = useState({
    gasoline: false,
    diesel: false,
    electric: false,
  });


  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleTransmissionFilterChange = (event) => {
    setTransmissionFilter({
      ...transmissionFilter,
      [event.target.name]: event.target.checked,
    });
  };

  
  const handleFuelFilterChange = (event) => {
    setFuelFilter({
      ...fuelFilter,
      [event.target.name]: event.target.checked,
    });
  };


  const handleApplyFilters = () => {
    console.log(format(date[0].startDate, "yyyy-MM-dd"));
    console.log("Location:", location);
    console.log("Transmission Filter:", transmissionFilter);    
    console.log("Fuel Filter:", fuelFilter);

    
    let url=`${API_URL}vehicle/?start_date=${format(date[0].startDate, "yyyy-MM-dd")}&end_date=${format(date[0].endDate, "yyyy-MM-dd")}`
   
    if (location!=='' ) {
      url+=`&location=${location}`
    }
    if (fuelFilter.gasoline===true ) {
        url+=`&fuel=Gasoline`
    }
    if (fuelFilter.diesel===true ) {
      url+=`&fuel=Diesel`
    }
    if (fuelFilter.electric===true ) {
      url+=`&fuel=Electric`
    }
    if (transmissionFilter.automatic===true  ) {
      url+=`&transmission=Automatic`
    }
    if (transmissionFilter.manual===true  ) {
      url+=`&transmission=Manual`
    }



    fetch(url)
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then((data) => {
        setVehicles(data);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to fetch vehicles.');
      });
    
  
  };


  
 
  return (
    <>
      <div>
        <Navbar />
        <Header type="list" />
      </div>
      <Container maxWidth="lg" sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          {/* Filtering section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2, position: 'sticky', top: 0  }}>
              <Typography variant="h5" sx={{ mb: 2 }}>
                Filter Options
              </Typography>
              
              <TextField
                label="Location"
                value={location}
                onChange={handleLocationChange}
                fullWidth
                margin="normal"
              />
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
              />
              <Typography variant="h6" sx={{ fontSize:16, fontWeight:'bold'}}>
                Transmission
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={transmissionFilter.automatic}
                    onChange={handleTransmissionFilterChange}
                    name="automatic"
                  />
                }
                label="Automatic"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={transmissionFilter.manual}
                    onChange={handleTransmissionFilterChange}
                    name="manual"
                  />
                }
                label="Manual"
              />
 <Typography variant="h6" sx={{ fontSize: 16, fontWeight: "bold" }}>
                Fuel
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fuelFilter.gasoline}
                      onChange={handleFuelFilterChange}
                      name="gasoline"
                    />
                  }
                  label="Gasoline"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fuelFilter.diesel}
                      onChange={handleFuelFilterChange}
                      name="diesel"
                    />
                  }
                  label="Diesel"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={fuelFilter.electric}
                      onChange={handleFuelFilterChange}
                      name="electric"
                    />
                  }
                  label="Electric"
                />
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleApplyFilters}
              >
                Apply Filters
              </Button>
            </Paper>
          </Grid>

          {/* Car listing section */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {/* Car cards */}
              {vehicles.map((car, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Vehicle key={index} car={car} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default List;
