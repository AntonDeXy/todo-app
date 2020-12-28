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
  changeStatus: (status: boolean) => void 
}

const Task:React.FC<TaskCompType> = ({task, changeStatus}) => {
  return (
    <TaskStyled isCompleted={task.isCompleted} >
      <div className='status' >
        <Checkbox checked={task.isCompleted} onClick={() => changeStatus(!task.isCompleted)} />
      </div>
      <div className="content">
        {task.content}
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