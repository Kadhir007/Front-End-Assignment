import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
const CommentCard = ({comment}) => {
    // console.log("inside comments",comment);
  return (
    <div>
        <Box sx={{ minWidth: 275, cursor: "pointer" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`PostId: ${comment.postId}`}
          </Typography>
          <Typography variant="h5" >
            {`id: ${comment.id}`}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {`name: ${comment.name}`}
          </Typography>
          <Typography variant="body5">
            {`email: ${comment.email}`}
           <br />
          </Typography>
          <br />
          <Typography variant="body3">
            {`body: ${comment.body}`}
            
          </Typography>
        </CardContent>
      </Card>
    </Box>
    </div>
  );
};

export default CommentCard;
