import React, { useState, useEffect, useContext } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
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
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate";
import "../../Style/dialogstyle.scss";
import { CREATE_CATEGORY, UPDATE_CATEGORY } from "../../Schema/Category";

export default function CategoryForm({
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
  const [createCategory] = useMutation(CREATE_CATEGORY, {
    onCompleted: ({ createCategory }) => {
      console.log("createCategory===>", createCategory)
      setLoading(false);
      if (createCategory?.status === true) {
        setRefetch();
        handleClose();
        resetForm();
        setAlert(true, "success", createCategory?.message);
      } else {
        setAlert(true, "error", createCategory?.message);
      }
    },
    onError: (error) => {
      console.log(error.message);
      setLoading(false);
    },
  });

  //update
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    onCompleted: ({ updateCategory }) => {

      setLoading(false);
      if (updateCategory?.status === true) {
        setAlert(true, "success", updateCategory?.message);
        setRefetch();
        handleClose();
      } else {
        setAlert(true, "error", updateCategory?.message);
      }
    },
    onError: (error) => {
      console.log(error.message);
      setLoading(false);
    },
  });

  // formik user
  const CheckValidation = Yup.object().shape({
    remark: Yup.string(),
    category_name: Yup.string().required(t("required")),
  });

  const formik = useFormik({
    initialValues: {
      remark: "",
      category_name: "",
    },
    validationSchema: CheckValidation,
    onSubmit: (values) => {
      setLoading(true);
      if (dialogTitle === "Create") {
        createCategory({
          variables: {
            input: {
              ...values,
            },
          },
        });
      } else {
        updateCategory({
          variables: {
            updateCategoryId: editData?._id,
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
      setFieldValue("remark", editData?.remark ?? "");
      setFieldValue("category_name", editData?.category_name ?? "");
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
            {dialogTitle === "Create" ? "បង្កើតប្រភេទ" : "កែប្រែប្រភេទ"}
          </Typography>
          <IconButton onClick={handleClose}>
            <DoDisturbOnOutlinedIcon className="close-icon" />
          </IconButton>
        </Stack>
        <Divider sx={{ mt: 0.5 }} />
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    ឈ្មោះប្រភេទ
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    {...getFieldProps("category_name")}
                    helperText={touched.category_name && errors.category_name}
                    error={Boolean(touched.category_name && errors.category_name)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    ចំណាំ
                  </Typography>
                  <TextField
                    rows={2}
                    multiline
                    fullWidth
                    size="small"
                    type="number"
                    {...getFieldProps("remark")}
                    error={Boolean(touched.remark && errors.remark)}
                    helperText={touched.remark && errors.remark}
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
