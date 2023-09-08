import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import store from "../Reducers/store";
//dialog imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Comments from "./Comments";
import { INCREMENT_DELETE } from "../Reducers/action";
const PostCard = ({ post }) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [deletePost, setDeletePost] = useState(true);
  const [deleteQueue, setDeleteQueue] = useState([]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  // console.log("post incomming",post);
  const handleClose = () => {
    setOpen(false);
  };
  //dialogue popup
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  //fetching comments of post

  //delete posts operation
  const handleDelete = () => {
    const updatedDeleteQueue = [...deleteQueue, post];
    setDeleteQueue(updatedDeleteQueue);
    setDeletePost(false);
    store.dispatch({
      type: INCREMENT_DELETE,
    });
  };
  useEffect(() => {
    if (!deletePost) {
      console.log("Post ",post.id, "is deleted");
      const data = window.localStorage.getItem("deleteQueue");
      let updatedData = [];
      if (data === null) {
        updatedData = [post.id];
      } else {
        updatedData = JSON.parse(data);
        updatedData.push(post.id);
      }

      window.localStorage.setItem("deleteQueue", JSON.stringify(updatedData));
    }
  }, [deletePost, post.id]);

  return (
    <div style={{ background: "pink" }}>
      {deletePost && (
        <div
          style={{
            marginBottom: "20px",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
            }}
          >
            <Card variant="outlined" onClick={handleClickOpen("paper")} sx={{background:'yellow'}}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {`User ID: ${post.userId}`}
                </Typography>
                <Typography variant="h5" component="div">
                  {`ID: ${post.id}`}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {`Title: ${post.title}`}
                </Typography>
                <Typography variant="body2">{`Body: ${post.body}`}</Typography>
              </CardContent>
            </Card>
            <Button
              sx={{
                color: "red",
                marginTop: "10px",
              }}
              onClick={handleDelete}
            >
              Delete Post
            </Button>
          </Box>

          {/* Dialogue Menu */}
          <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">Comments</DialogTitle>
            <DialogContent
              dividers={scroll === "paper"}
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              <Comments postId={post.id} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained" color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default PostCard;
