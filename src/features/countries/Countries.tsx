import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

import { fetchCountriesAsync } from './countriesSlice'
import {} from './countriesSlice'

function Countries() {
  const dispatch = useAppDispatch()
  const { countries } = useAppSelector((state) => state.countries)

  useEffect(() => {
    dispatch(fetchCountriesAsync())
  }, [dispatch])

  return (
    <div>
      <h2>Countries</h2>

      <ul>
        {countries.map(({ name }) => {
          return <li key={name}>{name}</li>
        })}
      </ul>
    </div>
  )
}

export default Countries
