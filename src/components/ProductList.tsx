import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
const baseUrl = import.meta.env.VITE_BASE_URL;

function parseImageUrl(url: string): string {
    const newUrl = url.replace('original', 'small');
    return `${baseUrl}${newUrl}`;
}

function ProductList() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p className="my-4">Loading products...</p>;
  }

  if (isError) {
    return <p className="my-4 text-red-600">{error.message}</p>;
  }

  return (
    <div className="product-list my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          artist={product.artist}
          coverArt={parseImageUrl(product.coverArt)}
        />
      ))}
    </div>
  )
}

export default ProductList
