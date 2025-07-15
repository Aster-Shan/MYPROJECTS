import CarouselCard from "@/components/products/CarouselCard";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Link } from "react-router-dom";
import Couch from "../data/images/couch.png";

function Home() {
  return (
    <div className="mt-20 container w-full md:px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
        {/* text-section */}
        <div className="text-center md:text-left md:w-1/2 space-y-4 lg:w-2/5 ">
          <h1 className="text-4xl md:text-5xl text-[#3b5d50] font-bold mb-4 lg:mb-8 ">
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
      <div className="items-center justify-center">
        <CarouselCard products={products}></CarouselCard>
      </div>
    </div>
  );
}

export default Home;
