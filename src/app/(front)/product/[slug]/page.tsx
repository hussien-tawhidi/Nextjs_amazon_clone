// "use client"
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/product/AddToCart";
import { productServices } from "@/libs/services/productServices";
import { converDocToObj } from "@/libs/utils";

const SingleProduct = async ({ params }: { params: { slug: string } }) => {
  const product = await productServices.getBySlug(params.slug);

  if (!product) {
    return <div className=''>Product not found</div>;
  }

  return (
    <>
      <div className='my-3'>
        <Link href='/'>Back to products</Link>
        <div className='grid md:grid-cols-4 md:gap-3'>
          <div className='md:col-span-2'>
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
              sizes='100vw'
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className='space-y-4'>
            <ul>
              <li>
                <h1 className='text-xl'>{product.name}</h1>
              </li>
              <li>
                {product.rating} of {product.numReviews} Reviews
              </li>
              <li>{product.brand}</li>
              <li>
                <div className='divider'></div>
              </li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div className=''>
            <div className='card bg-base-300 shadow-xl mt-3 md:mt-0'>
              <div className='card-body'>
                <div className='mb-2 flex justify-between'>
                  <span>Price</span>
                  <span>${product.price}</span>
                </div>
                <div className='mb-2 flex justify-between'>
                  <span>Status</span>
                  <span>
                    {product.countInStock > 0 ? "In Stock" : "Unavailable"}
                  </span>
                </div>
                {product.countInStock !== 0 && (
                  <div className='card-actions justify-center'>
                    {/* converDocToObj() is a function for client warinig  it's not error for just an warning we should use or don't use converDocToObj() 
                    or simply pass ...product 
                    */}
                    <AddToCart
                      item={{
                        ...converDocToObj(product),
                        qty: 0,
                        color: "",
                        size: "",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
