type FilterProps = {
  setFilter: React.Dispatch<React.SetStateAction<"all" | "read" | "toRead">>;
  filter: "all" | "read" | "toRead";
};

export default function Filter({ filter, setFilter }: FilterProps) {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as "all" | "read" | "toRead");
  };
  return (
    <select value={filter} onChange={handleFilterChange} className="mx-auto">
      <option value="all">All Books</option>
      <option value="toRead">Want to Read Books</option>
      <option value="read">Read Books</option>
    </select>
  );
}
