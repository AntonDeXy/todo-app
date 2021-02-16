import styled from 'styled-components'

export const ForUnloggedUsersSt = styled.div`
  display: grid;
  gap: 20px;
  text-align: center;
  span {
    font-size: 1.5em;
    /* display: grid; */
    grid-auto-flow: column;
    justify-content: center;
    /* gap: 5px; */
    a {
      margin: 0 5px;
    }
  }
`

export const AuthPanelSt = styled.form`
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
    padding: 10px;
    width: 100%;
    span {
      display: grid;
      gap: 10px;
      grid-auto-flow: column;
    }
  }
`

export const HeaderSt = styled.header`
  display: grid;
  .animation-wrapper {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
  }
  h3 {
    margin: 0;
  }
`

export const ModalSt = styled.div`
  display: grid;
  background-color: white;
  width: 25em;
  justify-self: center;
  gap: 10px;
  align-content: baseline;
  align-self: center;
  justify-self: center;
  .modal-header {
    display: grid;
    grid-auto-flow: column;
    padding: 5px;
    font-size: 1.5em;
    font-weight: 600;
    .close-modal {
      justify-self: right;
      fill: #cf0000;
      transition: all .3s;
      & :hover {
        fill: red;
      }
    }
  }
  .load-img-label {
    display: grid;
    grid-auto-flow: row;
    gap: 10px;
  }
  .image-preview {
    max-height: 10em;
    max-width: 100%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }
  form {
    display: grid;
    padding: 5px;
    gap: 10px;
    .date {
      display: grid;
      gap: 5px;
      grid-auto-flow: column;
      justify-content: left;
    }
    .confirm-button {
      display: grid;
      grid-auto-flow: column;
      gap: 10px;
    }
  }
`