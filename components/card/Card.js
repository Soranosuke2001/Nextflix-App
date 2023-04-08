import Image from 'next/image';
import styles from './Card.module.css';

const Card = (props) => {
    const { imageURL, size } = props;
    return (
        <div>
            <h1>Card</h1>
            <Image src={imageURL} width="200" height="200" alt="Video thumbnail" />
        </div>
    );
};

export default Card;