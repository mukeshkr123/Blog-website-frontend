import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlices";

const CategoryDropDown = (props) => {
  // Dispatch action
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  // Select categories
  const { categoryList, loading, appErr, serverErr } = useSelector(
    (state) => state?.category
  );

  // Handle category options
  const allCategories = categoryList?.map((category) => ({
    label: category?.title,
    value: category?._id,
  }));

  // Handle change and blur events
  const handleChange = (value) => {
    props.onChange("category", value);
  };

  const handleBlur = () => {
    props.onBlur("category", true);
  };

  return (
    <div style={{ margin: "1rem 0" }}>
      {loading ? (
        <h3 className="text-base text-green-600">
          Product categories list is loading, please wait...
        </h3>
      ) : appErr || serverErr ? (
        <div style={{ color: "red", marginTop: ".5rem" }}>
          {serverErr} {appErr}
        </div>
      ) : (
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          id="category"
          options={allCategories}
          value={props?.value?.label}
        />
      )}
      {/* Display */}
      {props?.error && (
        <div style={{ color: "red", marginTop: ".5rem" }}>{props?.error}</div>
      )}
    </div>
  );
};

export default CategoryDropDown;
