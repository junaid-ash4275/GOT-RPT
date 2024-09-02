import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Icon } from "@mui/material";
import ArgonButton from "components/ArgonButton";

const ReusableModal = ({ open, title, children, onClose, onApply }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Icon style={{ marginRight: "10px", verticalAlign: "middle" }}>filter_alt</Icon>
        <span style={{ fontWeight: "bold", marginTop: "0px" }}>{title}</span>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <ArgonButton onClick={onApply} color="primary" variant="contained">
          Apply Filter
        </ArgonButton>
        <ArgonButton onClick={onClose} color="secondary" variant="contained">
          Close
        </ArgonButton>
      </DialogActions>
    </Dialog>
  );
};

ReusableModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
};

export default ReusableModal;
