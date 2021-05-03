import styled from 'styled-components';
import { shade } from 'polished';

export const Root = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 1vw;
  h1 {
    text-align: center;
    margin: 1vh 0;
  }
  button {
    h2 {
      font-size: 1rem;
    }
    width: 100%;
    margin: 1vh 0;
    padding: 1vh;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background 0.2s;
      &:hover {
        background: ${shade(0.2, 'white')};
      }
  }
`;