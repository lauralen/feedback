import { FC } from 'react'
import { Link } from 'react-router-dom'

import Button from 'common/components/Button'

const AddFeedbackButton: FC = () => {
  return (
    <Link to="/add-feedback">
      <Button>+ Add feedback</Button>
    </Link>
  )
}

export default AddFeedbackButton
