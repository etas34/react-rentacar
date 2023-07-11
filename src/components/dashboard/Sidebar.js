import React from 'react'
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
  } from "@mui/material";
  import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
  import CommuteIcon from '@mui/icons-material/Commute';



const Sidebar = (props) => {
  return (
        <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
              onClick={() => props.switchNewTab()}
              >
                <ListItemIcon>
                  <DirectionsCarIcon />
                </ListItemIcon>
                <ListItemText primary="Add New Vehicle" />
              </ListItemButton>
              <ListItemButton
              onClick={() => props.switchListTab()}
              >
                <ListItemIcon>
                  <CommuteIcon />
                </ListItemIcon>
                <ListItemText primary="My Vehicles" />
              </ListItemButton>
            </List>
            
  )
}

export default Sidebar