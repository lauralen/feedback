import { useEffect, useState } from 'react'
import {
  Box,
  Button as ButtonCU,
  Center,
  Flex,
  FormControl,
  FormLabel,
  List,
} from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ReactComponent as CloseIcon } from 'assets/icons/icon-close.svg'
import { ReactComponent as HamburgerIcon } from 'assets/icons/icon-hamburger.svg'

import Card from 'common/components/Card'
import Drawer from 'common/components/Drawer'
import H1 from 'common/components/H1'
import H2 from 'common/components/H2'
import Select from 'common/components/Select'
import Spinner from 'common/components/Spinner'

import AddFeedbackButton from './components/AddFeedbackButton'
import Feedback from './components/Feedback'
import NoData from './components/NoData'
import { fetchRequestsAsync, getRequests, setSortBy } from './feedbacksSlice'
import { SortBy, Status } from './types'

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

  return (
    <Box minHeight="100vh" bg="gray.100">
      <Box as="header" bgGradient="linear(to-tr, #28A7ED, #E84D70)">
        <Flex py="4" px="6" align="center" justify="space-between">
          <Box>
            <H1 color="white">Frontend Mentor</H1>
            <H2 color="white">Feedback Board</H2>
          </Box>
          <ButtonCU
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            bg="transparent"
            _hover={{
              background: 'transparent',
            }}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
          </ButtonCU>
        </Flex>
      </Box>
      <Drawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      >
        <Card p="5">Mobile drawer</Card>
      </Drawer>

      <Box bg="blueGray.200">
        <Flex py="4" px="6" align="center" justify="space-between">
          <FormControl color="white" display="flex" alignItems="center">
            <FormLabel htmlFor="sort-by" m="0">
              Sort by:
            </FormLabel>
            <Select
              name="sort-by"
              border="none"
              fontWeight="semibold"
              maxWidth={170}
              value={sortBy}
              options={sortOptions.map((option) => {
                return {
                  value: option,
                  label: option.replace(/\w\S*/g, (w) =>
                    w.replace(/^\w/, (c) => c.toUpperCase())
                  ),
                }
              })}
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
      <Box as="main" py="8" px="6">
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
                {requests.map((data) => {
                  return <Feedback key={data.id} data={data} />
                })}
              </List>
            ),
            noData: <NoData />,
          }[getUiStatus()]
        }
      </Box>
    </Box>
  )
}

export default Feedbacks
