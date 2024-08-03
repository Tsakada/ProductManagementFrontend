// Dependency
import {
  Box,
  Grid,
  Stack,
  Table,
  Avatar,
  TableRow,
  TableCell,
  TableBody,
  TextField, Button,
  TableHead,
  Typography,
  TableContainer,
  InputAdornment,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useQuery } from "@apollo/client";

// Icons
import SearchIcon from "@mui/icons-material/Search";

// Style
import "../../Style/pagestyle.scss";

// src
import { AuthContext } from "../../context/AuthContext";
import UserAction from "../../Component/User/UserAction";
import EmptyData from "../../Component/Include/EmptyData";
import { translateLauguage } from "../../Function/Translate";
import LoadingPage from "../../Component/Include/LoadingPage";
import FooterPagination from "../../Component/Include/FooterPagination";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// Schema
import { GET_USER_PAGINATION } from "../../Schema/User";
import { useNavigate } from "react-router-dom";

export default function User() {
  const { language } = useContext(AuthContext);
  const { t } = translateLauguage(language);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // get user
  const [tableData, setTableData] = useState([]);
  const [paginationData, setPaginationData] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [keyword, setKeyword] = useState("");

  // Query
  const { refetch } = useQuery(GET_USER_PAGINATION, {
    variables: {
      page: page,
      limit: limit,
      keyword: keyword,
      pagination: true,
    },
    onCompleted: ({ getAdminByCompanyPagination }) => {
      setTableData(getAdminByCompanyPagination?.data);
      setPaginationData(getAdminByCompanyPagination?.paginator);
      setLoading(false);
    },
    onError: (error) => {
      setLoading(true);
      console.log(error.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [page, limit, keyword]);

  const handleLimit = (e) => {
    setLimit(e.target.value);
    setPage(1);
  };

  // ======================= Resize width Screen ======================
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth - 50);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  console.log("tableData==>", tableData);
  return (
    <div className="page-container">
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Stack direction="row" spacing={2}>
          <Box className="slash" />
          <Stack direction="row" alignItems="center" spacing={0.6}>
            <Typography
              onClick={() => navigate("/setting")}
              className={language === "en" ? "page-title-en" : "page-title-kh"}
              sx={{ cursor: "pointer" }}
            >
              ការកំណត់
            </Typography>
            <Typography
              className={language === "en" ? "page-title-en" : "page-title-kh"}
            >
              /
            </Typography>
            <Typography
              className={language === "en" ? "page-title-en" : "page-title-kh"}
            >
              អ្នកប្រើប្រាស់
            </Typography>
          </Stack>
        </Stack>
        <Button
          className="btn-create"
          // onClick={handleOpen}
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
        {/* <ProductForm
          open={open}
          setRefetch={refetch}
          dialogTitle="Create"
          handleClose={handleClose}
        /> */}
      </Stack>

      <Box sx={{ marginTop: "20px" }}>
        <Grid container spacing={1.5}>
          <Grid item xs={6} sm={4} md={4} lg={2.4} xl={2.4}>
            {/* <Typography className="header-text">{t("thead_search")}</Typography> */}
            <TextField
              className="search-field"
              fullWidth
              placeholder={t(`search`)}
              size="small"
              onChange={(e) => setKeyword(e.target.value)}
              InputProps={{
                style: { fontFamily: "Khmer OS Siemreap" },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* <Grid item xs={6} sm={8} md={8} lg={9.6} xl={9.6}>
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
                <Typography className={language === "en" ? "style-add-en" : "style-add-kh"}>
                  {t(`create`)}
                </Typography>
              </Button>
            </Stack>
            <UserForm
              dialogTitle="Create"
              handleClose={handleClose}
              open={open}
              setRefetch={refetch}
            />
          </Grid> */}
        </Grid>
      </Box>

      <Box className="body-container">
        <TableContainer sx={{ maxWidth: `${width}px`, whiteSpace: "nowrap" }}>
          <Table className="table">
            <TableHead className="table-row">
              <TableRow>
                <TableCell
                  className={
                    language === "en"
                      ? "header-title-start-en"
                      : "header-title-start-kh"
                  }
                  width="7%"
                >
                  {t(`no`)}
                </TableCell>
                <TableCell
                  className={
                    language === "en" ? "header-title-en" : "header-title-kh"
                  }
                  width="20%"
                >
                  {t(`thead_full_name`)}
                </TableCell>
                <TableCell
                  className={
                    language === "en" ? "header-title-en" : "header-title-kh"
                  }
                  width="33%"
                >
                  {t(`thead_email`)}
                </TableCell>
                <TableCell
                  className={
                    language === "en" ? "header-title-en" : "header-title-kh"
                  }
                  width="40%"
                >
                  {t(`thead_tel`)}
                </TableCell>
                <TableCell
                  className="header-title-end"
                  width="10%"
                  align="right"
                ></TableCell>
              </TableRow>
            </TableHead>

            {loading ? (
              <LoadingPage colSpan={10} />
            ) : tableData?.length === 0 ? (
              <EmptyData colSpan={10} />
            ) : (
              <TableBody className="body">
                {tableData?.map((row, index) => {
                  return (
                    <TableRow className="body-row" key={index}>
                      <TableCell className="body-cell">
                        {index + paginationData?.slNo}
                      </TableCell>
                      <TableCell className="body-cell">
                        <Stack direction="row" spacing={1}>
                          <Avatar
                            src={`${row?.imageSrc}`}
                            sx={{ width: "42px", height: "42px" }}
                          />
                          <Stack direction="column" justifyContent="center">
                            {row?.username}
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell className="body-cell">{row?.email}</TableCell>
                      <TableCell className="body-cell">{row?.tell}</TableCell>
                      <TableCell className="body-cell-end" align="right">
                        <UserAction
                          dialogTitle="Create"
                          editData={row}
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
        {/* ==================================== Pagination ====================== */}
        <FooterPagination
          totalPages={paginationData?.totalPages}
          totalDocs={paginationData?.totalDocs}
          limit={limit}
          page={page}
          setPage={setPage}
          handleLimit={handleLimit}
        />
      </Box>
    </div>
  );
}
