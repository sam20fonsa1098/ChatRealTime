import styled from 'styled-components';
import { shade } from 'polished'

export const Root = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 2.5fr 7fr;
  > section {
    height: 100%;
    min-height: 100vh;
  }
  > section:first-child {
    background: #222;
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      margin: 2vh 0;
      background: gray;
      border-radius: 12px;
      border: 1px solid #eee;
      transition: background 0.2s;
      &:hover {
        background: ${shade(0.2, 'gray')};
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        align-self: center;
      }
    }
  }
  > section:last-child {
    background: #eee;
  }
`;