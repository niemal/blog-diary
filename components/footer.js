import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Peripherals.module.css'

function Footer({ relative }) {
    return (
        <div>
            <footer id={styles.footer} className={`flex justify-center items-center p-5`}>
                <Link href="/blog"><a className={`${styles.phoneFix} inline-block ${styles["animation"]} mt-4 ${styles["text-white"]} flex lg:mt-0 mr-10`}>blog</a></Link>
                <Link href="/diary"><a className={`${styles.phoneFix} inline-block ${styles["animation"]} mt-4 ${styles["text-white"]} flex lg:mt-0 mr-10`}>diary</a></Link>
                <div className="mr-10"><Image id={styles['butterfly-2']} alt={''} src="/butterfly-2.svg" height={75} width={75} /></div>
                <Link href="/about"><a className={`${styles.phoneFix} inline-block ${styles["animation"]} mt-4 ${styles["text-white"]} flex lg:mt-0 mr-10`}>about</a></Link>
                <span className={`block ${styles["text-white"]} mt-4 lg:mt-0 ml-96`}>
                    ❤️ &#60;&#47;&#62; <Link href="https://github.com/niemal/"><a className={`${styles["animation"]} ${styles["text-white"]}`}>niemal</a></Link>🌺
                </span>
            </footer>
        </div>
    );
}

export default Footer;