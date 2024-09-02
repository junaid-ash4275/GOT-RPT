import React, { useState, useEffect, useRef } from "react";
import { Grid, Card, Icon, Checkbox, styled, Menu, MenuItem } from "@mui/material";
import ArgonBox from "components/ArgonBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import DataTable2 from "examples/Tables/DataTable2";
// import allFilesColumns from "examples/Tables/Columns/allFiles.column";
import { getOrdersNew } from "api/mainScreenApi";
import { formatDate } from "util/formatDate";
import { useSelector } from "react-redux";
import {
  getAssosiatedOrder,
  getRegularOrderDetails,
  getCreditOrderDetails,
  getAllOrderDetails,
} from "api/mainScreenApi";
import LoadingSpinner from "components/app/spinner";
import GenericModal from "components/app/GeenricModal";

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

const styles = {
  headerFilter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    paddingRight: "10px",
  },
};

function AllFiles() {
  const createHeaderWithFilter = (label, accessor) => (
    <Grid style={{ display: "flex", justifyContent: "space-between", marginRight: "15px" }}>
      <span>{label}</span>
      <Icon
        fontSize="small"
        style={{ marginLeft: "10px", cursor: "pointer" }}
        onClick={(e) => handleFilterModal(e, label, accessor, true)}
      >
        filter_list
      </Icon>
    </Grid>
  );

  const mainScreenDataRef = useRef();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [mainScreenData, setMainScreenData] = useState([]);
  const [uniqueValues, setUniqueValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [isAllHeaders, setIsAllHeader] = useState(false);
  const [regularOrderDetails, setRegularOrderDetails] = useState({});
  const [creditOrderDetails, setCreditOrderDetails] = useState({});
  const [allOrderDetails, setAllOrderDetails] = useState({});
  const [dataTableData, setDataTableData] = useState({
    columns: [
      {
        Header: (
          <Icon
            fontSize="small"
            style={{ display: "inline-block", marginTop: "6px", marginRight: "15px" }}
          >
            search
          </Icon>
        ),
        accessor: "arrow",
        align: "center",
        Cell: function ArrowCell(porps) {
          return (
            <ArgonBox style={{ display: "flex", alignItems: "center" }}>
              <Icon
                fontSize="medium"
                style={{ display: "inline-block" }}
                onClick={() => handleRowClick(porps)}
              >
                {expandedRow === porps.row.index ? "expand_less" : "add"}
              </Icon>
            </ArgonBox>
          );
        },
      },
      {
        Header: "Mark",
        accessor: "mark1",
        Cell: function MarkCell(porps) {
          return (
            <ArgonBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CustomCheckbox checked={porps.row.original.mark1} />
            </ArgonBox>
          );
        },
      },
      {
        Header: createHeaderWithFilter("Store", "storeID"),
        accessor: "storeID",
      },
      {
        Header: createHeaderWithFilter("Type", "fileType"),
        accessor: "fileType",
      },
      {
        Header: createHeaderWithFilter("Status", "status"),
        accessor: "status",
        Cell: function StatusCell(porps) {
          const { color, status } = porps.row.original;
          return <StatusText color={color}>{status}</StatusText>;
        },
      },
      {
        Header: createHeaderWithFilter("Delivery", "deliveryDate"),
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
        Header: createHeaderWithFilter("Deadline", "deadLineDateTime"),
        accessor: "deadLineDateTime",
      },
      {
        Header: createHeaderWithFilter("Conf#", "confirmationID"),
        accessor: "confirmationID",
      },
      {
        Header: createHeaderWithFilter("Vendor", "vendor"),
        accessor: "vendor",
      },
      {
        Header: createHeaderWithFilter("Department", "departmentStoreID"),
        accessor: "departmentStoreID",
      },
      {
        Header: createHeaderWithFilter("Inv", "invoiceType"),
        accessor: "invoiceType",
      },
      {
        Header: createHeaderWithFilter("Brkr", "breakerID"),
        accessor: "breakerID",
      },
      {
        Header: createHeaderWithFilter("Lines", "lines"),
        accessor: "lines",
      },
      {
        Header: createHeaderWithFilter("Pieces", "pieces"),
        accessor: "pieces",
      },
      {
        Header: createHeaderWithFilter("AG Conf#", "agConfirmationID"),
        accessor: "agConfirmationID",
        width: 200,
      },
      {
        Header: createHeaderWithFilter("Received", "received"),
        accessor: "received",
      },
      {
        Header: createHeaderWithFilter("Serial", "serialNumber"),
        accessor: "serialNumber",
      },
      {
        Header: "Blind",
        accessor: "blind",
      },
      {
        Header: createHeaderWithFilter("User", "userID"),
        accessor: "userID",
      },
      {
        Header: createHeaderWithFilter("Who Release", "whoRelease"),
        accessor: "whoRelease",
      },
      {
        Header: "Sent",
        accessor: "sentDateTime",
      },
      {
        Header: "ACCA",
        accessor: "acca",
      },
    ],
    rows: [],
  });
  const [nestedDataTableData, setNestedDataTableData] = useState({
    columns: [
      {
        Header: (
          <Grid
            style={{
              display: "inline-block",
              backgroundColor: "black",
              padding: "0 10px", // Adjust the padding to increase/decrease width
              borderRadius: "4px",
            }}
          >
            <Icon
              fontSize="medium"
              style={{ display: "inline-block", marginTop: "6px" }}
              onClick={(e) => handleMenuOpen(e)}
            >
              expand_more
            </Icon>
          </Grid>
        ),
        accessor: "arrow",
        align: "center",
        Cell: function EyeIconCell() {
          return (
            <ArgonBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon
                fontSize="small"
                style={{ cursor: "pointer", color: "white" }} // Optional styling
                onClick={() => alert("Eye icon clicked!")}
              >
                visibility
              </Icon>
            </ArgonBox>
          );
        },
      },
      {
        Header: "Mark",
        accessor: "mark1",
        Cell: function MarkCell(porps) {
          return (
            <ArgonBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CustomCheckbox checked={porps.row?.mark1} />
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
          const { color, status } = porps.row;

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
        Cell: function MovedCell(porps) {
          return (
            <ArgonBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CustomCheckbox checked={porps.row?.moved} />
            </ArgonBox>
          );
        },
      },
      {
        Header: "Late",
        accessor: "late",
        Cell: function LateCell(porps) {
          return (
            <ArgonBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CustomCheckbox checked={porps.row?.late} />
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
        width: 200,
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
    ],
    rows: [],
  });

  const [filterTitle, setFilterTitle] = useState("");
  const [filterDataTableData, setFilterDataTableData] = useState({
    columns: [
      {
        Header: "Select",
        accessor: "checked",
        Cell: function MarkCell(porps) {
          // console.log("porps", porps);
          return (
            <ArgonBox
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CustomCheckbox checked={porps.row?.checked} />
            </ArgonBox>
          );
        },
      },
      {
        Header: "#",
        accessor: "id",
        align: "center",
      },

      {
        Header: filterTitle,
        accessor: "filterValue",
      },
    ],
    rows: [],
  });
  const [date, setDate] = useState(new Date());

  const [filters, setFilters] = useState({
    a: true,
    b: true,
    c: true,
    showAll: false,
    issues: true,
    notBuild: false,
    waiting: false,
    move: false,
  });

  const handleMenuOpen = (e) => {
    setOpenMenu(true);
    setAnchorEl(e.currentTarget);
  };

  const getStatus = () => {
    if (filters.issues) return "StatusList_Issues";
    if (filters.waiting) return "StatusList_Waiting";
    if (filters.notBuild) return "StatusList_NotBuilt";
    return;
  };

  /* useEffect(() => {
    debugger;
    if (distinctValues && distinctValues != null) {
      handleFilterModal(null, "", "", false);
    }
  }, [distinctValues]); */

  const handleFilterModal = async (e, title, filterKey, manualTrigger) => {
    debugger;
    let filteredValues = [];

    // Check if distinctValues has the key and get the array of values associated with it
    if (uniqueValues.hasOwnProperty(filterKey)) {
      filteredValues = uniqueValues[filterKey].map((item, i) => ({
        filterValue: item,
        [filterKey]: item,
        id: i + 1,
        checked: false,
      }));
    }

    setFilterDataTableData((prevData) => ({ ...prevData, rows: filteredValues }));
    console.log("Filtered distinctValues: ", filteredValues);
    setFilterTitle(title);

    if (manualTrigger) {
      setOpenModal(true);
      setFilterTitle(title);
    }
  };

  const closeFilterModel = (label, accessor) => {
    setOpenModal(!openModal);
  };

  const handleRowClick = (item) => {
    const rowIndex = item.row.index;
    setExpandedRow((prevRow) => (prevRow === rowIndex ? null : rowIndex));
    setIsAllHeader(false);

    if (rowIndex !== expandedRow) {
      fetchAssosiatedOrder(item.row.original);
    }
  };

  const handleAllHeaderClick = () => {
    //debugger;
    // Toggle the isAllHeader state
    setIsAllHeader((prev) => !prev);
    setOpenMenu(false);

    // Fetch associated orders with the updated isAllHeader state
    if (expandedRow !== null) {
      // Ensure there's an expanded row to fetch associated orders for
      const currentRow = dataTableData.rows[expandedRow];
      fetchAssosiatedOrder(currentRow);
    }
  };

  const fetchRegularOrderDetails = async (item) => {
    debugger;
    try {
      const result = await getRegularOrderDetails({
        uid: item,
      });
      setRegularOrderDetails((prevData) => ({ ...prevData, result }));
    } catch (error) {
      console.error("get orders new error:", error);
    }
  };

  const fetchAllOrderDetails = async (item) => {
    //debugger;
    try {
      const result = await getAllOrderDetails({
        uid: item,
      });
      setAllOrderDetails((prevData) => ({ ...prevData, result }));
    } catch (error) {
      console.error("get orders new error:", error);
    }
  };
  const fetchCreditOrderDetails = async (item) => {
    debugger;
    try {
      const result = await getCreditOrderDetails({
        uid: item,
      });
      setCreditOrderDetails((prevData) => ({ ...prevData, result }));
    } catch (error) {
      console.error("get orders new error:", error);
    }
  };

  const fetchAssosiatedOrder = async (item) => {
    //debugger;
    try {
      const result = await getAssosiatedOrder({
        _uid: item.uid,
        _fileNameID: item.fileNameID,
        _isAllHeaders: isAllHeaders,
        _confirmationID: item.confirmationID,
        _HeaderMenu: "MO,MO1,MT,MT1,MI,MP,MPI,MD,MR,M$,MS,MX,MB,MJ,MNC,MNO,S1,TRK",
        _headerType: "a,b,c",
      });
      setNestedDataTableData((prevData) => ({ ...prevData, rows: result }));
    } catch (error) {
      console.error("get orders new error:", error);
    }
  };

  useEffect(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 3);
    // formatDate(date);
    setDate(formatDate(defaultDate));
  }, []);

  const fetchData = async () => {
    const headerType = ["a", "b", "c"].filter((key) => filters[key]).join(",");
    const formattedDate = date;
    const params = {
      _startDate: formattedDate,
      _HeaderMenu: "MO,MO1,MT,MT1,MI,MP,MPI,MD,MR,M$,MS,MX,MB,MJ,MNC,MNO,S1,TRK",
      _headerType: headerType,
      _status: getStatus(), //StatusList_NotBuilt
      _isMove: filters.move,
      store_type: 0,
      group_type_desc: userInfo.group_Type_Desc,
      store_id: userInfo.store_ID, //store_ID
      group_id: userInfo.group_Id, //group_Id
    };

    try {
      setLoading(true);

      const result = await getOrdersNew(params);
      const distinctValues = {};

      result.forEach((item) => {
        Object.keys(item).forEach((key) => {
          if (!distinctValues[key]) {
            distinctValues[key] = [];
          }
          // Add the value to the array if it's not already present
          if (!distinctValues[key].includes(item[key])) {
            distinctValues[key].push(item[key]);
          }
        });
      });
      setUniqueValues(distinctValues);
      setDataTableData((prevData) => ({ ...prevData, rows: result }));
      setMainScreenData(result);
      mainScreenDataRef.current = result;

      handleFilterModal(null, "", "", false);
    } catch (error) {
      console.error("get orders new error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Object.keys(uniqueValues).length > 0) {
      handleFilterModal(null, "", "", false);
    }
  }, [uniqueValues]);

  useEffect(() => {
    fetchData();
  }, [date, filters]);

  const handleApplyFilter = () => {
    const checkedItems = filterDataTableData.rows.reduce((acc, item) => {
      if (item.checked) {
        acc.push(item);
      }
      return acc;
    }, []);

    const filteredData = dataTableData.rows.filter((item) => {
      return checkedItems.some((checkedItem) => {
        // Find the dynamic key (ignore static keys like 'id', 'checked')
        const dynamicKey = Object.keys(checkedItem).find(
          (key) => key !== "id" && key !== "checked" && key !== "filterValue"
        );
        // If dynamic key exists, match its value
        return dynamicKey && item[dynamicKey] === checkedItem[dynamicKey];
      });
    });
    setDataTableData((prevData) => ({ ...prevData, rows: filteredData }));
    setOpenModal(false);
  };

  function handleCheckboxChange(item, isChecked) {
    const index = filterDataTableData.rows.findIndex((element) => element.id === item.original.id);
    if (index !== -1) {
      filterDataTableData.rows[index].checked = isChecked;
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3} mb={20}>
        <Grid container sx={{ height: "100%", minWidth: "100%" }}>
          <LoadingSpinner loading={loading} />
          <Card sx={{ width: "100%", overflowX: "auto" }}>
            <DataTable
              table={dataTableData}
              nestedTable={nestedDataTableData}
              fetchRegularOrderDetails={fetchRegularOrderDetails}
              fetchCreditOrderDetails={fetchCreditOrderDetails}
              fetchAllOrderDetails={fetchAllOrderDetails}
              regularOrderDetails={regularOrderDetails}
              creditOrderDetails={creditOrderDetails}
              allOrderDetails={allOrderDetails}
              canSearch
              showFilter={true}
              isSorted={false}
              expandedRow={expandedRow}
              expanded={expanded}
              date={date}
              setDate={setDate}
              filters={filters}
              setFilters={setFilters}
            />
          </Card>
        </Grid>
      </ArgonBox>
      {openModal && (
        <>
          <GenericModal
            open={openModal}
            title={filterTitle + " Filter"}
            onClose={(e) => handleFilterModal(null, "", "storeID", true)}
            onApply={() => handleApplyFilter()}
          >
            <Grid container>
              <DataTable
                table={{
                  columns: [
                    {
                      Header: "Select",
                      accessor: "checked",
                      Cell: function MarkCell(porps) {
                        // console.log("porps", porps);
                        return (
                          <ArgonBox
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CustomCheckbox
                              checked={porps.row?.checked}
                              onChange={(e) => handleCheckboxChange(porps.row, e.target.checked)}
                            />
                          </ArgonBox>
                        );
                      },
                    },
                    {
                      Header: "#",
                      accessor: "id",
                      align: "center",
                    },

                    {
                      Header: filterTitle,
                      accessor: "filterValue",
                    },
                  ],
                  rows: filterDataTableData.rows,
                }}
                isSorted={false}
                canSearch={false}
                showTotalEntries={false}
                entriesPerPage={false}
              />
            </Grid>
          </GenericModal>
        </>
      )}
      {openMenu && (
        <Menu
          anchorEl={anchorEl}
          onClose={() => setOpenMenu(false)}
          open={Boolean(anchorEl)} // Open the menu if anchorEl is not null
        >
          <MenuItem onClick={handleAllHeaderClick}>
            {isAllHeaders ? (
              <Icon fontSize="medium" style={{ color: "white" }}>
                remove
              </Icon>
            ) : (
              <Icon fontSize="medium" style={{ display: "inline-block", color: "black" }}>
                add
              </Icon>
            )}{" "}
            <span style={{ marginLeft: "10px" }}>All Handler</span>
          </MenuItem>
        </Menu>
      )}
    </DashboardLayout>
  );
}

export default AllFiles;
