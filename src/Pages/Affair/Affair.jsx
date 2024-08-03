// Dependency
import {
  Box,
  Grid,
  Stack,
  Table,
  Select,
  Button,
  MenuItem,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TableHead,
  Typography,
  FormControl,
  InputAdornment,
  TableContainer,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// Component
import { AuthContext } from "../../context/AuthContext";
import EmptyData from "../../Component/Include/EmptyData";
import AffairForm from "../../Component/Affair/AffairForm";
import { translateLauguage } from "../../Function/Translate";
import LoadingPage from "../../Component/Include/LoadingPage";
import AffairAction from "../../Component/Affair/AffairAction";
// Icon
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// Style
import "../../Style/pagestyle.scss";

// Schema
import { GET_AFFAIR } from "../../Schema/Affair";

export default function Affair() {
  const { language } = useContext(AuthContext);
  const { t } = translateLauguage(language);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [tableData, setTableData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isUse, setIsUse] = useState("All");

  // Query
  const { refetch } = useQuery(GET_AFFAIR, {
    variables: {
      keyword: keyword,
      isUse: isUse === "All" ? null : isUse,
    },
    onCompleted: ({ getAffair }) => {
      setLoading(false);
      if (getAffair) setTableData(getAffair);
    },
    onError: (error) => {
      setLoading(true);
      console.log(error.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [keyword]);

  // ======================= Resize width Screen ======================
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth - 50);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="page-container">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="row" alignItems="center" spacing={0.6}>
          <Typography
            onClick={() => navigate("/system-setting")}
            className={language === "en" ? "page-title-en" : "page-title-kh"}
            sx={{ cursor: "pointer" }}
          >
            {t("thead_setting")}
          </Typography>
          <Typography
            className={language === "en" ? "page-title-en" : "page-title-kh"}
          >
            /
          </Typography>
          <Typography
            className={language === "en" ? "page-title-en" : "page-title-kh"}
          >
            {t("thead_affair")}{" "}
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ marginTop: "30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4} lg={2.4} xl={2.4}>
            <TextField
              className="search-field"
              fullWidth
              placeholder={t(`search`)}
              size="small"
              onChange={(e) => setKeyword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={2.4} xl={2}>
            <FormControl className="search-field" fullWidth size="small">
              <Select value={isUse} onChange={(e) => setIsUse(e.target?.value)}>
                <MenuItem value="All">{t("thead_status")}</MenuItem>
                <MenuItem value={true}>{t("thead_use")}</MenuItem>
                <MenuItem value={false}>{t("thead_not_used")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={7.2} xl={7.6}>
            <Stack
              height="100%"
              direction="row"
              alignItems="flex-end"
              justifyContent="flex-end"
            >
              <Button
                className="btn-create"
                onClick={handleOpen}
                endIcon={<AddCircleOutlineIcon className="icon-add" />}
              >
                <Typography
                  className={
                    language === "en" ? "style-add-en" : "style-add-kh"
                  }
                >
                  {t(`create`)}
                </Typography>
              </Button>
            </Stack>
            <AffairForm
              open={open}
              setRefetch={refetch}
              dialogTitle="Create"
              handleClose={handleClose}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className="body-container">
        <TableContainer sx={{ maxWidth: `${width}px`, whiteSpace: "nowrap" }}>
          <Table className="table">
            <TableHead>
              <TableRow className="table-row">
                <TableCell
                  className={
                    language === "en"
                      ? "header-title-start-en"
                      : "header-title-start-kh"
                  }
                  width="8%"
                >
                  {t(`no`)}
                </TableCell>
                <TableCell
                  className={
                    language === "en" ? "header-title-en" : "header-title-kh"
                  }
                  width="30%"
                >
                  {t(`thead_affair_name`)}
                </TableCell>
                <TableCell
                  className={
                    language === "en" ? "header-title-en" : "header-title-kh"
                  }
                  width="30%"
                >
                  {t(`thead_remark`)}
                </TableCell>
                <TableCell className="header-title-end"></TableCell>
              </TableRow>
            </TableHead>

            {loading ? (
              <LoadingPage colSpan={5} />
            ) : tableData?.length === 0 ? (
              <EmptyData colSpan={5} />
            ) : (
              <TableBody className="body">
                {tableData?.map((row, index) => {
                  return (
                    <TableRow className="body-row" key={index}>
                      <TableCell className="body-cell-start">
                        {index + 1}-
                      </TableCell>
                      <TableCell className="body-cell">
                        {language === "en"
                          ? row?.affairName
                          : row?.affairKhName}
                      </TableCell>

                      <TableCell className="body-cell">{row?.remark}</TableCell>
                      <TableCell className="body-cell-end" align="right">
                        <AffairAction
                          editData={row}
                          dialogTitle="Update"
                          setRefetch={refetch}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}
