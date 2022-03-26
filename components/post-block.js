import pb from '../styles/Postblock.module.css';
import Image from 'next/image';
import uuid from 'uuid';
import { useEffect } from 'react';
import { animated, useTransition } from 'react-spring';

function PostBlock({ post }) {
    let props = {
        from: { opacity: 0, transform: 'scaleX(0)', right: '1000px' },
        enter: { opacity: 0.8, transform: 'scaleX(1)', right: '0px' },
        leave: { opacity: 0, transform: 'scaleX(0)', width: '0%' },
    };
    const transition = useTransition(
        [null],
        props
    );

    const addHover = () => {
        let blocks = document.getElementsByClassName(`${pb['blog-block']}`);
        for (let i = 0; i < blocks.length; i++) {
            blocks[i].classList.add(`${pb['block-hover']}`);
        }
    }
    useEffect(() => {
        setTimeout(addHover, 800);
    });

    return (
        <>
            {transition((props, whatever) => (
                <animated.a key={uuid()} href={`/posts/${post[3]}`} style={props} className={`w-1/4 items-center ${pb["blog-block"]} mx-auto mb-8`}>
                    <div id={pb.container} className={`block mx-auto mt-4 ml-8 mr-8`}>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-4 mx-auto">{post[0]}</h1>
                        <div className={`${pb.date} mb-2 ml-2 font-bold inline-block`}>
                            <Image src="/clock.svg" className="inline-block" width={20} height={18} />
                            <span className={`${pb.date} ml-1 font-bold inline-block`}>{post[1]}</span>
                        </div>
                        <div className="mb-8 text-white">{post[2]}</div>
                        <div className={`mb-4`}>
                            {post[5].map((tag) => (
                                <span key={uuid()} className={`inline-block ${pb.tag}`}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </animated.a>
            ))}
        </>
    );
}

export default PostBlock;