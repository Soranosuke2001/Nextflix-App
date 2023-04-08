import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import cls from "classnames";

import { sizeMap, selectScale } from "@/lib/cardHelper";

import styles from "./Card.module.css";

const Card = (props) => {
  const { imageURL, size = "medium", cardID="1" } = props;

  const [imageURLSrc, setImageURLSrc] = useState(imageURL);

  const styleName = sizeMap(size);
  const scale = selectScale(cardID);

  const imageErrorHandler = () => {
    setImageURLSrc(
      "https://images.unsplash.com/photo-1543536448-d209d2d13a1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    );
  };

  return (
    <div className={styles.container}>
      <motion.div
        whileHover={{ ...scale }}
        className={cls(styles.imgMotionWrapper, styleName)}
      >
        <Image
          className={styles.cardImg}
          src={imageURLSrc}
          fill="true"
          alt="Video thumbnail"
          onError={imageErrorHandler}
        />
      </motion.div>
    </div>
  );
};

export default Card;
