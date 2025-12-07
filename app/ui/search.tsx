"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // Get the current URL's search parameters
  const pathname = usePathname(); // Get the current URL's pathname
  const { replace } = useRouter(); // Used to programmatically change routes in the client component

  // Update the URL with the query string based on user input
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Reset to the first page of result

    // Update the query string based on user input
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`); // Update the URL with the query string
  }, 300); // Executes after 0.3 seconds since last invocation

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(event) => {
          handleSearch(event.target.value); // Handle query string updation
        }}
        defaultValue={searchParams.get("query")?.toString()} // Ensure the input value is in sync with the search parameters and will be populated when sharing
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
