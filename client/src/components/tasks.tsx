import React from 'react'
import { TaskGroupsWrapper } from '../styled/tasks-styled'
import { SortedTasksType, TaskType } from '../types'
import TaskGroup from './task-group'
import { Button } from '@material-ui/core';

type TasksType = {
  openCreateNewTaskModal: () => void
  tasks: SortedTasksType[]
  editTodo: (todo: TaskType) => void
  changeTaskStatus: (todoId: string, status: boolean) => void
}

const Tasks: React.FC<TasksType> = ({ openCreateNewTaskModal, editTodo, tasks, changeTaskStatus }) => {
  return (
    <>
      <TaskGroupsWrapper>
        {
          tasks.map(({ tasks, day, isColapsed }, index) => {
            return tasks.length > 0 && (
              <TaskGroup
                changeTaskStatus={(todoId: string, status: boolean) => changeTaskStatus(todoId, status)}
                day={day} tasks={tasks} key={index} isColapsed={isColapsed}
                editTodo={(todo: TaskType) => editTodo(todo)} />
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