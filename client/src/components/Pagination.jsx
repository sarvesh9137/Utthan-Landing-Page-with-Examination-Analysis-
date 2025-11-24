export default function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <button
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <p className="font-semibold">
        Page {page} of {totalPages}
      </p>
      <button
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
