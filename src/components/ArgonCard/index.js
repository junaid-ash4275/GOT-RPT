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

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Argon Dashboard 2 PRO MUI components
import ArgonBox from "components/ArgonBox";

import ArgonTypography from "components/ArgonTypography";

function ArgonCard({ title }) {
  return (
    <Card>
      <ArgonBox
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        p={2}
        style={{ height: "100px" }}
      >
        <ArgonTypography>{title}</ArgonTypography>
      </ArgonBox>
    </Card>
  );
}

ArgonCard.propTypes = {
  title: PropTypes.string,
};

export default ArgonCard;
