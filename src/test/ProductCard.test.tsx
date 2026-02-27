import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProductCard from '../components/ProductCard'

describe('ProductCard', () => {
  it('renders product name, artist, and image', () => {
    render(
      <ProductCard
        name="Kind Of Blue"
        artist="Miles Davis"
        coverArt="/covers/kind-of-blue.jpg"
      />,
    )

    expect(screen.getByText('Kind Of Blue')).toBeInTheDocument()
    expect(screen.getByText('Miles Davis')).toBeInTheDocument()

    const image = screen.getByAltText('Kind Of Blue cover art') as HTMLImageElement
    expect(image).toBeInTheDocument()
    expect(image.src).toContain('/covers/kind-of-blue.jpg')
  })
})
