import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: "AirbnbCereal";
  src: url("/fonts/AirbnbCerealLight.woff");
  font-style: normal;
  font-display: swap;
  font-weight: 200;
}

@font-face {
  font-family: "AirbnbCereal";
  src: url("/fonts/AirbnbCerealBook.woff");
  font-style: normal;
  font-display: swap;
  font-weight: 300;
}

@font-face {
  font-family: "AirbnbCereal";
  src: url("/fonts/AirbnbCerealBold.woff");
  font-style: normal;
  font-display: swap;
  font-weight: 700;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  font-size: 16px;
  font-family: "AirbnbCereal";
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
dl,
dd {
  margin: 0;
  padding: 0;
}

body {
  min-height: 100vh;
  width: 100%;
  background: #fafbff;
  line-height: 1.5;
  overflow-x: hidden;
  text-rendering: optimizeSpeed;
}

img {
  object-fit: cover;
  max-width: 100%;
}

input,
button {
  font: inherit;
}
`;
