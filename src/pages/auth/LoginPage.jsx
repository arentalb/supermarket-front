import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice.js";
import {
  getUserInfo,
  setCredentials,
} from "../../redux/feature/auth/authSlice.js";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export function LoginPage() {
  const navigate = useNavigate();

  const userInfo = useSelector(getUserInfo);
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  async function onSubmit(credential) {
    try {
      const res = await login(credential).unwrap();
      dispatch(setCredentials({ ...res.data }));
    } catch (error) {
      reset();
      toast.error(error?.data?.message || error.message);
    }
  }

  return (
    <div className={" py-20 "}>
      <h1 className={"text-3xl font-bold mb-8"}>Login form </h1>

      <form className={"max-w-md flex flex-col gap-6 "}>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className={"text-error text-sm"}>This field is required</span>
          )}
        </div>
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              placeholder="password"
              className="grow"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className={"text-error text-sm"}>This field is required</span>
          )}
        </div>
        <button
          type={"button"}
          className="btn btn-neutral"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? "logging in ..." : "login"}
        </button>
        <p className={"text-center text-sm"}>
          Dont have account ?{" "}
          <Link className={"text-info hover:underline"} to={"/signup"}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
