const assert = require('assert');
const axios = require('axios');

describe('Posts GET', function () {
    it('should return all posts from the API', async function () {
        try {
            const response = await axios.get('http://localhost:3000/posts');
            assert.equal(response.status, 200);
            assert.ok(Array.isArray(response.data), 'Response data should be an array');
            
            const postData = response.data[0];
            assert.ok(postData._id, 'Post data should contain _id property');
            assert.ok(postData.user_id, 'Post data should contain user_id property');
            assert.ok(postData.group_id, 'Post data should contain group_id property');
            assert.ok(postData.content, 'Post data should contain content property');
            assert.ok(postData.likes !== undefined, 'Post data should contain likes property');
            assert.ok(postData.createdAt, 'Post data should contain createdAt property');
            assert.equal(typeof postData.createdAt, 'string', 'createdAt should be a string'); // Check the date format
        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
    });
});

describe('Posts by Group GET', function () {
    it('should return all posts based on group ID from the API', async function () {
        try {
            const groupId = 1; // Whichever group ID you want to test
            const response = await axios.get(`http://localhost:3000/posts/${groupId}`);
            
            assert.equal(response.status, 200);
            assert.ok(Array.isArray(response.data), 'Response data should be an array');
            
            if (response.data.length > 0) {
                const postData = response.data[0];
                assert.ok(postData._id, 'Post data should contain _id property');
                assert.ok(postData.user_id, 'Post data should contain user_id property');
                assert.ok(postData.group_id === groupId, 'Post data should belong to the specified group');
                assert.ok(postData.content, 'Post data should contain content property');
                assert.ok(postData.likes !== undefined, 'Post data should contain likes property');
                assert.ok(postData.createdAt, 'Post data should contain createdAt property');
                assert.equal(typeof postData.createdAt, 'string', 'createdAt should be a string'); // Check the date format
            }
        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
    });
});

describe('Posts by User GET', function () {
    it('should return all posts based on user ID from the API', async function () {
        try {
            const userId = "abc123"; // Whichever group ID you want to test
            const response = await axios.get(`http://localhost:3000/posts/user/${userId}`);
            
            assert.equal(response.status, 200);
            assert.ok(Array.isArray(response.data), 'Response data should be an array');
            
            if (response.data.length > 0) {
                const postData = response.data[0];
                assert.ok(postData._id, 'Post data should contain _id property');
                assert.ok(postData.user_id === userId, 'Post data should contain user_id property');
                assert.ok(postData.group_id, 'Post data should belong to the specified group');
                assert.ok(postData.content, 'Post data should contain content property');
                assert.ok(postData.likes !== undefined, 'Post data should contain likes property');
                assert.ok(postData.createdAt, 'Post data should contain createdAt property');
                assert.equal(typeof postData.createdAt, 'string', 'createdAt should be a string'); // Check the date format
            }
        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
    });
});

describe('Posts by Post GET', function () {
    it('should return all posts based on post ID from the API', async function () {
        try {
            const postId = "660c4665e8de28f2f5cef102"; // Whichever group ID you want to test
            const response = await axios.get(`http://localhost:3000/posts/post/${postId}`);
            
            assert.equal(response.status, 200);
            assert.ok(typeof response.data === 'object', 'Response data should be an object');
            
            if (response.data.length > 0) {
                const postData = response.data[0];
                assert.ok(postData._id === postId, 'Post data should contain _id property');
                assert.ok(postData.user_id, 'Post data should contain user_id property');
                assert.ok(postData.group_id, 'Post data should belong to the specified group');
                assert.ok(postData.content, 'Post data should contain content property');
                assert.ok(postData.likes !== undefined, 'Post data should contain likes property');
                assert.ok(postData.createdAt, 'Post data should contain createdAt property');
                assert.equal(typeof postData.createdAt, 'string', 'createdAt should be a string'); // Check the date format
            }
        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
    });
});

describe('Create Post POST', function () {
    it('should create a new post via POST request to the API', async function () {
        try {
            const postData = {
                user_id: 'abc123',
                group_id: 3,
                content: 'This is a new post',
                likes: 0,
                comments: []
            };

            const response = await axios.post('http://localhost:3000/posts', postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const postResponse = response.data.info;

            await axios.delete(`http://localhost:3000/posts/${postResponse._id}`);

            assert.equal(response.status, 201);
            assert.ok(response.data._id, 'Response data should contain _id property');
            assert.equal(postResponse.user_id, postData.user_id, 'User ID should match the one sent');
            assert.equal(postResponse.group_id, postData.group_id, 'Group ID should match the one sent');
            assert.equal(postResponse.content, postData.content, 'Content should match the one sent');
            assert.equal(postResponse.likes, postData.likes, 'Likes should match the one sent');
            assert.deepEqual(postResponse.comments, postData.comments, 'Comments should match the one sent');
            assert.ok(postResponse.createdAt, 'Post data should contain createdAt property');
            assert.equal(typeof postResponse.createdAt, 'string', 'createdAt should be a string'); // Check the date format
        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
    });
});

describe('Update Post PUT', function () {
    it('should update an existing post via PUT request to the API', async function () {
        try {
            const updateData = {
                user_id: 'abc123',
                group_id: 3,
                content: 'This is an updated post',
                likes: 8,
                comments: [
                    {
                        comment: 'This is a comment'
                    }
                ]
            };

            // Update the post
            const response = await axios.put(`http://localhost:3000/posts/660c59e1dc8f867ecc210702`, updateData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const updatedPost = response.data;

            assert.equal(response.status, 200);
            assert.ok(response.data._id, 'Response data should contain _id property');
            assert.equal(updatedPost.group_id, updateData.group_id, 'Group ID should be updated');
            assert.equal(updatedPost.content, updateData.content, 'Content should be updated');
            assert.equal(updatedPost.likes, updateData.likes, 'Likes should be updated');
            assert.deepEqual(updatedPost.comments.comment, updateData.comments.comment, 'Comments should be updated');
            assert.ok(updatedPost.createdAt, 'Post data should contain createdAt property');
            assert.equal(typeof updatedPost.createdAt, 'string', 'createdAt should be a string'); // Check the date format
        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
    });
});

describe('Delete Post DELETE', function () {
    it('should delete an existing post via DELETE request to the API', async function () {
        try {
            // Create a new post for deletion
            const postData = {
                user_id: 'deleteME',
                group_id: 204,
                content: 'This post will be deleted',
                likes: 0,
                comments: []
            };

            const createResponse = await axios.post('http://localhost:3000/posts', postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const createdPostId = createResponse.data.info._id;

            // Delete the post
            const deleteResponse = await axios.delete(`http://localhost:3000/posts/${createdPostId}`);

            assert.equal(deleteResponse.status, 204);
            assert.equal(deleteResponse.statusText, 'No Content');

        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
    });
});
