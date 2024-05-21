import { useGetProductsQuery } from "../redux/api/productApiSlice.js";
import moment from "moment";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function AllProducts() {
  const { data, isLoading, error, isError } = useGetProductsQuery();

  const navigate = useNavigate();
  const products = data?.data;

  if (isError) {
    toast.error(error?.data?.message || error.message || "an error accured");
  }

  function showDetailHandler(id) {
    navigate(`/admin/product/edit/${id}`);
  }

  return (
    <div>
      <div className={"flex justify-between"}>
        <h1 className={"text-2xl mb-8"}>All Products ({products?.length})</h1>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/product/new")}
        >
          Create new
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {products?.map((pro) => (
            <div
              key={pro._id}
              className="shadow-lg rounded-lg overflow-hidden flex gap-4 p-4 bg-white"
            >
              <div className="w-2/4 max-h-80">
                <img
                  src={pro.image}
                  alt={pro.name}
                  className="object-cover h-full w-full rounded"
                />
              </div>
              <div className="flex flex-col justify-between w-3/4">
                <div>
                  <div className={"flex justify-between"}>
                    <p className="text-lg font-semibold">{pro.name}</p>
                    <p className="text-sm text-gray-500">
                      {moment(pro.updatedAt).format("MMM Do YY")}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {pro.description.substring(0, 100)}
                    {"  "}...
                  </p>
                </div>
                <button
                  onClick={() => showDetailHandler(pro._id)}
                  className="btn btn-primary btn-sm self-start"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}