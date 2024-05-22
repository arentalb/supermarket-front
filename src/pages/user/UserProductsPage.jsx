import { useGetProductsQuery } from "../../redux/api/productApiSlice.js";
import { Link, useLocation } from "react-router-dom";

export function UserProductsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  console.log(category);
  const { data, isLoading, error, isError } = useGetProductsQuery(category);
  const products = data?.data;
  const errormessage = error?.data?.message;

  console.log(errormessage);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {isError ? (
            <div className={"flex flex-col items-center"}>
              <p className={"text-center text-xl mb-8"}>{errormessage}</p>
              <Link to={"/home"} className={"btn btn-primary"}>
                Return home
              </Link>
            </div>
          ) : (
            ""
          )}
          {products && (
            <>
              <h1 className="text-2xl mb-8">ALL PRODUCTS</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid md:grid-cols-4 gap-4 mb-12">
                {products.map((pro) => (
                  <div key={pro._id} className="flex-shrink-0 w-full md:w-auto">
                    <NewProduct pro={pro} key={pro._id} />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

function NewProduct({ pro }) {
  return (
    <div
      key={pro._id}
      className="shadow-lg rounded-lg overflow-hidden flex flex-col  gap-4 p-4 bg-white"
    >
      <div className="w-full">
        <img
          src={pro.image}
          alt={pro.name}
          className="object-cover h-28  w-full rounded"
        />
      </div>
      <div className="flex  justify-between   py-4">
        <div>
          <p className="text-lg uppercase font-semibold">{pro.name}</p>
          <p className="text-base text-gray-500 ">
            {pro.price}
            {" IQD"}
          </p>
        </div>
        <p className="text-sm text-gray-600 ">
          {pro.quantity > 0 ? "In Stock" : "Out Of Stock"}
        </p>
      </div>

      <Link
        to={`/product/${pro._id}`}
        className="btn btn-primary w-full self-end mt-auto"
      >
        See Detail
      </Link>
    </div>
  );
}
