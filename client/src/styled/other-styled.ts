import styled from 'styled-components'

export const ForUnloggedUsersSt = styled.div`
  text-align: center;
  span {
    font-size: 1.5em;
    display: grid;
    grid-auto-flow: column;
    justify-content: center;
    gap: 5px;
  }
`

export const AuthPanelSt = styled.div`
  display: grid;
  grid-auto-flow: row;
  justify-self: center;
  justify-items: center;
  width: 80%;
  gap: 1.6em;
  .err {
    color: red;
  }
  a {
    text-decoration: none;
  }
  button {
    width: 100%;
  }
`

export const HeaderSt = styled.header`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  h3 {
    margin: 0;
  }
`