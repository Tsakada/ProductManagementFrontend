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
  TableBody, Avatar,
  TextField,
  TableHead,
  Typography,
  FormControl,
  InputAdornment,
  TableContainer,
  Card,
  CardMedia,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// Component
import { AuthContext } from "../../context/AuthContext";
import EmptyData from "../../Component/Include/EmptyData";
import { translateLauguage } from "../../Function/Translate";
import LoadingPage from "../../Component/Include/LoadingPage";
// Icon
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// Style
import "../../Style/pagestyle.scss";

// Schema
import { GET_PRODUCT } from "../../Schema/Product";
import ProductAction from "../../Component/Product/ProductAction";
import ProductForm from "../../Component/Product/ProductForm";

export default function Product() {
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
  const { refetch } = useQuery(GET_PRODUCT, {
    onCompleted: ({ getProduct }) => {
      setLoading(false);
      if (getProduct) setTableData(getProduct);
    },
    onError: (error) => {
      setLoading(true);
      console.log(error.message);
    },
  });

  useEffect(() => {
    refetch();
  }, [keyword]);
  console.log("tableData==>", tableData)
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
              ផលិតផល
            </Typography>
          </Stack>
        </Stack>
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
        <ProductForm
          open={open}
          setRefetch={refetch}
          dialogTitle="Create"
          handleClose={handleClose}
        />
      </Stack>


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
                >
                </TableCell>
                <TableCell
                  className={
                    language === "en" ? "header-title-en" : "header-title-kh"
                  }
                >
                  ផលិតផល
                </TableCell>
                <TableCell
                  className={
                    language === "en" ? "header-title-en" : "header-title-kh"
                  }
                >
                  តម្លៃ
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
                        {index}
                      </TableCell>

                      <TableCell className="body-cell">
                        <Card sx={{ maxWidth: 100 }}>
                          <CardMedia
                            component="img"
                            alt="green iguana"
                            height="100"
                            image={row?.image}
                          />
                        </Card>
                      </TableCell>
                      <TableCell className="body-cell">{row?.product_name}</TableCell>
                      <TableCell className="body-cell">{row?.price} {row?.type_cash === "USD" ? "$" : "៛"}</TableCell>
                      <TableCell className="body-cell-end" align="right">
                        <ProductAction
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
        {/* <FooterPagination
          totalPages={paginationData?.totalPages}
          totalDocs={paginationData?.totalDocs}
          limit={limit}
          page={page}
          setPage={setPage}
          handleLimit={handleLimit}
        /> */}
      </Box>
    </div>
  );
}
