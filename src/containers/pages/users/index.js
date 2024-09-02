import { useState, useEffect } from "react";

// formik components
import { Formik, Form } from "formik";

// @mui material components
import { Grid, Card, Icon, Stepper, Step, StepLabel } from "@mui/material";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";
import ArgonButton from "components/ArgonButton";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 PRO MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// NewUser page components
import UserInfo from "containers/pages/users/userInfo";
import Address from "containers/pages/users/address";

// NewUser layout schemas for form and form fields
import form from "schemas/NewUser/form";
import validations from "schemas/NewUser/validations";

// Custom hook
import useFetch from "hooks/useFetch";

// API calls
import { getUserList, createNewUser, deleteUser } from "api/umsApi";

// Table components
import DataTable from "examples/Tables/DataTable";
import { editUser } from "api/umsApi";

//UTIL
import { showDeleteAlert, showSuccessMessage } from "util/alertUtil";
import { showCanceledMessage } from "util/alertUtil";

function getSteps() {
  return ["User Personal Info", "User Login Info"];
}

function getStepContent(stepIndex, formData) {
  switch (stepIndex) {
    case 0:
      return <UserInfo formData={formData} />;
    case 1:
      return <Address formData={formData} />;
    default:
      return null;
  }
}

function NewUser() {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address1: "",
    address2: "",
    city: "",
    state: {
      value: "",
      lael: "",
    },
    status: true,
    zip: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: {
      value: "",
      label: "",
    },
    groupType: {
      value: "",
      label: "",
    },
    group: {
      value: "",
      label: "",
    },
  });
  
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const { formId, formField } = form;
  const currentValidation = validations[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users, loading: usersLoading, error: usersError } = useFetch(getUserList);

  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "First Name", accessor: "first_Name" },
      { Header: "Last Name", accessor: "last_Name" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role_Name" },
      {
        Header: "Action",
        accessor: "action",
        align: "center",
        Cell: (props) => (
          <ArgonBox style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Icon
              fontSize="medium"
              style={{ display: "inline-block" }}
              onClick={() => handleEdit(props)}
            >
              edit
            </Icon>
            <Icon
              fontSize="medium"
              style={{ display: "inline-block" }}
              onClick={() => handleDelete(props)}
            >
              delete
            </Icon>
          </ArgonBox>
        ),
      },
    ],
    rows: [],
  });

  useEffect(() => {
    if (users) setDataTableData((prevData) => ({ ...prevData, rows: users }));
  }, [users]);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleFormOpen = () => {
    setActiveStep(0);
    setFormOpen(!formOpen);
    setSelectedUser(null);
  };

  const handleCancel = (resetForm) => {
    setActiveStep(0);
    setFormOpen(!formOpen);
    setSelectedUser(null);
    setInitialValues({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address1: "",
      address2: "",
      city: "",
      state: {
        value: "",
        lael: "",
      },
      status: true,
      zip: "",
      username: "",
      password: "",
      confirmPassword: "",
      role: {
        value: "",
        label: "",
      },
      groupType: {
        value: "",
        label: "",
      },
      group: {
        value: "",
        label: "",
      },
    });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleEdit = async (rowData) => {
    const result = await editUser(rowData.row.original.uid);

    const user = rowData.row.original;
    setSelectedUser(user);
    setInitialValues({
      firstName: result.first_Name,
      lastName: result.last_Name,
      email: result.email,
      mobile: result?.mobile,
      address1: result.address1,
      address2: result.address2,
      city: result.city,
      state: {
        value: result.state,
        label: result.state,
      },
      zip: result.zip,
      username: result.email,
      password: "",
      confirmPassword: "",
      role: {
        value: result.role_ID,
        label: result.role_Name,
      },
      groupType: {
        value: result.group_type,
        label: result.group_type_desc,
      },
    });
    setFormOpen(true);
  };

  const submitForm = async (values, actions) => {
    await sleep(1000);

    try {
      const obj = {
        First_Name: values.firstName,
        Last_Name: values.lastName,
        Email: values.email,
        Mobile: values.mobile,
        City: values.city,
        Address1: values.address1,
        Address2: values.address2,
        state: values.state.value,
        Zip: values.zip,
        Login_User_Name: values.email,
        Password: values.password,
        //Status: values.status ? values.status : "",
        Role_ID: values.role.value,
        group_type: values.groupType.value,
        group_id: values.groupType.label === "groupType" ? values.group.value : 0, // if there is group then add group id and store id 0
        store_id: values.groupType.label === "storeType" ? values.group.value : 0, // if there is store then add group id and store id 0
        group_type_desc: values.groupType.label,
        Group_Type_ID: values.groupType.label === "groupType" ? values.group.value : 0,
        Created_Date: new Date().toISOString(),
        // Created_By: 1,
      };
      if (selectedUser) {
        // Edit user logic

        const result = await createNewUser({
          ...obj,
          User_ID: selectedUser.uid,
          operation: "EditUser",
        });
        showSuccessMessage("udpated");
      } else {
        // Create new user logic;
        const result = await createNewUser({
          ...obj,
          operation: "CreateNewUser",
        });
        showSuccessMessage("created");
      }
      actions.setSubmitting(false);
      actions.resetForm();
      setActiveStep(0);
      setFormOpen(!formOpen);
    } catch (error) {
      console.error("Error adding new user:", error);
      actions.setSubmitting(false);
    }
  };

  const handleSubmit = (values, actions) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const handleDelete = async (rowData) => {
    if (rowData) {
      await showDeleteAlert(
        async () => {
          try {
            const response = await deleteUser(rowData);
            showSuccessMessage("Deleted");
            //window.location.reload();
          } catch (error) {
            console.error("Error deleting item:", error);
          }
        },
        () => {
          showCanceledMessage();
        }
      );
    }
  };

  return (
    <DashboardLayout>
    
      <DashboardNavbar />
      <ArgonBox py={3} mb={20}>
        <Grid container justifyContent="center" sx={{ height: "100%", minWidth: "100%" }}>
          {!formOpen ? (
            <Card
              sx={{
                width: "100%",
                maxWidth: {
                  sm: "90%",
                  md: "80%",
                  lg: "70%",
                },
                overflowX: "auto",
              }}
            >
              <ArgonBox p={3} lineHeight={1}>
                <ArgonBox display="inline-flex" justifyContent="space-between" alignItems="center">
                  <ArgonButton onClick={handleFormOpen}>Add New user</ArgonButton>
                </ArgonBox>
              </ArgonBox>
              <DataTable table={dataTableData} canSearch />
            </Card>
          ) : (
            <Grid item xs={12} lg={8}>
              <Card
                sx={{
                  display: "grid",
                  alignItems: "center",
                  position: "relative",
                  height: "6rem",
                  borderRadius: "lg",
                  mb: 3,
                }}
              >
                <Stepper activeStep={activeStep} sx={{ margin: 0 }} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Card>
              <Formik
                enableReinitialize
                key={JSON.stringify(initialValues)}
                initialValues={initialValues}
                validationSchema={currentValidation}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, isSubmitting, resetForm }) => (
                  <Form id={formId} autoComplete="off">
                    <Card sx={{ height: "100%" }}>
                      <ArgonBox p={2}>
                        <ArgonBox>
                          {getStepContent(activeStep, { values, touched, formField, errors })}
                          <ArgonBox
                            mt={2}
                            width="100%"
                            display="flex"
                            justifyContent="space-between"
                          >
                            {activeStep === 0 ? (
                              <ArgonBox />
                            ) : (
                              <ArgonButton variant="gradient" color="light" onClick={handleBack}>
                                Back
                              </ArgonButton>
                            )}
                            <>
                              <ArgonBox>
                                <ArgonButton
                                  variant="gradient"
                                  color="light"
                                  sx={{ mr: 1 }}
                                  onClick={() => handleCancel(resetForm)}
                                >
                                  Cancel
                                </ArgonButton>
                                <ArgonButton
                                  disabled={isSubmitting}
                                  type="submit"
                                  variant="gradient"
                                  color="dark"
                                  onSubmit={isLastStep && handleFormOpen}
                                >
                                  {isLastStep ? "Send" : "Next"}
                                </ArgonButton>
                              </ArgonBox>
                            </>
                          </ArgonBox>
                        </ArgonBox>
                      </ArgonBox>
                    </Card>
                  </Form>
                )}
              </Formik>
            </Grid>
          )}
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default NewUser;
