import React from "react";
import {
  ArrowRightCircleIcon,
  CodeBracketSquareIcon,
} from "@heroicons/react/20/solid";
import { authStore } from "@/store";

interface ForgotPasswordPageProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ForgotPassword({
  handleSubmit,
}: ForgotPasswordPageProps) {
  const message = authStore((state: any) => state.message);
  const isLoading = authStore((state: any) => state.isLoading);
  const error = authStore((state: any) => state.error);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <CodeBracketSquareIcon
            className="mx-auto"
            color="#6367f2"
            width={80}
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Lets Find Your Password !
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm flex flex-col space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>
          <div className={error ? "text-red-700" : "text-green-900"}>
            {message}
          </div>
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <ArrowRightCircleIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
              )}
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
