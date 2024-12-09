export const getTagsArrayFromString = (tagsString: string) => {
  return tagsString.split(",").map((tag) => tag.trim());
};
