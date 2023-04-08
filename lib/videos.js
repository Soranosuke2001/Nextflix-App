import videosList from '@/data/videos.json';

export const getVideos = () => {
    return videosList.items;
};