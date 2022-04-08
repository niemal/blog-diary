import Header from '../../components/header';
import Footer from '../../components/footer';
import Sub from '../../components/sub';
import styles from '../../styles/Posts.module.css';
import Image from 'next/image';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData, siteUrl }) {
    return (
        <div id="main">
            <Header title={postData.title}>
            </Header>
            <div id={styles.content} className="mt-1-2 lg:mt-28 mx-auto mb-28">
                <div className={`flex items-center`}>
                    <div className={`lg:w-1/2 mx-auto`}>
                        <h1 className="text-5xl lg:text-2xl font-bold text-white mb-2 lg:mb-6">{postData.title}</h1>

                        {postData.banner.length > 0  ? (
                            <div style={{width: `100%`, height: `40vh`, backgroundPosition: '50% 50%', backgroundSize: 'cover', backgroundImage: `url('${postData.banner}')`}}></div>
                        ) : '' }
    
                        <div id={styles.tags} className={`mb-4`}>
                            {postData.tags.map((tag) => (
                                <a key={tag} href={`/blog`} className={styles.tag}>{tag}</a>
                            ))}
                        </div>
                        <div className={`${styles.date} mb-2 ml-2 font-bold inline-block`}>
                            <Image src="/clock.svg" className={`inline-block`} width={20} height={18} />
                            <span className={`ml-1 font-bold inline-block`}>{postData.time}</span>
                        </div>
                        <div id={styles.postData} dangerouslySetInnerHTML={{ __html: postData.content }}></div>
                        <div id={styles.sub} className={`mx-auto`}><Sub siteUrl={siteUrl}></Sub></div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const data = getPostData(params.id);
    return {
        props: {
            postData: data.post,
            siteUrl: data.siteUrl
        }
    }
}