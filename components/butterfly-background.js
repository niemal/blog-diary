import styles from '../styles/Butterfly.module.css';
import Image from 'next/image';

export function Butterfly2() {
    return (
        <div className={styles.butterfly2}>
            <Image src={`/butterfly-2.svg`} className={styles.butterfly2} width={600} height={600} />
        </div>
    );
};

export function Butterfly() {
    return (
        <div className={styles.butterfly}>
            <Image src={`/butterfly.svg`} className={styles.butterfly} width={600} height={600} />
        </div>
    );
};