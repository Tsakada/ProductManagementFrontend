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
  Chip,
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
import { GET_PRODUCT } from "../../Schema/Product";
import MediaCard from "./MediaCard/MediaCard";

export default function Dashboard() {
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
      <Box sx={{ marginTop: "30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4} lg={2.4} xl={2.4}>
            <Stack direction="row" spacing={1}>
              <Chip label="All" color="primary" variant="outlined" sx={{ fontSize: 17, }} />
              <Chip label="primary" color="primary" variant="outlined" sx={{ fontSize: 17, }} />
              <Chip label="success" color="success" variant="outlined" />
            </Stack>
            {/* <TextField
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
            /> */}
          </Grid>

        </Grid>
      </Box>
      <Box className="body-container">
        <Grid container spacing={3}>
          {
            tableData.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <MediaCard item={item} />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </div>
  );
}
