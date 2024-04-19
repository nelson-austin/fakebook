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
  var heightLimit = 200;
  function resize(e) {
    const textarea = e.target;
    textarea.style.height = ""; /* Reset the height*/
    textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";
  }
  function hideDefault(e) {
    const select = e.target;
    select.firstChild.style.display = 'none';
  }
</script>
{#if $isAuthenticated}
  <!-- ↑↑↑↑↑↑ only show posts if logged in -->
  <form id="new-post" on:submit|preventDefault={createPost}>
    <!-- <label for="new-post-content"><b>So what's up?</b></label> -->
    <img class="image" src="{$user.picture}" alt="profile pic">
    <div class="form-data">
      <textarea rows="1" placeholder="What's on your mind?" name="new-post-content" id="new-post-content" bind:value={postContent} on:input={ resize } required></textarea>
      <!-- <label for="groups">Add Post to Group:</label> -->
      <select name="groups" id="groups" on:change={ hideDefault }>
        <option value="">Add Post to Group</option>
        <option value="groupid">group name</option>
        <option value="groupid2">group name 2</option>

      </select>
      <button type="submit" id="new-post-btn">Create New Post</button>
    </div>
  </form>
{/if}
<style>
  .form-data {
    text-align: right;
  }
  #new-post {
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 25px;
    border: 3px solid #0056b3;
    border-radius: 15px;
    margin-top: 1.5em;
    padding: 1.5em;
    background-color: rgba(136, 132, 132, 0.5);
  }
  #groups {
    font-size: 1em;
    padding: 10px;
    cursor: pointer;
  }
  .image {
    border-radius: 50%;
    width: 100px;
  }
  #new-post label {
    display: block;
    font-size: 2em;
  }

  #new-post-content {
    font-size: 2em;
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 20px;
    width: 100%;
    resize: none;
    overflow: hidden;
  }
  #new-post-btn {
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