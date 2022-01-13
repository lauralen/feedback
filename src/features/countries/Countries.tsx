import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

import Input from 'common/components/Input'

import CountryCard from './components/CountryCard'
import { fetchCountriesAsync } from './countriesSlice'

function Countries() {
  const dispatch = useAppDispatch()
  const { countries, status } = useAppSelector((state) => state.countries)

  const [search, setSearch] = useState<string>('')

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
            <>
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search for a country..."
              />

              <ul>
                {countries.map((data) => {
                  return <CountryCard key={data.name} data={data} />
                })}
              </ul>
            </>
          ),
        }[status]
      }
    </>
  )
}

export default Countries
