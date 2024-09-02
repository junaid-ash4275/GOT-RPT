/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Settings page components
import Sidenav from "containers/pages/account/settings/components/Sidenav";
import Header from "containers/pages/account/settings/components/Header";
import BasicInfo from "containers/pages/account/settings/components/BasicInfo";
import ChangePassword from "containers/pages/account/settings/components/ChangePassword";

function Settings() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={3}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} lg={9}>
            <ArgonBox mb={3}>
              <Grid container spacing={3}>
                {/* <Grid item xs={12}>
                  <Header />
                </Grid> */}
                <Grid item xs={12}>
                  <BasicInfo />
                </Grid>
                <Grid item xs={12}>
                  <ChangePassword />
                </Grid>
              </Grid>
            </ArgonBox>
          </Grid>
        </Grid>
      </ArgonBox>
    </DashboardLayout>
  );
}

export default Settings;
