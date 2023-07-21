import {
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect, useContext } from "react";
import { DateRange } from "react-date-range";
import { useParams } from "react-router-dom";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import PeopleIcon from "@mui/icons-material/People";
import { MainContext } from "../../Context";
import { addDays, eachDayOfInterval, format, subDays } from "date-fns";

const API_URL = "http://127.0.0.1:8000/";

const Detail = () => {
  
  const {cuserId} = useContext(MainContext)


  const params = useParams();

  const [vehicle, setVehicle] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}vehicle/${params.id}`)
    .then((response) => response.json())
    .then((data) => setVehicle(data))
    .catch((err) => {
     console.log(err.message);
    });
   }, []);


  const [open, setOpen] = useState(false);

  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const getAllDatesInRange = (startDate, endDate) => {
    const dates = eachDayOfInterval({ start: startDate, end: endDate });
    return dates;
  };
  useEffect(() => {
    if (vehicle.length!==0) {
      let disabledDatesArray=[];
      vehicle.bookings.map((e)=>{
        disabledDatesArray.push(...getAllDatesInRange(new Date(e.start_date),new Date(e.end_date)))
      })   
      setDisabledDates(disabledDatesArray)
    }     
  }, [open]);

  const handleOpen = () => {
    console.log(cuserId)
    if (cuserId) {
      setOpen(true);
    } else {
      alert("You need to login first."); 
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
   
    console.log("Selected Date:",format(date[0].startDate,"yyyy-MM-dd"));

    
    const json_string= JSON.stringify({
      user_id: cuserId,
      vehicle_id : params.id,
      start_date : format(date[0].startDate,"yyyy-MM-dd"),
      end_date : format(date[0].endDate,"yyyy-MM-dd")
    })

    const requestOption= {
      method : 'POST',
      headers: { 'Content-Type' : 'application/json'},
      body : json_string
    }
    
    fetch(API_URL + 'booking/', requestOption)
    .then(response=>{
      if(response.ok) {
        return response.json()
      }  
      throw response      
    })
    .then(data => {
      alert("Booking created succesfully!")

    })
    .catch(error=>{
      console.log(error)
      if (error.status===409) {
        alert('Vehicle is not available during the specified time')
      }
    })




    handleClose();
  };


  
  return (
    <div>
      <Navbar />
      <Header type="list" />

      <Container maxWidth="lg" sx={{ marginTop: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Image slideshow */}
             <Carousel autoPlay interval={3000} showThumbs={false} infiniteLoop>
             {vehicle.photos && vehicle.photos.map((image, index) => (
              <div key={index}>
                <img src={API_URL+image.photo_path} alt={`Car ${index + 1}`} style={{ height: 400, objectFit: 'cover' }} />
              </div>
            ))}
          </Carousel>   
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  {/* Car details */}
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {vehicle.brand} {vehicle.model}
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary={vehicle.location} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText primary={vehicle.transmission} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocalGasStationIcon />
                      </ListItemIcon>
                      <ListItemText primary={vehicle.fuel} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText primary={vehicle.seats} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={4}>
                  
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                €{vehicle.price}
                  </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleOpen}
                    >Book Now!
                    </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Book Now</DialogTitle>
          <DialogContent>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
            minDate={new Date()}
            disabledDates={disabledDates}
          />
        </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
};

export default Detail;
