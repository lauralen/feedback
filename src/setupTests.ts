import { server } from 'test/mocks/server'

import '@testing-library/jest-dom/extend-expect'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
