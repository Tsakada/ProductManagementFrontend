// Dependency
import {
  Box,
  Typography,
  Stack,
  TextField,
  Avatar,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import * as Yup from "yup";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";

// icons & img
import logiImage from "../../../Assets/unlock.png";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Style
import "./forgotpassword.scss";

//src
import { translateLauguage } from "../../../Function/Translate";
import { AuthContext } from "../../../context/AuthContext";
import { useMutation } from "@apollo/client";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { language, setAlert } = React.useContext(AuthContext);
  const { t } = translateLauguage(language);
  const [loading, setLoading] = React.useState(false);

  // const [adminSendCode] = useMutation(ADMIN_SEND_CODE, {
  //   onCompleted: ({ adminSendCode }) => {
  //     setLoading(false);
  //     if (adminSendCode?.status) {
  //       console.log("adminSendCode==>", adminSendCode?.verifyCodeToken);
  //       window.localStorage.setItem(
  //         "verifyCodeToken",
  //         adminSendCode?.verifyCodeToken
  //       );
  //       setAlert(true, "success", adminSendCode?.message);
  //       navigate("/verifyotp");
  //     } else {
  //       setAlert(true, "error", adminSendCode?.message);
  //     }
  //   },
  //   onError: (error) => {
  //     window.localStorage.removeItem("email");
  //     console.log("error: ", error.message);
  //     setLoading(false);
  //   },
  // });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required(t("required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      // adminSendCode({
      //   variables: {
      //     role: "Admin",
      //     isResend: false,
      //     email: values?.email,
      //   },
      // });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box className="forgotpassword-page">
            <Box className="container">
              <Stack spacing={3} direction="column">
                <Stack
                  spacing={2}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Avatar
                    sx={{ width: 110, height: 110 }}
                    variant="square"
                    alt="logo"
                    src={logiImage}
                  />
                  <Stack
                    width={"80%"}
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography className="title" variant="h6" align="center">
                      Forgot Password
                    </Typography>
                    <Typography className="sub-title">
                      Enter the email you used to create your account so we can
                      you OTP for reset your password
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="column" spacing={3}>
                  <TextField
                    className="text-field"
                    size="small"
                    fullWidth
                    placeholder="example@gmail.com"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon
                            className="icon"
                            sx={{ color: "#0023DB" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    disabled={loading}
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: "#0023DB",
                      ":hover": { backgroundColor: "#0023DB", color: "white" },
                    }}
                  >
                    {loading ? "loading..." : "Send"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/login")}
                    sx={{
                      color: "#0023DB",
                      borderColor: "#0023DB",
                      ":hover": { backgroundColor: "#0023DB", color: "white" },
                    }}
                  >
                    Back to Login
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <Typography
              variant="body2"
              align="center"
              sx={{ mb: 3, letterSpacing: "2px" }}
            >
              &#169;Copyright 2022, Employee Record
            </Typography>
          </Box>
        </Form>
      </FormikProvider>
    </div>
  );
}
