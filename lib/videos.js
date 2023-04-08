export const getVideos = async (category) => {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    try {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet%2C%20id&maxResults=25&q=${category}%20trailer&type=video&key=${YOUTUBE_API_KEY}`);
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
                id
            };
        });
    } catch (error) {
        console.log(error);
        return [];
    }
};