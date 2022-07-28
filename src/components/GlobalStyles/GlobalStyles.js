import { createGlobalStyle } from "styled-components";
import { COLORS, FONT_FACES } from "../constants";

const GlobalStyles = createGlobalStyle`
/* fonts */
${FONT_FACES}

/* CSS Reset */
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
/* GLOBAL STYLES */
*,
*:before,
*:after {
  box-sizing: border-box;
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: auto;
}
#__next {
  /*
    Create a stacking context, without a z-index.
    This ensures that all portal content (modals and tooltips) will
    float above the Next app.
  */
  isolation: isolate;
}
html, body, #__next, #__next > div {
  height: 100%;
}
body {
  color: var(--color-text);
  background: var(--color-background);
}
a:focus {
  outline: 5px auto var(--color-primary);
}
body, input, button, select, option {
  font-family: var(--font-family);
  font-weight: var(--font-weight-light);
}
h1, h2, h3, h4, h5, h6, strong {
  font-weight: var(--font-weight-bold);
}
h1, h2 h3, h4, h5, h6, p {
  text-rendering: optimizeLegibility;
}
p {
  margin-bottom: 1.5em;
  font-size: 1.125rem;
}
em {
  font-style: italic;
}
strong {
  font-weight: var(--font-weight-medium);
}
/* Scrollbar and selection styles */
::selection {
  background-color: var(--color-primary);
  color: white;
}
@media (orientation: landscape) {
  ::-webkit-scrollbar {
    width: 9px;
    height: 11px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-track {
    border-radius: 3px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--color-gray-300);
    border: 2px solid var(--color-background);
  }
}
/* CSS Variables */
:root {
  --font-weight-bold: 700;
  --font-weight-medium: 500;
  --font-weight-light: 300;
  
  --font-family: 'Ubuntu', sans-serif;
  
  --color-text: ${COLORS.text};
  --color-background: ${COLORS.background};
  --color-background-fade: ${COLORS.background_fade};
  --color-primary: ${COLORS.primary};
  --color-primary-fade: ${COLORS.primary_fade};
  --color-secondary: ${COLORS.secondary};
  --color-secondary-fade: ${COLORS.secondary_fade};
  --color-tertiary: ${COLORS.tertiary};
  --color-info: ${COLORS.info};
  --color-gray-100: ${COLORS.gray[100]};
  --color-gray-200: ${COLORS.gray[200]};
  --color-gray-300: ${COLORS.gray[300]};
  --color-gray-400: ${COLORS.gray[400]};
  --color-gray-500: ${COLORS.gray[500]};
  --color-gray-600: ${COLORS.gray[600]};
  --color-gray-700: ${COLORS.gray[700]};
  --color-gray-800: ${COLORS.gray[800]};
  --color-gray-800-fade: ${COLORS.gray["fade_800"]};
  --color-gray-900: ${COLORS.gray[900]};
}
`;

export default GlobalStyles;
