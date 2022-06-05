import { FC } from 'react'
import { useRadioGroup, Wrap } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'app/hooks'

import RadioCard from 'common/components/RadioCard'
import { feedbackCategories } from 'common/consts'
import { selectCategoryFilter } from 'features/feedbacks/feedbacksSlice'
import { CategoryFilter as Option } from 'features/feedbacks/types'

export const options: Option[] = ['all', ...feedbackCategories]

const CategoryFilter: FC = () => {
  const dispatch = useAppDispatch()
  const { categoryFilter } = useAppSelector((state) => state.feedbacks)

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'category',
    value: categoryFilter,
    onChange: (value) => dispatch(selectCategoryFilter(value as Option)),
  })

  const group = getRootProps()

  return (
    <Wrap spacing="3.5" {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })

        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </Wrap>
  )
}

export default CategoryFilter
