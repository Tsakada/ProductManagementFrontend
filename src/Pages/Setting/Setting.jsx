// Dependency
import {
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import "../../Style/pagestyle.scss";
import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { translateLauguage } from "../../Function/Translate";
import CardSetting from "../../Component/Setting/CardSetting";

export default function Setting() {
  const { language } = useContext(AuthContext);
  const { t } = translateLauguage(language);
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth - 50);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  const settingData = [
    {
      title: "អ្នកប្រើប្រាស់",
      navigate: "/setting/user",
      description: "សម្រាប់កំណត់អ្នកប្រើប្រាស់"
    },
    {
      title: "ផលិតផល",
      navigate: "/setting/product",
      description: "សម្រាប់កំណត់អ្នកប្រើប្រាស់"
    },
    {
      title: "ប្រភេទ",
      navigate: "/setting/category",
      description: "សម្រាប់កំណត់ប្រភេទរបស់ផលិតផលស"
    },

  ]
  return (
    <div className="page-container">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="row" alignItems="center" spacing={0.6}>
          <Typography
            onClick={() => navigate("/setting")}
            className={language === "en" ? "page-title-en" : "page-title-kh"}
            sx={{ cursor: "pointer" }}
          >
            {t("thead_setting")}
          </Typography>
        </Stack>
      </Stack>

      <Box className="body-container">
        <Grid container spacing={3}>
          {settingData.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <CardSetting item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
