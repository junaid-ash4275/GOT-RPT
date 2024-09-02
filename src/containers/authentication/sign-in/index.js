import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormField from "components/app/FormField";
import { loginUser } from "api/umsApi";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import ArgonButton from "components/ArgonButton";
import IllustrationLayout from "containers/authentication/components/IllustrationLayout";
import { setUserInfo } from "features/user/userSlice";
import { Switch } from "@mui/material";

const bgImage =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg";

function Signin() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const validations = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required."),
    password: Yup.string().required("Password is required."),
  });

  const handleSubmit = async (values, actions) => {
    try {
      values.email = values.email.toLowerCase();
      const result = await loginUser({ email: values.email, password: values.password });

      if (result) {
        result.isUserLoggedin = true;
        dispatch(setUserInfo(result));
        navigate("/home");
        setError("");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error occurred during login");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={{
        image: bgImage,
        title: '"G.O.T. Systems"',
        description: "Innovative Technology Solutions For Independent Grocers",
      }}
    >
      <ArgonBox component="form" role="form">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validations}
          onSubmit={handleSubmit}
        >
          {({ values, touched, errors, handleSubmit, isSubmitting }) => (
            <Form id="link-creation-form" autoComplete="off">
              <ArgonBox>
                <ArgonBox mb={2}>
                  <FormField
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="user@user.com"
                    value={values.email}
                    error={errors.email && touched.email}
                    success={values.email.length > 0 && !errors.email}
                  />
                </ArgonBox>
                <ArgonBox mb={1}>
                  <FormField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="*******"
                    value={values.password}
                    error={errors.password && touched.password}
                    success={values.password.length > 0 && !errors.password}
                  />
                </ArgonBox>
                {error && (
                  <ArgonBox mb={2}>
                    <ArgonTypography variant="caption" color="error">
                      {error}
                    </ArgonTypography>
                  </ArgonBox>
                )}
                <ArgonBox display="flex" alignItems="center">
                  <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                  <ArgonTypography
                    variant="button"
                    fontWeight="regular"
                    onClick={handleSetRememberMe}
                    sx={{ cursor: "pointer", userSelect: "none" }}
                  >
                    &nbsp;&nbsp;Remember me
                  </ArgonTypography>
                </ArgonBox>
                <ArgonBox mt={4} mb={1}>
                  <ArgonButton
                    color="info"
                    size="large"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    Sign In
                  </ArgonButton>
                </ArgonBox>
              </ArgonBox>
            </Form>
          )}
        </Formik>
      </ArgonBox>
    </IllustrationLayout>
  );
}

export default Signin;
