import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ProductList from '../components/ProductList'
import { fetchProducts } from '../api/products'

vi.mock('../api/products', () => ({
  fetchProducts: vi.fn(),
}))

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

beforeEach(() => {
  vi.clearAllMocks()
})

describe('ProductList', () => {
  it('renders loading state initially', () => {
    vi.mocked(fetchProducts).mockImplementation(() => new Promise(() => {}))
    const queryClient = createTestQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <ProductList />
      </QueryClientProvider>,
    )

    expect(screen.getByText('Loading products...')).toBeInTheDocument()
  })

  it('renders error message on error', async () => {
    vi.mocked(fetchProducts).mockRejectedValue(new Error('Oops, something went wrong!'))
    const queryClient = createTestQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <ProductList />
      </QueryClientProvider>,
    )

    expect(await screen.findByText('Oops, something went wrong!')).toBeInTheDocument()
  })

  it('renders list of products on success', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Kind Of Blue',
        artist: 'Miles Davis',
        coverArt: '/covers/kind-of-blue.jpg',
      },
      {
        id: '2',
        name: 'A Love Supreme',
        artist: 'John Coltrane',
        coverArt: '/covers/a-love-supreme.jpg',
      },
    ]

    vi.mocked(fetchProducts).mockResolvedValue(mockProducts)
    const queryClient = createTestQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <ProductList />
      </QueryClientProvider>,
    )

    expect(await screen.findByText('Kind Of Blue')).toBeInTheDocument()
    expect(screen.getByText('Miles Davis')).toBeInTheDocument()
    expect(screen.getByText('A Love Supreme')).toBeInTheDocument()
    expect(screen.getByText('John Coltrane')).toBeInTheDocument()

    const images = screen.getAllByRole('img') as HTMLImageElement[]
    expect(images).toHaveLength(2)
    expect(images[0].src).toContain('/covers/kind-of-blue.jpg')
    expect(images[1].src).toContain('/covers/a-love-supreme.jpg')
  })
})
