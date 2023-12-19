import { useState } from "react";
import Books from "../features/books/Books";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export default function HomePage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [filter, setFilter] = useState<"all" | "read" | "toRead">("all");
  return (
    <>
      <h2 className="mx-auto my-2 max-w-xs sm:max-w-full">
        Time Magazine's 100 best English-language novels from 1923-2005
      </h2>
      {user && <Filter filter={filter} setFilter={setFilter} />}
      <Books filter={filter} />
    </>
  );
}
