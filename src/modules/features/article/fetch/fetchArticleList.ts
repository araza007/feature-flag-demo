import { calcOffsetLimitFromPageNumber } from "@/modules/common/functions/pagination";
import { createApiClient } from "@/utils/api/apiClient";
import { ArticlePreview } from "@/utils/types/models";

export const fetchArticlesByAuthor = async (authorUsername: string, pageNumber: number) => {
  const { offset, limit } = calcOffsetLimitFromPageNumber(pageNumber, 10);

  const client = createApiClient({
    path: "/articles",
    method: "get",
    params: {
      query: {
        author: authorUsername,
        offset,
        limit,
      },
    },
  });

  const response = await client.sendRequest();

  if (response.result === "success") {
    return {
      articles: response.data.articles.map((article) => ArticlePreview.parse(article)),
      articlesCount: response.data.articlesCount,
    };
  }

  console.error("Failed to fetch articles by author", { author: authorUsername, statusCode: response.statusCode });
  return { articles: [], articlesCount: 0 };
};

export const fetchArticlesByTag = async (tag: string, page: number) => {
  const { offset, limit } = calcOffsetLimitFromPageNumber(page, 10);

  const client = createApiClient({
    path: "/articles",
    method: "get",
    params: {
      query: {
        tag,
        limit,
        offset,
      },
    },
  });

  const response = await client.sendRequest();

  if (response.result === "success") {
    return {
      articles: response.data.articles.map((article) => ArticlePreview.parse(article)),
      articlesCount: response.data.articlesCount,
    };
  }

  console.error("Failed to fetch articles by tag", { tag, statusCode: response.statusCode });
  return { articles: [], articlesCount: 0 };
};

export const fetchFavoriteArticles = async (username: string, pageNumber: number) => {
  const { offset, limit } = calcOffsetLimitFromPageNumber(pageNumber, 10);

  const client = createApiClient({
    path: "/articles",
    method: "get",
    params: {
      query: {
        favorited: username,
        offset,
        limit,
      },
    },
  });

  const response = await client.sendRequest();

  if (response.result === "success") {
    return {
      articles: response.data.articles.map((article) => ArticlePreview.parse(article)),
      articlesCount: response.data.articlesCount,
    };
  }

  console.error("Failed to fetch favorite articles", { username, statusCode: response.statusCode });
  return { articles: [], articlesCount: 0 };
};

export const fetchFeedArticles = async (page: number) => {
  const { offset, limit } = calcOffsetLimitFromPageNumber(page, 10);

  const client = createApiClient({
    path: "/articles/feed",
    method: "get",
    params: {
      query: {
        limit,
        offset,
      },
    },
  });

  const response = await client.sendRequest();

  if (response.result === "success") {
    return {
      articles: response.data.articles.map((article) => ArticlePreview.parse(article)),
      articlesCount: response.data.articlesCount,
    };
  }

  console.error("Failed to fetch feed articles", { statusCode: response.statusCode });
  return { articles: [], articlesCount: 0 };
};

export const fetchGlobalArticles = async (page: number) => {
  const { offset, limit } = calcOffsetLimitFromPageNumber(page, 10);

  const client = createApiClient({
    path: "/articles",
    method: "get",
    params: {
      query: {
        limit,
        offset,
      },
    },
  });

  const response = await client.sendRequest();

  if (response.result === "success") {
    return {
      articles: response.data.articles.map((article) => ArticlePreview.parse(article)),
      articlesCount: response.data.articlesCount,
    };
  }

  console.error("Failed to fetch global articles", { statusCode: response.statusCode });
  return { articles: [], articlesCount: 0 };
};
