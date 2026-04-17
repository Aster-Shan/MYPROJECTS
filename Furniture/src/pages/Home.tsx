import { postQuery, productQuery } from "@/api/query";
import BlogCard from "@/components/blogs/BlogCard";
import CarouselCard from "@/components/products/CarouselCard";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Couch from "../data/images/couch.png";

function Home() {
  // const { productsData, postsData } = useLoaderData();

  // const {
  //   data: productsData,
  //   isLoading: isLoadingProducts,
  //   isError: isErrorProducts,
  //   error: productError,
  //   refetch: productRefetch,
  // } = useQuery(productQuery("?limit=8"));
  // const {
  //   data: postsData,
  //   isLoading: isLoadingPosts,
  //   isError: isErrorPosts,
  //   error: postError,
  //   refetch: postRefetch,
  // } = useQuery(postQuery("?limit=3"));

  // if (isLoadingProducts && isLoadingPosts) {
  //   return (
  //     <div className="text-center">
  //       <Card className="w-full max-w-xs">
  //         <CardHeader>
  //           <Skeleton className="h-4 w-2/3" />
  //           <Skeleton className="h-4 w-1/2" />
  //         </CardHeader>
  //         <CardContent>
  //           <Skeleton className="aspect-video w-full" />
  //         </CardContent>
  //       </Card>
  //     </div>
  //   );
  // }

  // if (isErrorProducts && isErrorPosts) {
  //   return (
  //     <div className="container mx-auto my-32 flex flex-1 place-content-center">
  //       <div className="text-center text-red-400">
  //         <p className="mb-4">
  //           {productError.message} & {postError.message}
  //         </p>
  //         <Button
  //           onClick={() => {
  //             productRefetch();
  //             postRefetch();
  //           }}
  //           variant="secondary"
  //         >
  //           Retry
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }

  const { data: productsData } = useSuspenseQuery(productQuery("?limit=8"));
  const { data: postsData } = useSuspenseQuery(postQuery("?limit=3"));

  const Title = ({
    title,
    href,
    sideText,
  }: {
    title: string;
    href: string;
    sideText: string;
  }) => (
    <div className="mb-10 mt-28 flex flex-col px-4 md:flex-row md:justify-between md:px-0">
      <h2 className="tmb-4 text-2xl font-bold md:mb-0">{title}</h2>
      <Link to={href} className="text-muted-foreground font-semibold underline">
        {sideText}
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Text Section */}
        <div className="my-8 text-center lg:mb-0 lg:mt-18 lg:w-2/5 lg:text-left ">
          <h1 className="text-4xl md:text-5xl text-[#3b5d50] font-bold mb-4 lg:mb-8">
            Modern Interior Design Studio
          </h1>
          <p className="text-gray-700 mb-6 lg:mb-8">
            Furniture is an essential component of any living space, providing
            functionality, comfort, and aesthetic appeal.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Button
              asChild
              className="rounded-full bg-orange-300 px-8 py-6 text-base font-bold"
            >
              <Link to="">Shop Now</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="rounded-full px-8 py-6 text-base font-bold text-green-900"
            >
              <Link to="">Explore</Link>
            </Button>
          </div>
        </div>

        {/* image-section */}
        <div className="md:w-1/2 flex justify-center lg:w-3/5">
          <img src={Couch} alt="couch" className="max-w-full h-auto" />
        </div>
      </div>

      {/* Carousel */}
      <section className="container px-4">
        {productsData && <CarouselCard products={productsData.products} />}

        {/**give data to CarouselCard */}
      </section>

      {/* Product Card Section Title */}

      <Title
        title="Featured Products"
        href="/products"
        sideText="View All Products"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 lg:px-0 gap-6">
        {productsData.products.slice(0, 4).map((product: Product) => (
          <ProductCard product={product} key={product.id}></ProductCard>
        ))}
      </div>

      {/* Blog Section Title */}
      <Title title="Recent Blog" href="/blogs" sideText="View All Blog" />
      {postsData && <BlogCard posts={postsData.posts}></BlogCard>}
    </div>
  );
}

export default Home;
