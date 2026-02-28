import ProductCard from './ProductCard';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/products';
import './ProductList.css';
import Loader from './Loader';

function parseImageUrl(url: string): string {
    return url.replace('original', 'small');
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
    return <p className="loading"><Loader /> Loading products...</p>;
  }

  if (isError) {
    return <p className="error">{error.message}</p>;
  }

  return (
    <div className="product-list">
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
