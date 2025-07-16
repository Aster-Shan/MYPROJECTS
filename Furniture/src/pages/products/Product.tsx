import Pagination from "@/components/products/Pagination";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import { filterList, products } from "@/data/products";

function Product() {
  return (
    <div className="container mx-auto">
      <section className="flex flex-col lg:flex-row">
        <section className="my-8 ml-4 w-full lg:w-1/5">
          <ProductFilter filterList={filterList}></ProductFilter>
        </section>
        <section className="w-full lg:w-4/5 lg:ml-0">
          <h1 className="my-8 ml-4 text-2xl font-bold ">All Products</h1>
          <div className="mb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-12 px-4 md:px-0">
            {products.map((product) => (
              <ProductCard key={product.id} product={product}></ProductCard>
            ))}
          </div>
          <Pagination></Pagination>
        </section>
      </section>
    </div>
  );
}

export default Product;
