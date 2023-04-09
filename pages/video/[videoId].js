import { useRouter } from "next/router";
import Modal from "react-modal";

import styles from "@/styles/Video.module.css";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();

  const videoId = router.query.videoId;
  console.log(videoId);
  return (
    <div className={styles.container}>
      <Modal
        className={styles.modal}
        isOpen={true}
        contentLabel="Testing Modal Component"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
      >
        <div>
          <iframe
            id="ytplayer"
            className={styles.videoPlayer}
            type="text/html"
            width="100%"
            height="450"
            src={`https://youtube.com/embed/${videoId}?&origin=http://example.com`}
            frameborder="0"
          ></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
