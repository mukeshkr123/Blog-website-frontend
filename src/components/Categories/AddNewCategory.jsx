import { BiBookOpen } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const AddNewCategory = () => {
  console.log("hiiii");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BiBookOpen className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add New Category
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-medium">
            These are the categories users will select when creating a post
          </p>
          {/* Display error */}
          <div className="text-red-500 text-center text-lg"></div>
        </div>
        {/* Form */}
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="new-category" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                type="text"
                id="new-category"
                name="title"
                autoComplete="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-red-400 mb-2">
                {/* Display form validation errors here */}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              <button
                type="submit"
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <AiOutlinePlus
                    className="h-5 w-5 text-yellow-500"
                    aria-hidden="true"
                  />
                </span>
                Add new Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
