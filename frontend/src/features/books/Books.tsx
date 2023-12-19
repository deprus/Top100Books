import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchBooks } from "./booksSlice";
import { RootState, useAppDispatch } from "../../app/store";
import Book from "./Book";

type BooksProps = {
  filter: "all" | "read" | "toRead";
};

export default function Books({ filter }: BooksProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const user = useSelector((state: RootState) => state.auth.user);
  const status = useSelector((state: RootState) => state.books.status);
  const error = useSelector((state: RootState) => state.books.error);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSearchChange = (event: { target: { value: string } }) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredBooks = books.filter((book) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "read" &&
        book.readBooks.some((b) => b.userId === user?.id)) ||
      (filter === "toRead" &&
        book.toReadBooks.some((b) => b.userId === user?.id));

    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery) ||
      book.author.toLowerCase().includes(searchQuery);

    return matchesFilter && matchesSearch;
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="mx-4 my-4">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="mx-auto mb-4 block w-full max-w-2xl rounded-md border border-gray-300 p-2"
        />
        <div className="flex flex-col gap-4">
          {filteredBooks.map((book) => (
            <Book key={book.id} book={book} bookStatus="bookStatus" />
          ))}
        </div>
      </div>
    </>
  );
}
