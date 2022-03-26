import Header from '../components/header';
import Footer from '../components/footer';

export default function About() {
    return (
        <div>
            <Header></Header>
            <div id="main">
            <div id="content" className="w-1/2 mt-1-2 lg:mt-28 mx-auto">
                <div className="lg:flex items-center">
                    <div className="block mx-auto">
                        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-2 lg:mb-6">What is this about?</h1>
                        <p className="text-md lg:text-xl font-light text-white mb-6">Well it's a small project to learn tailwindcss and next.js!</p>
                    </div>
                </div>
            </div>
            <Footer relative={false}></Footer>
            </div>
        </div>
    );
}