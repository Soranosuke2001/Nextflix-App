import videos from '@/data/videos.json';
import popularVideos from '@/data/popularVideos.json';


export const getVideos = async (URL) => {

    try {
        const response = await fetch(`${URL}`);
        const videosList = await response.json();

        if (videosList?.error) {
            console.log('YouTube API Error: ', videosList.error);
            return [];
        };
    
        return videosList.items.map((video) => {
            const id = video?.id?.videoId || video.id;
            return {
                title: video?.snippet?.title,
                imageURL: video?.snippet?.thumbnails?.high?.url,
                id,
                description: video.snippet.description,
                publishDate: video.snippet.publishedAt,
                channelTitle: video.snippet.channelTitle,
                viewCount: video.statistics ? video.statistics.viewCount : 'Unknown' 
            };
        });
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const setURL = async (category, videoId = null) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    if (category == 'popular') {
        const URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=25&regionCode=US&key=${YOUTUBE_API_KEY}`;
        const videosList = await getVideos(URL);

        return videosList;
    } else if (category == 'prerender') {
        const URL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${YOUTUBE_API_KEY}`
        const videoData = await getVideos(URL);

        return videoData;
    } else {
        const URL = `https://youtube.googleapis.com/youtube/v3/search?part=snippet%2C%20id&maxResults=25&q=${category}&type=video&key=${YOUTUBE_API_KEY}`;
        const videosList = await getVideos(URL);

        return videosList;
    };
};

export const dummyFetch = (category = null) => {
    let videosList = videos;
    if (category) {
        videosList = popularVideos;
    };

    return videosList.items.map((video) => {
        const id = video?.id?.videoId || video.id;
        return {
            title: video?.snippet?.title,
            imageURL: video?.snippet?.thumbnails?.high?.url,
            id
        };
    });
};
