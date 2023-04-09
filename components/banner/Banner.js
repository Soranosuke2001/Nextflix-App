import { useRouter } from "next/router";
import Image from "next/image";

import styles from "./Banner.module.css";

const Banner = (props) => {
  const { title, subTitle, imageURL, videoId } = props;
  const router = useRouter();

  const playHandler = () => {
    console.log("now playing");
    router.push(`video/${videoId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subTitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={playHandler}>
              <Image
                src="/static/icon/play_arrow.svg"
                alt="play icon"
                width="32"
                height="32"
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imageURL})`,
          width: "100%",
          height: "100%",
          position: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
      ></div>
    </div>
  );
};

export default Banner;
