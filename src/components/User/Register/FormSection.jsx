const FormSection = () => {
  return (
    <div className="w-full lg:w-1/2 px-4">
      <div className="px-6 lg:px-12 py-12 lg:py-24 bg-white rounded-lg shadow-lg">
        <form>
          <h3 className="mb-10 text-2xl text-gray-800 font-bold">
            Register Account
          </h3>
          <div className="mb-6">
            <input
              id="firstName"
              className="w-full px-4 py-3 placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="First Name"
            />
          </div>
          <div className="mb-6">
            <input
              id="lastName"
              className="w-full px-4 py-3 placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <div className="mb-6">
            <input
              id="email"
              className="w-full px-4 py-3 placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mb-6">
            <input
              id="password"
              className="w-full px-4 py-3 placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Password"
            />
          </div>
          <button
            className="w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormSection;
