import { Link } from 'react-router-dom'

import Card from 'common/components/Card'
import { Country } from 'features/countries/types'

interface Props {
  data: Country
}

function CountryCard({ data }: Props) {
  const { code, name } = data

  return (
    <Link to={`/country/${code}`}>
      <Card>
        <li>
          <h3 className="country-card-name">{name}</h3>
          <ul className="country-card-data">*data*</ul>
        </li>
      </Card>
    </Link>
  )
}

export default CountryCard
