import * as React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "../../../Style/pagestyle.scss";
import { Stack } from "@mui/material";
import moment from "moment";
import dayjs from "dayjs";
export default function SelectDatePicker({ date, setDate, views }) {
  return (
    <Stack className={"page-container"}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={views}
          onChange={setDate}
          className="search-field"
          value={date ? new Date(date) : null}
        />
      </LocalizationProvider>
    </Stack>
  );
}
