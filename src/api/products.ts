export type Product = {
  id: string
  name: string
  artist: string
  coverArt: string
}

export async function fetchProducts(): Promise<Product[]> {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endpoint = `${baseUrl}/api/products`;
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  return response.json()
}

export async function addProduct(productFormData: FormData): Promise<Product> {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const endpoint = `${baseUrl}/api/products`;
    
    const response = await fetch(endpoint, {
        method: 'POST',
        body: productFormData,
    });

    const responseText = await response.text();

    if (!response.ok) {
    let errorMessage = 'Failed to add product';

    if (responseText) {
      try {
        const errorBody = JSON.parse(responseText) as { error?: string; message?: string };
        errorMessage = errorBody.error ?? errorBody.message ?? errorMessage;
      } catch {
        errorMessage = responseText;
      }
    }

    throw new Error(errorMessage);
    }

  return JSON.parse(responseText) as Product;
}
