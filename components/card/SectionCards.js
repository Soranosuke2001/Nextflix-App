import Link from "next/link";
import Card from "./Card";
import cls from "classnames";

import styles from "./SectionCards.module.css";

const SectionCards = (props) => {
  const { title, videos, size, shouldWrap = false, shouldScale } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, index) => {
          return (
            <Link href={`/video/${video.id}`} key={index}>
              <Card
                imageURL={video.imageURL}
                size={size}
                cardID={index}
                key={index}
                shouldScale={shouldScale}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
