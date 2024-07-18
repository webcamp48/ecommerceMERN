import { useContext } from 'react';
import { ShoppingContext } from './../Contexts/ShoppingContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDetails from '../Components/ProductDetails/ProductDetails';
import TabComponent from '../Components/TabComponent/TabComponent';
import RelatedProduct from '../Components/RelatedProduct/RelatedProduct';

const Products = () => {
  const { all_product } = useContext(ShoppingContext);
  const  { productId }  = useParams();
  const product = all_product.find((item) => item.id === Number(productId));

  if (!product) {
    return <div className='product-not-found'>Product not found</div>;
  }
  
  return (
    <div>
      <Breadcrum product = {product}/>
      <ProductDetails product = {product} />
      <TabComponent />
      <RelatedProduct product = {product}/>
    </div>
  )
}

export default Products
