import styles from "@/components/card/Card.module.css";

export const sizeMap = (size) => {
  const styling = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  return styling[`${size}`];
};

export const selectScale = (cardID) => {
  const scale = cardID === "0" ? { scaleY: 1.1 } : { scale: 1.1 };
  return scale;
};
