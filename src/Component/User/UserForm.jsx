import React, { useState, useEffect, useContext } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import {
  Stack,
  Grid,
  Box,
  Button,
  Typography,
  Tooltip,
  TextField,
  IconButton,
  Divider,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import { useMutation } from "@apollo/client";
import { useMutation as mutationDeleteImage } from "react-query";
//icons
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
//Scrs
import "../../Style/dialogstyle.scss";
import EmptyImage from "../../Assets/empty-image.png";
// import CropImageFile from "../CropImage/CropImageFile";
import { UPDATE_USER } from "../../Schema/User";
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate";
import { deleteFileAPI } from "../../api/api";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function UserForm({
  open,
  setRefetch,
  handleClose,
  editData,
  dialogTitle,
}) {
  const { language, setAlert } = useContext(AuthContext);
  const { t } = translateLauguage(language);
  const [loading, setLoading] = useState(false);

  // ====================== upload Image ==========================
  const [profileHook, setProfileHook] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);

  // ===============  Mutations delete image  =======================
  const mutationDelete = mutationDeleteImage(deleteFileAPI, {
    onSuccess: (data, variables, context) => {
      // console.log(data)
      if (data?.data?.status) {
        console.log("sucess::", data?.data?.message);
      } else {
        console.log("error::", data?.data?.message);
      }
    },
    onError: (error, variables, context) => {
      console.log(error);
    },
  });
  let splitSrc = profileHook.split(":")[4];

  // mutationDelete.mutate({
  //   storage: "goglobalit_hrms",
  //   folder: "hrms_images",
  //   file: splitSrc.split("/")[0],
  // });

  const handleUploadImage = (e) => {
    // setFieldValue("imageSrc", "imageSrc")
    const imageFile = e.target.files[0];
    if (imageFile) {
      setImageFile(imageFile);
      setPhotoURL(URL.createObjectURL(imageFile));
      setOpenCrop(true);
    }
  };

  const [statusProgress, setStatusProgress] = useState(false);
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 100 : prevProgress + 10
      );
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);
  // ===================== End progress =============================

  // Update User
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) => {
      setLoading(false);
      console.log(updateUser, "::: updateUser");
      if (updateUser?.status === true) {
        setRefetch();
        handleClose();
        setAlert(true, "success", updateUser?.message);
        window.localStorage.setItem(
          "userLogin",
          JSON.stringify(updateUser?.data)
        );
        // window.location.reload();
        // dispatch({
        //   type: "LOGGED_IN_USER",
        //   payload: {
        //     email: updateUser?.data?.user?.email
        //       ? updateUser?.data?.user?.email
        //       : "customtoken@user.com",
        //     token: updateUser?.data?.token,
        //   },
        // });
      } else {
        setAlert(true, "error", updateUser?.message);
      }
    },
    onError: (error) => {
      setLoading(false);
      setAlert(true, "error", error?.message);
    },
  });

  //formik user
  const CheckValidation = Yup.object().shape({
    imageSrc: Yup.string(),
    username: Yup.string().required(t("required")),
    gender: Yup.string(),
    tell: Yup.string(),
    remark: Yup.string(),
  });

  //Formik
  const formik = useFormik({
    initialValues: {
      imageSrc: "",
      username: "",
      gender: "Female",
      tell: "",
      remark: "",
    },
    validationSchema: CheckValidation,
    onSubmit: (values) => {
      // console.log(values, ":: values");
      setLoading(true);
      updateUser({
        variables: {
          id: editData?._id,
          role: "Admin",
          input: {
            imageSrc: profileHook ? profileHook : editData?.imageSrc,
            username: values?.username,
            gender: values?.gender,
            tell: values?.tell,
            remark: values?.remark,
          },
        },
      });
    },
  });

  const {
    errors,
    touched,
    values,
    handleSubmit,
    resetForm,
    getFieldProps,
    setFieldValue,
  } = formik;

  // console.log("editData::", editData)

  useEffect(() => {
    if (open) {
      setFieldValue("username", editData?.username);
      setFieldValue("remark", editData?.remark ? editData?.remark : "");
      setFieldValue("gender", editData?.gender);
      setFieldValue("tell", editData?.tell ? editData?.tell : "");
    }
  }, [editData, open]);

  return (
    <Dialog open={open} className="dialog-container" fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" justifyContent="center">
          <Stack
            className={
              language === "en" ? "dialog-title-en" : "dialog-title-kh"
            }
          >
            {t(`thead_update_user`)}{" "}
          </Stack>
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton onClick={handleClose}>
            <DoDisturbOnOutlinedIcon className="close-icon" />
          </IconButton>
        </Stack>
        <Divider sx={{ mt: 1 }} />
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Grid container columnSpacing={3} rowSpacing={2}>
                <Grid item xs={12}>
                  {!openCrop ? (
                    <Box>
                      <Stack direction="row" justifyContent="center">
                        <Tooltip title="click to upload">
                          <Button component="label" className="btn-upload-user">
                            <TextField
                              type="file"
                              id="image"
                              sx={{ display: "none" }}
                              onChange={handleUploadImage}
                            />
                            <Avatar
                              className="avater-image-user"
                              src={
                                imageFile
                                  ? URL.createObjectURL(imageFile)
                                  : editData?.imageSrc
                                    ? editData?.imageSrc
                                    : EmptyImage
                              }
                            />
                          </Button>
                        </Tooltip>
                      </Stack>
                    </Box>
                  ) : (
                    // <CropImageFile
                    //   setProgress={setProgress}
                    //   setStatusProgress={setStatusProgress}
                    //   openCrop={openCrop}
                    //   setOpenCrop={setOpenCrop}
                    //   photoURL={photoURL}
                    //   setPhotoURL={setPhotoURL}
                    //   setImageFile={setImageFile}
                    //   setProfileHook={setProfileHook}
                    // />
                    ""
                  )}
                  {statusProgress && progress < 100 ? (
                    <Box sx={{ width: "100%", marginLeft: "20px" }}>
                      <LinearProgressWithLabel value={progress} />
                    </Box>
                  ) : (
                    <Typography
                      className="field-title"
                      sx={{ textAlign: "center", marginTop: "10px" }}
                    >
                      {t("thead_image")}
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    {t("thead_full_name")}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    className="text-field"
                    placeholder={t("thead_full_name")}
                    {...getFieldProps("username")}
                    error={Boolean(touched.username && errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    {t("thead_gender")}
                  </Typography>
                  <FormControl className="text-field" fullWidth size="small">
                    <Select
                      value={values?.gender}
                      onChange={(e) => setFieldValue("gender", e.target.value)}
                    >
                      <MenuItem value={"Male"}>Male</MenuItem>
                      <MenuItem value={"Female"}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    {t("thead_tel")}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    className="text-field"
                    placeholder={t("label_tel")}
                    {...getFieldProps("tell")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    className={
                      language === "en" ? "field-title-en" : "field-title-kh"
                    }
                  >
                    {t("thead_remark")}
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    className="text-field"
                    placeholder={t("thead_remark")}
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
            disabled={statusProgress && progress < 100 ? true : false}
            onClick={handleSubmit}
          >
            {dialogTitle === "Create" ? t(`create`) : t(`update`)}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
