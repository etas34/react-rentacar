import React, {useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import Header from "../../components/header/Header";
import Sidebar from "../../components/dashboard/Sidebar";
import { Container, Grid } from "@mui/material";
import Main from "../../components/dashboard/Main";

const Dashboard = () => {
  const [age, setAge] = useState("");
  const [newTab, setNewTab] = useState(false);
  const [listTab, setListTab] = useState(true);
  const [bookingTab, setBookingTab] = useState(false);

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

  const switchNewTab = () => {
    setNewTab(true);
    setListTab(false);
    setBookingTab(false);
  }

  const switchListTab = () => {
    setNewTab(false);
    setListTab(true);
    setBookingTab(false);
  }
  const switchBookingTab = () => {
    setNewTab(false);
    setListTab(false);
    setBookingTab(true);
  }

  return (
    <>
      <div>
        <Navbar />
        <Header type="list" />
      </div>
      <Container maxWidth="lg" sx={{ marginTop: 2 }}>
        <Grid container spacing={2}>
          {/* Filtering section */}
          <Grid item xs={12} md={3}>
            <Sidebar switchNewTab={switchNewTab} switchListTab={switchListTab} switchBookingTab={switchBookingTab}/>
          </Grid>

          {/* Car list and create section */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              <Main newTab={newTab} listTab={listTab} bookingTab={bookingTab}/>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Dashboard;
