import { useRouter } from "next/router";
import Modal from "react-modal";

import styles from '@/styles/Video.module.css';

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();

  const videoId = router.query.videoId;
  console.log(videoId);
  return (
    <div>
      Video component {videoId}
      <Modal
        isOpen={true}
        contentLabel="Testing Modal Component"
        onRequestClose={() => router.back()}
        overlayClassName={styles.overlay}
      >
        <div>Modal Component</div>
      </Modal>
    </div>
  );
};

export default Video;
