function CancelButton({
  setMenu,
  isSubmitting,
}: {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => setMenu("")}
      className="px-4 py-2 rounded text-sm  text-white font-bold bg-gray-600 disabled:opacity-70 disabled:cursor-not-allowed"
      disabled={isSubmitting}
    >
      Cancel
    </button>
  );
}

export default CancelButton;
