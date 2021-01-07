import React, { useState } from 'react'
import { TaskGroupStyled, TasksWrapper } from '../styled/tasks-styled'
import { TaskType } from '../types'
import Task from './task'
import MinimizeIcon from '@material-ui/icons/Minimize'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'

type TaskGroupType = {
  day: string
  tasks: TaskType[]
  isColapsed: boolean
  editTodo: (todo: TaskType) => void
  changeTaskStatus: (todoId: string, status: boolean) => void
}

const TaskGroup: React.FC<TaskGroupType> = ({ day, tasks, editTodo, isColapsed, changeTaskStatus }) => {
  const [isTasksClose, setTaskClose] = useState(isColapsed)

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
            tasks.map(task => <Task editTodo={() => editTodo(task)} key={task._id} changeStatus={(status: boolean) => changeTaskStatus(task._id, status)} task={task} />)
          )
        }
      </TasksWrapper>
    </TaskGroupStyled>
  )
}

export default TaskGroup