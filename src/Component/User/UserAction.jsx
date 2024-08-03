import React, { useState, useContext } from "react";
import { Stack, IconButton, Tooltip, Box } from "@mui/material";
//Icons
import { MdDelete, MdModeEdit } from "react-icons/md";
import { VscKey } from "react-icons/vsc";
//Srcs
import "../../Style/actionstyle.scss"
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate";
import UserForm from "./UserForm";
import ResetPassword from "./ResetPassword"

export default function UserAction({
  editData,
  setRefetch,
}) {

  const { language } = useContext(AuthContext);
  const { t } = translateLauguage(language);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openReset, setOpenReset] = useState(false);
  const handleOpenReset = () => setOpenReset(true);
  const handleCloseReset = () => setOpenReset(false);
  // console.log("userLogin===>", JSON.parse(window.localStorage.getItem("userLogin"))._id)

  const UserId = JSON.parse(window.localStorage.getItem("userLogin"))?._id;
  if (UserId === editData?._id) {

    console.log("editData?._id===>", editData)
  }
  return (
    <Stack direction="row" justifyContent="right">

      {
        UserId === editData?._id ?
          <>
            <Tooltip title={t("update")} placement="top">
              <IconButton onClick={handleOpenReset} disabled={!editData?.isAllow} >
                <Box className="reset-container" >
                  <VscKey className="reset-icon" />
                </Box>
              </IconButton>
            </Tooltip>
            <Tooltip title={t("update")} placement="top"   > 
              <IconButton onClick={() => handleOpen()}>
                <Box className="update-container">
                  <MdModeEdit className="update-icon" />
                </Box>
              </IconButton>
            </Tooltip>
          </>
          : null
      }

      <ResetPassword
        open={openReset}
        handleClose={handleCloseReset}
        editData={editData}
        setRefetch={setRefetch}
      />

      <UserForm
        open={open}
        handleClose={handleClose}
        dialogTitle="Update"
        editData={editData}
        setRefetch={setRefetch}
      />
    </Stack >
  );
}
