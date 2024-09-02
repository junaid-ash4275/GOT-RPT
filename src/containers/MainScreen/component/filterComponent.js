import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormControl } from "@mui/material";
import ArgonDatePicker from "components/ArgonDatePicker";
import ArgonButton from "components/ArgonButton";
import { formatDate } from "util/formatDate";
import ArgonBox from "components/ArgonBox";

//mui icons
import SyncIcon from "@mui/icons-material/Sync";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CalendarViewMonthRoundedIcon from "@mui/icons-material/CalendarViewMonthRounded";
import ArgonSelect from "components/ArgonSelect";

const FilterComponent = ({ date, setDate, filters, setFilters, fetchData }) => {
  const [state, setstate] = useState(false);
  const buttonRefs = useRef({});
  const [selectedFilterOption, setSelectedFilterOption] = useState({
    value: "all",
    label: "All",
  });

  useEffect(() => {
    Object.keys(buttonRefs.current).forEach((key) => {
      const buttonElement = buttonRefs.current[key];
      if (buttonElement) {
        buttonElement.style.boxShadow = filters[key] ? "0 0 3px red" : "0 0 3px #4667c8";
      }
    });
  }, [filters]);

  const handleFilterClick = (filterKey) => {
    const newFilterState = { ...filters };

    if (["issues", "waiting", "notBuild"].includes(filterKey)) {
      ["issues", "waiting", "notBuild"].forEach((key) => {
        if (key !== filterKey) newFilterState[key] = false;
      });
    }

    newFilterState[filterKey] = !newFilterState[filterKey];
    setFilters(newFilterState);
  };

  const openForm = () => {
    debugger;
    setstate(true);
  };

  return (
    <ArgonBox
      position="sticky"
      top={0}
      zIndex={1}
      sx={{
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        flexWrap: { xs: "wrap", md: "wrap", lg: "wrap" },
        overflowX: "hidden",
      }}
    >
      <ArgonBox
        sx={{
          maxWidth: "110px",
          width: "auto",
          marginRight: 0.5,
        }}
      >
        <ArgonSelect
          size="small"
          sx={{ maxWidth: "100px" }}
          value={selectedFilterOption}
          onChange={(selectedOption) => setSelectedFilterOption(selectedOption)}
          options={[
            { value: "all", label: "All" },
            { value: "orders", label: "Orders" },
            { value: "inventory", label: "Inventory" },
            { value: "receipts", label: "Receipts" },
            { value: "credits", label: "Credits" },
            { value: "outs", label: "Outs" },
            { value: "bad_ups", label: "Bad Ups" },
            { value: "inquiry", label: "Inquiry" },
            { value: "just_pull", label: "Just Pull" },
            { value: "no_credits", label: "No Credits" },
            { value: "no_order", label: "No Order" },
            { value: "placement", label: "Placement" },
            { value: "track_id", label: "Track ID" },
          ]}
        />
      </ArgonBox>

      <FormControl
        sx={{
          marginRight: 0.5,
          maxWidth: "100px",
        }}
      >
        <ArgonDatePicker
          size="small"
          id="date-filter"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          format="yyyy-MM-dd"
          sx={{
            borderRadius: "4px",
            padding: "4px 8px",
            fontSize: "0.875rem",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
      </FormControl>

      {Object.keys(filters).map((filterKey) => (
        <ArgonButton
          size="small"
          key={filterKey}
          name={filterKey}
          variant="contained"
          onClick={() => handleFilterClick(filterKey)}
          ref={(el) => (buttonRefs.current[filterKey] = el)}
          sx={{
            margin: { xs: "2px", sm: "3px", md: "3px" },
            padding: { xs: "2px 4px", sm: "2px 6px", md: "3px 8px" },
            minWidth: "16px",
            height: "14px", // Decreased height for smaller buttons
            fontSize: "0.6rem",
            color: filters[filterKey] ? "red" : "5e72e4",
          }}
        >
          {filterKey.charAt(0) + filterKey.slice(1)}
        </ArgonButton>
      ))}

      <ArgonButton
        size="small"
        ref={(el) => (buttonRefs.current["calendarButton"] = el)}
        variant="contained"
        sx={{
          margin: "2px",
          color: "5e72e4",
          boxShadow: "0 0 3px #4667c8",
          padding: { xs: "2px 4px", sm: "2px 6px", md: "3px 8px" },
          minWidth: "16px",
          height: "24px", // Decreased height for smaller buttons
          fontSize: "0.5rem",
        }}
      >
        <CalendarViewMonthRoundedIcon />
      </ArgonButton>

      <ArgonButton
        size="small"
        ref={(el) => (buttonRefs.current["infoButton"] = el)}
        variant="contained"
        sx={{
          margin: "2px",
          color: "5e72e4",
          boxShadow: "0 0 3px #4667c8",
          padding: { xs: "2px 4px", sm: "2px 6px", md: "3px 8px" },
          minWidth: "16px",
          height: "31px",
          fontSize: "0.6rem",
        }}
      >
        <InfoOutlinedIcon />
      </ArgonButton>

      <ArgonButton
        size="small"
        ref={(el) => (buttonRefs.current["syncButton"] = el)}
        onClick={openForm}
        variant="contained"
        sx={{
          margin: "2px",
          color: "5e72e4",
          boxShadow: "0 0 3px #4667c8",
          padding: { xs: "2px 4px", sm: "2px 6px", md: "3px 8px" },
          minWidth: "16px",
          height: "24px", // Decreased height for smaller buttons
          fontSize: "0.5rem",
        }}
      >
        <SyncIcon />
      </ArgonButton>

      {/* <ArgonButton
        size="small"
        ref={(el) => (buttonRefs.current["calendarButton"] = el)}
        variant="contained"
        sx={{
          margin: "4px",
          color: "5e72e4",
          boxShadow: "0 0 3px #4667c8",
          padding: { sm: "2px 8px", md: "4px 10px", lg: "6px 12px" },
          minWidth: "20px",
          fontSize: "0.5rem",
        }}
      >
        <CalendarViewMonthRoundedIcon />
      </ArgonButton>
      <ArgonButton
        size="small"
        ref={(el) => (buttonRefs.current["infoButton"] = el)}
        variant="contained"
        sx={{
          margin: "4px",
          color: "5e72e4",
          boxShadow: "0 0 3px #4667c8",
          padding: { sm: "2px 8px", md: "4px 10px", lg: "6px 12px" },
          minWidth: "20px",
          fontSize: "0.5rem",
        }}
      >
        <InfoOutlinedIcon />
      </ArgonButton>
      <ArgonButton
        size="small"
        ref={(el) => (buttonRefs.current["syncButton"] = el)}
        onClick={openForm}
        variant="contained"
        sx={{
          margin: "4px",
          color: "5e72e4",
          boxShadow: "0 0 3px #4667c8",
          padding: { sm: "2px 8px", md: "4px 10px", lg: "6px 12px" },
          minWidth: "20px",
          fontSize: "0.5rem",
        }}
      >
        <SyncIcon />
      </ArgonButton> */}
    </ArgonBox>
  );
};

FilterComponent.propTypes = {
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    a: PropTypes.bool,
    b: PropTypes.bool,
    c: PropTypes.bool,
    showAll: PropTypes.bool,
    issues: PropTypes.bool,
    notBuild: PropTypes.bool,
    waiting: PropTypes.bool,
    move: PropTypes.bool,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  fetchData: PropTypes.func,
};
export default FilterComponent;
