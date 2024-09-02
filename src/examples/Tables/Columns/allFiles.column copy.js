import { Icon } from "@mui/material";
import ArgonBox from "components/ArgonBox";

const allFilesColumns = [
  {
    Header: "Arrow",
    accessor: "arrow",
    align: "center",
    Cell: () => (
      <ArgonBox style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Icon style={{ display: "inline-block" }}>arrow</Icon>
      </ArgonBox>
    ),
  },
  {
    Header: "Mark",
    accessor: "mark1",
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
  },
  {
    Header: "Delivery",
    accessor: "deliveryDate",
  },
  { Header: "Day", accessor: "deliveryDay" },
  { Header: "Moved", accessor: "moved" }, //deliveryDateMoved
  { Header: "Late", accessor: "late" }, //movedLate
  { Header: "Deadline", accessor: "deadLineDateTime" },
  { Header: "Conf#", accessor: "confirmationID" },
  { Header: "Vendor", accessor: "vendor" },
  { Header: "Department", accessor: "departmentStoreID" },
  { Header: "Inv", accessor: "invoiceType" },
  { Header: "Brkr", accessor: "breakerID" },
  { Header: "Lines", accessor: "lines" },
  { Header: "Pieces", accessor: "pieces" },
  { Header: "AG Conf#", accessor: "agConfirmationID" },
  { Header: "Received", accessor: "received" },
  { Header: "Serial", accessor: "serialNumber" },
  { Header: "Blind", accessor: "blind" },
  { Header: "User", accessor: "userID" },
  { Header: "Who Release", accessor: "whoRelease" },
  { Header: "Send", accessor: "sentDateTime" },
  {
    Header: "ACCA",
    accessor: "acca",
  },
  {
    Header: "Action",
    accessor: "action",
    align: "center",
    Cell: (props) => (
      <ArgonBox style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Icon style={{ display: "inline-block" }}>edit</Icon>
        <Icon style={{ display: "inline-block" }}>delete</Icon>
      </ArgonBox>
    ),
  },
];

export default allFilesColumns;
