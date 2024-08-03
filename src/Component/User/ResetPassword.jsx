import React, { useContext, useEffect, useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { string, ref } from "yup";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Grid,
  Stack,
  Divider,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  DialogActions,
} from "@mui/material";
import { useMutation } from "@apollo/client";
//Icons
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
//Src
import "../../Style/dialogstyle.scss";
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate";
import { UPDATE_USER_PASSWORD } from "../../Schema/User";

export default function UpdateAdminPwd({
  open,
  handleClose,
  editData,
  setRefetch,
}) {
  // Change Language
  const { language } = useContext(AuthContext);
  const { t } = translateLauguage(language);

  const { setAlert } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  //============== HIDE AND SHOW VIBILITY ===============
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD, {
    onCompleted: async ({ updateUserPassword }) => {
      setLoading(false);
      if (updateUserPassword?.status) {
        window.location.reload();
        setAlert(true, "success", updateUserPassword?.message);
        handleClose();
        setRefetch();
        resetForm();
      } else {
        setAlert(true, "error", updateUserPassword?.message);
      }
    },
    onError: (error) => {
      console.log("error:", error);
      setLoading(false);
    },
  });

  const passwordRules =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{10,}$/;
  //fromik
  const CheckValidation = Yup.object().shape({
    newPassword: Yup.string()
      .required(t("required"))
      .matches(passwordRules, {
        message: t("thead_please_enter_a_stronger_password"),
      }),
    confirmPassword: string()
      .required(t("required"))
      .oneOf([ref("newPassword")], t("thead_wrong_password")),
  });

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: CheckValidation,
    onSubmit: (values) => { 
      setLoading(true);
      updateUserPassword({
        variables: {
          role: "Admin",
          id: editData?._id,
          newPassword: values?.newPassword,
        },
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, resetForm } = formik;
  useEffect(() => {
    if (open) resetForm();
  }, [open]);
  return (
    <Dialog open={open} className="dialog-container" fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            className={
              language === "en" ? "dialog-title-en" : "dialog-title-kh"
            }
          >
            {t("modal_title_reset_passwd")}
          </Stack>
          <IconButton onClick={handleClose}>
            <DoDisturbOnOutlinedIcon className="close-icon" />
          </IconButton>
        </Stack>
        <Divider sx={{ mt: 0.5 }} />
      </DialogTitle>

      <DialogContent>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container rowSpacing={2} columnSpacing={3}>
              <Grid item xs={6}>
                <Typography
                  className={
                    language === "en" ? "field-title-en" : "field-title-kh"
                  }
                >
                  {t("thead_newpassword")}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  className="text-field"
                  placeholder={t("label_newpassword")}
                  type={show ? "text" : "password"}
                  {...getFieldProps("newPassword")}
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  helperText={touched.newPassword && errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="start"
                        onClick={handleClick}
                        sx={{ cursor: "pointer" }}
                      >
                        {show ? (
                          <VisibilityIcon className="viewpw-icon" />
                        ) : (
                          <VisibilityOffIcon className="viewpw-icon" />
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <Typography
                  className={
                    language === "en" ? "field-title-en" : "field-title-kh"
                  }
                >
                  {t("thead_confirmpassword")}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  className="text-field"
                  placeholder={t("label_confirmpassword")}
                  type={show ? "text" : "password"}
                  {...getFieldProps("confirmPassword")}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </DialogContent>

      <DialogActions>
        {loading ? (
          <Button
            fullWidth
            className={language === "en" ? "btn-create" : "btn-create-kh"}
          >
            {t(`loading`)}
          </Button>
        ) : (
          <Button
            fullWidth
            className={language === "en" ? "btn-create" : "btn-create-kh"}
            onClick={handleSubmit}
          >
            {t(`update`)}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
