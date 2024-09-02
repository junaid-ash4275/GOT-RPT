import ArgonBox from "components/ArgonBox";
import { AppBar, Card, Toolbar, FormControlLabel, Checkbox, Grid, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArgonInput from "components/ArgonInput";
import DescriptionIcon from "@mui/icons-material/Description"; // Document icon
import RateReviewIcon from "@mui/icons-material/RateReview"; // Reviews icon
import ArgonSelect from "components/ArgonSelect";
import { useLocation } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import form from "../../MainScreen/component/forms";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Index() {
  const query = useQuery();
  const serializedDetails = query.get("details");
  const regularOrderDetails = JSON.parse(decodeURIComponent(serializedDetails));
  console.log("OrderDetails in newForm: ", regularOrderDetails);
  
  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <ArgonBox>
          <Card>
            {form.map((section, index) => (
              <ArgonBox key={index}>
                {/* Render Main AppBar */}
                {/* {section.appBarIcon && (
                  <AppBar position="static" color="info" sx={{ backgroundColor: "info" }}>
                    <Toolbar>
                      {section.appBarIcon}
                      <ArgonTypography variant="h6" style={{ marginLeft: "10px", color: "#fff" }}>
                        {section.appBarTitle}
                      </ArgonTypography>
                    </Toolbar>
                  </AppBar>
                )} */}

                {/* Render Mini AppBar */}
                {section.miniAppBarIcon && (
                  <AppBar
                    position="static"
                    color="info"
                    sx={{ maxHeight: "35px", justifyContent: "center" }}
                  >
                    <Toolbar sx={{ minHeight: "30px", alignItems: "center" }}>
                      {section.miniAppBarIcon}

                      <ArgonTypography
                        variant="h6"
                        style={{
                          marginLeft: "10px",
                          color: "#fff",
                          fontSize: "1rem",
                        }}
                      >
                        {section.miniAppBarTitle}
                      </ArgonTypography>
                    </Toolbar>
                  </AppBar>
                )}

                {/* Render Fields */}
                <ArgonBox sx={{ padding: 2 }}>
                  <Grid container spacing={2}>
                    {section.fields?.map((field, fieldIndex) => (
                      <Grid item xs={12} md={6} lg={3} key={fieldIndex}>
                        <ArgonTypography sx={{ fontSize: "1rem" }}>{field.label}</ArgonTypography>
                        {field.select ? (
                          <ArgonSelect
                            variant="outlined"
                            size="small"
                            sx={{ maxWidth: "20px", marginBottom: 4 }}
                            defaultValue={field.defaultValue}
                            InputProps={{ readOnly: field.readOnly }}
                            SelectProps={{ IconComponent: ArrowDropDownIcon }}
                          >
                            {field.options.map((option, optionIndex) => (
                              <option key={optionIndex} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </ArgonSelect>
                        ) : field.checkbox ? (
                          <FormControlLabel
                            control={<Checkbox checked={field.checked} />}
                            label={field.label}
                          />
                        ) : (
                          <ArgonInput
                            variant="outlined"
                            size="small"
                            disabled={field.readOnly}
                            defaultValue={field.defaultValue}
                            InputProps={{ readOnly: field.readOnly }}
                            sx={{ maxWidth: "15rem" }}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                </ArgonBox>
              </ArgonBox>
            ))}
          </Card>
        </ArgonBox>
      </DashboardLayout>
    </>
  );
}

export default Index;
