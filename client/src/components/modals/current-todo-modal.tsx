import React, { FormEvent, useState } from 'react'
import { TaskType } from '../../types'
import Modal from '@material-ui/core/Modal'
import CloseIcon from '@material-ui/icons/Close'
import { ModalSt } from '../../styled/other-styled'
import { Button } from '@material-ui/core'
import Spinner from "react-spinners/BounceLoader"
import 'react-calendar/dist/Calendar.css'
import { spinnerStyles } from '../../App'
import Moment from 'react-moment'

type CurrentToDoModalType = {
  initialTodo: TaskType
  deleteTodo: (todoId: string) => Promise<boolean>
  closeModal: () => void
}

const CurrentToDoModal: React.FC<CurrentToDoModalType> = ({ initialTodo, deleteTodo, closeModal }) => {
  const [todo] = useState<TaskType>(initialTodo)
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleRemove = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const isSuccess = await deleteTodo(todo._id)
    setLoading(false)
    if (isSuccess) {
      closeModal()
    }
  }

  return (
    <Modal className='modal' open={true}>
      <ModalSt>
        <div className='modal-header'>
          <span>Todo details</span>
          <CloseIcon className='close-modal' onClick={closeModal} />
        </div>
        <form onSubmit={handleRemove} className="create-new-task-modal">
          <span>
            {todo.content}
          </span>

          <span className='date'>
            Due to:
            <Moment format="DD MMM YYYY">
              {todo.date}
            </Moment>
          </span>

          <span className='date'>
            Created at:
            <Moment format="DD MMM YYYY">
              {todo.createdAt}
            </Moment>
          </span>
        
          {
            todo.img && <img className='image-preview' src={todo.img} alt="todo img" />
          }

          <Button className='confirm-button' disabled={isLoading} type='submit' variant="contained" color="secondary">
            {
              isLoading ? (
                <Spinner css={spinnerStyles} size={25} color={'white'} />
              ) : (
                  <>Delete</>
                )
            }
          </Button>

        </form>
      </ModalSt>
    </Modal>
  )
}

export default CurrentToDoModal