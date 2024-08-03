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
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate";
import { CREATE_AFFAIR, UPDATE_AFFAIR } from "../../Schema/Affair";
import "../../Style/dialogstyle.scss";
import { CREATE_PRODUCT, UPDATE_PRODUCT } from "../../Schema/Product";
import ImageUpload from "../../Components/ImageUpload";

export default function ProductForm({
  open,
  editData,
  setRefetch,
  handleClose,
  dialogTitle,
}) {
  const { language, setAlert } = useContext(AuthContext);
  const { t } = translateLauguage(language);
  const [url, setUrl] = useState("");
  const [typeCash, setTypeCash] = useState("USD");
  const [loading, setLoading] = useState(false);
  //create
  const [createProduct] = useMutation(CREATE_PRODUCT, {
    onCompleted: ({ createProduct }) => {
      console.log("createProduct===>", createProduct)
      setLoading(false);
      if (createProduct?.status === true) {
        setRefetch();
        handleClose();
        resetForm();
        setAlert(true, "success", createProduct?.message);
      } else {
        setAlert(true, "error", createProduct?.message);
      }
    },
    onError: (error) => {
      console.log(error.message);
      setLoading(false);
    },
  });

  //update
  const [updateProduct] = useMutation(UPDATE_PRODUCT, {
    onCompleted: ({ updateProduct }) => {
      setLoading(false);
      if (updateProduct?.status === true) {
        setAlert(true, "success", updateProduct?.message);
        setRefetch();
        handleClose();
      } else {
        setAlert(true, "error", updateProduct?.message);
      }
    },
    onError: (error) => {
      setLoading(false);
      setAlert(true, "error", error?.message);
    },
  });

  // formik user
  const CheckValidation = Yup.object().shape({
    price: Yup.string().required(t("required")),
    product_name: Yup.string().required(t("required")),
  });

  const formik = useFormik({
    initialValues: {
      price: "",
      product_name: "",
    },
    validationSchema: CheckValidation,
    onSubmit: (values) => {
      setLoading(true);
      if (dialogTitle === "Create") {
        createProduct({
          variables: {
            input: {
              ...values,
              price: parseFloat(values.price),
              image: url,
              type_cash: typeCash
            },
          },
        });
      } else {
        updateProduct({
          variables: {
            id: editData?._id,
            input: {
              ...values,
              price: parseFloat(values.price),
              image: url,
              type_cash: typeCash
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
      setFieldValue("price", editData?.price ?? "");
      setFieldValue("product_name", editData?.product_name ?? "");
    }
  }, [editData, open]);
  console.log("url==>", url)
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
            {dialogTitle === "Create" ? "បង្កើតផលិតផល" : "កែប្រែផលិតផល"}
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
                  <ImageUpload url={url} setUrl={setUrl} open={open} />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    ឈ្មោះផលិតផល
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    {...getFieldProps("product_name")}
                    helperText={touched.product_name && errors.product_name}
                    error={Boolean(touched.product_name && errors.product_name)}
                  />
                </Grid>

                <Grid item xs={9}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    តម្លៃ
                  </Typography>
                  <TextField
                    size="small" type="number"
                    fullWidth
                    InputProps={{ endAdornment: typeCash === "USD" ? "$" : "៛" }}
                    {...getFieldProps("price")}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Typography className={language === "en" ? "field-title-en" : "field-title-kh"
                  }
                  >
                    ប្រភេទ
                  </Typography>
                  <FormControl fullWidth size="small">
                    <Select
                      value={typeCash}
                      onChange={({ target }) => setTypeCash(target?.value)}
                    >
                      <MenuItem value={"USD"}>USD</MenuItem>
                      <MenuItem value={"KHR"}>KHR</MenuItem>
                    </Select>
                  </FormControl>
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
