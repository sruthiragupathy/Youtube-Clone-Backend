require("dotenv").config()

const express = require("express");
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const connectMongoDb = require("./ConnectMongoDb");
const categoryRoutes = require("./Routes/category");
const { normalizeData } = require("./normalizeData");
const Video = require("./Models/video")


const PORT = process.env.PORT || 3000

connectMongoDb();
let videoList;

// const populateData = async ( videoList ) => {
//     try {
//     await Video.insertMany(videoList);
//     }
//     catch (error) {
//         console.log(error)
//     }
// }

normalizeData()
.then((response) => videoList = response)
// .then(() => populateData(videoList));


app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

app.use("/api", categoryRoutes);

app.listen(PORT, () => {
    console.log("Server running at port" + PORT)
})

