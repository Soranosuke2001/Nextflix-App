import Card from "./Card";

import styles from "./SectionCards.module.css";

const SectionCards = (props) => {
  const { title } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        <Card imageURL="/static/ayaka.jpg" size="large" />
      </div>
    </section>
  );
};

export default SectionCards;
