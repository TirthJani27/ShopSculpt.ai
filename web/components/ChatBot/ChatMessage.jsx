export default function ChatMessage({ sender, text }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 max-w-xs md:max-w-sm text-sm ${
          isUser
            ? "bg-blue-600 text-white rounded-2xl "
            : "bg-gray-200 text-gray-900 rounded-2xl "
        }`}
      >
        {text}
      </div>
    </div>
  );
}
