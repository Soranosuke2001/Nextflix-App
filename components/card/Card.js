import Image from "next/image";

import { sizeMap } from "@/lib/cardImageSize";

import styles from "./Card.module.css";

const Card = (props) => {
  const { imageURL, size } = props;

  const styleName = sizeMap(size);

  return (
    <div>
      <h1>Card</h1>
      <div className={styleName}>
        <Image
          className={styles.cardImg}
          src={imageURL}
          fill="true"
          alt="Video thumbnail"
        />
      </div>
    </div>
  );
};

export default Card;
