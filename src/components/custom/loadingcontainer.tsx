import Loader from "./loader";

const loadingcontainer = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <Loader />
    </div>
  );
};

export default loadingcontainer;
