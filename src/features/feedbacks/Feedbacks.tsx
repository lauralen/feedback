import { useEffect, useState } from 'react'
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  List,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ReactComponent as CloseIcon } from 'assets/icons/icon-close.svg'
import { ReactComponent as HamburgerIcon } from 'assets/icons/icon-hamburger.svg'
import { ReactComponent as SuggestionsIcon } from 'assets/icons/icon-suggestions.svg'

import Button from 'common/components/Button'
import Card from 'common/components/Card'
import Drawer from 'common/components/Drawer'
import FeedbackCard from 'common/components/FeedbackCard'
import H1 from 'common/components/H1'
import H2 from 'common/components/H2'
import Select from 'common/components/Select'
import Spinner from 'common/components/Spinner'
import { Status } from 'common/types'
import { capitalizeEveryWord } from 'common/utils'

import AddFeedbackButton from './components/AddFeedbackButton'
import CategoryFilter from './components/CategoryFilter'
import NoData from './components/NoData'
import {
  fetchRequestsAsync,
  getRequests,
  setSortBy,
  upvoteRequest,
} from './feedbacksSlice'
import { SortBy } from './types'

const BG_GRADIENT = 'linear(to-tr, #28A7ED, #E84D70)'

type UiStatus = Status | 'noData'
const sortOptions: SortBy[] = [
  'most upvotes',
  'least upvotes',
  'most comments',
  'least comments',
]

function Feedbacks() {
  const dispatch = useAppDispatch()
  const { status, sortBy } = useAppSelector((state) => state.feedbacks)
  const requests = useAppSelector(getRequests)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchRequestsAsync())
  }, [dispatch])

  const getUiStatus = (): UiStatus => {
    const hasData = requests.length

    if (status !== 'failed' && status !== 'loading' && !hasData) {
      return 'noData'
    } else {
      return status
    }
  }

  const onUpvoteClick = (id) => {
    dispatch(upvoteRequest(id))
  }

  return (
    <>
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        <Card p="5">
          <CategoryFilter />
        </Card>
      </Drawer>

      <Box
        as="header"
        display="grid"
        gridTemplateColumns={['1fr', 'repeat(3, 1fr)']}
        gap="3"
        mx={['0', '10']}
      >
        <Flex
          py="4"
          px="6"
          align={['center', 'flex-end']}
          justify="space-between"
          borderRadius={['none', 'lg']}
          bgGradient={BG_GRADIENT}
        >
          <Box>
            <H1 color="white">Frontend Mentor</H1>
            <H2 color="white">Feedback Board</H2>
          </Box>
          <Button
            aria-label="Toggle menu"
            variant="transparent"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            display={['block', 'none']}
            bg="transparent"
            _hover={{
              background: 'transparent',
            }}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </Button>
        </Flex>

        <Card p="5" display={['none', 'block']}>
          <CategoryFilter />
        </Card>
      </Box>

      <Box
        m={[0, 10]}
        mb={[0, 0]}
        borderRadius={['none', 'lg']}
        bg="blueGray.200"
      >
        <Flex py="4" px="6" align="center" justify="space-between">
          <Box
            display={['none', 'flex']}
            alignItems="center"
            gap="4"
            color="white"
          >
            <SuggestionsIcon />
            <Box>{requests.length} Suggestions</Box>
          </Box>
          <FormControl
            w="auto"
            display="flex"
            alignItems="center"
            color="white"
          >
            <FormLabel htmlFor="sort-by" m="0" minWidth="fit-content">
              Sort by:
            </FormLabel>
            <Select
              name="sort-by"
              border="none"
              color="white"
              bg="transparent"
              fontWeight="semibold"
              maxWidth={170}
              value={sortBy}
              options={sortOptions.map((option) => ({
                value: option,
                label: capitalizeEveryWord(option),
              }))}
              onChange={(e) =>
                dispatch(setSortBy(e.target.value.toLowerCase() as SortBy))
              }
            >
              Select
            </Select>
          </FormControl>
          <AddFeedbackButton />
        </Flex>
      </Box>
      <Box as="main" py={['8', '6']} px={['6', '10']}>
        {
          {
            loading: (
              <Center>
                <Spinner />
              </Center>
            ),
            failed: 'Error',
            idle: (
              <List>
                {requests.map((data) => (
                  <FeedbackCard
                    as="li"
                    key={data.id}
                    data={data}
                    withLink
                    onUpvoteClick={() => onUpvoteClick(data.id)}
                  />
                ))}
              </List>
            ),
            noData: <NoData />,
          }[getUiStatus()]
        }
      </Box>
    </>
  )
}

export default Feedbacks
