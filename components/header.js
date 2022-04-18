import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Peripherals.module.css';

function Header({
    title = "Welcome to niemalground!",
    url = "",
    desc = "",
    imageUrl = "",
    social,
    preload = []
    }) {

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="author" content="niemal" />
                <meta name="application-name" content="blog-diary" />
                <meta name="description" content={desc} />
                <meta name="thumbnail" content={imageUrl} />

                <link rel="icon" href="/favicon.ico" />
                <link rel="image_src" href={imageUrl} />
                
                {preload.filter((img) => img !== undefined)
                .map((img) => 
                    <link rel="preload" href={img} as="image" />
                )}

                <meta property="og:type" content={title !== 'Welcome to niemalground!' ? 'article' : 'website'} />
                <meta property="og:site_name" content="blog-diary" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={desc} />
                <meta property="og:image" content={imageUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="niemal" />
                <meta name="twitter:url" content={url} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={desc} />
                <meta name="twitter:image" content={imageUrl} />
            </Head>
            <header>
                <div id={styles.social} className="mt-6">
                    <a className={`${styles.social}`} href={social.twitter}><Image src="/twitter.svg" alt={''} width={30} height={30} /></a>
                    <a className={`${styles.social} ml-8`} href={social.github}><Image src="/github.svg" alt={''} width={30} height={30} /></a>
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