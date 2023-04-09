import { useRouter } from "next/router";
import Modal from "react-modal";
import cls from 'classnames';

import styles from "@/styles/Video.module.css";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();

  const videoId = router.query.videoId;

  const videoInfo = {
    title: "Genshin Anime Trailer",
    publishDate: "2023-01-01",
    description:
      "Official Genshin Impact Anime trailer!!!! This is a collaboration work with A1 pictures and hope you guys will enjoy it!",
    channelTitle: "Genshin Impact Official",
    viewCount: 98374928,
  };

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
                    <p className={styles.channelTitle}>{viewCount}</p>
                </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
