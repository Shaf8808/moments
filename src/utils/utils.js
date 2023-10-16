import { axiosReq } from "../api/axiosDefaults";

// resource and setResource could be posts and setPosts or
// comments and setComments
// Function used to append new data for components like
// infinite scroll
export const fetchMoreData = async (resource, setResource) => {
  try {
    // Network request to the url of the next page of posts
    const { data } = await axiosReq.get(resource.next);
    setResource((prevResource) => ({
      // Spreads prevResource, which are previous posts
      ...prevResource,
      //   Updates next attribute with the url to the next page of results
      next: data.next,
      //   Used reduce method to loop through the new page of results
      // we got from the api
      results: data.results.reduce((acc, cur) => {
        // Checks to see if the id of a new post matches the id
        // of any previous posts
        return acc.some((accResult) => accResult.id === cur.id)
          ? // If it does, just returns all posts
            acc
          : //   If it's a new post, returns the spread accumulator
            // (array of posts) with the new post at the end
            [...acc, cur];
        // Appends new results to the existing posts in our posts.results
        // array
      }, prevResource.results),
    }));
  } catch (err) {}
};
