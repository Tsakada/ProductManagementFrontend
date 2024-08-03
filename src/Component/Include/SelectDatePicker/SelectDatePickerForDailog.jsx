import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "../../../Style/dialogstyle.scss";
import { Stack } from "@mui/material";
import moment from "moment";
export default function SelectDatePickerForDailog({
  start,
  end,
  date,
  views,
  setDate,
  isShouldDisableDate,
}) {
  const shouldDisableDate = (d) => {
    if (moment(d).format("DD") === "01") {
      if (start) return true;
      else return false;
    } else if (
      moment(d).format("DD") === moment(d).endOf("month").format("DD")
    ) {
      if (end) return true;
      else return false;
    } else {
      return true;
    }
  }; 
  return (
    <Stack className="dialog-container">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          // format="dd-MM-yyyy"
          views={views}
          onChange={setDate}
          className="date-picker-field"
          shouldDisableDate={isShouldDisableDate ? shouldDisableDate : false}
          value={Boolean(date) ? new Date(date) : null}
        />
      </LocalizationProvider>
    </Stack>
  );
}
