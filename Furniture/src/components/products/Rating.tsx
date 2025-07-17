import { cn } from "@/lib/utils";
import { Icons } from "../ui/icons";

interface RatingProps {
  rating: number;
}
function Rating({ rating }: RatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icons.Star
          key={i}
          className={cn(
            "size-4",
            rating >= i + 1 ? "text-yellow-500" : "text-muted-foreground"
          )}
        ></Icons.Star>
      ))}
    </div>
  );
}

export default Rating;
