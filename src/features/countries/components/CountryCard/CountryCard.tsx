import Card from 'common/components/Card'
import LabeledListItem from 'common/components/LabeledListItem'
import { Country } from 'features/countries/types'

interface Props {
  data: Country
}

function CountryCard({ data }: Props) {
  const { name, continent, nativeName } = data

  return (
    <Card>
      <li>
        <h3>{name}</h3>
        <ul>
          <LabeledListItem label="Continent" value={continent} />
          <LabeledListItem label="Native name" value={nativeName} />
        </ul>
      </li>
    </Card>
  )
}

export default CountryCard
