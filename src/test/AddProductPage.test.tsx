import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import AddProductPage from '../components/AddProductPage'
import { fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router'

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    })

afterEach(() => {
  cleanup()
})

describe('AddProductPage', () => {
  it('renders form fields and submit button', () => {
    const queryClient = createTestQueryClient()
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AddProductPage />
        </QueryClientProvider>
      </MemoryRouter>
    )

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Artist')).toBeInTheDocument()
    expect(screen.getByLabelText('Cover Art URL')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add product/i })).toBeInTheDocument()
  })

  it('shows validation errors when fields are empty', async () => {
    const queryClient = createTestQueryClient()
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <AddProductPage />
        </QueryClientProvider>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /add product/i }))

    expect(await screen.findByText('Product name is required')).toBeInTheDocument()
    expect(await screen.findByText('Artist name is required')).toBeInTheDocument()
    expect(await screen.findByText('Cover art is required')).toBeInTheDocument()
  })
})