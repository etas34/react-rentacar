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

import React, { useContext, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import { MainContext } from "../../Context";
import { format } from "date-fns";

const API_URL = "http://127.0.0.1:8000/";

const VehicleDash = (props) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const { cauthToken, cauthTokenType } = useContext(MainContext);

  const handleDelete = (vehicleId) => {
    fetch(`${API_URL}vehicle/${vehicleId}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: cauthTokenType + " " + cauthToken,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setIsDeleted(true);
        } else {
          throw new Error("Error deleting vehicle");
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  if (isDeleted) {
    return null; // Render nothing if the vehicle is deleted
  }

  console.log(props.car);
  if (props.car.bookings && props.car.bookings.length > 0) {
    console.log(props.car.bookings[0].end_date);
  }
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
            {props.car.bookings &&
          props.car.bookings.length > 0 &&
          props.car.bookings.map((booking) => (
            <ListItem key={booking.start_date + booking.end_date}>
              <ListItemText
                primary={`Booking: ${format(
                  new Date(booking.start_date),
                  "dd/MM/yyyy"
                )} - ${format(new Date(booking.end_date), "dd/MM/yyyy")}`}
              />
            </ListItem>
          ))}
          </List>
        </CardContent>
        <CardActions>
          <Typography startIcon={PersonIcon} variant="body2" sx={{ flex: 1 }}>
            €{props.car.price}
          </Typography>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDelete(props.car.id)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default VehicleDash;
