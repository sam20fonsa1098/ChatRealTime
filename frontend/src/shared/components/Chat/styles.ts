import styled from 'styled-components';
import { shade } from 'polished';

export const Root = styled.section`
  display: grid;
  grid-template-rows: 1fr 8fr;
  > div {
    padding: 1vh 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    h1 {
      color: black;
    }
    div {
      display: flex;
      align-items: center;
      svg {
        color: blue;
        width: 4vh;
        height: 4vh;
        margin-right: 1vw;
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0;
    width: 64%;
    div {
      padding: 0;
      height: 10vh;
      display: flex;
      input {
        width: 100%;
        text-align: start;
      }
      button {
        border: 0;
        width: 25%;
        max-width: 100px;
        background: gray;
        transition: background 0.2s;
        &:hover {
          background: ${shade(0.5, 'gray')};
        }
        svg {
          color: green;
          margin: 0;
          padding: 0;
        }
      }
    }
  }
  section {
    padding-bottom: 10vh;
    aside {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: gray;
      border-radius: 12px;
      padding: 1vh;
      margin: 1vh;
      img {
        width: 10vh;
        height: 10vh;
        border-radius: 5vh;
        margin-right: 0.5vw;
      }
      div {
        display: flex;
        flex-direction: column;
        div {
          display: flex;
          flex-direction: row;
          h1, h2 {
            font-size: 1rem;
            color: #fff;
          }
          svg {
            color: brown;
            margin-right: 1vw;
          }
        }
      }
    }
  }
`;