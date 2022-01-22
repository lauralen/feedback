import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Country = () => {
  let { code } = useParams<'code'>()

  return <div>Country details. Code: {code}</div>
}

export default Country
