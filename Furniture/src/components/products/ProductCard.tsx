import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { Link } from "react-router-dom";
import { Icons } from "../ui/icons";

interface productProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
}
const imageUrl = import.meta.env.VITE_ASSET_URL;
function ProductCard({ product, className }: productProps) {
  return (
    <Card className={cn("size-full overflow-hidden rounded-lg", className)}>
      <Link to={`/products/${product.id}`} aria-label={product.name}>
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={1 / 1} className="bg-muted">
            <img
              src={imageUrl + product.images[0]?.path}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="size-full object-contain"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="space-y-1.5 pt-4">
          <CardTitle className="line-clamp-1 ">{product.name}</CardTitle>
          <CardDescription className="line-clamp-1">
            {formatPrice(product.price)}
            {product.discount > 0 && (
              <span className="ml-2 font-extralight line-through">
                {formatPrice(product.discount)}
              </span>
            )}
          </CardDescription>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-1">
        {product.status === "sold" ? (
          <Button
            size="sm"
            disabled={true}
            aria-label="sold out"
            className="h-8 w-full rounded-sm font-bold "
          >
            Sold Out
          </Button>
        ) : (
          <Button
            size="sm"
            className="h-8 w-full rounded-sm font-bold bg-green-800"
          >
            <Icons.Plus className="" />
            Add to cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
