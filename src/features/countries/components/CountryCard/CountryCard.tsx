import { Country } from 'features/countries/types'

interface Props {
  data: Country
}

function CountryCard({ data }: Props) {
  const { name } = data

  return <li className="country-card">{name}</li>
}

export default CountryCard
