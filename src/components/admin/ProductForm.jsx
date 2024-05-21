import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../redux/api/productApiSlice.js";
import { useGetCategoriesQuery } from "../../redux/api/categoryApiAlice.js";
import { toast } from "react-toastify";

export function ProductForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const {
    data: categoryData,
    error: categoryError,
    isError: isCategoryError,
    isLoading: isCategoryLoading,
  } = useGetCategoriesQuery();
  const { refetch, isFetching: isProductFetching } = useGetProductByIdQuery(
    id,
    { skip: !isEditMode || !id },
  );
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const categories = categoryData?.data;

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditMode && id) {
      refetch()
        .then((response) => {
          const {
            name,
            brand,
            description,
            price,
            category,
            quantity,
            countInStock,
          } = response.data.data;
          setValue("name", name);
          setValue("brand", brand);
          setValue("description", description);
          setValue("price", price);
          setValue("category", category?.name);
          setValue("quantity", quantity);
          setValue("countInStock", countInStock);
        })
        .catch((error) => {
          toast.error(
            error?.data?.message ||
              error.message ||
              "Error fetching product details",
          );
        });
    }
  }, [id, refetch, isEditMode, setValue, categories]);

  function getCategoryId() {
    return categories.find((cat) => cat.name === getValues("category"))._id;
  }

  async function onCreate(product) {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", getCategoryId());
    formData.append("quantity", product.quantity);
    formData.append("countInStock", product.countInStock);
    formData.append("image", product.image[0]);

    try {
      await createProduct(formData).unwrap();
      toast.success("Product created successfully");
      reset();
    } catch (error) {
      toast.error(
        error?.data?.message || error.message || "Error creating product",
      );
    }
  }

  async function onEdit(product) {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("brand", product.brand);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", getCategoryId());
    formData.append("quantity", product.quantity);
    formData.append("countInStock", product.countInStock);
    if (product.image[0]) {
      formData.append("image", product.image[0]);
    }

    try {
      await updateProduct({ product: formData, id });
      navigate("/admin/product/all");
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error(
        error?.data?.message || error.message || "Error updating product",
      );
    }
  }

  async function onDelete() {
    await deleteProduct;
    try {
      await deleteProduct(id);
      navigate("/admin/product/all");
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error(
        error?.data?.message || error.message || "Error deleting product",
      );
    }
  }

  if (isCategoryError) {
    toast.error(
      categoryError?.data?.message ||
        categoryError.message ||
        "Error fetching category",
    );
  }

  if (isCategoryLoading || isProductFetching) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <form>
      <h1 className={"text-2xl mb-4"}>
        {isEditMode ? "Edit Product" : "Create New Product"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
        <label className="form-control w-full sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product name</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full sm:max-w-xs"
            {...register("name", { required: "Product name is required" })}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </label>

        <label className="form-control w-full sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product brand</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full sm:max-w-xs"
            {...register("brand", { required: "Product brand is required" })}
          />
          {errors.brand && (
            <p className="text-red-500">{errors.brand.message}</p>
          )}
        </label>

        <label className="form-control w-full sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product quantity</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full sm:max-w-xs"
            {...register("quantity", {
              required: "Product quantity is required",
            })}
          />
          {errors.quantity && (
            <p className="text-red-500">{errors.quantity.message}</p>
          )}
        </label>

        <label className="form-control w-full sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product price</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full sm:max-w-xs"
            {...register("price", { required: "Product price is required" })}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </label>

        <label className="form-control w-full sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product count in stock</span>
          </div>
          <input
            type="number"
            className="input input-bordered w-full sm:max-w-xs"
            {...register("countInStock", {
              required: "Product count in stock is required",
            })}
          />
          {errors.countInStock && (
            <p className="text-red-500">{errors.countInStock.message}</p>
          )}
        </label>

        <label className="form-control w-full sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product category</span>
          </div>
          <select
            className="select select-bordered"
            {...register("category", {
              required: "Product category is required",
            })}
          >
            <option disabled defaultChecked value="">
              Pick one
            </option>
            {categories &&
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </label>

        <label className="form-control sm:max-w-xs">
          <div className="label">
            <span className="label-text">Product description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-12"
            {...register("description", {
              required: "Product description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </label>

        <div>
          <label className="form-control w-full sm:max-w-xs mb-4">
            <div className="label">
              <span className="label-text">Product image</span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full sm:max-w-xs"
              {...register("image", {
                required: isEditMode ? false : "Product image is required",
              })}
            />
            {errors.image && (
              <p className="text-red-500">{errors.image.message}</p>
            )}
          </label>
        </div>
      </div>

      <div className={"my-10 flex gap-4 flex-wrap "}>
        {isEditMode ? (
          <>
            <button
              type="button"
              onClick={handleSubmit(onEdit)}
              className={`btn btn-success w-full sm:max-w-xs `}
            >
              {isUpdating ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Update"
              )}
            </button>
            <button
              type="button"
              onClick={onDelete}
              className={`btn btn-error w-full sm:max-w-xs `}
            >
              {isDeleting ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Delete"
              )}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleSubmit(onCreate)}
            className={`btn btn-active btn-neutral  w-full sm:max-w-xs`}
          >
            {isCreating ? (
              <span className="loading loading-spinner "></span>
            ) : (
              "Create"
            )}
          </button>
        )}
      </div>
    </form>
  );
}
