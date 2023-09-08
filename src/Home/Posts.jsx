import React ,{useEffect}from "react";
import PostCards from "./PostCards";
import posts from '../API/api.js'


const Posts = ({results}) => {
  
  return (
    <div>
    {/* {console.log(posts)} */}
    {/* {posts.map((post)=>(<PostCards key={post.id} post={post}/>))} */}
    {results.map((post)=>(<PostCards key={post.id} post={post}/>))}
    </div>
  
  );
};

export default Posts;
