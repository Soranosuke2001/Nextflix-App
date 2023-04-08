import Card from "./Card";

import styles from "./SectionCards.module.css";

const SectionCards = (props) => {
  const { title, videos, size } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => {
            console.log(video.imageURL)
            return (
                <Card imageURL={video.imageURL} size={size} cardID={index} key={index} />
            );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
