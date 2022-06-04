import { FC } from 'react'
import { useRadioGroup, Wrap } from '@chakra-ui/react'
import { useAppDispatch } from 'app/hooks'

import RadioCard from 'common/components/RadioCard'
import { capitalizeEveryWord } from 'common/utils'
import { selectCategoryFilter } from 'features/feedbacks/feedbacksSlice'
import { CategoryFilter as Option } from 'features/feedbacks/types'

const options: Option[] = ['all', 'enhancement', 'feature', 'bug', 'UI', 'UX']

const CategoryFilter: FC = () => {
  const dispatch = useAppDispatch()
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'category',
    defaultValue: 'all',
    onChange: (value) => dispatch(selectCategoryFilter(value as Option)),
  })

  const group = getRootProps()

  return (
    <Wrap spacing="3.5" {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })

        return (
          <RadioCard key={value} {...radio}>
            {capitalizeEveryWord(value)}
          </RadioCard>
        )
      })}
    </Wrap>
  )
}

export default CategoryFilter
