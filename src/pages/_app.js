import GlobalStyles from "../components/GlobalStyles";
import "highlight.js/styles/vs2015.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
