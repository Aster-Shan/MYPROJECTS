import image1 from "@/assets/images/image1.jpg";
import image2 from "@/assets/images/image2.jpg";
import image3 from "@/assets/images/image3.jpg";
import ProductCard from "@/components/ProductCard";

const products = [
  { id: 1, name: "T-shirt", price: "20", image: image1 },
  { id: 2, name: "Jacket", price: "40", image: image2 },
  { id: 3, name: "Cardican", price: "60", image: image3 },
];

function Shop() {
  return (
    <section className="mt-2.5 flex grow bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Shop;
