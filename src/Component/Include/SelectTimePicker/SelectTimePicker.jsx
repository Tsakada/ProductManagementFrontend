import React, { useState } from "react";
import dayjs from "dayjs";
import { Stack } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";
export default function SelectTimePicker({ time, setTime, disabled }) {
  return (
    <Stack className={"dialog-container"}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          disabled={disabled}
          className="date-picker-field"
          value={
            time
              ? dayjs(
                  moment().set({
                    hour: time.slice(0, 2),
                    minute: time.slice(3, 5),
                  })
                )
              : null
          }
          onChange={(e) => setTime(moment(dayjs(e).toDate()).format("HH:mm"))}
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}
