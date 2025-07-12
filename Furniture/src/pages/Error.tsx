import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex items-center justify-center flex-grow mt-20">
        <Card className="w-[350px] md:w-[500px] text-center py-6">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="border border-dashed border-muted-foreground/70 rounded-full size-24 grid place-items-center">
                <Icons.ExclamationTriangle
                  className="size-10 text-muted-foreground/70"
                  aria-hidden="true"
                />
              </div>
            </div>
            <CardTitle>Oops!!</CardTitle>
            <CardDescription>An error occurred.</CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <Link to="/">Go to Home Page</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default Error;
