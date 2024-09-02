import React from "react";
import FilterComponent from "containers/MainScreen/component/filterComponent";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography"; // Import ArgonTypography
import MaterialTable from "material-table";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles"; // Import useTheme

export default function BasicTreeData({ table, showFilter, date, setDate, filters, setFilters }) {
  // Get the theme object
  const theme = useTheme();

  const getStyle = (col, rowData) => {
    if (col.field === "status") {
      return {
        backgroundColor: rowData.color, // Apply the color from rowData
        color: theme.palette.text.primary.main, // Text color based on theme
        padding: "8px", // Add padding for better visibility
        borderRadius: "4px", // Optional: Rounded corners for the background
        whiteSpace: "nowrap", // Prevent text wrapping
        overflow: "hidden", // Hide overflowed text
        textOverflow: "ellipsis", // Add ellipsis for overflowed text
      };
    }
    return {}; // Return an empty object for other cases
  };
  // Create a custom column renderer with ArgonTypography
  const columnsWithCustomRendering = table.columns.map((col) => {
    if (col.field === "status") {
      // Identify the 'status' column
      return {
        ...col,
        render: (rowData) => (
          <ArgonTypography variant="body1" color="textPrimary" style={getStyle(col, rowData)}>
            {rowData[col.field]} {/* Display the status */}
          </ArgonTypography>
        ),
      };
    }

    return col; // Return unmodified column if it's not 'status'
  });

  return (
    <MaterialTable
      title={
        showFilter && (
          <ArgonBox display="flex" alignItems="center" flexDirection="column">
            <FilterComponent
              date={date}
              setDate={setDate}
              filters={filters}
              setFilters={setFilters}
            />
          </ArgonBox>
        )
      }
      data={table.rows}
      columns={columnsWithCustomRendering} // Use the columns with typography
      options={{
        selection: false, // Disable checkboxes
        headerStyle: {
          backgroundColor: theme.palette.primary.main, // Use primary color from theme
          color: "#ffffff", // Set text color for headers
        },
      }}
    />
  );
}

BasicTreeData.propTypes = {
  table: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        field: PropTypes.string.isRequired,
      })
    ).isRequired,
    rows: PropTypes.array.isRequired,
  }).isRequired,
  showFilter: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
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
};
