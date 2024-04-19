<script>
  import { user, isAuthenticated } from "../store.js";

  let postContent;

  async function createPost() {
    const postData = {
      user_id: $user.sub,
      group_id: '6620b314d5d960742c972dcb',
      content: postContent,
      likes: 0,
      comments: []
    }
    try {
      const response = await fetch("https://server-fakebook.onrender.com/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Post created successfully
        console.log("Post created!");
    
        
      } else {
        // Error creating post
        console.log("Post failed!");
        console.error("Failed to create post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

</script>
{#if $isAuthenticated}
  <!-- ↑↑↑↑↑↑ only show posts if logged in -->
  <form id="new-post" on:submit|preventDefault={createPost}>
    <label for="new-post-content"><b>So what's up?</b></label>
    <textarea name="new-post-content" id="new-post-content" bind:value={postContent} required></textarea>
    <button type="submit" class="new-post-btn">Create New Post</button>
  </form>
{/if}
<style>
    #new-post {
      border: 3px solid #0056b3;
      border-radius: 15px;
      margin-top: 1.5em;
      padding: 1.5em;
      background-color: rgba(136, 132, 132, 0.5);
  }

  #new-post label {
    display: block;
    font-size: 2em;
  }

  #new-post-content {
    border: 1px solid black;
    border-radius: 15px;
    padding: 0.5em;
    margin: 1em auto;
    width: 100%;
  }
  .new-post-btn {
    padding: 1rem 1rem;
    margin-left: 2em;
    width: 10em;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .new-post-btn:hover {
    background-color: #0056b3;
  }
</style>