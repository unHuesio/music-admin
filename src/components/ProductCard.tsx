import './ProductCard.css'

type ProductCardProps = {
    name: string;
    artist: string;
    coverArt: string;
}

function textEllipsis(text: string, maxLength: number = 15): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

function ProductCard({ name, artist, coverArt }: ProductCardProps) {
  return (
    <div className="product-card fadeInUp">
      <img src={coverArt} alt={`${name} cover art`} />
      <h2>{textEllipsis(name)}</h2>
      <p>{textEllipsis(artist, 20)}</p>
    </div>
  )
}

export default ProductCard
