import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Product } from "@/types";
import { Link } from "react-router-dom";
interface ProductProps {
  products: Product[];
}

export default function CarouselCard({ products }: ProductProps) {
  //   const plugin = React.useRef(
  //     Autoplay({ delay: 2000, stopOnInteraction: true })
  //   );

  return (
    <Carousel
      className="w-full "
      opts={{
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent className="-ml-1">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-1 lg:basis-1/3">
            <div className="flex lg:px-4 gap-4 p-4 ">
              <img
                src={product.images[0]}
                alt="image"
                className="size-28 rounded-md"
              />
              <div className="">
                <h3 className="text-sm font-bold line-clamp-1">
                  {product.name}
                </h3>
                <p className="my-2 text-sm text-gray-600 line-clamp-2">
                  {
                    product.description

                    //   product.description.length > 55
                    //     ? product.description.substring(0, 55) + " ... "
                    //     : product.description
                  }
                </p>
                <Link
                  to={"/products/${product.id"}
                  className="text-sm font-semibold text-green-800 hover:underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
