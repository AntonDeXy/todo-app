import React from 'react'
import Moment from 'react-moment'
import { TasksHeaderStyled } from '../styled/tasks-styled'
import { Link } from 'react-router-dom';

const TasksHeader = () => {
  const todayDay = new Date()
  return (
    <Link to='/' >
      <TasksHeaderStyled>
        <div className="left-block">
          <Moment className='day' format='DD' date={todayDay} />
          <div className="month-and-year">
            <Moment format='MMM' date={todayDay} />
            <Moment format='YYYY' date={todayDay} />
          </div>
        </div>
        <div className="right-block">
          <Moment format='dddd' date={todayDay} />
        </div>
      </TasksHeaderStyled>
    </Link>
  )
}

export default TasksHeader