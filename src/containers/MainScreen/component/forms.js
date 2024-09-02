import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const formSections = [
  { appBarIcon: <MenuOpenIcon />, appBarTitle: "Edit Order Header" },
  {
    miniAppBarIcon: <InfoIcon />,
    miniAppBarTitle: "File Information",
    fields: [
      { label: "File Name", defaultValue: "4004_76532_20240828.CSV", readOnly: true },
      { label: "Date Time In", defaultValue: "08/28/2024 12:00 AM", readOnly: true },
      { label: "File Loaded", defaultValue: "08/28/2024 05:22 AM", readOnly: true },
    ],
  },
  {
    miniAppBarIcon: <InfoIcon />,
    miniAppBarTitle: "Loaded Information",
    fields: [
      { label: "Type", defaultValue: "Regular Order", readOnly: true },
      { label: "Conf #", defaultValue: "76532-01-b03", readOnly: true },
      { label: "Store", defaultValue: "4004", readOnly: true },
      { label: ".", defaultValue: "BRUNS MARKET", readOnly: true },
      { label: ".", defaultValue: "DLJJ FOODS INC.", readOnly: true },
      { label: "Vendor", defaultValue: "AWG Oklahoma", readOnly: true },
      { label: "Store Dpt", defaultValue: "GROCERY", readOnly: true },
      { label: "User ID", defaultValue: "SEC", readOnly: true },
      { label: "Serial Number", defaultValue: "24047524200244", readOnly: true },
      { label: "Breaker Code", defaultValue: "1", readOnly: true },
      { label: "Delivery Date", defaultValue: "08/28/2024", readOnly: true },
      {
        label: "Blind Status",
        defaultValue: "6",
        readOnly: true,
        select: true,
        options: [{ value: "6", label: "6" }],
      },
      { label: "Blind Date", defaultValue: "mm/dd/yyyy", readOnly: true },
      {
        label: "Late",
        checked: true,
        checkbox: true,
      },
    ],
  },
  {
    miniAppBarIcon: <InfoIcon />,
    miniAppBarTitle: "Processed Information",
    fields: [
      { label: "Vendor", defaultValue: "AWG Oklahoma", readOnly: true },
      { label: "Department", defaultValue: "TOBACCO", readOnly: true },
      { label: "Breaker Code", defaultValue: "1", readOnly: false },
      { label: "Invoice", defaultValue: "FROZEN", readOnly: false },
      { label: "Delivery Date", defaultValue: "8/28/2024", readOnly: false },
      {
        label: "Late",
        checked: true,
        checkbox: false,
      },
      {
        label: "Move",
        checked: true,
        checkbox: false,
      },
      { label: "Sent Date", defaultValue: "mm/dd/yyyy", readOnly: true },
      { label: "Deadline", defaultValue: "mm/dd/yyyy hh:mm tt", readOnly: true },
      { label: "Blind Date", defaultValue: "mm/dd/yyyy hh:mm tt", readOnly: true },
      { label: "ACCA", defaultValue: "", readOnly: true },
      { label: "AG Conf #", defaultValue: "", readOnly: false },
      { label: "Old AG Conf #", defaultValue: "", readOnly: false },
      { label: "Note", defaultValue: "", readOnly: false },
      { label: "Status", defaultValue: "Put on hold for a check  reason", readOnly: true },
      { label: "Who Released", defaultValue: "", readOnly: false },
    ],
  },
  {
    miniAppBarIcon: <InfoIcon />,
    miniAppBarIcon: "System Information",
    fields: [
      {
        label: "File is hold",
        checkbox: true,
        checked: false,
      },
      {
        label: "Family is hold",
        checkbox: true,
        checked: false,
      },
      {
        label: "Header is hold",
        checkbox: true,
        checked: true,
      },
      { label: "Scanner Headers", defaultValue: "0", readOnly: false },
      { label: "Scanner Files ID", defaultValue: "0", readOnly: false },
      { label: "Header ID", defaultValue: "41619928", readOnly: true },
      { label: "File ID", defaultValue: "18467185", readOnly: true },
      { label: "Created", defaultValue: "08/28/2024 14:11:28", readOnly: false },
      { label: "Last Time Rebuilt", defaultValue: "08/28/2024 14:11:28", readOnly: false },
    ],
  },
];

export default formSections;
