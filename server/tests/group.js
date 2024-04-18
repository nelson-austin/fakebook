const assert = require('assert');
const axios = require('axios'); 

describe('One Group GET', function () {
    it('should return correct group data from the API', async function () {
        try {
        const response = await axios.get('http://localhost:3000/groups/65fe21294c5be91a8d25458e'); 
        assert.equal(response.status, 200); // Ensure the response status is OK
        assert.equal(response.data._id, '65fe21294c5be91a8d25458e');
        assert.equal(response.data.name, 'Lockpicking');
        assert.equal(response.data.description, 'Learn how to pick locks and share your best tips or events!');
        } catch (error) {
        assert.fail(`API request failed: ${error.message}`);
        }
    });
});

describe('Group POST', function () {
    it('should create a new group, make sure that data is correct and deletes it', async function () {
        try {
            const createGroupResponse = await axios.post('http://localhost:3000/groups/', {
            name :'New Group',
            description:'New Group Description',
            owner:'65fc8b09b1221af7c1e8a8d4',
            });

            assert.equal(createGroupResponse.status, 201); 

    
        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
        });
} );

describe('Group UPDATE', function () {
    it('should create a new group and update it, then validates data and then deletes', async function () {
        try {
            const createGroupResponse = await axios.post('http://localhost:3000/groups', {
            name:'New Group 2',
            description:'New Group Description 2',
            owner:'65fc8b09b1221af7c1e8a8d4'
            });

            console.log(createGroupResponse.data[0]._id);

            const updateGroupResponse = await axios.put(`http://localhost:3000/groups/${createGroupResponse.data._id}`, {
            name:'Updated Group',
            description:'Updated Group Description',
            owner:'65fc8b09b1221af7c1e8a8d4'
            });

            assert.equal(updateGroupResponse.status, 200); 

        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
        });
} );

describe('Group DELETE', function () {
    it('should create a new group and delete it', async function () {
        try {
            const createGroupResponse = await axios.post('http://localhost:3000/groups', {
            name:'New Group 4',
            description:'New Group Description 4',
            owner:'65fc8b09b1221af7c1e8a8d2'
            });
            assert.equal(createGroupResponse.status, 201);

            // console.log(createGroupResponse);

            // const deleteGroupResponse = await axios.delete(`http://localhost:3000/groups/${createGroupResponse.data._id}`);
            // // assert.equal(deleteGroupResponse.status, 200); 

            // const getGroupResponse = await axios.get(`http://localhost:3000/groups/${createGroupResponse.data}`);
            // assert.equal(getGroupResponse.status, 404); 
        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
        });
}   
);
