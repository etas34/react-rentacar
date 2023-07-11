import React from "react";

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

const Main = (props) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const categories = [
    "science",
    "sports",
    "business",
    "politics",
    "entertainment",
    "technology",
    "world",
    "all",
  ];

  const vehicles = [
    {
      brand: "Toyota",
      model: "Camry",
      price: 25000,
      location: "New York",
      fuel: "Gasoline",
      transmission: "Automatic",
      seats: 5,
      photos: "https://example.com/toyota_camry.jpg",
    },
    {
      brand: "Honda",
      model: "Civic",
      price: 22000,
      location: "Los Angeles",
      fuel: "Gasoline",
      transmission: "Automatic",
      seats: 5,
      photos: "https://example.com/honda_civic.jpg",
    },
    {
      brand: "Ford",
      model: "Mustang",
      price: 35000,
      location: "Chicago",
      fuel: "Gasoline",
      transmission: "Manual",
      seats: 4,
      photos: "https://example.com/ford_mustang.jpg",
    },
    // Add more vehicle objects as needed
  ];

  return (
    <div>
        
        {props.newTab && 
    <React.Fragment>
      <Paper elevation={3}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" sx={{ paddingBottom: 5 }}>
            Add New Vehicle
          </Typography>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <TextField
                label="Brand"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={12}>
              <TextField
                label="Model"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Gasoline</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Gasoline"
                  onChange={handleChange}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
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
                  value={age}
                  label="Transmission"
                  onChange={handleChange}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Number Of Seats"
                fullWidth
                size="small"
                type="number"
                InputProps={{ inputProps: { min: 1, max: 10 } }}
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined"  component="label">
                Upload Images
                <input type="file" hidden multiple  />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4}>
              <Button variant="contained" sx={{ color: "#ffffff" }}>
                Save
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
        }
        
        {props.listTab && 
    <Grid container spacing={2} sx={{marginTop:5}}>
    {vehicles.map((car, index) => (
    <Grid key={index}
    item
    xs={12} md={4}
     >
    <VehicleDash key={index} car={car} />
    </Grid>
   
    ))}
    </Grid>
        }


    </div>
  )
};

export default Main;
