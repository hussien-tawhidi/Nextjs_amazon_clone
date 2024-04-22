import { productServices } from "@/libs/services/productServices";
import ProductItems from "@/components/product/ProductItems";


export default async function Home() {
  const featuredProduct = await productServices.getFeatured();
  const latestProduct = await productServices.getLates();

  return (
    <>
     
      <h2 className='text-2xl py-2'>Featured Products</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {featuredProduct.map((product) => (
          <ProductItems key={product.slug} product={product} />
        ))}
      </div>
      <h2 className='text-2xl py-2'>Latest Products</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {latestProduct.map((product) => (
          <ProductItems key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
}
