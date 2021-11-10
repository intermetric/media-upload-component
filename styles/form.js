import styled, { css } from "@xstyled/styled-components";

export const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const ProgressBar = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  border: 3px solid dodgerblue;

  &:after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: dodgerblue;
    animation: fill 2s linear;
  }

  @keyframes fill {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
`;

export const FormBox = styled.div`
  padding: 32px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 0.6px 3.9px -17px rgba(0, 0, 0, 0.09),
    0px 5px 31px -17px rgba(0, 0, 0, 0.18);
`;

export const Dropzone = styled.form`
  position: relative;
  width: 640px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ababab;
  border-radius: 10px;
  transition: height 0.5s ease;

  ${({ fileInProgress }) =>
    fileInProgress &&
    css`
      height: 0px;
      border: none;
    `}

  img {
    max-width: 100%;
    max-height: 100%;
    transform: scale(0.8);
  }

  @media (max-width: 760px) {
    width: 80vw;

    img {
      margin-top: 48px;
    }
  }
`;

export const DropzoneInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;

export const DropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 32px 0;
    font-size: 2rem;
    font-weight: 700;
  }

  span:not(:first-of-type) {
    margin: 32px 0;
    font-size: 1.25rem;
  }
`;

export const DropzoneBrowse = styled.divBox`
  display: flex;
  transform: translateX(5%);

  input {
    max-width: 80px;
    margin-bottom: 40px;
    z-index: 2;
    color: transparent;
  }

  p {
    color: crimson;
  }
`;

export const Datalist = styled.datalist`
  display: flex;
  justify-content: space-between;
  width: 250px;

  option:first-of-type {
    padding-left: 14px;
  }
`;
