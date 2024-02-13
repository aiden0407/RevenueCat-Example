import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.okdoc.app',
});

interface Product {
  id: string;
  name: string;
  introduction: string;
  price: number;
}

export const getProducts = async ({}) => {
  const response = await instance.get<{
    success: boolean;
    response: Product[];
    error: boolean | null;
  }>('products');

  const products: Product[] = response.data.response.map<Product>(r => ({
    id: r.id,
    name: r.name,
    introduction: r.introduction,
    price: r.price,
  }));

  return {
    success: response.data.success,
    response: products,
    error: response.data.error,
  };
};
