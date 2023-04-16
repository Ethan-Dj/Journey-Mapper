const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const path = require('path')

const app = express();
const corsOptions = {
  origin: 'https://mainkotap.onrender.com',
};

app.use(cors(corsOptions));
dotenv.config()

const content_router = require("./routes/Content.js")

const jsonParser = bodyParser.json({ limit: '20mb' }); // set the limit to 10 megabytes

app.use(jsonParser);

app.use(bodyParser.urlencoded({limit: '50mb', extended:true}))
app.use(bodyParser.json())
app.use(express.json({limit: '50mb'}))

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});

app.use('/api', content_router);