import React, { useState } from 'react'
import { TaskGroupStyled, TasksWrapper } from '../styled/tasks-styled'
import { TaskType } from '../types'
import Task from './task'
import MinimizeIcon from '@material-ui/icons/Minimize'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

type TaskGroupType = {
  day: string
  tasks: TaskType[]
  changeTaskStatus: (taskId: string, status: boolean) => void
}

const TaskGroup: React.FC<TaskGroupType> = ({ day, tasks, changeTaskStatus }) => {
  const [isTasksClose, setTaskClose] = useState(false)

  return (
    <TaskGroupStyled className={`${isTasksClose ? 'group--closed' : ''}`} >
      <div onClick={() => setTaskClose(!isTasksClose)} className='group-title'>
        <span>{day}</span>
        {
          isTasksClose
            ? (
              <MinimizeIcon />
            )
            : (
              <KeyboardArrowDownIcon />
            )
        }
      </div>
      <TasksWrapper>
        {
          !isTasksClose && (
            tasks.map(task => <Task changeStatus={(status: boolean) => changeTaskStatus(task.id, status)} task={task} />)
          )
        }
      </TasksWrapper>
    </TaskGroupStyled>
  )
}

export default TaskGroup