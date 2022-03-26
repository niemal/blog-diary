import styles from '../styles/Tags.module.css';
import { useState } from 'react';
import uuid from 'uuid';
import { animated, useTransition } from 'react-spring';

export default function Tags({ tags, callback }) {
    let [collapse, setCollapse] = useState(false);
    let propz = {
        from: { opacity: 0, transform: 'scaleY(0)', maxHeight: '0px' },
        enter: { opacity: 1, transform: 'scaleY(1)', maxHeight: '1000px' },
        leave: { opacity: 0, transform: 'scaleY(0)', maxHeight: '0px' },
    };
    const transitions = useTransition(
        collapse ? tags : [],
        propz
    );
    const transition = useTransition(
        collapse ? styles.collapse : '',
        propz
    );

    return (
        <div className={`mb-4`}>
            <div id={`${styles.normal}`} className={`grid grid-cols-2 gap-4 ${styles.tags}`}>
                {tags.map((tag) => (
                    <div key={uuid()} className={`... ${tag[1] === 'enabled' ? styles.enabled : 'disabled'}`} onClick={() => callback(tag)}><span key={tag[0]}>{tag[0]}</span></div>
                ))}
            </div>
            <div id={`${styles.phone}`}>
                <p className={`mb-4`}>
                    <button className={`inline-block px-6 text-white font-medium leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out`} type={`button`} onClick={() => setCollapse(coll => !coll)}>
                        tags
                    </button>
                </p>
                <div id={`${styles.wrapper}`}>
                    {transition((props, collapse) =>
                        <animated.div id={styles.collapseId} style={props} className={`${collapse && styles.collapse} rounded-lg shadow-lg`}>
                            <div key={uuid()} className={`grid grid-cols-2 gap-4 p-6 ${styles.tags}`}>
                            {transitions((props, tag) => (
                                <animated.div key={uuid()} style={props} className={`... ${tag[1] === 'enabled' ? styles.enabled : 'disabled'}`} onClick={() => callback(tag)}><span key={tag[0]}>{tag[0]}</span></animated.div>
                            ))}
                            </div>
                        </animated.div>
                    )}
                </div>
            </div>
        </div>
    );
}