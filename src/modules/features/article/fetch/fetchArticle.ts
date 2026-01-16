import { createApiClient } from "@/utils/api/apiClient";
import { Article } from "@/utils/types/models";

export const fetchArticle = async (slug: string) => {
  const apiClient = createApiClient({
    path: "/articles/{slug}",
    method: "get",
    params: {
      path: {
        slug,
      },
    },
  });

  const response = await apiClient.sendRequest();

  if (response.result === "success") {
    return Article.parse(response.data.article);
  }

  console.error("Failed to fetch article", { slug, statusCode: response.statusCode });
  return Article.parse({
    slug,
    title: "Article unavailable",
    description: "We could not load this article right now.",
    body: "",
    tagList: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "unknown",
      bio: undefined,
      image: undefined,
      following: false,
    },
  });
};
