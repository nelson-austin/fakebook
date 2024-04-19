<script>
  import { onMount } from "svelte";

  export let post;
  let name;
  let picture;

  onMount(async () => {
    // await getPostAuthor(post.user_id)
  });

  function formatDate(date) {
    let month;
    switch (date.getMonth()) {
      case 0:
        month = "January";
        break;
      case 1:
        month = "February";
        break;
      case 2:
        month = "March";
        break;
      case 3:
        month = "April";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "June";
        break;
      case 6:
        month = "July";
        break;
      case 7:
        month = "August";
        break;
      case 8:
        month = "September";
        break;
      case 9:
        month = "October";
        break;
      case 10:
        month = "November";
        break;
      case 11:
        month = "December";
        break;
    }

    let displayHours;
    const twentyfourHours = date.getHours();

    if (twentyfourHours == 0) {
      displayHours = 12;
    } else if (twentyfourHours > 12) {
      displayHours = twentyfourHours - 12;
    } else {
      displayHours = twentyfourHours;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let timeSuffix;
    if (twentyfourHours < 12) {
      timeSuffix = "am";
    } else {
      timeSuffix = "pm";
    }

    return `${month} ${date.getDate()}, ${date.getFullYear()}, ${displayHours}:${minutes}${timeSuffix}`;
  }

    async function getPostAuthor(userId) {
    try {
      let response = await fetch(`https://server-fakebook.onrender.com/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const user = await response.json();
      if (user.error) {
        throw new Error("User not found");
      }
      console.log(user);
      console.log(user.name);
      name = user.name;
      picture = user.picture;
      console.log(picture);
    } catch(e) {
      console.log(`An error occured: ${e}`);
    }
  }

  onMount(async () => {
    getPostAuthor(post?.user_id);
  });
</script>

<div class="post-container">
  <div class="post-header">
    <img class="profile-pic" src={picture} alt="profile">
    <div class="header-info">
      <h3>{name}</h3>
      <p>{formatDate(new Date(post.createdAt))}</p>
    </div>
  </div>
  <div class="post-content">
    <p>{post.content}</p>
  </div>
</div>

<style>
  .post-container {
    grid-column: span 6;
    border: 3px solid #0056b3;
    border-radius: 15px;
    padding: 1.5em;
    margin-bottom: 2em 0;
    background-color: rgba(136, 132, 132, 0.5);
  }

  .post-container:hover {
    background-color: rgba(136, 132, 132, 0.7);
  }

  .post-container p {
    margin: 0;
  }

  .post-header {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 0.5em;
  }

  .post-content {
    background-color: seashell;
    border-radius: 7px;
    padding: 1em;
    margin-top: 0.5em;
  }
  .profile-pic {
    border-radius: 50%;
    width: 50px;
  }
  .header-info h3 {
    margin: 0;
  }
  /* @media (min-width: 708px) {
    .post-container {
      width: 90%; 
    }
  } */
</style>
