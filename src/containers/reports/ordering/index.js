import { useState, useEffect, useMemo } from "react";

// @mui material components
import { Grid, Card, Icon } from "@mui/material";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Custom hook
//import useFetch from "hooks/useFetch";

// API calls
import { getOrderingReport } from "api/reportApi";

// Table components
import DataTable from "examples/Tables/DataTable";

//loader
import { hourglass } from "ldrs";
hourglass.register();

//xlsx
import * as XLSX from "xlsx";

//spinner
import LoadingSpinner from "components/app/spinner";

function useFetch(apiFunction, params) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (params.StartDate != "" && params.EndDate != "" && params.Operation != "") {
        const result = await apiFunction(params);
        if (params.Operation === "Totalstore") {
          params.setStoreData((prevData) => ({
            ...prevData,
            storeRpt: result.storeRpt,
            deptRpt: null,
            headerRpt: null,
          }));
        } else if (params.Operation === "Totalstorebydept") {
          params.setStoreData((prevData) => ({
            ...prevData,
            storeRpt: null,
            deptRpt: result.deptRpt,
            headerRpt: null,
          }));
        } else if (params.Operation === "Orderheaderdetails") {
          params.setStoreData((prevData) => ({
            ...prevData,
            storeRpt: null,
            deptRpt: null,
            headerRpt: result.headerRpt,
          }));
        }
        setLoading(false);
        return response;
      } else {
        alert("Choose all the fields!");
        setLoading(false);
        return;
      }
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { fetchData, loading, error };
}

function OrderingReport() {
  const todayDate = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(todayDate.getDate() - 7);

  const [storeData, setStoreData] = useState({
    storeRpt: null,
    deptRpt: null,
    headerRpt: null,
  });
  const [selectedDate, setSelectedDate] = useState({
    startDate: sevenDaysAgo,
    endDate: todayDate,
  });
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [operation, setOperation] = useState([
    { value: "Totalstore", label: "Total By Store" },
    { value: "Totalstorebydept", label: "Total By Dept" },
    { value: "Orderheaderdetails", label: "Total Orders" },
  ]);

  const handleDateChange = (type, value) => {
    const date = value instanceof Date ? value : new Date(value);
    const formattedDate = date.toLocaleDateString();
    setSelectedDate((prev) => ({
      ...prev,
      [type]: formattedDate.trim(),
    }));
  };

  const handleOperationChange = (selectedOption) => {
    setSelectedOperation(selectedOption);
  };

  const { fetchData, loading, error } = useFetch(getOrderingReport, {
    StartDate: selectedDate?.startDate,
    EndDate: selectedDate?.endDate,
    Operation: selectedOperation?.value,
    PageIndex: 1,
    PageSize: 500,
    setStoreData,
  });

  const [dataTableData, setDataTableData] = useState({
    columns: [],
    rows: [],
  });

  useEffect(() => {
    let columns = [],
      rows = [];
    if (selectedOperation?.value === "Totalstore") {
      columns = [
        { Header: "Store ID", accessor: "store_id" },
        { Header: "Orders", accessor: "orders" },
        { Header: "Line Items", accessor: "line_items" },
        { Header: "Total Pieces", accessor: "total_pieces" },
      ];
      rows =
        (storeData.storeRpt || []).map((item) => ({
          store_id: item.store_id,
          orders: item.orders,
          line_items: item.lineItems,
          total_pieces: item.totalPieces,
        })) || [];
      setDataTableData({
        columns,
        rows,
      });
    } else if (selectedOperation?.value === "Totalstorebydept") {
      columns = [
        { Header: "Store ID", accessor: "store_id" },
        { Header: "GOT Department", accessor: "got_department" },
        { Header: "Orders", accessor: "orders" },
        { Header: "Line Items", accessor: "line_items" },
        { Header: "Total Pieces", accessor: "total_pieces" },
      ];
      rows =
        (storeData.deptRpt || []).map((item) => ({
          store_id: item.store_id,
          got_department: item.gotDept,
          orders: item.orders,
          line_items: item.lineItems,
          total_pieces: item.totalPieces,
        })) || [];
      setDataTableData({
        columns,
        rows,
      });
    } else if (selectedOperation?.value === "Orderheaderdetails") {
      columns = [
        { Header: "UID", accessor: "u_id" },
        { Header: "Store ID", accessor: "store_id" },
        { Header: "Vendor ID", accessor: "vendor_id" },
        { Header: "GOT Department", accessor: "got_department" },
        { Header: "AWG Confirmation", accessor: "awg_confirmation" },
        { Header: "Breaker ID", accessor: "breaker_id" },
        { Header: "Deliver Date", accessor: "delivery_date" },
        { Header: "User ID", accessor: "user_id" },
        { Header: "Order Lines", accessor: "order_lines" },
        { Header: "Order Pieces", accessor: "order_pieces" },
      ];
      rows =
        (storeData.headerRpt || []).map((item) => ({
          u_id: item.uid,
          store_id: item.store_ID,
          vendor_id: item.vendor_ID,
          got_department: item.gotDept,
          awg_confirmation: item.awgConf,
          breaker_id: item.breaker_ID,
          delivery_date: item.delivery_Date,
          user_id: item.user_ID,
          order_lines: item.order_Lines,
          order_pieces: item.order_Pieces,
        })) || [];
      setDataTableData({
        columns,
        rows,
      });
    }
  }, [selectedOperation, storeData]);

  const fields = [
    {
      label: "Start Date",
      placeholder: sevenDaysAgo.toLocaleDateString(),
      value: selectedDate.startDate,
      onChange: (date) => handleDateChange("startDate", date),
    },
    {
      label: "End Date",
      placeholder: todayDate.toLocaleDateString(),
      value: selectedDate.endDate,
      onChange: (date) => handleDateChange("endDate", date),
    },
    {
      label: "Choose Type",
      options: operation,
      onChange: handleOperationChange,
      value: selectedOperation,
    },
  ];

  const buttons = [
    {
      label: "Search",
      onClick: fetchData,
    },
  ];

  const exportToExcel = () => {
    if (dataTableData.rows.length != 0) {
      const columns = dataTableData.columns.map((column) => column.Header);
      const data = dataTableData.rows.map((row) =>
        dataTableData.columns.reduce((acc, column) => {
          acc[column.Header] = row[column.accessor];
          return acc;
        }, {})
      );

      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.sheet_add_aoa(worksheet, [columns], { origin: "A1" });

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "TableData");

      XLSX.writeFile(workbook, "TableData.xlsx");
    } else {
      alert("No Data to Export!");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={3} mb={20}>
        <Grid container sx={{ height: "100%", minWidth: "100%" }}>
          <LoadingSpinner loading={loading} />
          <Card
            sx={{
              width: "100%",
              overflowX: "auto",
            }}
          >
            <ArgonBox p={3} lineHeight={1}>
              <ArgonBox
                display="inline-flex"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                px={2}
              >
                <ArgonTypography variant="h5" fontWeight="medium">
                  Ordering Report
                </ArgonTypography>
              </ArgonBox>
            </ArgonBox>

            <DataTable
              table={dataTableData}
              fields={fields}
              buttons={buttons}
              canSearch
              showFields={true}
              showButton={true}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              handleDateChange={handleDateChange}
              operation={operation}
              selectedOperation={selectedOperation}
              setSelectedOperation={setSelectedOperation}
              handleOperationChange={handleOperationChange}
              fetchData={fetchData}
              exportToExcel={exportToExcel}
              buttonTitle={"Export"}
            />
          </Card>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default OrderingReport;
