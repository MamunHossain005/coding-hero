export function formatFileNameAsTitle(fileName: string): string {
  //remove file extension and replace special characters with spaces
  const withoutExtension = fileName.replace(/\.[^/.]+$/, "");
  //replace dashes and underscores with spaces and  space between camelCase
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2");

  //convert to title case (capitalize first letter of each word)
  return withSpaces
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ').trim();
}
