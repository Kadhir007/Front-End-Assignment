// api.js

// Define a function to fetch the API data
const fetchApiData = async () => {
  try {
    // Check if data is already in localStorage
    const storedData = localStorage.getItem("apiData");
    if (storedData) {
      // If data exists in localStorage, parse and return it
      console.log("fetching API from local storage")
      return JSON.parse(storedData);
    } else {
      // If data doesn't exist, fetch it from the API
      console.log("fetching API from server")
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();

      // Store the fetched data in localStorage
      localStorage.setItem("apiData", JSON.stringify(data));

      return data;
    }
  } catch (error) {
    console.error("Error fetching API data:", error);
    throw error;
  }
};

//delete request to API when reset button is clicked
const deleteApiData = async () => {
  try {
    const deleteQueue = JSON.parse(window.localStorage.getItem("deleteQueue"));
    if (deleteQueue === null || (Array.isArray(deleteQueue) && deleteQueue.length === 0)) {
      console.log("Delete Posts to perform Reset operation and reload the page to Apply changes");
      return;
    }
    console.log(deleteQueue);

    // Loop through the deleteQueue and send DELETE requests for each post
    for (const postId of deleteQueue) {
      const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
      const options = {
        method: "DELETE"
      };

      const response = await fetch(url, options);
      console.log(`Deleted post with ID ${postId}. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error in deleteApiData:", error);
  }
    window.localStorage.removeItem("deleteQueue");
    window.localStorage.removeItem("apiData");
    window.localStorage.removeItem("searchTerm");
    // window.location.reload();
}


const posts=await fetchApiData();
export default posts;
export {deleteApiData};
