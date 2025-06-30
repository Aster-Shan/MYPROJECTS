import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="flex grow items-center justify-center bg-white">
      <div className="p-8 text-center">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">
          Welcome to Our Fashion House
        </h1>
        <p className="mb-8 text-lg text-gray-500 md:text-2xl">
          This is simple landing page using React,Typescript and react.
        </p>
        <Link
          to={"/shop"}
          className="rounded-sm bg-sky-500 px-6 py-3 text-white shadow hover:bg-sky-700"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}

export default Home;
