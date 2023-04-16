import { Loader2 } from "../Loaders/Loader";

function SubmitButton({
  name,
  isSubmitting,
  color = "blue",
}: {
  name: string;
  isSubmitting: boolean;
  color?: "blue" | "red";
}) {
  return (
    <button
      type="submit"
      className={`relative px-4 py-2 text-sm text-white font-bold disabled:opacity-70 disabled:cursor-not-allowed rounded bg-blue-600 ${
        color === "red" && "bg-red-600"
      } `}
      disabled={isSubmitting}
    >
      {isSubmitting && (
        <span className="absolute -left-8 flex  items-center inset-y-0">
          <Loader2 width="27" />
        </span>
      )}
      <span className="capitalize">{name}</span>
    </button>
  );
}

export default SubmitButton;
