import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
} from "@mui/material";

const BookingList = ({ bookings }) => {
  const handleAccept = (id) => {
    console.log(id);
  };

  const handleReject = (id) => {
    console.log(id);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>                
              <Typography variant="h6" fontWeight="bold">
                #
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight="bold">
                Vehicle
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight="bold">
                User Name
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight="bold">
                Start Date
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6" fontWeight="bold">
                End Date
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking, index) => (
            <TableRow key={index}>
              <TableCell>
                <Typography>{index + 1}</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {booking.vehicle.brand} - {booking.vehicle.model}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>{booking.user.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{booking.start_date}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{booking.end_date}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingList;
