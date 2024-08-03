import React, { useState, useContext } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
//Icons
//Srcs
import "./cardsetting.scss"
import "../../Style/actionstyle.scss"
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate";
import { UPDATE_AFFAIR_IS_USE } from "../../Schema/Affair";
import { DELETE_PRODUCT } from "../../Schema/Product";
import categories from "../../Assets/Setting/categories.png"
import { useNavigate } from "react-router-dom";
export default function CardSetting({ item }) {

  const { language, setAlert } = useContext(AuthContext);
  const { t } = translateLauguage(language);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: "white" }} className='setting-card' onClick={() => navigate(item?.navigate)}>
      <Stack direction="row" alignItems="center" spacing={2}>
        <img src={categories} alt="" className='image-card' />
        <Stack direction="column" spacing={1}>
          <Typography className='title-card' >{item?.title}</Typography>
          <Typography className='description-card' >{item?.description}</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
