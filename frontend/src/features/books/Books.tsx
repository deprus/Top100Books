import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchBooks } from "./booksSlice";
import { RootState, useAppDispatch } from "../../app/store";
import Book from "./Book";

export default function Books() {
  const dispatch = useAppDispatch();
  const books = useSelector((state: RootState) => state.books.books);
  const status = useSelector((state: RootState) => state.books.status);
  const error = useSelector((state: RootState) => state.books.error);
  console.log(books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="my-12 flex flex-col gap-4 mx-4">
        {books.length > 0 ? (
          books.map((book) => <Book key={book.id} book={book} />)
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
