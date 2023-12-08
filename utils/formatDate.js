export default function formatDate(dateString, includeYear = false) {
  const options = {
    month: "short",
    weekday: "short",
    day: "numeric",
  };

  if (includeYear) {
    options.year = "numeric";
  }

  return new Date(dateString).toLocaleDateString("en-US", options);
}
