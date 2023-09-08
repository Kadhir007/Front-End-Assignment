import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Paper,  Typography } from "@mui/material";
import { Stack } from "@mui/material";
import Fuse from "fuse.js";
import posts from "../API/api";
import Posts from "../Home/Posts";
import store from "../Reducers/store";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {deleteApiData} from "../API/api"
import { RESET_DELETE } from "../Reducers/action";
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteQueue, setDeleteQueue] = useState([]);
  const deleteCount = useSelector((state) => state.deleteCount);
  console.log("delete count is ",deleteCount)
console.log()

  //fetch and save search results in local storage using useEffect
  //fetching search result while refresh
  useEffect(() => {
    const data = window.localStorage.getItem("searchTerm");
    if (data != null) setSearchTerm(JSON.parse(data));
    
  }, []);
  //saving search results while typing
  useEffect(() => {
    window.localStorage.setItem("searchTerm", JSON.stringify(searchTerm));
  }, [searchTerm]);


  //fetching delete queue from local storage
  useEffect(() => {
    const data = window.localStorage.getItem("deleteQueue");
    if (data !== null) {
      const deleteQueueArray = JSON.parse(data); // Parse the stored data to an array
      // Filter out posts whose 'post.id' is not in the deleteQueueArray
      const filteredPosts = posts.filter((post) => {
        return !deleteQueueArray.some((item) => item === post.id);
      });
      console.log("delete queue array", deleteQueueArray);
      setDeleteQueue(filteredPosts);
    } else {
      setDeleteQueue(posts);
    }

  }, []);
//updating api locally whenever a post is deleted
  useEffect(() => {
    window.localStorage.setItem("apiData", JSON.stringify(deleteQueue));
  }, [deleteQueue]);

  //Fuzzy search operation
  const fuse = new Fuse(deleteQueue, {
    keys: ["userId", "id", "title", "body"],
  });
  // console.log(fuse);
  let results;
  results = fuse
    .search(searchTerm)
    .map((item) => item.item)
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.userId.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

  //if input is empty then print entire posts
  if (searchTerm === "") {
    results = deleteQueue;
  }
//   console.log("remaining posts are ", deleteQueue);

  //handle Reset button
  const handleReset=()=>{
    store.dispatch({
        type:RESET_DELETE
    })
    deleteApiData();
  }
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        p={2}
        sx={{
          position: "sticky",
          background: "#000",
          top: 0,
          justifyContent: "end",
          zIndex: "1000",
        }}
      ><Button
            sx={{
              color: "red",
              position:'absolute',
              left:30,
            }}
           onClick={handleReset}
          >
            RESET STATE
          </Button>
        <Typography variant="h5" component="div" sx={{ color: "white" ,marginRight:'12px'}}>
        {`Delete queue ${deleteCount}`}
        </Typography>
        <Paper
          component="form"
          sx={{
            borderRadius: 20,
            border: "1px solid #e3e3e3",
            pl: 2,
            boxShadow: "none",
            mr: { sm: 5 },
            height: "30px",
          }}
        >
          <input
            style={{ border: "0px", outline: "none", marginRight: "5px" }}
            className="search-bar"
            placeholder="Fuzzy search..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </Paper>
      </Stack>
      <Posts results={results} />
    </>
  );
};

export default Navbar;
