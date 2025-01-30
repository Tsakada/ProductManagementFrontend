// Dependency
import {
  Box,
  Stack,
  Avatar,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik, Form, FormikProvider } from "formik";

// icons & img
import logiImage from "../../../Assets/Go-Global-IT-Logo-02.png";

import { translateLauguage } from "../../../Function/Translate";
import { AuthContext } from "../../../context/AuthContext";
// import { SYSTEM_LOGIN } from "../../../Schema/Login";
import { useMutation } from "@apollo/client";
//Icons & Asset
import VisibilityIcon from "@mui/icons-material/Visibility";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import "./login.scss"
export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const { setAlert, dispatch, language } = useContext(AuthContext);
  const { t } = translateLauguage(language);
  // hide password hook
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // const [adminLogin] = useMutation(SYSTEM_LOGIN, {
  //   onCompleted: ({ adminLogin }) => {
  //     if (adminLogin?.status) {
  //       setAlert(true, "success", adminLogin?.message);
  //       setAlert(true, "success", adminLogin?.message);
  //       window.localStorage.setItem(
  //         "userLogin",
  //         JSON.stringify(adminLogin?.data?.user)
  //       );
  //       window.localStorage.setItem("token", adminLogin?.data?.token);
  //       setTimeout(() => {
  //         navigate("/");
  //         window.location.reload();
  //       }, 1000);
  //     } else {
  //       setAlert(true, "error", adminLogin?.message);
  //       setLoading(false);
  //     }
  //   },
  //   onError: (error) => {
  //     setAlert(true, "error", {
  //       messageKh: error.message,
  //       messageEn: error.message,
  //     });

  //     console.log("error==>", error);
  //     setLoading(false);
  //   },
  // });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email!").required(t("required")),
    password: Yup.string()
      .required(t("required"))
      .min(6, "Password must be 6 characters!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      // adminLogin({
      //   variables: {
      //     ...values,
      //   },
      // });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div  >
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack className="login-page" direction="row" alignItems="center" justifyContent="center">
            <Box className="container"  >
              <Stack spacing={3} direction="column">
                <Stack
                  spacing={2}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >

                  <Stack
                    width={"80%"}
                    spacing={1}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Typography className="title" variant="h6" align="center">
                      LOGIN
                    </Typography>
                    <Typography className="sub-title">
                      Enter your email and password to access your account
                    </Typography>
                  </Stack>
                </Stack>
                <Stack direction="column" spacing={5}>
                  <Stack direction="column" spacing={2}>
                    <Stack>
                      <Typography className="text-field-title" >Email</Typography>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="example@gmail.com"
                        {...getFieldProps("email")}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailOutlinedIcon className="icon" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                    <Stack>
                      <Typography className="text-field-title">  Password</Typography>
                      <TextField
                        size="small"
                        fullWidth
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        {...getFieldProps("password")}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HttpsOutlinedIcon className="icon" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment
                              position="start"
                              onClick={handleClick}
                            >
                              {show ? (
                                <VisibilityIcon sx={{ cursor: "pointer" }} />
                              ) : (
                                <VisibilityOffIcon sx={{ cursor: "pointer" }} />
                              )}
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Stack>
                  </Stack>
                  <Button
                    disabled={loading}
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: "#0f81c2",
                      ":hover": { backgroundColor: "#0f81c2", color: "white" },
                    }}
                  >
                    {loading ? "loading..." : "Login"}
                  </Button>
                </Stack>
              </Stack>
            </Box>

          </Stack>
        </Form>
      </FormikProvider>
    </div>
  );
}
