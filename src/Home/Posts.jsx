import React from "react";
import PostCards from "./PostCards";
const Posts = ({results}) => {
  
  return (
    <div>
    {/* {console.log(posts)} */}
    {results.map((post)=>(<PostCards key={post.id} post={post}/>))}
    </div>
  
  );
};

export default Posts;
