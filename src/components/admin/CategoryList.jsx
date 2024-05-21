import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiAlice.js";
import { useState } from "react";
import { toast } from "react-toastify";

export function CategoryList() {
  const { data, isLoading: fetching } = useGetCategoriesQuery();
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  const categories = data ? data.data : [];

  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({
    _id: null,
    name: "",
  });

  async function createHandler() {
    try {
      await createCategory({ name: categoryName }).unwrap();
      setCategoryName("");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
      setCategoryName("");
    }
  }

  async function updateHandler() {
    try {
      await updateCategory({
        id: selectedCategory._id,
        name: selectedCategory.name,
      }).unwrap();
      setSelectedCategory({
        _id: null,
        name: "",
      });
    } catch (error) {
      toast.error(error?.data?.message || error.message);
      setSelectedCategory({
        _id: null,
        name: "",
      });
    }
  }

  async function deleteHandler(id) {
    try {
      await deleteCategory(id).unwrap();
      setSelectedCategory({
        _id: null,
        name: "",
      });
    } catch (error) {
      toast.error(error?.data?.message || error.message);
      setSelectedCategory({
        _id: null,
        name: "",
      });
    }
  }

  function selectCategoryHandler(targetCategory) {
    if (targetCategory.name === selectedCategory.name) {
      setSelectedCategory({
        _id: null,
        name: "",
      });
    } else {
      setSelectedCategory(targetCategory);
    }
  }

  return (
    <>
      <div className={"flex flex-col gap-10"}>
        <form>
          <h2 className={"text-xl font-semibold mb-4"}>Create new category </h2>
          <div className={"flex gap-4"}>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-xs"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
              }}
            />
            <button
              className={"btn btn-primary"}
              type={"button"}
              disabled={creating || categoryName === ""}
              onClick={createHandler}
            >
              {creating ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Create new"
              )}
            </button>
          </div>
        </form>
        {fetching ? (
          <div className={"w-full flex justify-center items-center"}>
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : (
          <div className="flex gap-4 flex-wrap">
            {categories.map((cat) => (
              <button
                onClick={() => selectCategoryHandler(cat)}
                className={"btn btn-primary"}
                key={cat.name}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
        {selectedCategory.name && (
          <div className={"flex gap-4 "}>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-xs"
              value={selectedCategory.name}
              onChange={(e) => {
                setSelectedCategory({
                  _id: selectedCategory._id,
                  name: e.target.value,
                });
              }}
            />
            <button
              className={"btn btn-success"}
              type={"button"}
              disabled={updating || selectedCategory.name === ""}
              onClick={updateHandler}
            >
              {updating ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Update"
              )}
            </button>
            <button
              className={"btn btn-error"}
              type={"button"}
              disabled={deleting || selectedCategory.name === ""}
              onClick={() => deleteHandler(selectedCategory._id)}
            >
              {deleting ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
