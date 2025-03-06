export function slugify(title: string): string {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with a single one
}
export function generateUsername(
  fullName: string,
  existingUsernames: Set<string>
): string {
  // Extract first name (or use full name if it's a single word)
  const baseUsername = fullName.split(' ')[0];

  // Format username: capitalize first letter, remove special characters
  const username = '@' + baseUsername.replace(/[^a-zA-Z0-9]/g, '');

  // If username already exists, add a random 4-digit number until unique
  if (existingUsernames.has(username)) {
    let counter = 1;
    let newUsername = username;

    while (existingUsernames.has(newUsername)) {
      newUsername = `${username}${counter}`;
      counter++;
    }

    return newUsername;
  }

  return username;
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
