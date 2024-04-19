import { isAuthenticated, user, popupOpen, posts } from "./store";

export async function fetchPosts(type, user = null) {
  const token = localStorage.getItem("token");
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    if (type == "all") {
      console.log(`fetching all posts`);
      const response = await fetch("https://server-fakebook.onrender.com/posts/");
      const data = await response.json();
      posts.set(data);
      console.log("all posts fetched");
      console.log(data);
    } else if (type == "group") {
      const data = [];
      const response = await fetch(
        `https://server-fakebook.onrender.com/users/${user}`,
        options
      );
      const userData = await response.json();
      const groups = userData.groups;
      console.log(groups);
      if (groups) {
        const result = await fetch(
          "https://server-fakebook.onrender.com/posts/6620b314d5d960742c972dcb"
        );
        console.log(result);
        posts.set(result);
        console.log(posts);
      } else {
        console.log("No groups found");
        posts.set(data);
      }
      console.log("fetching group posts");
      console.log(posts);
    } else if (type == "mine") {
      console.log(user);

      const response = await fetch(
        `https://server-fakebook.onrender.com/posts/user/${user}`,
        options
      );

      const data = await response.json();
      posts.set(data);
      console.log(data);
      console.log(`fetching my posts`);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
