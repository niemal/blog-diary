import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Peripherals.module.css';
import uuid from 'uuid';

function Header({
    title = "Welcome to niemalground!",
    url = "",
    desc = "",
    imageUrl = "",
    social,
    preload = []
    }) {

    preload.push('/blog/twitter.svg');
    preload.push('/blog/github.svg');

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="author" content="niemal" />
                <meta name="application-name" content="blog-diary" />
                <meta name="description" content={desc} />
                <meta name="thumbnail" content={imageUrl} />

                <link rel="icon" href="/blog/favicon.ico" />
                <link rel="image_src" href={imageUrl} />
                
                {preload.filter((img) => img !== undefined && img !== '')
                .map((img) => 
                    <link key={uuid()} rel="preload" href={img} as="image" />
                )}

                <meta property="og:type" content={title !== 'Welcome to niemalground!' ? 'article' : 'website'} />
                <meta property="og:site_name" content="blog-diary" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={desc} />
                <meta property="og:image" content={imageUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@niemal_dev" />
                <meta name="twitter:url" content={url} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={desc} />
                <meta name="twitter:image" content={imageUrl} />
            </Head>
            <header>
                <div id={styles.social} className="mt-6">
                    <a className={`${styles.social}`} href={social.twitter}><Image src="/blog/twitter.svg" alt={''} width={30} height={30} /></a>
                    <a className={`${styles.social} ml-8`} href={social.github}><Image src="/blog/github.svg" alt={''} width={30} height={30} /></a>
                </div>
                <nav id={styles.navbar} className={`flex justify-center items-center p-1 mx-auto ${styles.sticky}`}>
                    <Link href="/"><a className={`flex-col ${styles["animation"]} mt-4 ${styles["text-white"]} flex lg:mt-0 mr-4`}>blog</a></Link>
                    <Link href="/diary"><a className={`flex-col ${styles["animation"]} mt-4 ${styles["text-white"]} flex lg:mt-0`}>diary</a></Link>
                    <Image src="/blog/butterfly.svg" alt={''} className={`flex-col lg:mt-0 mr-4`} height={75} width={75} />
                    <Link href="/about"><a className={`flex-col ${styles["animation"]} mt-4 ${styles["text-white"]} flex lg:mt-0 mr-4`}>about</a></Link>
                    <a className={`flex-col ${styles["animation"]} ${styles["text-white"]} mr-4 lg:mt-0 ${styles.collapse}`}>
                        <span className={styles.rotate}>&gt;</span><span className={`ml-1`}>projects</span>
                        <a href={"/jobs"} className={`${styles.container} flex ${styles["animation"]}`}>
                            <img src="/blog/jobs_preview.png" alt={''} className={`flex-col lg:mt-0`} height={200} width={200} />
                            <div className={`flex flex-col`}>
                                <span className={`flex-col ${styles["text-white"]} mx-auto mb-4`}>jobs</span>
                                <span className={`flex-col ${styles["text-white"]}`}>Explore statistics on software jobs (skills, levels) and search for them accordingly.</span>
                            </div>
                        </a>
                    </a>
                </nav>
            </header>
        </div>
    );
}

export default Header;