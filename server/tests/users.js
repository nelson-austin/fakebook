const assert = require('assert');
const axios = require('axios'); 

describe('One User GET', function () {
  it('should return correct user data from the API', async function () {
    try {
      const response = await axios.get('http://localhost:3000/users/google-oauth2|106454421048626230058'); 
      assert.equal(response.status, 200); // Ensure the response status is OK
      assert.equal(response.data[0]._id, '65fc8b09b1221af7c1e8a8d4');
      assert.equal(response.data[0].email, 'stephentskiles@gmail.com');
      assert.equal(response.data[0].given_name, 'Stephen');
      assert.equal(response.data[0].family_name, 'Skiles');
      assert.equal(response.data[0].name, 'Stephen SkilesSSSS');
      assert.equal(response.data[0].day_joined, 1);
      assert.equal(response.data[0].sub, 'google-oauth2|106454421048626230058');
    } catch (error) {
      assert.fail(`API request failed: ${error.message}`);
    }
  });
});

describe('User POST', function () {
    it('should create a new user, make sure that data is correct and deletes it', async function () {
      try {
        const createUserResponse = await axios.post('http://localhost:3000/users', {
          email:'newuser@example.com',
          given_name:'New',
          family_name:'User',
          name:'New User',
          groups:[],
          day_joined:1,
          sub:'google-oauth2|1234567890'
        });

        assert.equal(createUserResponse.status, 201); 
  
        // data in each creationReponse is the id.
        const getUserResponse = await axios.get(`http://localhost:3000/users/${createUserResponse.data}`);
        assert.equal(getUserResponse.status, 200); 

        await axios.delete(`http://localhost:3000/users/${createUserResponse.data}`)
  
        const fetchedUser = getUserResponse.data[0];
        assert.equal(fetchedUser.email, 'newuser@example.com');
        assert.equal(fetchedUser.given_name, 'New');
        assert.equal(fetchedUser.family_name, 'User');
        assert.equal(fetchedUser.name, 'New User');
        assert.equal(fetchedUser.day_joined, 1);
        assert.equal(fetchedUser.sub, 'google-oauth2|1234567890');
      } catch (error) {
        assert.fail(`API request failed: ${error.message}`);
      }
    });
  });


  describe('User UPDATE', function () {
    it('should create a new user and update it, then validates data and then deletes', async function () {
      try {
        const createUserResponse = await axios.post('http://localhost:3000/users', {
          email:'newuser@example.com',
          given_name:'New',
          family_name:'User',
          name:'New User',
          groups:[],
          day_joined:1,
          sub:'google-oauth2|1234567890'
        });

        console.log(createUserResponse.data);

        assert.equal(createUserResponse.status, 201); 

        const updateUserResponse = await axios.put(`http://localhost:3000/users/${createUserResponse.data}`, {
          email:'updateduser@example.com',
          given_name:'Updated',
          family_name:'User',
          name:'Updated User',
        });

        assert.equal(updateUserResponse.status, 204); 
  
        const getUserResponse = await axios.get(`http://localhost:3000/users/${createUserResponse.data}`);
        assert.equal(getUserResponse.status, 200); 

        await axios.delete(`http://localhost:3000/users/${createUserResponse.data}`)
  
        const fetchedUser = getUserResponse.data[0];
        assert.equal(fetchedUser.email, 'updateduser@example.com');
        assert.equal(fetchedUser.given_name, 'Updated');
        assert.equal(fetchedUser.family_name, 'User');
        assert.equal(fetchedUser.name, 'Updated User');
        assert.equal(fetchedUser.day_joined, 1);
        assert.equal(fetchedUser.sub, 'google-oauth2|1234567890');
      } catch (error) {
        assert.fail(`API request failed: ${error.message}`);
      }
    });
  });


  describe('User DELETE', function () {
    it('should create a new user and deletes it', async function () {
      try {
        const createUserResponse = await axios.post('http://localhost:3000/users', {
          email:'newuser@example.com',
          given_name:'New',
          family_name:'User',
          name:'New User',
          groups:[],
          day_joined:1,
          sub:'google-oauth2|1234567890'
        });

        assert.equal(createUserResponse.status, 201); 

        const deleteResponse = await axios.delete(`http://localhost:3000/users/${createUserResponse.data}`)

        assert.equal(deleteResponse.status, 200); 

      } catch (error) {
        assert.fail(`API request failed: ${error.message}`);
      }
    });
  });


  describe('User PUT new group', function () {
    it('should create a new user and add a group, then validates data and then deletes', async function () {
      try {
        const createUserResponse = await axios.post('http://localhost:3000/users', {
          email:'newuser@example.com',
          given_name:'New',
          family_name:'User',
          name:'New User',
          groups:[],
          day_joined:1,
          sub:'google-oauth2|1234567890'
        });


        assert.equal(createUserResponse.status, 201); 

        const addGroupResponse = await axios.put(`http://localhost:3000/users/addGroup/${createUserResponse.data}`, {
          groupId:'65fe21294c5be91a8d25458c',
        });

        assert.equal(addGroupResponse.status, 204); 
  
        const getUserResponse = await axios.get(`http://localhost:3000/users/${createUserResponse.data}`);
        assert.equal(getUserResponse.status, 200); 

        await axios.delete(`http://localhost:3000/users/${createUserResponse.data}`)
  
        const fetchedUser = getUserResponse.data[0];
        assert.equal(fetchedUser.email, 'newuser@example.com');
        assert.equal(fetchedUser.given_name, 'New');
        assert.equal(fetchedUser.family_name, 'User');
        assert.equal(fetchedUser.name, 'New User');
        assert.equal(fetchedUser.day_joined, 1);
        assert.equal(fetchedUser.sub, 'google-oauth2|1234567890');
        assert.equal(fetchedUser.groups.includes("65fe21294c5be91a8d25458c"), true);
      } catch (error) {
        assert.fail(`API request failed: ${error.message}`);
      }
    });
  });