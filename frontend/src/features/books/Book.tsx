import { useState } from "react";
import { BookType } from "./booksSlice";
import { FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";

type BookProps = {
  book: BookType;
};

export default function Book({ book }: BookProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="border border-black md: max-w-2xl mx-auto w-full">
      <div className="flex">
        <img src={book.imageUrl} alt={`${book.title} image`} className="w-20" />
        <div className="flex flex-col justify-around p-4 text-ye">
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>
            Avg rating:{" "}
            {book.ratings?.length > 0
              ? book.ratings.reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )
              : 0}
          </p>
          <div>
            {[...Array(10)].map((_, i) => {
              const currentRating = i + 1;
              return (
                <label>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                    className="hidden"
                  />
                  <span
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <IconContext.Provider
                      value={{
                        className: `cursor-pointer`,
                        size: "20",
                        color: `${
                          currentRating <= (hover || rating)
                            ? "#ffc107"
                            : "white"
                        }`,
                      }}
                    >
                      <FaStar />
                    </IconContext.Provider>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
