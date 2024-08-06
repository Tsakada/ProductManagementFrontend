// src/components/ImageUpload.js
import React, { useEffect, useState } from "react";
import { storage } from "../../Auth/firebase";
import {
  ref,
  deleteObject,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

import {
  Box,
  Card,
  Stack,
  Button,
  TextField,
  CardMedia,
  Typography,
  LinearProgress,
} from "@mui/material";

const ImageUpload = ({ url, setUrl, open }) => {
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0]
      if (!file) return;
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
        (error) => { console.error("Upload failed:", error); },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            setFileName(file.name);
          });
        }
      );
    }
  };

  const handleDelete = () => {
    if (!fileName) return;
    const storageRef = ref(storage, `images/${fileName}`);
    deleteObject(storageRef)
      .then(() => {
        console.log("File deleted successfully");
        setUrl("");
        setFileName("");
      })
      .catch((error) => {
        console.error("Error deleting file:", error);
      });
  };
  useEffect(() => {
    if (open) {
      setUrl("");
      setProgress(0);
      setFileName("");
    }
  }, [open])
  return (
    <Box>

      {url ? (
        <Stack mt={2} direction="column" alignItems="center" justifyContent="center" spacing={2}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="200"
              image={url}
            />
          </Card>
          <Button
            onClick={handleDelete}
            variant="contained"
            color="secondary"
            style={{ marginTop: "10px" }}
          >
            Delete
          </Button>
        </Stack>
      ) :
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={1}>
          <TextField type="file" onChange={handleChange} />
          <Typography>
            រូបភាព
          </Typography>
          {progress > 0 && (<LinearProgress variant="determinate" value={progress} />)}
        </Stack>
      }
    </Box>
  );
};

export default ImageUpload;
