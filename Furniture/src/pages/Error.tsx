import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
function Error() {
  return (
    <>
      <div className="min-h-screen">
        <Header></Header>
        <main className="flex items-center justify-center min-h-[80vh]">
          <Card className="w-[350px] md:w-[500px] lg:w-[500px] justify-center">
            <CardHeader>
              <CardTitle className="text-center">Oops!!</CardTitle>
              <CardDescription className="text-center">
                An Error occurs
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex justify-center">
              <Button variant="outline" asChild>
                <Link to={"/"}>Go to Home Page</Link>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </>
  );
}

export default Error;
