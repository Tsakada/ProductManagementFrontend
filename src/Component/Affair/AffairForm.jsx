import React, { useState, useEffect, useContext } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Box,
  Grid,
  Stack,
  Button,
  Dialog,
  Divider,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useMutation } from "@apollo/client";
//icons
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
//Scrs
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate";
// Schema
import { CREATE_AFFAIR, UPDATE_AFFAIR } from "../../Schema/Affair";
// Style
import "../../Style/dialogstyle.scss";

export default function AffairForm({
  open,
  editData,
  setRefetch,
  handleClose,
  dialogTitle,
}) {
  const { language, setAlert } = useContext(AuthContext);
  const { t } = translateLauguage(language);

  const [loading, setLoading] = useState(false);
  //create
  const [createAffair] = useMutation(CREATE_AFFAIR, {
    onCompleted: ({ createAffair }) => {
      setLoading(false);
      if (createAffair?.status === true) {
        setRefetch();
        handleClose();
        resetForm();
        setAlert(true, "success", createAffair?.message);
      } else {
        setAlert(true, "error", createAffair?.message);
      }
    },
    onError: (error) => {
      setLoading(false);
      setAlert(true, "error", error?.message);
    },
  });

  //update
  const [updateAffair] = useMutation(UPDATE_AFFAIR, {
    onCompleted: ({ updateAffair }) => {
      setLoading(false);
      if (updateAffair?.status === true) {
        setAlert(true, "success", updateAffair?.message);
        setRefetch();
        handleClose();
      } else {
        setAlert(true, "error", updateAffair?.message);
      }
    },
    onError: (error) => {
      setLoading(false);
      setAlert(true, "error", error?.message);
    },
  });

  // formik user
  const CheckValidation = Yup.object().shape({
    affairName: Yup.string().required(t("required")),
    affairKhName: Yup.string().required(t("required")),
    remark: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      affairName: "",
      affairKhName: "",
      remark: "",
    },
    validationSchema: CheckValidation,
    onSubmit: (values) => {
      setLoading(true);
      if (dialogTitle === "Create") {
        createAffair({
          variables: {
            input: {
              ...values,
            },
          },
        });
      } else {
        updateAffair({
          variables: {
            id: editData?._id,
            input: {
              ...values,
            },
          },
        });
      }
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    resetForm,
    getFieldProps,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (open && dialogTitle === "Create") resetForm();
  }, [open]);

  useEffect(() => {
    if (editData) {
      setFieldValue("affairName", editData?.affairName ?? "");
      setFieldValue("affairKhName", editData?.affairKhName ?? "");
      setFieldValue("remark", editData?.remark ?? "");
    }
  }, [editData, open]);

  return (
    <Dialog open={open} className="dialog-container" fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            className={
              language === "en" ? "dialog-title-en" : "dialog-title-kh"
            }
          >
            {dialogTitle === "Create"
              ? t(`thead_create_affair`)
              : t(`thead_update_affair`)}
          </Typography>
          <IconButton onClick={handleClose}>
            {" "}
            <DoDisturbOnOutlinedIcon className="close-icon" />{" "}
          </IconButton>
        </Stack>
        <Divider sx={{ mt: 0.5 }} />
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    {t(`thead_affair_name`)}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    {...getFieldProps("affairName")}
                    placeholder={t(`label_affair_name`)}
                    helperText={touched.affairName && errors.affairName}
                    error={Boolean(touched.affairName && errors.affairName)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    {t(`thead_affair_name_kh`)}
                  </Typography>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder={t(`label_affair_name_kh`)}
                    {...getFieldProps("affairKhName")}
                    error={Boolean(touched.affairKhName && errors.affairKhName)}
                    helperText={touched.affairKhName && errors.affairKhName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    {t(`thead_remark`)}
                  </Typography>
                  <TextField
                    rows={3}
                    fullWidth
                    multiline
                    size="small"
                    placeholder={t(`label_remark`)}
                    {...getFieldProps("remark")}
                  />
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </DialogContentText>
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
            {dialogTitle === "Create" ? t(`create`) : t(`update`)}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
