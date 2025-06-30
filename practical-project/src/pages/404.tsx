import { Link } from "react-router-dom";

function Notfound() {
  return (
    <section className="flex grow items-center justify-center bg-white text-center">
      <div className="container mx-auto">
        <h2 className="p-2 text-6xl font-bold">404</h2>
        <p className="mb-2.5 p-2">The page you loading does not exit.</p>
        <Link
          to={"/"}
          className="rounded bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
}

export default Notfound;
