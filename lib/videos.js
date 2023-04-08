import videosList from '@/data/videos.json';

export const getVideos = () => {
    return videosList.items.map((video) => {
        return {
            title: video?.snippet?.title,
            imageURL: video?.snippet?.thumbnails?.high?.url,
            id: video?.id?.videoId,
        }
    })
};