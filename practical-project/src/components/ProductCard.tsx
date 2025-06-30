import { useState } from "react";

interface productType {
  //id: number;
  name: string;
  price: string;
  image: string;
}

function ProductCard({ name, price, image }: productType) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageLoaded = () => {
    setImageLoaded(true);
  };
  return (
    <>
      <div className="rounded-lg bg-white p-4 shadow-lg">
        <div className="relative w-full">
          {!imageLoaded && (
            <div className="insert-0 absolute animate-pulse rounded bg-gray-300"></div>
          )}
          <img
            src={image}
            alt={name}
            className={`h-full w-full rounded object-contain ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={handleImageLoaded}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <div className="">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-600">${price}</p>
          </div>
          <button className="rounded bg-sky-600 px-4 py-0 text-white hover:bg-sky-700">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
