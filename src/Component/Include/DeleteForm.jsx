import React, { useState, useContext, useEffect } from "react";
import {
     Grid,
     Stack,
     Button,
     Dialog,
     Divider,
     TextField,
     IconButton,
     Typography,
     DialogTitle,
     DialogContent,
     DialogActions,
     DialogContentText,
} from "@mui/material";
//Icons
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
//Srcs
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate";
// Style
import "../../Style/dialogstyle.scss";

export default function DeleteForm({ open, loading, handleClose, handleDelete, wordConfirmVal }) {
     const { language } = useContext(AuthContext);
     const { t } = translateLauguage(language);  
     const [confirmVal, setConfirmVal] = useState("");

     useEffect(() => {
          setConfirmVal("")
     }, [open])

     return (
          <Dialog open={open} className="dialog-container" fullWidth maxWidth="xs">
               <DialogTitle>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                         <Stack className={language === "en" ? "dialog-title-en" : "dialog-title-kh"}>
                              {t(`thead_delete_${wordConfirmVal}`)}
                         </Stack>
                         <IconButton onClick={handleClose}>
                              <DoDisturbOnOutlinedIcon className="close-icon" />
                         </IconButton>
                    </Stack>
                    <Divider sx={{ mt: 0.5 }} />
               </DialogTitle>

               <DialogContent>
                    <DialogContentText>
                         <Grid container spacing={2}>
                              <Grid item xs={12}>
                                   <Typography className={language === "en" ? "field-text-en" : "field-text-kh"}>
                                        {t("thead_delete_des")}
                                   </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                   <Stack direction="row" spacing={1} width="100%" >
                                        <Typography className={language === "en" ? "field-text-en" : "field-text-kh"}>
                                             {t("thead_please_type")}
                                        </Typography>
                                        <Typography className="confirm-val-title" variant="subtitle1">
                                             {wordConfirmVal}
                                        </Typography>
                                        <Typography className={language === "en" ? "field-text-en" : "field-text-kh"}>
                                             {t("label_to_delete")}
                                        </Typography>
                                   </Stack>
                                   <TextField
                                        fullWidth
                                        size="small"
                                        placeholder={wordConfirmVal}
                                        onChange={(e) => setConfirmVal(e.target.value)}
                                   />
                              </Grid>
                         </Grid>
                    </DialogContentText>
               </DialogContent>

               <DialogActions>
                    {confirmVal === wordConfirmVal ?
                         (
                              loading ?
                                   (
                                        <Button
                                             fullWidth
                                             variant="outlined"
                                             sx={{ ":hover": { backgroundColor: "red", border: "none" }, }}
                                             className={language === "en" ? "btn-delete-en" : "btn-delete-kh"}
                                        >
                                             {t("loading")}
                                        </Button>
                                   )
                                   :
                                   (
                                        <Button
                                             fullWidth
                                             variant="outlined"
                                             onClick={handleDelete}
                                             sx={{ ":hover": { backgroundColor: "red", border: "none" }, }}
                                             className={language === "en" ? "btn-delete-en" : "btn-delete-kh"}
                                        >
                                             {t("label_delete_now")}
                                        </Button>
                                   )
                         )
                         :
                         (
                              <Button className="btn-not-delete" fullWidth>
                                   {t("delete")}
                              </Button>
                         )
                    }
               </DialogActions>
          </Dialog>
     );
}
