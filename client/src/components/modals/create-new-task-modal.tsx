import React, { FormEvent, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Button, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { ModalSt } from '../../styled/other-styled'
import Compress from "react-image-file-resizer"
import Spinner from "react-spinners/BounceLoader"
import { spinnerStyles } from '../../App'

type CreateNewTaskModalType = {
  modalStatus: boolean
  closeCreateNewTaskModal: () => void
  createNewTask: (date: Date, content: string, success: () => void, taskImg?: string) => void
}

const CreateNewTaskModal: React.FC<CreateNewTaskModalType> = ({ modalStatus, closeCreateNewTaskModal, createNewTask }) => {
  const [taskContent, setTaskContent] = useState<string>('')
  const [taskDate, setTaskDate] = useState<Date | Date[]>(new Date())
  const [fileBase64, setFileBase64] = useState<any>('')
  const [isLoading, setLoading] = useState<boolean>(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const date = Array.isArray(taskDate) ? taskDate[0] : taskDate
    createNewTask(date, taskContent, () => {
      setTaskContent('')
      setTaskDate(new Date())
      setFileBase64('')
      setLoading(false)
      closeCreateNewTaskModal()
    }, fileBase64)
  }

  return (
    <Modal className='modal' open={modalStatus}>
      <ModalSt>
        <div className='modal-header'>
          <span>Create new todo</span>
          <CloseIcon className='close-modal' onClick={closeCreateNewTaskModal} />
        </div>
        <form onSubmit={handleSubmit} className="create-new-task-modal">
          <TextField required disabled={isLoading} id="standard-basic" onChange={e => setTaskContent(e.target.value)} value={taskContent} label="Todo content" />

          <LoadImg
            img={fileBase64}
            setImg={(base64) => setFileBase64(base64)}
            isLoading={isLoading}
          />

          <Calendar
            minDate={new Date()}
            onChange={(date) => setTaskDate(date)}
            value={taskDate}
          />

          <Button className='confirm-button' disabled={isLoading} type='submit' variant="contained" color="primary">
            {
              isLoading ? (
                <Spinner css={spinnerStyles} size={25} color={'white'} />
              ) : (
                <>Create</>
              )
            }
          </Button>

        </form>
      </ModalSt>
    </Modal>
  )
}

export default CreateNewTaskModal

type LoadImgType = {
  img: any
  setImg: (base64: any) => void
  isLoading: boolean
}

export const LoadImg: React.FC<LoadImgType> = ({ setImg, img, isLoading }) => {
  const [isImgLoading, setImgLoading] = useState(false)

  const getBase64 = (e: any) => {
    setImgLoading(true)
    const file = e.target.files[0]

    if (file) {
      Compress.imageFileResizer(
        file,
        1920,
        1920,
        "JPEG",
        70,
        0,
        (uri) => {
          setImg(uri)
        },
        "base64"
      )
    } else {
      setImg('')
    }
    setImgLoading(false)
  }

  return (
    <>
      <label className='load-img-label'>
        <span>Load img:</span>
        <input disabled={isLoading || isImgLoading} onChange={(e) => getBase64(e)} type="file" />
      </label>

      {
        isImgLoading && (
          <Spinner css={spinnerStyles} size={25} color={'white'} loading={isLoading} />
        )
      }
      {
        img && (
          <img className='image-preview' src={img} alt='img' />
        )
      }
    </>
  )
} 