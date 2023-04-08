import styles from '@/components/card/Card.module.css';

export const sizeMap = (size) => {
    const styling = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem
    };

    return styling[`${size}`];
};