import React, { useState, useContext } from "react";
import { Stack, IconButton, Tooltip, Box, Switch } from "@mui/material";
import { useMutation } from "@apollo/client";
//Icons
import { MdDelete, MdModeEdit } from "react-icons/md";
//Srcs
import "../../Style/actionstyle.scss"
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate"; 
import AffairForm from "./AffairForm";
import DeleteForm from "../Include/DeleteForm"
import { UPDATE_AFFAIR_IS_USE, DELETE_AFFAIR } from "../../Schema/Affair";

export default function AffairAction({ editData, setRefetch }) {

  const { language, setAlert } = useContext(AuthContext);
  const { t } = translateLauguage(language);
  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false); 
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Delete
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  // ======================== mutation update affair ========================
  const [updateAffairIsUse] = useMutation(UPDATE_AFFAIR_IS_USE, {
    onCompleted: ({ updateAffairIsUse }) => {
      if (updateAffairIsUse?.status) {
        setAlert(true, "success", updateAffairIsUse?.message);
        setRefetch();
      } else {
        setAlert(true, "error", updateAffairIsUse?.message);
      }
    },
    onError: (error) => {
      setLoading(false);
      setAlert(true, "error", error?.message);
    },
  });

  const handleUpdateStatus = () => {
    updateAffairIsUse({
      variables: {
        id: editData?._id,
        isUse: !editData?.isUse,
      },
    });
  };

  // ======================== delete affair ========================
  const [deleteAffair] = useMutation(DELETE_AFFAIR, {
    onCompleted: ({ deleteAffair }) => {
      setLoading(false);
      if (deleteAffair?.status === true) {
        setAlert(true, "success", deleteAffair?.message);
        setRefetch();
        handleCloseDelete();
      } else {
        setAlert(true, "error", deleteAffair?.message);
      }
    },
    onError: (error) => {
      setAlert(true, "error", error.message);
    },
  });

  const handleDelete = () => {
    setLoading(true);
    deleteAffair({
      variables: {
        id: editData?._id,
      },
    });
  };

  return (
    <Stack direction="row" justifyContent="right">
      <Switch checked={editData?.isUse ? true : false} onChange={() => handleUpdateStatus()} />
      <Tooltip
        title={t("update")}
        placement="top"
      >
        <IconButton onClick={() => handleOpen()}>
          <Box className="update-container">
            <MdModeEdit className="update-icon" />
          </Box>
        </IconButton>
      </Tooltip>
      <Tooltip
        title={t("delete")}
        placement="top"
      >
        <IconButton onClick={() => handleOpenDelete()}>
          <Box className="delete-container">
            <MdDelete className="delete-icon" />
          </Box>
        </IconButton>
      </Tooltip>

      <AffairForm
        open={open}
        editData={editData}
        dialogTitle="Update"
        setRefetch={setRefetch}
        handleClose={handleClose}
      /> 

      <DeleteForm
        loading={loading}
        open={openDelete}
        wordConfirmVal="affair"
        handleClose={handleCloseDelete}
        handleDelete={handleDelete}
      />
    </Stack>
  );
}
