// Dependency
import {
  Box,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import "../../Style/pagestyle.scss";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_PRODUCT } from "../../Schema/Product";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { translateLauguage } from "../../Function/Translate";
import ProductCard from "../../Component/Product/ProductCard";
import { GET_CATEGORY } from "../../Schema/Category";

export default function Dashboard() {
  const { language } = useContext(AuthContext);
  const { t } = translateLauguage(language);

  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [keyword, setKeyword] = useState("");
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



  const { refetch: refetchCategory } = useQuery(GET_CATEGORY, {
    onCompleted: ({ getCategory }) => {
      setLoading(false);
      if (getCategory) setCategoryData(getCategory);
    },
    onError: (error) => {
      setLoading(true);
      console.log(error.message);
    },
  });
  useEffect(() => {
    refetchCategory();
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
  console.log("categoryData===>", categoryData)
  return (
    <div className="page-container">
      <Box sx={{ marginTop: "30px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4} lg={2.4} xl={2.4}>
            <Stack direction="row" spacing={1}>
              <Chip label="All" color="primary" variant="outlined" sx={{ fontSize: 17, }} />
              {categoryData.map((e) => <Chip label={e?.category_name} color="primary" variant="outlined" sx={{ fontSize: 16, }} />)}
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box className="body-container">
        <Grid container spacing={3}>
          {
            tableData.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <ProductCard item={item} />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </div>
  );
}
