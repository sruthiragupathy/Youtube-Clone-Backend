const { default: axios } = require('axios');
const { videoList } = require('./Models/Database');

const CookVideoUrl = (videoId) => {
  const videosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyD5u2AGMxbY2WecF3dEcUZi7gsemBN1Pb4 
    &maxResults=10&part=statistics&id=${videoId}`;
  return videosUrl;
};

const ChannelUrl = (channelId) => {
  const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&maxResults=5&key=AIzaSyD5u2AGMxbY2WecF3dEcUZi7gsemBN1Pb4 `;
  return channelUrl;
};

const getChannelProfile = async (videoId) => {
  console.log(videoId);
  const response = await axios.get(CookVideoUrl(videoId));
  const { channelId } = response.data.items[0].snippet;
  const channelresp = await axios.get(ChannelUrl(channelId));
  return channelresp.data.items[0].snippet.thumbnails.default.url;
};

const getViewCount = async (videoId) => {
  const response = await axios.get(CookVideoUrl(videoId));
  console.log(response.data.items[0].statistics.viewCount);
  return response.data.items[0].statistics.viewCount;
};

const getLikeCount = async (videoId) => {
  const response = await axios.get(CookVideoUrl(videoId));
  console.log(response.data.items[0].statistics.likeCount);

  return response.data.items[0].statistics.likeCount;
};

exports.normalizeData = async () => {
  const promises = await videoList.map(async (video) => {
    const individualVideo = {
      videoId: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbNailUrl: video.snippet.thumbnails.default.url,
      channelTitle: video.snippet.channelTitle,
      channelProfile: await getChannelProfile(video.id.videoId),
      category: '6087f86df7b0c6c5d80d0f93',
      viewCount: await getViewCount(video.id.videoId),
      likeCount: await getLikeCount(video.id.videoId),
    };
    return individualVideo;
  });
  const numFruits = await Promise.all(promises);
  return numFruits;
};

// const populateData = async (videoList) => {
//   try {
//     await Video.insertMany(videoList);
//     console.log('done populating');
//   } catch (error) {
//     console.log(error);
//   }
// };
// let videos;
// normalizeData().then((response) => (videos = response));
// // .then(() => populateData(videos));
