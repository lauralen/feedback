import { Link } from 'react-router-dom'

import Card from 'common/components/Card'
import LabeledListItem from 'common/components/LabeledListItem'
import { Country } from 'features/countries/types'

interface Props {
  data: Country
}

function CountryCard({ data }: Props) {
  const { code, name, continent, nativeName } = data

  return (
    <Link to={`/country/${code}`}>
      <Card>
        <li>
          <h3 className="country-card-name">{name}</h3>
          <ul className="country-card-data">
            <LabeledListItem label="Continent" value={continent} />
            <LabeledListItem label="Native name" value={nativeName} />
          </ul>
        </li>
      </Card>
    </Link>
  )
}

export default CountryCard
