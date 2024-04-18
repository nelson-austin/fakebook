const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const routes = require("./routes");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors())
  .use(express.json())
  .use("/", routes)

// Swagger
  .use('/api-docs', swaggerUi.serve)
  .get('/api-docs', swaggerUi.setup(swaggerDocument));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  // Listen for requests using Port number from .env file
  app.listen(process.env.PORT || 3000, () => {
    console.log('Connected to db and Web Server is listening at port ' + (process.env.PORT || 3000));
  });
});