import React, { FormEvent, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import Input from '@material-ui/core/Input'

type CreateNewTaskModalType = {
  modalStatus: boolean
  closeCreateNewTaskModal: () => void
  createNewTask: (date: Date, content: string, success: () => void) => void
}

const CreateNewTaskModal: React.FC<CreateNewTaskModalType> = ({ modalStatus, closeCreateNewTaskModal, createNewTask }) => {
  const [taskContent, setTaskContent] = useState<string>('')
  const [taskDate, setTaskDate] = useState<Date | Date[]>(new Date())

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const date = Array.isArray(taskDate) ? taskDate[0] : taskDate
    createNewTask(date, taskContent, () => closeCreateNewTaskModal())
  }
  return (
    <Modal className='modal' open={modalStatus}>
      <>
        <CloseIcon onClick={closeCreateNewTaskModal} />
        <form onSubmit={handleSubmit} className="create-new-task-modal">
          <Input
            onChange={e => setTaskContent(e.target.value)}
            name='taskContent' type="text" />

          <Calendar
            minDate={new Date()}
            onChange={(date) => setTaskDate(date)}
            value={taskDate}
          />

          <Button type='submit' variant="contained" color="primary">
            Create
          </Button>
        </form>
      </>
    </Modal>
  )
}

export default CreateNewTaskModal