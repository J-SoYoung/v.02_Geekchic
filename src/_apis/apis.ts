import { ProductType } from '@/_typesBundle';
import { database } from './firebase';
import { ref, set } from 'firebase/database';

export const uploadProducts = async (newProducts: ProductType) => {
  try {
    console.log(newProducts);
    const productRef = ref(database, `products/${newProducts.id}`)
    return set(productRef, newProducts)
  } catch (error) {
    console.error('제품 업로드 에러', error);
  }
};

export const getProducts = () =>{
  
}