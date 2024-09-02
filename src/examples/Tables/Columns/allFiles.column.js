import PropTypes from "prop-types";
import { Icon, Checkbox, styled } from "@mui/material";
import ArgonBox from "components/ArgonBox";

// Define the custom styled components
const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&.Mui-checked": {
    color: theme.palette.text.primary,
  },
}));

const StatusText = styled(ArgonBox)(({ color, theme }) => ({
  backgroundColor: color || theme.palette.secondary.main, // Default to secondary color if no color provided
  color: theme.palette.text.primary,
  padding: "4px 8px",
  borderRadius: "4px",
}));

const allFilesColumns = (onCellClick, expanded) => [
  {
    Header: "",
    accessor: "arrow",
    align: "center",
    Cell: function ArrowCell(props) {
      return (
        <ArgonBox style={{ display: "flex", alignItems: "center" }}>
          <Icon
            fontSize="medium"
            style={{ display: "inline-block" }}
            onClick={() => {
              onCellClick();
            }}
          >
            {expanded ? "expand_less" : "expand_more"}
          </Icon>
        </ArgonBox>
      );
    },
  },
  {
    Header: "Mark",
    accessor: "mark1",
    Cell: function MarkCell(props) {
      return (
        <ArgonBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CustomCheckbox checked={true} />
        </ArgonBox>
      );
    },
  },
  {
    Header: "Store",
    accessor: "storeID",
  },
  {
    Header: "Type",
    accessor: "fileType",
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: function StatusCell(porps) {
      // Access the color property from the row data
      const { color, status } = porps.row.original;

      return <StatusText color={color}>{status}</StatusText>;
    },
  },
  {
    Header: "Delivery",
    accessor: "deliveryDate",
  },
  { Header: "Day", accessor: "deliveryDay" },
  {
    Header: "Moved",
    accessor: "moved",
    Cell: function MovedCell(props) {
      return (
        <ArgonBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Checkbox checked />
        </ArgonBox>
      );
    },
  },
  {
    Header: "Late",
    accessor: "late",
    Cell: function LateCell(props) {
      return (
        <ArgonBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Checkbox checked />
        </ArgonBox>
      );
    },
  },
  {
    Header: "Deadline",
    accessor: "deadLineDateTime",
  },
  {
    Header: "Conf#",
    accessor: "confirmationID",
  },
  {
    Header: "Vendor",
    accessor: "vendor",
  },
  {
    Header: "Department",
    accessor: "departmentStoreID",
  },
  {
    Header: "Inv",
    accessor: "invoiceType",
  },
  {
    Header: "Brkr",
    accessor: "breakerID",
  },
  {
    Header: "Lines",
    accessor: "lines",
  },
  {
    Header: "Pieces",
    accessor: "pieces",
  },
  {
    Header: "AG Conf#",
    accessor: "agConfirmationID",
  },
  {
    Header: "Received",
    accessor: "received",
  },
  {
    Header: "Serial",
    accessor: "serialNumber",
  },
  {
    Header: "Blind",
    accessor: "blind",
  },
  {
    Header: "User",
    accessor: "userID",
  },
  {
    Header: "Who Release",
    accessor: "whoRelease",
  },
  {
    Header: "Send",
    accessor: "sentDateTime",
  },
  {
    Header: "ACCA",
    accessor: "acca",
  },
  {
    Header: "Action",
    accessor: "action",
    align: "center",
    Cell: function ActionCell() {
      return (
        <ArgonBox style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Icon fontSize="medium" style={{ display: "inline-block" }}>
            edit
          </Icon>
          <Icon fontSize="medium" style={{ display: "inline-block" }}>
            delete
          </Icon>
        </ArgonBox>
      );
    },
  },
];

export default allFilesColumns;
