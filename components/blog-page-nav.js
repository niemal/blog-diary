import styles from '../styles/Pagination.module.css';

export default function Pagination({ current, iter, steps, pages, callback, parallax }) {
    let panel = [];

    if (iter-steps > 0)
        panel.push(<li key={`<=`} className={`${styles['page-item']}`}><a
        className={"page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"} onClick={() => { callback(current, iter-steps, steps, pages); parallax?.current?.scrollTo(0.1); }}>&lt;=</a></li>);

    for (let i=iter; i < iter+steps && i <= pages.length; i++) {
        panel.push(<li key={i} className={i === current ? `${styles.active}` : `${styles['page-item']}`}><a
        className={`page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none focus:shadow-none`}
        href={"#"} onClick={() => { callback(i, iter, steps, pages); parallax?.current?.scrollTo(0.1); }}>{i}</a></li>);
    }

    if (iter+steps <= pages.length) {
        panel.push(<li key={`=>`} className={`${styles['page-item']}`}><a
        className={"page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none focus:shadow-none"} onClick={() => { callback(current, iter+steps, steps, pages); parallax?.current?.scrollTo(0.1); }}>=&gt;</a></li>);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className={"flex list-style-none"}>
                {panel}
            </ul>
        </nav>
    );
}