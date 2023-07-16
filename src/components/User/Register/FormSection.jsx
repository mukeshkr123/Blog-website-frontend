import PropTypes from "prop-types";

const FormSection = (props) => {
  const { handleSubmit, register, errors, reset, onSubmit } = props;
  return (
    <div className="w-full lg:w-1/2 px-4">
      <div className="px-6 lg:px-12 py-12 lg:py-24 bg-white rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            reset();
          })}
        >
          <h3 className="mb-10 text-2xl text-gray-800 font-bold">
            Register Account
          </h3>
          <div className="mb-6">
            <input
              {...register("firstName")}
              id="firstName"
              className="w-full px-4 py-3 placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="First Name"
            />
            <div className="text-red-400 mb-2">
              {errors.firstName && <p> {errors.firstName.message}</p>}
            </div>
          </div>
          <div className="mb-6">
            <input
              {...register("lastName")}
              id="lastName"
              className="w-full px-4 py-3 placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Last Name"
            />
            <div className="text-red-400 mb-2">
              {errors.lastName && <p> {errors.lastName.message}</p>}
            </div>
          </div>
          <div className="mb-6">
            <input
              {...register("email")}
              id="email"
              className="w-full px-4 py-3 placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="example@gmail.com"
            />
            <div className="text-red-400 mb-2">
              {errors.email && <p> {errors.email.message}</p>}
            </div>
          </div>
          <div className="mb-6">
            <input
              {...register("password")}
              id="password"
              className="w-full px-4 py-3 placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Password"
            />
            <div className="text-red-400 mb-2">
              {errors.password && <p> {errors.password.message}</p>}
            </div>
          </div>
          <button
            className="w-full px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

FormSection.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FormSection;
