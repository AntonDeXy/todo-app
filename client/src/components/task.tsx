import React from 'react'
import Moment from 'react-moment'
import { TaskType } from '../types'
import { TaskStyled } from '../styled/tasks-styled'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
 
const CustomCheckbox = withStyles({
  root: {
    color: purple[400],
    '&$checked': {
      color: purple[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

type TaskCompType = {
  task: TaskType
  editTodo: () => void
  changeStatus: (status: boolean) => void 
}

const Task:React.FC<TaskCompType> = ({task, editTodo, changeStatus}) => {
  return (
    <TaskStyled isCompleted={task.isCompleted} >
      <div className='status' >
        <Checkbox checked={task.isCompleted} onClick={() => changeStatus(!task.isCompleted)} />
      </div>
      <div onClick={editTodo} className="content">
        {task.content}
        {
          task.img && (
            <img src={task.img} alt=""/>
          )
        }
      </div>
      <div className="date">
        <Moment format="DD">
          {task.date}
        </Moment>
        <Moment format="MMM">
          {task.date}
        </Moment>
      </div>
    </TaskStyled>
  )
}

export default Task