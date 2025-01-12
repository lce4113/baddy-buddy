export default function ChatMessage({
  message,
  role,
}: {
  message: string;
  role: string;
}) {
  return (
    <div
      className={`p-3 max-w-[80%] rounded-lg ${
        role == "user"
          ? "bg-blue-500 text-white self-end"
          : "bg-gray-200 text-black self-start"
      }`}
      style={{
        whiteSpace: "pre-wrap", // Preserve line breaks and spaces
        wordBreak: "break-word", // Prevent overflow for long words
      }}
    >
      {message}
    </div>
  );
}
