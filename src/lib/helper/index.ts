export function slugify(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
}
export function generateUsername(fullName: string): string {
  const firstName = fullName.split(" ")[0]; // Get the first word (first name)
  return "@" + firstName.replace(/[^a-zA-Z0-9]/g, ""); // Remove special characters
}
export function extractPublicId(url: string): string | null {
  try {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    const [publicId] = filename.split('.'); // Remove the file extension
    return parts.includes('image') ? `images/${publicId}` : publicId;
  } catch (error) {
    console.error('Failed to extract public ID:', error);
    return null;
  }
}
