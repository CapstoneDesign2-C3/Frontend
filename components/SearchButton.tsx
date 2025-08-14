type SearchButtonProps = {
  handleObjects: () => void;
};

function SearchButton({ handleObjects }: SearchButtonProps) {
  return (
    <button
      className="px-3 py-1 white-component rounded"
      onClick={handleObjects}
    >
      검색
    </button>
  );
}

export default SearchButton;