import ProductCard from "@/components/products/ProductCard";
import Rating from "@/components/products/Rating";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Icons } from "@/components/ui/icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Link, useParams } from "react-router-dom";

function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="container mx-auto px-4 lg:px-0">
      {/* Button */}
      <Button asChild variant="outline" className="mt-8">
        <Link to={"/products"}>
          <Icons.ArrowLeft></Icons.ArrowLeft>All Products
        </Link>
      </Button>

      {/* Carousel */}
      <section className="flex flex-col gap-16 md:flex-row md:gap-16 my-6">
        <Carousel plugins={[plugin.current]} className="w-full md:w-1/2">
          <CarouselContent>
            {product?.images.map((image) => (
              <CarouselItem key={image}>
                <div className="p-1">
                  <img
                    src={image}
                    alt="image"
                    className="size-full rounded-md object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Separator */}
        <Separator className="mt-4 md:hidden"></Separator>

        {/* Product Info */}
        <div className="flex w-full flex-col gap-4 md:w-1/2">
          <div className="space-y-0.5">
            <h2 className="line-clamp-1 text-2xl font-bold">{product?.name}</h2>
            <p className="text-base text-muted-foreground">
              {formatPrice(Number(product?.price))}
            </p>
          </div>

          <Separator className="my-1.5"></Separator>
          <p className="text-base text-muted-foreground">
            {product?.inventory} in stock
          </p>
          <div className="flex items-center justify-between">
            <Rating rating={Number(product?.rating)}></Rating>
          </div>
        </div>
      </section>

      {/* product Card */}
      <section className="space-y-6 overflow-hidden">
        <h2 className="line-clamp-1 text-2xl font-bold">
          More Products from Furniture Shop
        </h2>
        <ScrollArea className="pt-8">
          <div className="flex gap-4">
            {products.slice(0.4).map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                className="min-w[260px]"
              ></ProductCard>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </div>
  );
}

export default ProductDetail;
