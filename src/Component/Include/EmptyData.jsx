import {
  Stack,
  Typography,
  Avatar,
  TableBody, 
  TableRow,
  TableCell,
} from "@mui/material";
//Srcs
import "./emptydata.scss";
import EmptyImage from "../../Assets/empty-box.png";
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate";
import { useContext } from "react";

export default function EmptyData({ colSpan, padding }) {
  const { language } = useContext(AuthContext);
  const { t } = translateLauguage(language);
  const ifTable = (
    <TableBody className="body"> 
      <TableRow 
        className="body-row"
        sx={{
          "& .css-1ex1afd-MuiTableCell-root": {
            borderBottom: "none important ",
            backgroundColor: "none  !important ",
          },
        }}
      >
        <TableCell
          className="body-title"
          colSpan={colSpan} >
          <Stack 
            direction="row"
            justifyContent="center"
            className="empty-container"
          >
            <Stack direction="column" justifyContent="center">
              <Stack direction="row" justifyContent="center">
                <img src={EmptyImage} className="empty-image" />
              </Stack>
              <Typography className="text-title">{t("no_data")}</Typography>
              <Typography className="text-des">
                {t("your_collection_is_empty")}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>
      </TableRow>
    </TableBody>
  );

  const ifNoTable = (
    <Stack
      direction="row"
      justifyContent="center"
      className="empty-container"
      bgcolor="white"
      sx={{ padding: padding ? padding : "" }}
    >
      <Stack direction="column" justifyContent="center">
        <Stack direction="row" justifyContent="center">
          <img src={EmptyImage} className="empty-image" />
        </Stack>
        <Typography className="text-title">{t("no_data")}</Typography>
        <Typography className="text-des">
          {t("your_collection_is_empty")}
        </Typography>
      </Stack>
    </Stack>
  );

  if (colSpan) return ifTable;
  else return ifNoTable;
}
