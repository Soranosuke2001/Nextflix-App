import { useRouter } from "next/router";

const Video = () => {
    const router = useRouter();

    const videoId = router.query.videoId;
    console.log(videoId)
    return (
        <p>video component</p>
    );
};

export default Video;