import React, { useContext, useEffect } from "react";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import VehicleDash from "../Vehicle/VehicleDash";
import { MainContext } from "../../Context";
import BookingList from "../booking/BookingList";

const API_URL = "http://127.0.0.1:8000/";

const Main = (props) => {
  const [brand, setBrand] = React.useState("");
  const [model, setModel] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [fuel, setFuel] = React.useState("Gasoline");
  const [transmission, setTransmission] = React.useState("Automatic");
  const [seats, setSeats] = React.useState(5);
  const [images, setImages] = React.useState([]);
  const [vehicles, setVehicles] = React.useState([]);
  const [bookings, setBookings] = React.useState([]);

  const { cauthToken, cauthTokenType, cuserId } = useContext(MainContext);


  useEffect (()=> {
    if (cuserId) {
      getVehicles();
      getBookings();
    }
  }, [cuserId, brand])

  console.log('userid', cuserId, cauthToken, cauthTokenType)
  const handleChangeFuel = (event) => {
    setFuel(event.target.value);
  };

  const handleChangeBrand = (event) => {
    setBrand(event.target.value);
  };

  const handleChangeModel = (event) => {
    setModel(event.target.value);
  };

  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleChangeSeats = (event) => {
    setSeats(event.target.value);
  };

  const handleChangeTransmission = (event) => {
    setTransmission(event.target.value);
  };

  const handleFileSelected = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };
  const handleSave = () => {
    console.log(brand, model, fuel, transmission, seats, images);
    console.log(cauthToken, cauthTokenType, cuserId);
  
    const uploadPromises = images.map((image) => {
      const formData = new FormData();
      formData.append("photos", image);
      return fetch(`${API_URL}photo_vehicle/`, {
        method: "POST",
        headers: new Headers({
          Authorization: cauthTokenType + " " + cauthToken,
        }),
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          return data.photo_path;
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    });
  
    Promise.all(uploadPromises)
      .then((uploadedImages) => {
        const payload = {
          brand: brand,
          model: model,
          price: Number(price),
          location: location,
          fuel: fuel,
          transmission: transmission,
          seats: Number(seats),
          photos: uploadedImages,
        };
  
        return fetch(`${API_URL}vehicle/`, {
          method: "POST",
          headers: new Headers({
            Authorization: cauthTokenType + " " + cauthToken,
            "Content-Type": "application/json",
            accept: "application/json",
          }),
          body: JSON.stringify(payload),
        });
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error creating vehicle");
      })
      .then((data) => {
        setBrand('')
        setModel('')
        setPrice(0)
        setSeats(5)
        setImages([])
        setLocation('')
        setFuel('Gasoline')
        setTransmission('Automatic')
        alert('Vehicle created succesfully!')
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      })
  };
  

  const fuels = ["Gasoline", "Diesel", "Electric"];

  const transmissions = ["Automatic", "Manual"];



  const getVehicles = () => {


    fetch(API_URL+'user/'+cuserId+'/vehicles')
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

      console.log(vehicles)
  }

  const getBookings = () => {
    fetch(API_URL+'user/'+cuserId+'/bookings')
    .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
    })
    .then((data) => {
      setBookings(data);
      
    })
  }

  return (
    <div sx={{ padding: 5 }}>
      {props.newTab && (
        <React.Fragment >
          <Paper elevation={3} sx={{ marginTop: 2 }}>
            <Box sx={{ padding: 5 }}>
              <Typography variant="h6" sx={{ paddingBottom: 5 }}>
                Add New Vehicle
              </Typography>
              <Grid container spacing={3}>
                <Grid item sm={6}>
                  <TextField
                    label="Brand"
                    fullWidth
                    value={brand}
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    onChange={handleChangeBrand}
                  />
                </Grid>
                <Grid item sm={6}>
                  <TextField
                    label="Model"
                    fullWidth
                    value={model}
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    onChange={handleChangeModel}
                  />
                </Grid>

                <Grid item sm={6}>
                  <TextField
                    label="Location"
                    fullWidth
                    value={location}
                    size="small"
                    autoComplete="off"
                    variant="outlined"
                    onChange={handleChangeLocation}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Price"
                    fullWidth
                    size="small"
                    value={price}
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    autoComplete="off"
                    variant="outlined"
                    onChange={handleChangePrice}
                  />
                </Grid>
                <Grid item sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label">Fuel</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={fuel}
                      label="Fuel"
                      onChange={handleChangeFuel}
                    >
                      {fuels.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item sm={6}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="demo-simple-select-label2">
                      Transmission
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label2"
                      id="demo-simple-select2"
                      value={transmission}
                      label="Transmission"
                      onChange={handleChangeTransmission}
                    >
                      {transmissions.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Number Of Seats"
                    fullWidth
                    size="small"
                    value={seats}
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                    autoComplete="off"
                    variant="outlined"
                    onChange={handleChangeSeats}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" component="label">
                    Upload Images
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={handleFileSelected}
                    />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} />
                <Grid item xs={12} sm={5} />
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="contained"
                    sx={{ color: "#ffffff" }}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </Grid>
                <Grid item xs={12} sm={5} />
              </Grid>
            </Box>
          </Paper>
        </React.Fragment>
      )}

      {props.listTab && (
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          {vehicles.map((car, index) => (
            <Grid key={index} item >
              <VehicleDash key={index} car={car} />
            </Grid>
          ))}
        </Grid>
      )}
            {props.bookingTab && (
        <Grid container spacing={2} sx={{ marginTop: 5 }}>
          
           
      <BookingList bookings={bookings} />
           
        </Grid>
      )}
    </div>
  );
};

export default Main;
