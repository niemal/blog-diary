import uuid from 'uuid';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/Diary.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { diaryEntries, allowed } from '../lib/diary_util';

export async function getServerSideProps(context) {
    for (let ip of allowed) {
        if (context.res.socket.remoteAddress.indexOf(ip) > -1) {
            return {
              props: {
                entries: diaryEntries.entries,
                today: diaryEntries.today,
                todaysEntry: diaryEntries.todaysEntry
              }
            };
        }
    }

    return {
        props: {
            entries: []
        }
    }
}

export default function Diary({ entries, today, todaysEntry }) {
    let props = {
        from: { opacity: 0, transform: 'scaleY(0)', },
        enter: { opacity: 1, transform: 'scaleY(1)', },
        trail: 100,
    };
    let transitionHeader;

    if (entries.length === 0) {
        transitionHeader = useTransition(null, props);
        return (
            <div>
                <Header></Header>
                <div id="main" className={styles.main}>
                    <div id={styles.contentDiary} className="w-1/2 lg:mt-28 mx-auto">
                        <div className="lg:flex items-center">
                            <div className="block mx-auto">
                                {transitionHeader((props, h) =>
                                    <animated.h1 style={props} className="mx-auto text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-6">
                                        Sorry, this content is currently private.
                                    </animated.h1>)}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }

    let diaryLayouts = [];

    let [entryContent, setEntryContent] = useState([]);
    let [headerContent, setHeaderContent] = useState('');

    let transitionContent = useTransition(entryContent, props);
    transitionHeader = useTransition(headerContent, props);

    const clicked = (day, month, year, content) => {
        setHeaderContent(`${day}/${month}/${year}`);

        let parsed = content.map((c) => {
            if (c.startsWith('+'))
                return [c.slice(1, c.length), 'check'];
            if (c.startsWith('-'))
                return [c.slice(1, c.length), 'cancel'];
            return [c, ''];
        });
        setEntryContent(parsed);
    };

    entries.forEach(entry => {
        let layout = [];

        layout.push(`${entry[0]+1}, ${entry[1]}`);
        let entryBody = []
        for (let i = 0; i < entry[2].length; i += 7) {
            let entryRow = [];

            let max = i + 7;
            if (max > entry[2].length)
                max = entry[2].length;
            
            for (let y = i; y < max; y++) {
                if (entry[2][y][2])
                    entryRow.push(<td key={uuid()} className={styles.future}>{entry[2][y][0]}</td>);
                else if (entry[2][y][1].length === 0)
                    entryRow.push(<td key={uuid()} className={styles.unused}>{entry[2][y][0]}</td>);
                else
                    entryRow.push(<td key={uuid()} onClick={() => clicked(entry[2][y][0], entry[0]+1, entry[1], entry[2][y][1])} className={styles.used}><a key={uuid()} href={`#`}>{entry[2][y][0]}</a></td>);
            }
            entryBody.push(<tr key={uuid()} className="">{entryRow}</tr>);
        }
        layout.push(<tbody>{entryBody}</tbody>);
        diaryLayouts.push(layout);
    });

    if (entryContent.length === 0) {
        if (today) {
            clicked(null, null, null, todaysEntry[1]);
            setHeaderContent(todaysEntry[0]);
        } else {
            setHeaderContent('No entry has been made yet today!');
            setEntryContent([['You can click on the diary below to see available entries!', '']]);
        }
    }

    return (
        <div>
            <Header></Header>
            <div id="main">
                <div id={styles.contentDiary} className="w-1/2 mt-1-2 lg:mt-28 mx-auto">
                    <div className="lg:flex items-center">
                        <div className="block mx-auto">
                            {transitionHeader((props, h) => <animated.h1 style={props} className="mx-auto text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-6">{h}</animated.h1>)}
                            {transitionContent((props, c) => (
                                <animated.p style={props} className={`${styles.container} flex justify-center mt-6 text-md lg:text-xl font-light text-white mb-6`}>
                                {c[1] === 'check' ? <Image src={`/check-mark.png`} className={styles.mark} width={30} height={30} /> : ''}
                                {c[1] === 'cancel' ? <Image src={`/cancel.png`} className={styles.mark} width={30} height={30} /> : ''}
                                <span className={`pl-2`}>{c[0]}</span>
                                </animated.p>
                            ))}
                            <div className={`${styles.vLine} mt-10 mx-auto mb-4`}></div>
                        </div>
                    </div>
                </div>
                <h2 className="mx-auto text-3xl lg:text-4xl font-bold text-white mb-2">{diaryLayouts[0][0]}</h2>
                <table id={styles.table} className="table-auto mt-30 text-white lg:text-2xl mb-10 mx-auto">
                    <thead>
                        <tr>
                            <th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                        </tr>
                    </thead>
                    {diaryLayouts[0][1]}
                </table>
            </div>
            <Footer></Footer>
        </div>
    );
}
