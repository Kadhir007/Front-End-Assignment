import React, { useEffect, useState } from "react";
import CommentCard from "./CommentCard";

export default function Comments({ postId }) {
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    
    useEffect(() => {
      const apiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setComments(data);
          setIsLoading(false); // Set loading to false when data is fetched
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false); // Handle errors and set loading to false
        });
    }, [postId]);
    
    // Render conditionally based on isLoading
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
    );
    
}
