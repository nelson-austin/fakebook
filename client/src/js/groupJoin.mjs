import { myGroups, groups, posts } from './store';

export async function fetchGroups() {
    try {
        const response = await fetch("https://server-fakebook.onrender.com/groups");
        const data = await response.json();
        groups.set(data);
        console.log("fetching groups");
        console.log(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

export async function fetchMyGroups(user) {
    const options = {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    }
    try {
        const response = await fetch(`https://server-fakebook.onrender.com/users/${user}`, options);
        const data = await response.json();
        myGroups.set(data);
        console.log("fetching my groups");
        console.log(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

export async function fetchGroupPosts(group) {
    try {
        const response = await fetch("https://server-fakebook.onrender.com/posts/" + group);
        const data = await response.json();
        posts.set(data);
        console.log("fetching group posts");
        console.log(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}
export async function joinGroup(group, user) {
    try {
        const options = {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                groupId: group
            }),
        }
        const response = await fetch(`https://server-fakebook.onrender.com/users/addGroup/${user}`, options);
        console.log(response);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}