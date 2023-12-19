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
      {user && <Filter filter={filter} setFilter={setFilter} />}
      <Books filter={filter} />
    </>
  );
}
