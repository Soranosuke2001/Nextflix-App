import { useState } from "react";
import Image from "next/image";

import { sizeMap } from "@/lib/cardHelper";

import styles from "./Card.module.css";

const Card = (props) => {
  const { imageURL, size = "medium" } = props;

  const [imageURLSrc, setImageURLSrc] = useState(imageURL);

  const styleName = sizeMap(size);

    const imageErrorHandler = () => {
        setImageURLSrc('/static/ayaka.jpg');
    };

  return (
    <div className={styles.container}>
      <h1>Card</h1>
      <div className={styleName}>
        <Image
          className={styles.cardImg}
          src={imageURLSrc}
          fill="true"
          alt="Video thumbnail"
          onError={imageErrorHandler}
        />
      </div>
    </div>
  );
};

export default Card;
