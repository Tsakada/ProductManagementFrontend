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
import ImageUpload from "../ImageUpload/ImageUpload";
import SelectCategory from "../Include/DynamicSelect/DynamicSelect";

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
  const [selectCategory, setSelectCategory] = useState({ id: "", title: "" });
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
      console.log("createProduct===>", createProduct)
      if (updateProduct?.status === true) {
        setAlert(true, "success", updateProduct?.message);
        setRefetch();
        handleClose();
      } else {
        setAlert(true, "error", updateProduct?.message);
      }
    },
    onError: ({ message }) => {
      console.log("Error :  ", message);
      setLoading(false);
    },
  });

  // formik user
  const CheckValidation = Yup.object().shape({
    price: Yup.string().required(t("required")),
    category_id: Yup.string().required(t("required")),
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
              image: url,
              type_cash: typeCash,
              price: parseFloat(values.price),
            },
          },
        });
      } else {
        console.log("updateProduct :", {
          id: editData?._id,
          input: {
            ...values,
            type_cash: typeCash,
            price: parseFloat(values.price),
            image: url ? url : editData.image,
          },
        },)
        updateProduct({
          variables: {
            updateProductId: editData?._id,
            input: {
              ...values,
              image: url,
              type_cash: typeCash,
              price: parseFloat(values.price),
            },
          },
        });
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    resetForm,
    getFieldProps,
    setFieldValue,
  } = formik;
  console.log("values: ", values)
  useEffect(() => {
    if (open && dialogTitle === "Create") resetForm();
  }, [open]);

  useEffect(() => {
    setFieldValue("category_id", selectCategory?.id)
  }, [selectCategory])

  useEffect(() => {
    if (editData) {
      console.log("editData?.image :", editData?.image)
      setUrl(editData?.image)
      setFieldValue("price", editData?.price ?? "");
      setFieldValue("product_name", editData?.product_name ?? "");
    }
  }, [editData]);

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
                  <ImageUpload url={url ? url : editData?.image} setUrl={setUrl} open={open} />
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
                  <Typography className={language === "en" ? "field-title-en" : "field-title-kh"}>
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
                <Grid item xs={12}>
                  <Typography className={language === "en" ? "field-title-en" : "field-title-kh"
                  }
                  >
                    ប្រភេទ
                  </Typography>
                  <SelectCategory selectValue={selectCategory} setSelectValue={setSelectCategory} />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    ការពិពណ៌នា
                  </Typography>
                  <TextField
                    size="small"
                    type="number"
                    multiline
                    rows={3}
                    fullWidth
                    {...getFieldProps("description")}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
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
