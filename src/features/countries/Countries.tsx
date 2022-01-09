import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

import { fetchCountriesAsync } from './countriesSlice'
import {} from './countriesSlice'

function Countries() {
  const dispatch = useAppDispatch()
  const { countries, status } = useAppSelector((state) => state.countries)

  useEffect(() => {
    dispatch(fetchCountriesAsync())
  }, [dispatch])

  return (
    <>
      <h2>Countries</h2>

      {
        {
          loading: 'Loading...',
          error: 'Error',
          idle: (
            <ul>
              {countries.map(({ name }) => {
                return <li key={name}>{name}</li>
              })}
            </ul>
          ),
        }[status]
      }
    </>
  )
}

export default Countries
