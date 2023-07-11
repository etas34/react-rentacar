import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faCalendarDays,
  faCar,
  faPerson,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import PeopleIcon from '@mui/icons-material/People';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

const Header = (props) => {
  const [openDate, setOpenDate] = useState(false);
  const [location, setLocation] = useState('');

  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    NumberOfSeats: 5,
    Transmission: [],
    Fuel: [],
  });

  const handleOption = (operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        ["NumberOfSeats"]:
          operation === "i"
            ? options["NumberOfSeats"] + 1
            : options["NumberOfSeats"] - 1,
      };
    });
  };

  const handleCheckboxChange = (e, optionType) => {
    const { value, checked } = e.target;
    const updatedOptions = checked
      ? [...options[optionType], value] // Add the value to the array
      : options[optionType].filter((option) => option !== value); // Remove the value from the array

    setOptions((prevOptions) => ({
      ...prevOptions,
      [optionType]: updatedOptions,
    }));
  };
  const navigate = useNavigate();
  const handleSearch = () => {
    const searchParams = {
      location: location,
      start: format(date[0].startDate,"yyyy-MM-dd"),
      end: format(date[0].endDate,"yyyy-MM-dd"),
      transmission: options.Transmission,
      fuel: options.Fuel,
      seats: options.NumberOfSeats
    };
  
    
      navigate("/vehicles", { state: { searchParams } });
    
  }
  return (
    <div className="header">
      <div className="headerContainer">
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faCar} />
            <span>Vehicles</span>
          </div>
          <div className="headerListItem">
            <PeopleIcon icon={faCar} />
            <span>Owners</span>
          </div>
          
          {props.type !== "list" && (
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faLocationDot} className="headerIcon" />
                <input
                  type="text"
                  value={location}
                  placeholder="Location"
                  className="headerSearchInput"
                  onChange={e=>{setLocation(e.target.value)}}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "dd/MM/yyy")} to ${format(
                  date[0].endDate,
                  "dd/MM/yyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`Transmission:${options.Transmission.map(
                  (transmission) => transmission
                ).join(", ")}, Number Of Seats:${
                  options.NumberOfSeats
                }, Fuel:${options.Fuel.map((fuel) => fuel).join(", ")}`}</span>

                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Transmission</span>
                      <div className="optionCheckbox">
                        <input
                          type="checkbox"
                          className="optionCheckboxInput"
                          value="Manual"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Transmission")
                          }
                          checked={options.Transmission.includes("Manual")}
                        />
                        Manual
                        <input
                          type="checkbox"
                          className="optionCheckboxInput"
                          value="Automatic"
                          onChange={(e) =>
                            handleCheckboxChange(e, "Transmission")
                          }
                          checked={options.Transmission.includes("Automatic")}
                        />{" "}
                        Automatic
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Fuel</span>
                      <div className="optionCheckbox">
                        <input
                          type="checkbox"
                          value="Diesel"
                          onChange={(e) => handleCheckboxChange(e, "Fuel")}
                          checked={options.Fuel.includes("Diesel")}
                          className="optionCheckboxInput"
                        />{" "}
                        Diesel
                        <input
                          type="checkbox"
                          value="Gasoline"
                          onChange={(e) => handleCheckboxChange(e, "Fuel")}
                          checked={options.Fuel.includes("Gasoline")}
                          className="optionCheckboxInput"
                        />{" "}
                        Gasoline
                        <input
                          type="checkbox"
                          value="Electric"
                          onChange={(e) => handleCheckboxChange(e, "Fuel")}
                          checked={options.Fuel.includes("Electric")}
                        />{" "}
                        Electric
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Number Of Seats</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.NumberOfSeats <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.NumberOfSeats}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
