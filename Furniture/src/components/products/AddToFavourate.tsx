import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "../ui/button";
import { Icons } from "../ui/icons";

interface AddToFavourateProps extends ButtonProps {
  productId: string;
  rating: number;
}
function AddToFavourate({
  productId,
  rating,
  className,
  ...props
}: AddToFavourateProps) {
  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn("size-8 shrink-0", className)}
      {...props}
    >
      <Icons.Heart className="size-4"></Icons.Heart>
    </Button>
  );
}

export default AddToFavourate;
