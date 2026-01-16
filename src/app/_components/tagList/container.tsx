import { fetchTagsList } from "@/modules/features/article/fetch/fetchTagsList";
import { flags } from "@/config/featureFlags";
import { TagList as TagListPresentation } from "./presentation";

export const TagList = async () => {
  if (!flags.SHOW_POPULAR_TAGS) {
    return null;
  }

  const tags = await fetchTagsList();
  return <TagListPresentation tags={tags} />;
};
