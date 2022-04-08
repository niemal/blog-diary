import styles from '../styles/Sub.module.css';
import uuid from 'uuid';
import { useState } from 'react';
import { animated, useTransition } from 'react-spring';

export default function Sub() {
    let props = {
        from: { opacity: 0, transform: 'scaleX(0)' },
        enter: { opacity: 0.8, transform: 'scaleX(1)' }
    };

    const [loading, setLoading] = useState('none');
    const [mail, setMail] = useState('');
    const [invalid, setInvalid] = useState('');
    const [subbedMail, setSubbedMail] = useState(null);

    const getSub = async () => {
        const res = await fetch(`/api/getsub`, { method: 'GET' });
        const result = await res.json();
        if (result.error) {
            console.log('Error: ', result.error);
            setSubbedMail('');
        } else {
            setSubbedMail(result.mail);
        }
    };

    if (subbedMail === null) {
        getSub();
    }
    
    const transition = useTransition(
        loading,
        props
    );

    const sub = async () => {
        setInvalid('');
        if (mail === '') {
            setSubbedMail('');
            return setInvalid('Enter an e-mail first.');
        }

        setLoading('block');
        const res = await fetch(`/api/sub/${mail}`, { method: 'GET' });
        const result = await res.json();
        if (result.invalid) {
            setSubbedMail('');
            setInvalid('E-mail is invalid.');
        } else {
            setSubbedMail(result.mail);
        }
        setLoading('none');
    };
    const unsub = async () => {
        setInvalid('');
        setLoading('block');
        const res = await fetch(`/api/unsub`, { method: 'GET' });
        const result = await res.json();
        setSubbedMail('none');
        setLoading('none');
    };

    return (
        <>
            {transition((props, whatever) => (
                <animated.div id={styles.block} style={props} className={`rounded`}>
                    <h1 className={`${styles.header} ${subbedMail === '' || subbedMail === 'none' ? 'visible' : 'hidden'} w-10/12 font-bold text-white mb-2 lg:mb-4 mx-auto`}>{subbedMail === '' || subbedMail === 'none' ? 'Subscribe for new posts' : 'Subscribed!'}</h1>
                    <h1 className={`${styles.header} ${subbedMail === '' || subbedMail === 'none' ? 'hidden' : 'visible'} w-1/3 font-bold text-white mb-2 lg:mb-4 mx-auto`}>Subscribed!</h1>
                    <div className={`mx-auto`} style={{display: loading, width: `3.8rem`, height: `4rem`, backgroundPosition: '100% 50%', backgroundSize: 'auto', backgroundImage: `url('/_next/image?url=%2Floading.gif&w=1920&q=100')`, marginBottom: '10px'}}></div>
                    <div id={styles.subbedMail}>
                        <span id={styles.registered} className={subbedMail === '' ? 'hidden' : 'visible'}>Registered e-mail:</span>
                        <span id={styles.invalid} className={`${invalid === '' ? 'hidden' : 'visible'}`}>{invalid}</span>
                        <span id={styles.mail} className={`${subbedMail === '' ? 'hidden' : 'visible'}`}>{subbedMail}</span>
                    </div>
                    <input
                        type="email"
                        className={`${subbedMail === '' || subbedMail === 'none' ? 'visible' : 'hidden'} form-control block w-1/6 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                        id={styles.search}
                        placeholder="E-mail.."
                        value={mail}
                        onChange={(e) => { setMail(e.target.value); }}
                        onKeyUp={(e) => { if (e.key === 'Enter') { sub(); }}}
                    />
                    <div id={styles.buttonContainer} className={`mx-auto`}>
                        <button key={uuid()} className={`${subbedMail === '' || subbedMail === 'none' ? 'visible' : 'hidden'} px-6 text-white font-medium leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out`} type={`button`} onClick={() => sub()}>
                        sub
                        </button>
                        <button key={uuid()} className={`px-6 text-white font-medium leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out`} type={`button`} onClick={() => unsub()}>
                        unsub
                        </button>
                    </div>
                </animated.div>
            ))}
        </>
    );
}