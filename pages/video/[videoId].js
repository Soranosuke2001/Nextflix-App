import { useRouter } from "next/router";
import Modal from "react-modal";
import cls from "classnames";

import styles from "@/styles/Video.module.css";
import { setURL } from "@/lib/videos";

Modal.setAppElement("#__next");

export const getStaticProps = async (context) => {
  const videoId = context.params.videoId;
  const response = await setURL('prerender', videoId);
  
  return {
    props: {
      videoInfo: response.length > 0 ? response[0] : {},
    },
    revalidate: 10,
  };
};

// This will be the videos that will be prerendered
export const getStaticPaths = async () => {
  const videoList = [
    "1_wHgvZyZdk", // Ayaka trailer (2nd)
    "tnIcJ3ekD-0", // JJK trailer
    "eqy85AL70PU", // Solo Leveling trailer
    "6jY2f6OkpBo"
  ];

  const paths = videoList.map((videoId) => ({
    params: {
      videoId
    }
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

const Video = ({ videoInfo }) => {
  const router = useRouter();

  const videoId = router.query.videoId;

  const { title, publishDate, description, channelTitle, viewCount } =
    videoInfo;

  return (
    <div className={styles.container}>
      <Modal
        className={styles.modal}
        isOpen={true}
        contentLabel="Testing Modal Component"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="450"
          src={`https://youtube.com/embed/${videoId}?&origin=http://example.com`}
          frameborder="0"
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishDate}>{publishDate}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Channel Name: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={cls(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
