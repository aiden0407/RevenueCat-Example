import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../apis/products';

const useInit = () => {
  const { isLoading: getProductsIsLoading, data: getProductsData } = useQuery({
    queryKey: ['producs'],
    queryFn: useCallback(async () => {
      return await getProducts({});
    }, []),
  });

  const isLoading = getProductsIsLoading;
  const products = getProductsData?.response ?? [];

  return {
    products,
    isLoading,
  };
};

export default useInit;
