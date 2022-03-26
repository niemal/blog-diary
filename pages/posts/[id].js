import Header from '../../components/header';
import Footer from '../../components/footer';
import styles from '../../styles/Posts.module.css';
import Image from 'next/image';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
    postData.content = postData.content.replaceAll('<p', `<p class="paragraph text-md lg:text-xl font-light text-white mb-4 mt-2" `);
    postData.content = postData.content.replaceAll('<h1', `<h1 class="text-xl lg:text-5xl font-bold text-white mb-2 lg:mb-6 pt-3" `);
    postData.content = postData.content.replaceAll('<h2', `<h2 class="text-xl lg:text-3xl font-bold text-white mb-2 lg:mb-6 pt-3" `);
    postData.content = postData.content.replaceAll('<ol', `<ol class="text-md lg:text-xl font-light text-white lg:mb-3 mt-2" `);
    postData.content = postData.content.replaceAll('<li', `<li class="pl-2" `);
    postData.content = postData.content.replaceAll('<ul', `<ul class="text-md lg:text-xl font-light text-white lg:mb-3 mt-2" `);

    return (
        <div id="main">
            <Header></Header>
            <div id={styles.content} className="mt-1-2 lg:mt-28 mx-auto mb-28">
                <div className={`flex items-center`}>
                    <div className={`lg:w-1/2 mx-auto`}>
                        <h1 className="text-5xl lg:text-2xl font-bold text-white mb-2 lg:mb-6">{postData.title}</h1>
                        <div id={styles.tags} className={`mb-4`}>
                            {postData.tags.map((tag) => (
                                <a key={tag} href={`/blog`} className={styles.tag}>{tag}</a>
                            ))}
                        </div>
                        <div className={`${styles.date} mb-2 ml-2 font-bold inline-block`}>
                            <Image src="/clock.svg" className={`inline-block`} width={20} height={18} />
                            <span className={`ml-1 font-bold inline-block`}>{postData.time}</span>
                        </div>
                        <div id={styles.postData} dangerouslySetInnerHTML={{ __html: postData.content}}></div>
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
    const postData = getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}