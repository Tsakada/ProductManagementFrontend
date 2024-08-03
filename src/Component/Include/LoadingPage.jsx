import { Stack, TableRow, TableCell, TableBody, } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
// Style
import "../../Style/pagestyle.scss";
export default function LoadingPage({ colSpan }) {
  const ifTable = (
    <TableBody className="body">
      <TableRow className="body-row" sx={{ "& .css-1ex1afd-MuiTableCell-root": { borderBottom: "none" } }}>
        <TableCell className="body-title" colSpan={colSpan}>
          <Stack direction="column" justifyContent="center" height="400px">
            <Stack direction="row" justifyContent="center">
              <CircularProgress />
            </Stack>
          </Stack>
        </TableCell>
      </TableRow>
    </TableBody>
  );

  const ifNoTable = (
    <Stack direction="column" justifyContent="center" height="300px" width="100%" bgcolor="white" mt={1} >
      <Stack direction="row" justifyContent="center">
        <CircularProgress />
      </Stack>
    </Stack>
  );

  if (colSpan) return ifTable;
  else return ifNoTable; 
}
