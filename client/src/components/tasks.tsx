import React from 'react'
import { TaskGroupsWrapper } from '../styled/tasks-styled'
import { SortedTasksType } from '../types'
import TaskGroup from './task-group'
import { Button } from '@material-ui/core';

type TasksType = {
  openCreateNewTaskModal: () => void
  tasks: SortedTasksType[]
  changeTaskStatus: (todoId: string, status: boolean) => void
}

const Tasks: React.FC<TasksType> = ({ openCreateNewTaskModal, tasks, changeTaskStatus }) => {
  return (
    <>
      <TaskGroupsWrapper>
        {
          tasks.map(({ tasks, day }) => {
            return tasks.length > 0 && (
              <TaskGroup
                changeTaskStatus={(todoId: string, status: boolean) => changeTaskStatus(todoId, status)}
                day={day} tasks={tasks} />
            )
          })
        }
      </TaskGroupsWrapper>
      <Button 
        onClick={openCreateNewTaskModal} 
        type='submit' variant="contained" 
        color="primary">Add task</Button>
    </>
  )
}

export default Tasks