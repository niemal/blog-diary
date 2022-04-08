import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/About.module.css';
import { getAuthor } from '../lib/author';

export async function getStaticProps() {
  const author = getAuthor();
  return {
    props: {
      author: author,
    }
  };
}

export default function About({ author }) {
    return (
        <div>
            <Header></Header>
            <div id="main">
            <div id="content" style={{textAlign: 'center'}} className="w-1/2 mt-1-2 lg:mt-28 mx-auto">
                <div id={styles.wrapper} className="lg:flex items-center">
                    <div id={styles.author} className={`block rounded`}>
                        <h1 className={`text-5xl lg:text-6xl font-bold text-white mb-2 lg:mb-6`}><a href={author.homepage} className={`pb-4`}>{author.name}</a></h1>
                        <p className="text-md lg:text-xl font-light text-white mb-6">
                            <div style={{width: `10rem`, height: `20vh`, backgroundPosition: '50% 50%', backgroundSize: 'cover', backgroundImage: `url('${author.avatar}')`, marginBottom: '10px', borderRadius: '50%', marginLeft: 'auto', marginRight: 'auto'}}></div>
                            <span>{author.about}</span>
                            <a href={author.social.twitter}>Twitter</a>
                            <a href={author.social.github}>Github</a>
                            <span id={styles.quote}>{author.quotes[Math.floor(Math.random() * author.quotes.length)]}</span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer relative={false}></Footer>
            </div>
        </div>
    );
}