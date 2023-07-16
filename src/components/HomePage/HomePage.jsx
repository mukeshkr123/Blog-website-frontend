import bg from "../../assets/img/bg.jpg";

const HomePage = () => {
  return (
    <section className="h-screen pb-10 bg-gradient-to-r from-pink-400 to-purple-500 flex flex-col justify-center items-center">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center -mx-4 mb-10 2xl:mb-14">
          <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
            <span className="text-lg font-bold text-yellow-400">
              Create posts to educate
            </span>
            <h2 className="max-w-2xl mt-12 mb-12 text-4xl lg:text-5xl 2xl:text-7xl text-white font-bold font-heading">
              Pen down your ideas{" "}
              <span className="text-yellow-400">by creating a post</span>
            </h2>
            <p className="mb-12 lg:mb-16 2xl:mb-24 text-lg lg:text-xl text-gray-200">
              Your posts can inspire and enlighten others. Share your knowledge
              and experiences with the world.
            </p>
            <a
              className="inline-block px-8 lg:px-12 py-4 lg:py-5 text-base lg:text-lg text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-full transition duration-200"
              href="/"
            >
              Explore Now
            </a>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center px-4">
            <img
              className="h-60 lg:h-80 rounded-full w-60 lg:w-80 shadow-2xl"
              src={bg}
              alt={bg}
            />
          </div>
        </div>
      </div>
      <div className="text-center text-gray-300 mt-10">
        &copy; 2023 Blogify. All rights reserved.
      </div>
    </section>
  );
};

export default HomePage;
