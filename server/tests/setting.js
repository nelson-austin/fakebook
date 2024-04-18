const assert = require('assert');
const axios = require('axios'); 

describe('One Setting GET', function () {
    it('should return correct setting data from the API', async function () {
        try {
        const response = await axios.get('http://localhost:3000/settings/65fc8d25c8b547a04b76e54d'); 
        // console.log(response.data);
        assert.equal(response.status, 200); // Ensure the response status is OK
        // assert.equal(response.data[0]._id, '660869cee748c2e8dc1e5cb2');
        assert.equal(response.data.user_id, '65fc8d25c8b547a04b76e54d');
        assert.equal(response.data.light_mode, false)
        assert.equal(response.data.color_theme, 'orange')
        } catch (error) {
        assert.fail(`API request failed: ${error.message}`);
        }
    });
});

describe('Setting POST', function () {
    it('should create a new setting, make sure that data is correct and deletes it', async function () {
        try {
            const createSettingResponse = await axios.post('http://localhost:3000/settings/65fc8b09b1221af7c1e8a8d4', {
            user_id:'65fc8b09b1221af7c1e8a8d4',
            light_mode:true,
            color_theme:'blue'
            });

            console.log(createSettingResponse);
            assert.equal(createSettingResponse.status, 201); 
            
            // // data in each creationReponse is the id.
            // const getSettingResponse = await axios.get(`http://localhost:3000/settings/${createSettingResponse.data}`);
            // assert.equal(getSettingResponse.status, 200); 

            // await axios.delete(`http://localhost:3000/settings/${createSettingResponse.data}`)
    
            // const fetchedSetting = getSettingResponse.data;
            // assert.equal(fetchedSetting.user_id, '65fc8b09b1221af7c1e8a8d4');
            // assert.equal(fetchedSetting. light_mode, true);
            // assert.equal(fetchedSetting.color_theme, 'blue');
        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
        });
} );

describe('Setting UPDATE', function () {
    it('should create a new setting and update it, then validates data and then deletes', async function () {
        try {
            const createSettingResponse = '65fc8b09b1221af7c1e8a8d4';

            const updateSettingResponse = await axios.put(`http://localhost:3000/settings/${createSettingResponse}`, {
                user_id:'65fc8b09b1221af7c1e8a8d4',
                light_mode:true,
                color_theme:'green'
            });

            assert.equal(updateSettingResponse.status, 200); 

        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
        });
});

describe('Setting DELETE', function () {
    it('should create a new setting and delete it', async function () {
        try {
        
            const createSettingResponse = '65fc8b09b1221af7c1e8a8d4';
            const deleteSettingResponse = await axios.delete(`http://localhost:3000/settings/${createSettingResponse}`);
            assert.equal(deleteSettingResponse.status, 200); 
        } catch (error) {
            assert.fail(`API request failed: ${error.message}`);
        }
        });
});