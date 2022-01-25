import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

import Input from 'common/components/Input'
import Select from 'common/components/Select'

import CountryCard from './components/CountryCard'
import {
  fetchCountriesAsync,
  getCountries,
  setRegionFilter,
  setSearch,
} from './countriesSlice'
import { RegionFilter, Status } from './types'

type UiStatus = Status | 'noMatch'

const regionFilters: RegionFilter[] = [
  'None',
  'Africa',
  'North America',
  'Asia',
  'Europe',
  'Oceania',
  'South America',
]

function Countries() {
  const dispatch = useAppDispatch()

  const { status, search, regionFilter } = useAppSelector(
    (state) => state.countries
  )
  const countries = useAppSelector(getCountries)

  useEffect(() => {
    dispatch(fetchCountriesAsync())
  }, [dispatch])

  const getUiStatus = (): UiStatus => {
    const hasFilters = search.length || regionFilter !== 'None'
    if (
      status !== 'failed' &&
      status !== 'loading' &&
      hasFilters &&
      !countries.length
    ) {
      return 'noMatch'
    } else {
      return status
    }
  }

  const Filters = (
    <>
      <div className="filters-wrapper">
        <Input
          type="search"
          value={search}
          onChange={(event) => dispatch(setSearch(event.target.value))}
          placeholder="Search for a country..."
        />

        <Select
          placeholder="Filter by Region"
          value={regionFilter}
          options={regionFilters}
          onChange={(e) => {
            const value = e.target.value
            dispatch(setRegionFilter(value as RegionFilter))
          }}
        />
      </div>
    </>
  )

  return (
    <>
      <h2>Countries</h2>
      {
        {
          loading: 'Loading...',
          failed: 'Error',
          idle: (
            <>
              {Filters}
              <ul className="countries">
                {countries.map((data) => {
                  return <CountryCard key={data.name} data={data} />
                })}
              </ul>
            </>
          ),
          noMatch: (
            <>
              {Filters}
              <div>
                No countries match selected filter and / or search value
              </div>
            </>
          ),
        }[getUiStatus()]
      }
    </>
  )
}

export default Countries
