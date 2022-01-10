import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

import CountryCard from './components/CountryCard/CountryCard'
import { fetchCountriesAsync } from './countriesSlice'

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
          failed: 'Error',
          idle: (
            <ul>
              {countries.map((data) => {
                return <CountryCard key={data.name} data={data} />
              })}
            </ul>
          ),
        }[status]
      }
    </>
  )
}

export default Countries
