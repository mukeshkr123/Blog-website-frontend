import FormSection from "./FormSection";

const Login = () => {
  return (
    <>
      <section className="min-h-screen relative py-20 2xl:py-40 bg-gray-900 overflow-hidden">
        <div className="absolute top-0 left-0 lg:bottom-0 h-full lg:h-auto w-full lg:w-4/12 bg-violet-500 lg:overflow-hidden">
          <img
            className="hidden lg:block h-full w-full object-cover"
            // src={poster}
            alt=""
          />
        </div>
        <div className="relative container px-4 mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full lg:w-2/5 px-4">
                <div className="px-6 lg:px-12 py-12 lg:py-24 bg-white shadow-lg rounded-lg">
                  {/* Form  */}
                  <FormSection />
                </div>
              </div>
              <div className="w-full lg:w-3/5 px-4 mb-16 lg:mb-0 order-first lg:order-last">
                <span className="flex mb-10 mx-auto items-center justify-center h-20 w-20 bg-blue-500 rounded-lg">
                  <svg
                    width="37"
                    height="37"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* SVG Path */}
                  </svg>
                </span>
                <h2 className="mb-10 text-center text-4xl lg:text-5xl text-gray-200 font-bold font-heading">
                  Ready to start? Login Now.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
