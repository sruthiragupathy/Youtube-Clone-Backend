require('dotenv').config();

const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectMongoDb = require('./ConnectMongoDb');
const categoryRoutes = require('./Routes/category');
const videoRoutes = require('./Routes/video');
const { normalizeData } = require('./normalizeData');
const Video = require('./Models/video');
const playlistRoutes = require('./Routes/playlist');
const noteRoutes = require('./Routes/note');

const PORT = process.env.PORT || 3000;

connectMongoDb();

const populateData = async (videoList) => {
  try {
    await Video.insertMany(videoList);
    console.log('done populating');
  } catch (error) {
    console.log(error);
  }
};
let videos;
normalizeData().then((response) => (videos = response));
// .then(() => populateData(videos));

app.use(bodyParser.json()); // handle json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', categoryRoutes);
app.use('/api', videoRoutes);
app.use('/api', playlistRoutes);
app.use('/api', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running at port${PORT}`);
});
