import LoadingIcon from "~~/components/Loading";

const Preloader = () => {
  return (
    <section className="h-screen bg-[#1c1e29]">
      <div className="w-full h-full flex items-center justify-center">
        <LoadingIcon />
      </div>
    </section>
  );
};

export default Preloader;