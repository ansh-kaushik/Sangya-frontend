import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const getMMRData = async (name, hashtag) => {
  const url = `https://api.henrikdev.xyz/valorant/v1/mmr-history/ap/${name}/${hashtag}?api_key=HDEV-8547f177-1188-4cf9-8086-2a8d734ec747`;
  const res = await axios.get(url);
  const dataarray = res.data.data;
  // console.log(dataarray);

  const mmrData = dataarray.map((match) => ({
    image: match.images.large,
    map: match.map.name,
    mmrChange: match.mmr_change_to_last_game,
    result: match.mmr_change_to_last_game > 0 ? "VICTORY" : "DEFEAT",
    agentImage: "", // Assuming agent images are available
  }));
  return mmrData;
};

export default function MMRList() {
  const [data, setData] = useState([]);
  const [isMMRList, setIsMMRList] = useState(false);
  const [name, setName] = useState("mark3000");
  const [hashtag, setHashtag] = useState("9463");

  const handleGetMMRList = async (e) => {
    e.preventDefault();
    if (isMMRList) {
      setIsMMRList((prev) => !prev);
    } else {
      setIsMMRList((prev) => !prev);
      const mmrData = await getMMRData(name, hashtag);
      setData(mmrData);
    }
  };

  return (
    <>
      <Box
        sx={{
          // maxWidth: "100px",
          minWidth: "100px", // Adjust as needed
          padding: "16px",
          marginBottom: "10px",
          backgroundColor: "rgba(245, 245, 245, 0.5)", // Light background for better visibility
          borderRadius: "8px", // Rounded corners
          boxShadow: 3, // Shadow for a subtle lift effect
        }}
      >
        {/* <Typography variant="h6" sx={{ marginBottom: "16px" }}>
          Enter Username and Hashtag
        </Typography> */}
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",

            flexDirection: "row",
            gap: "4px",
          }}
        >
          <TextField
            label="Username"
            // placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            // fullWidth
            sx={{ marginBottom: "5px", maxWidth: "200px" }}
          />
          <TextField
            label="#"
            variant="outlined"
            // fullWidth
            value={hashtag}
            onChange={(e) => setHashtag(e.target.value)}
            sx={{ maxWidth: "100px" }}
          />
          <Button
            sx={{ width: "200px" }}
            variant="contained"
            size="small"
            color="primary"
            onClick={handleGetMMRList}
          >
            {!isMMRList ? "Get MMR History" : "Go back"}
          </Button>
        </Box>
      </Box>

      {isMMRList &&
        data.map((d, index) => (
          <Card
            key={index}
            square
            sx={{
              display: "flex",
              marginBottom: "4px",
              alignItems: "center",

              maxWidth: "700px",
              minWidth: "700px",
              minHeight: "90px",
              backgroundColor:
                d.mmrChange > 0 ? "rgba(147, 250, 150, 0.7)" : "rgba(255, 235, 238, 0.8)",
            }}
          >
            {/* <CardMedia
              component="img"
              image={d.agentImage}
              alt="Agent Image"
              style={{ width: "60px", height: "60px", marginLeft: "10px" }} // Adjust the size here
            /> */}
            <CardContent sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{ color: d.mmrChange > 0 ? "#027148" : "#d32f2f", fontWeight: "bold" }}
              >
                {d.result}
              </Typography>
              <Typography variant="body1">Map: {d.map}</Typography>
              <Typography variant="body1">
                MMR Change:{" "}
                <span
                  style={{ color: d.mmrChange > 0 ? "#027148" : "#d32f2f", fontWeight: "bold" }}
                >
                  {d.mmrChange}
                </span>
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              image={d.image}
              alt="Map Image"
              sx={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
          </Card>
        ))}
    </>
  );
}
