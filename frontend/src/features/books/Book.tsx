import { useEffect, useState } from "react";
import { BookType, fetchBookById } from "./booksSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";

type BookProps = {
  book: BookType;
  bookStatus: string;
};

export default function Book({ book }: BookProps) {
  const [status, setStatus] = useState("none");
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function updateBookStatus(
    bookId: number,
    userId: number,
    newStatus: string,
  ) {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/books/updateStatus",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookId, userId, newStatus }),
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await response.json();
      dispatch(fetchBookById(bookId));
    } catch (error) {
      console.error("Error updating book status:", error);
    }
    setIsLoading(false);
  }

  function handleButtonClick() {
    if (user) {
      if (status === "none") {
        setStatus("toRead");
        setIsClicked(true);
        updateBookStatus(book.id, user.id, "toRead");
      } else if (status === "toRead" && isClicked) {
        setStatus("none");
        setIsClicked(false);
        updateBookStatus(book.id, user.id, "none");
      } else if (status === "toRead") {
        setIsClicked(!isClicked);
        updateBookStatus(book.id, user.id, "toRead");
      } else if (status === "read" && isClicked) {
        setStatus("none");
        setIsClicked(false);
        updateBookStatus(book.id, user.id, "none");
      } else if (status === "read") {
        setIsClicked(true);
        updateBookStatus(book.id, user.id, "read");
      }
    } else {
      navigate("/signin");
    }
  }

  const getButtonText = () => {
    if (status === "toRead") {
      return isClicked ? "✅ Want to Read" : "Want to Read";
    } else if (status === "read") {
      return isClicked ? "✅ Mark as Read" : "Mark as Read";
    } else {
      return "Want to Read";
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (user) {
      const newStatus = e.target.value;
      setStatus(newStatus);

      if (newStatus === "read") {
        setIsClicked(true);
        updateBookStatus(book.id, user.id, "read");
      } else if (newStatus === "toRead") {
        setIsClicked(true);
        updateBookStatus(book.id, user.id, "toRead");
      } else {
        setIsClicked(false);
        updateBookStatus(book.id, user.id, `${newStatus}`);
      }
    } else {
      navigate("/signin");
    }
  };

  useEffect(() => {
    if (book.readBooks.some((b) => b.userId === user?.id)) {
      setStatus("read");
      setIsClicked(true);
    } else if (book.toReadBooks.some((b) => b.userId === user?.id)) {
      setStatus("toRead");
      setIsClicked(true);
    } else {
      setStatus("none");
    }
  }, [book, user]);

  return (
    <div className="md: mx-auto w-full max-w-2xl border border-black">
      <div className="flex">
        <img src={book.imageUrl} alt={`${book.title} image`} className="w-20" />
        <div className="flex w-full flex-col justify-around p-4">
          <div className="flex w-full justify-between">
            <h2 className="max-w-[180px] sm:max-w-xl">{book.title}</h2>
            <div
              className={`flex h-10 gap-2 rounded-lg ${
                isClicked && status === "toRead"
                  ? "bg-red-500"
                  : isClicked && status === "read"
                    ? "bg-blue-600"
                    : "bg-green-600"
              } p-1 text-white`}
            >
              <>
                <button
                  onClick={handleButtonClick}
                  disabled={isLoading}
                  className="disabled:cursor-not-allowed disabled:opacity-75"
                >
                  {getButtonText()}
                </button>
                <select
                  value={status}
                  disabled={isLoading}
                  onChange={handleSelectChange}
                  className="mx-auto w-[1.1rem] text-slate-950 disabled:cursor-not-allowed"
                >
                  <option value="toRead">Want to Read</option>
                  <option value="read">Mark as Read</option>
                </select>
              </>
            </div>
          </div>
          <p>Author: {book.author}</p>
        </div>
      </div>
    </div>
  );
}
