import { useEffect } from 'react'
import { useAppDispatch } from 'app/hooks'

import { fetchCountriesAsync } from './countriesSlice'
import {} from './countriesSlice'

function Countries() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCountriesAsync())
  }, [dispatch])

  return <div>Countries</div>
}

export default Countries
