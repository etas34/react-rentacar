import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";

const API_URL = "http://127.0.0.1:8000/";
const BASE_URL = "http://127.0.0.1:3000/";


const Vehicle = (props) => {


  return (
    <Box sx={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={API_URL + props.car.photos[0].photo_path} // Replace with the car image URL
          alt={props.car.brand} // Replace with the car title or alternate text
        />
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {props.car.brand} {props.car.model}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={props.car.location} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={props.car.transmission} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalGasStationIcon />
              </ListItemIcon>
              <ListItemText primary={props.car.fuel} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary={props.car.seats} />
            </ListItem>
          </List>
        </CardContent>
        <CardActions>
          <Typography startIcon={PersonIcon} variant="body" sx={{ flex: 1, fontWeight:'bold' }}>
          €{props.car.price}
          </Typography>

          <Link to={`${BASE_URL}vehicle/${props.car.id}`}>
          
          <Button size="small" variant="contained" color="primary">
            Book Now!
          </Button>
              </Link>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Vehicle;
