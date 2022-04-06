import styles from '../styles/Sub.module.css';
import uuid from 'uuid';
import { useState, useEffect } from 'react';
import { animated, useTransition } from 'react-spring';

export default function Sub() {
    let props = {
        from: { opacity: 0, transform: 'scaleY(0)', left: '1000px' },
        enter: { opacity: 0.8, transform: 'scaleY(1)', left: '0px' },
        leave: { opacity: 0, transform: 'scaleX(0)', width: '0%' },
    };
    const transition = useTransition(
        [null],
        props
    );

    const [mail, setMail] = useState('');
    const [loading, setLoading] = useState('');
    const [subbedMail, setSubbedMail] = useState('');

    const sub = () => {
        let x = new XMLHttpRequest();
        setLoading('block');
        x.open('GET', `/sub/${mail}`, true);
        x.onload = (e) => {
            if (x.readyState === 4 && x.status === 200) {
                setSubbedMail(x.response);
                setLoading('none')
            } else {
                console.log(x.statusText);
            }
        }
    };
    const unsub = () => {
        let x = new XMLHttpRequest();
        setLoading('block');
        x.open('GET', `/unsub`, true);
        x.onload = (e) => {
            if (x.readyState === 4 && x.status === 200) {
                setSubbedMail('');
                setLoading('none');
            } else {
                console.log(x.statusText);
            }
        }
    };
    return (
        <>
            {transition((props, whatever) => (
                <animated.div id={styles.block} style={props} className={`rounded`}>
                        <div style={{display: loading, width: `100%`, height: `10vh`, backgroundPosition: '50% 50%', backgroundSize: 'cover', backgroundImage: `url( '/_next/image?url=%2Fcheck-mark.png&w=1920&q=100')`, marginBottom: '10px'}}></div>
                        <div id={styles.subbedMail}>{subbedMail}</div>
                        <input
                            type="email"
                            className={`form-control block w-1/6 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                            id={styles.search}
                            placeholder="E-mail.."
                            value={mail}
                            onChange={(e) => { setMail(e.target.value); }}
                        />
                        <button key={uuid()} className={`inline-block px-6 text-white font-medium leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out`} type={`button`} onClick={() => sub()}>
                        sub
                        </button>
                        <button key={uuid()} className={`inline-block px-6 text-white font-medium leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out`} type={`button`} onClick={() => unsub()}>
                        unsub
                        </button>
                </animated.div>
            ))}
        </>
    );
}