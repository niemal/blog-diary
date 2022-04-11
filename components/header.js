import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Peripherals.module.css';

function Header({ title = "Welcome to niemalground" }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated with ❤️" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header>
                <div id={styles.social} className="mt-6">
                    <a className={`${styles.social}`} href="https://twitter.com/niemal/"><Image src="/twitter.svg" alt={''} width={30} height={30} /></a>
                    <a className={`${styles.social} ml-8`} href="https://github.com/niemal/"><Image src="/github.svg" alt={''} width={30} height={30} /></a>
                </div>
                <nav id={`${styles.navbar}`} className={`flex justify-center items-center p-1 mx-auto ${styles.sticky}`}>
                    <Link href="/blog"><a className={`inline-block ${styles["animation"]} mt-4 ${styles["text-white"]} flex lg:mt-0 mr-4`}>blog</a></Link>
                    <Link href="/diary"><a className={`inline-block ${styles["animation"]} mt-4 ${styles["text-white"]} flex lg:mt-0`}>diary</a></Link>
                    <Image src="/butterfly.svg" alt={''} className={`inline-block lg:mt-0 mr-5`} height={75} width={75} />
                    <Link href="/about"><a className={`inline-block ${styles["animation"]} mt-4 ${styles["text-white"]} flex lg:mt-0 mr-10`}>about</a></Link>
                </nav>
            </header>
        </div>
    );
}

export default Header;