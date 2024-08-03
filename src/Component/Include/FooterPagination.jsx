import { useState, useEffect, useContext } from "react";
import { Stack, Pagination, Select, MenuItem } from "@mui/material";
// src
import { AuthContext } from "../../context/AuthContext"
import { translateLauguage } from "../../Function/Translate";

export default function FooterPagination({
  page,
  limit,
  setPage,
  totalDocs,
  totalPages,
  handleLimit,
}) {
  //change language 
  const { language } = useContext(AuthContext);
  const { t } = translateLauguage(language);
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="right"
      sx={{ marginTop: "20px" }}
    >
      <Stack direction="column" justifyContent="center">
        <Pagination
          hideNextButton={false}
          hidePrevButton={false}
          page={page}
          count={totalPages}
          color="primary"
          variant="outlined"
          onChange={(event, pageNum) => setPage(parseInt(pageNum))}
        />
      </Stack>
      <Select size="small" value={limit} onChange={handleLimit}>
        <MenuItem value={6}>6/{t('page')}</MenuItem>
        <MenuItem value={8}>8/{t('page')}</MenuItem>
        <MenuItem value={10}>10/{t('page')}</MenuItem>
        {/* <MenuItem value={totalDocs}>All/Page</MenuItem> */}
      </Select>
    </Stack>
  )
}
