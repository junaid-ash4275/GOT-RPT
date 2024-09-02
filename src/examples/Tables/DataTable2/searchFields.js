import React from "react";
import ArgonSelect from "components/ArgonSelect";
import ArgonBox from "components/ArgonBox";
import ArgonDatePicker from "components/ArgonDatePicker";
import ArgonButton from "components/ArgonButton";
import PropTypes from "prop-types";

const CustomComponentForSearch = ({ fields, buttons }) => {
  return (
    <ArgonBox
      display={{ xs: "block", sm: "flex", lg: "flex" }}
      justifyContent={{ xs: "center", sm: "space-between", lg: "left" }}
      alignItems="center"
      p={3}
      gap={{ xs: 2, sm: 3 }}
    >
      {fields.map((field, index) => (
        <ArgonBox
          key={index}
          display={{ xs: "block", sm: "flex", lg: "flex" }}
          gap={2}
          maxwidth={{ xs: "100%", sm: "auto", lg: "80%" }}
          mb={{ xs: "0.5rem", sm: 0, lg: 0 }}
        >
          {field.options ? (
            <ArgonSelect
              size="medium"
              placeholder={field.placeholder}
              options={field.options}
              onChange={field.onChange}
              value={field.value}
            />
          ) : (
            <ArgonDatePicker
              input={{ placeholder: field.placeholder, label: field.label }}
              label={field.label}
              onChange={field.onChange}
            />
          )}
        </ArgonBox>
      ))}

      {buttons.map((button, index) => (
        <ArgonButton key={index} onClick={button.onClick} sx={{ color: "#4667c8" }}>
          {button.label}
        </ArgonButton>
      ))}
    </ArgonBox>
  );
};

CustomComponentForSearch.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["date", "select", "button"]),
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      onChange: PropTypes.func,
      options: PropTypes.array,
      value: PropTypes.any,
      onClick: PropTypes.func,
    })
  ),
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
};

export default CustomComponentForSearch;
