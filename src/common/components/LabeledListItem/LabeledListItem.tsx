interface Props {
  label: string
  value: string | number | undefined
}

function LabeledListItem({ label, value }: Props) {
  return (
    <li className="labeled-li">
      <span className="label">{label}:</span>
      <span>{value ?? '-'}</span>
    </li>
  )
}

export default LabeledListItem
