import styled from 'styled-components'

export const TasksHeaderStyled = styled.div`
  display: grid;
  .animation-wrapper {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    color: black;
  }
  .left-block {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr auto;
    .day {
      text-align: center;
      font-size: 3em;
    }
    .month-and-year {
      display: grid;
      grid-auto-flow: column;
      text-align: left;
      gap: 5px;
      justify-content: left;
    }
  }
  .right-block {
    font-size: 2.2em;
    text-align: right;
  }
`

export const TaskGroupsWrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 20px;
  .group--closed {
    padding-bottom: 10px;
    border-bottom: 1px solid black;
  }
`

export const TasksWrapper = styled.div`
  display: grid;
  gap: 10px;
`

export const TaskGroupStyled = styled.div`
  display: grid;
  grid-auto-flow: row;
  .group-title {
    grid-auto-flow: row;
    border-radius: 0;
    border-top: unset;
    border-left: unset;
    border-right: unset;
    display: grid;
    grid-template-columns: 1fr auto;
    cursor: pointer;
    span {
      display: grid;
      grid-auto-flow: column;
      justify-content: left;
      align-items: center;
      gap: 10px;
      i {
        align-self: center;
      }
      .arrow {
        transform: rotate(90deg)
      }
      .arrow--closed {
        transform: rotate(270deg)
      }
    }
  }
`

export const TaskStyled = styled.div<{isCompleted: boolean}>`
 display: grid;
 width: 100%;
 .animation-wrapper {
  display: grid;
  grid-template-columns: auto 1fr 3em;
  border: 1px solid ${props => props.isCompleted ? '#cacaca' : 'gray'};
  border-radius: 10px;
  align-items: center;
  color: ${props => props.isCompleted ? '#cacaca' : 'black'};
  
  }
  .content {
    align-content: center;
    height: calc(100% - 10px);
    border-left: 1px solid ${props => props.isCompleted ? '#cacaca' : 'gray'};
    border-right: 1px solid ${props => props.isCompleted ? '#cacaca' : 'gray'};
    display: grid;
    font-size: 1.2em;
    gap: 10px;
    img {
      height: 10em;
      max-width: 100%;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      filter: ${props => props.isCompleted ? 'opacity(0.7)' : 'opacity(1)'};
    }
  }
  .date {
    display: grid;
    grid-auto-flow: row;
    text-align: center;
  }
  div {
    padding: 5px 7px;
  }
`