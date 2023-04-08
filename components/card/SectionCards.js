import Card from "./Card";

import styles from "./SectionCards.module.css";

const SectionCards = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Title</h2>
      <div className={styles.cardWrapper}>
        <Card imageURL="/static/ayaka.jpg" size="large" />
      </div>
    </section>
  );
};

export default SectionCards;
