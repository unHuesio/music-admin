type ProductCardProps = {
    name: string;
    artist: string;
    coverArt: string;
}

function ProductCard({ name, artist, coverArt }: ProductCardProps) {
  return (
    <div className="product-card p-4 border border-gray-300 rounded shadow hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
      <img src={coverArt} alt={`${name} cover art`} className="w-[200px] h-auto mb-4 rounded" />
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">{artist}</p>
    </div>
  )
}

export default ProductCard
