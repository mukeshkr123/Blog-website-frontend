import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUserAction } from "../../../redux/slices/user/userSlices";

const loginSchema = z.object({
  email: z
    .string()
    .email("Please Enter a valid email")
    .min(5, "Email is required"),
  password: z.string().min(7, "Password is required"),
});

const FormSection = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  //onSubmit
  const OnSubmit = (data) => {
    dispatch(loginUserAction(data));
    console.log(data);
  };

  ///select the state from state
  const storeData = useSelector((store) => store?.users);
  const { loading, appErr, serverErr, userAuth } = storeData;

  //redirect to login when registered successfully
  if (userAuth) {
    return <Navigate to={`/profile/${userAuth?._id}`} />;
  }
  return (
    <form
      onSubmit={handleSubmit((data) => {
        OnSubmit(data);
        reset();
      })}
    >
      <h3 className="mb-10 text-3xl lg:text-4xl font-bold font-heading text-gray-800">
        {/* Header */}
        Login to your Account
      </h3>
      {/* error  */}
      <div className="text-red-500">
        {appErr ||
          (serverErr && (
            <p>
              {appErr}
              {serverErr}
            </p>
          ))}
      </div>
      <div className="flex items-center pl-6 mb-3 border border-gray-300 bg-white rounded-full">
        <span className="inline-block pr-3 border-r border-gray-300">
          <svg
            className="w-5 h-5 text-gray-400"
            width="17"
            height="21"
            viewBox="0 0 17 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.184 8.48899H15.2011V6.25596C15.2011 2.6897 12.3193 0 8.49924 0C4.67919 0 1.7974 2.6897 1.7974 6.25596V8.48899H1.81568C0.958023 9.76774 0.457031 11.3049 0.457031 12.9569C0.457031 17.3921 4.06482 21 8.49924 21C12.9341 21 16.5424 17.3922 16.5428 12.9569C16.5428 11.3049 16.0417 9.76774 15.184 8.48899ZM2.69098 6.25596C2.69098 3.14895 5.13312 0.893578 8.49924 0.893578C11.8654 0.893578 14.3075 3.14895 14.3075 6.25596V7.39905C12.8423 5.86897 10.7804 4.91468 8.49966 4.91468C6.21837 4.91468 4.15607 5.86946 2.69098 7.40017V6.25596ZM8.49966 20.1064C4.55762 20.1064 1.35061 16.8989 1.35061 12.9569C1.35061 9.01534 4.5572 5.80826 8.49924 5.80826C12.4422 5.80826 15.6488 9.01534 15.6492 12.9569C15.6492 16.8989 12.4426 20.1064 8.49966 20.1064Z"
              fill="currentColor"
            ></path>
            <path
              d="M8.49957 8.93567C7.26775 8.93567 6.26562 9.93779 6.26562 11.1696C6.26562 11.8679 6.60247 12.5283 7.1592 12.9474V14.7439C7.1592 15.4829 7.76062 16.0843 8.49957 16.0843C9.2381 16.0843 9.83994 15.4829 9.83994 14.7439V12.9474C10.3966 12.5278 10.7335 11.8679 10.7335 11.1696C10.7335 9.93779 9.7309 8.93567 8.49957 8.93567ZM9.16793 12.3228C9.03032 12.4023 8.94636 12.5502 8.94636 12.7088V14.7439C8.94636 14.9906 8.74572 15.1907 8.49957 15.1907C8.25342 15.1907 8.05278 14.9906 8.05278 14.7439V12.7088C8.05278 12.5502 7.96833 12.4032 7.83072 12.3228C7.41026 12.078 7.1592 11.6468 7.1592 11.1696C7.1592 10.4307 7.76062 9.82925 8.49957 9.82925C9.2381 9.82925 9.83994 10.4307 9.83994 11.1696C9.83994 11.6468 9.58881 12.078 9.16793 12.3228Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
        {/* Email */}
        <input
          {...register("email")}
          id="email"
          className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-400 rounded-r-full focus:outline-none bg-gray-100"
          type="email"
          placeholder="Enter email"
        />
      </div>
      {/* Error message */}
      <div className="text-red-500 mb-2">
        {errors.email && <p>{errors?.email?.message} </p>}
      </div>
      <div className="flex items-center pl-6 mb-6 border border-gray-300 bg-white rounded-full">
        <span className="inline-block pr-3 border-r border-gray-300">
          <svg
            className="w-5 h-5 text-gray-400"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://wwww3.org/2000/svg"
          >
            <path
              d="M15.6243 13.5625C15.3939 13.5625 15.2077 13.7581 15.2077 14V16.4517C15.2077 18.2573 14.0443 20.125 12.0973 20.125H5.42975C3.56848 20.125 1.87435 18.3741 1.87435 16.4517V10.5H15.6243C15.8547 10.5 16.041 10.3044 16.041 10.0625C16.041 9.82058 15.8547 9.625 15.6243 9.625H15.2077V5.95175C15.2077 2.39183 12.8635 0 9.37435 0H7.70768C4.21855 0 1.87435 2.39183 1.87435 5.95175V9.625H1.45768C1.22728 9.625 1.04102 9.82058 1.04102 10.0625V16.4517C1.04102 18.8322 3.13268 21 5.42975 21H12.0972C14.3089 21 16.0409 19.0023 16.0409 16.4517V14C16.041 13.7581 15.8547 13.5625 15.6243 13.5625ZM2.70768 5.95175C2.70768 2.86783 4.67022 0.875 7.70768 0.875H9.37435C12.4119 0.875 14.3743 2.86783 14.3743 5.95175V9.625H2.70768V5.95175Z"
              fill="currentColor"
            ></path>
            <path
              d="M18.8815 9.3711C18.7482 9.17377 18.4878 9.12827 18.3003 9.26701L8.58655 16.4919L6.75235 14.5655C6.58942 14.3944 6.32608 14.3944 6.16322 14.5655C6.00028 14.7366 6.00028 15.0131 6.16322 15.1842L8.24655 17.3717C8.32695 17.4561 8.43362 17.4999 8.54115 17.4999C8.62488 17.4999 8.70868 17.4732 8.78282 17.4194L18.7828 9.98185C18.9703 9.84143 19.0141 9.56843 18.8815 9.3711Z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
        {/* Password */}
        <input
          {...register("password")}
          id="password"
          className="w-full pr-6 pl-4 py-4 font-bold placeholder-gray-400 rounded-r-full focus:outline-none bg-gray-100"
          type="password"
          placeholder="Password"
        />
      </div>
      {/* Error message */}
      <div className="text-red-500 mb-2">
        {errors.password && <p>{errors?.password?.message} </p>}
      </div>
      {/* Login button */}
      {loading ? (
        <button
          type="submit"
          className="py-4 w-full bg-gray-500 disabled  text-white font-bold rounded-full transition duration-200"
        >
          Login....
        </button>
      ) : (
        <button
          type="submit"
          className="py-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition duration-200"
        >
          Login
        </button>
      )}
    </form>
  );
};

export default FormSection;
