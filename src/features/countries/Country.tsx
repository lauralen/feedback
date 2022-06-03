import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { fetchCountry } from './api'
import { Region } from './types'

interface Data {
  name: string
  nativeName: string
  currency: string | null
  continent: Region
  languages: string[]
  states: string[]
}

type Status = 'loading' | 'error' | 'idle'

const Country = () => {
  const { code } = useParams<'code'>()

  const [data, setData] = useState<Data>()
  const [status, setStatus] = useState<Status>('idle')

  useEffect(() => {
    const fetchData = async () => {
      if (code) {
        setStatus('loading')

        try {
          const res = await fetchCountry(code)
          const { country } = res.data

          if (!country) {
            throw new Error('Country with code not found')
          }

          const {
            continent,
            currency,
            languages,
            name,
            native: nativeName,
            states,
          } = country

          const formattedData = {
            name,
            nativeName,
            currency,
            continent: continent.name,
            languages: languages.map(({ name }) => name),
            states: states.map(({ name }) => name),
          }

          setData(formattedData)
          setStatus('idle')
        } catch {
          setStatus('error')
        }
      }
    }

    fetchData()
  }, [code])

  return (
    <div>
      {
        {
          loading: 'Loading...',
          error: 'Error',
          idle: <ul>*info*</ul>,
        }[status]
      }
    </div>
  )
}

export default Country
