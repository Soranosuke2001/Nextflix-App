// import videosList from '@/data/videos.json';

export const getVideos = async () => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet%2C%20id&maxResults=25&q=anime%20trailer&type=video&key=${YOUTUBE_API_KEY}`);
    const videosList = await response.json();

    return videosList.items.map((video) => {
        return {
            title: video?.snippet?.title,
            imageURL: video?.snippet?.thumbnails?.high?.url,
            id: video?.id?.videoId,
        }
    })
};