/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiPath, ApiResponse, HttpMethodOfPath, RequestParams } from "./apiTypes";
import { Article, Comment, Profile, User } from "@/utils/types/models";

const makeProfile = (username = "demo-user"): Profile => ({
  username,
  bio: "This is a demo profile.",
  image: "https://api.realworld.io/images/demo-avatar.png",
  following: false,
});

const mockProfile = makeProfile();

let mockArticles: Article[] = [
  {
    slug: "welcome-to-realworld",
    title: "Welcome to RealWorld",
    description: "Your place to share knowledge.",
    body: "Hello **RealWorld**!",
    tagList: ["welcome", "realworld", "demo"],
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    updatedAt: new Date("2024-01-02T00:00:00.000Z"),
    favorited: false,
    favoritesCount: 42,
    author: mockProfile,
  },
  {
    slug: "nextjs-rsc-demo",
    title: "Next.js + RSC Demo",
    description: "A quick tour of the demo app.",
    body: "This article is served by the mock API.",
    tagList: ["nextjs", "rsc", "demo"],
    createdAt: new Date("2024-02-10T12:00:00.000Z"),
    updatedAt: new Date("2024-02-10T12:00:00.000Z"),
    favorited: true,
    favoritesCount: 7,
    author: mockProfile,
  },
];

let mockComments: Comment[] = [
  {
    id: "1",
    createdAt: new Date("2024-01-03T10:00:00.000Z"),
    updatedAt: new Date("2024-01-03T10:00:00.000Z"),
    body: "Great post!",
    author: mockProfile,
  },
  {
    id: "2",
    createdAt: new Date("2024-01-04T09:00:00.000Z"),
    updatedAt: new Date("2024-01-04T09:00:00.000Z"),
    body: "Thanks for sharing.",
    author: mockProfile,
  },
];

let mockUser: User = {
  email: "demo@realworld.io",
  token: "mock-token",
  username: mockProfile.username,
  image: mockProfile.image,
  bio: mockProfile.bio,
};

type MockArgs<P extends ApiPath, M extends HttpMethodOfPath<P>> = {
  path: string;
  method: M;
  params: RequestParams<P, M>;
};

const getSlug = (path: string) => {
  const parts = path.split("/").filter(Boolean);
  return parts[1]; // after "articles"
};

const isCommentsPath = (path: string) => path.includes("/comments");

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "untitled";

export const mockApiResponse = <P extends ApiPath, M extends HttpMethodOfPath<P>>({
  path,
  method,
  params,
}: MockArgs<P, M>): ApiResponse<P, M> => {
  if (method === "get" && path.startsWith("/articles")) {
    if (isCommentsPath(path)) {
      return {
        result: "success",
        data: {
          comments: mockComments,
        },
      } as ApiResponse<P, M>;
    }

    if (path.startsWith("/articles/")) {
      const slug = getSlug(path);
      const article = mockArticles.find((item) => item.slug === slug) ?? mockArticles[0];
      return {
        result: "success",
        data: {
          article,
        },
      } as ApiResponse<P, M>;
    }

    return {
      result: "success",
      data: {
        articles: mockArticles,
        articlesCount: mockArticles.length,
      },
    } as ApiResponse<P, M>;
  }

  if (method === "get" && path === "/tags") {
    const tags = Array.from(new Set(mockArticles.flatMap((article) => article.tagList)));
    return {
      result: "success",
      data: { tags },
    } as ApiResponse<P, M>;
  }

  if (method === "post" && (path === "/users" || path === "/users/login")) {
    return {
      result: "success",
      data: { user: mockUser },
    } as ApiResponse<P, M>;
  }

  if (method === "get" && path === "/user") {
    return {
      result: "success",
      data: { user: mockUser },
    } as ApiResponse<P, M>;
  }

  if (method === "put" && path === "/user") {
    mockUser = { ...mockUser, ...(params as any)?.body?.user };
    return {
      result: "success",
      data: { user: mockUser },
    } as ApiResponse<P, M>;
  }

  if (method === "get" && path.startsWith("/profiles/")) {
    const username = path.split("/").pop() ?? "demo-user";
    return {
      result: "success",
      data: { profile: { ...makeProfile(username), following: false } },
    } as ApiResponse<P, M>;
  }

  if ((method === "post" || method === "delete") && path.includes("/follow")) {
    const username = path.split("/").filter(Boolean).at(-2) ?? "demo-user";
    const following = method === "post";
    return {
      result: "success",
      data: { profile: { ...makeProfile(username), following } },
    } as ApiResponse<P, M>;
  }

  if ((method === "post" || method === "delete") && path.includes("/favorite")) {
    const slug = getSlug(path);
    mockArticles = mockArticles.map((article) =>
      article.slug === slug
        ? {
            ...article,
            favorited: method === "post",
            favoritesCount: Math.max(0, article.favoritesCount + (method === "post" ? 1 : -1)),
          }
        : article,
    );
    const article = mockArticles.find((a) => a.slug === slug) ?? mockArticles[0];
    return {
      result: "success",
      data: { article },
    } as ApiResponse<P, M>;
  }

  if (method === "post" && path === "/articles") {
    const articleInput = (params as any)?.body?.article ?? {};
    const slug = slugify(articleInput.slug ?? articleInput.title ?? `article-${Date.now()}`);
    const newArticle: Article = {
      slug,
      title: articleInput.title ?? "Untitled",
      description: articleInput.description ?? "",
      body: articleInput.body ?? "",
      tagList: articleInput.tagList ?? [],
      createdAt: new Date(),
      updatedAt: new Date(),
      favorited: false,
      favoritesCount: 0,
      author: mockProfile,
    };
    mockArticles = [newArticle, ...mockArticles];
    return {
      result: "success",
      data: { article: newArticle },
    } as ApiResponse<P, M>;
  }

  if (method === "put" && path.startsWith("/articles/")) {
    const slug = getSlug(path);
    const updates = (params as any)?.body?.article ?? {};
    mockArticles = mockArticles.map((article) =>
      article.slug === slug
        ? {
            ...article,
            ...updates,
            slug,
            updatedAt: new Date(),
          }
        : article,
    );
    const article = mockArticles.find((a) => a.slug === slug) ?? mockArticles[0];
    return {
      result: "success",
      data: { article },
    } as ApiResponse<P, M>;
  }

  if (method === "delete" && path.startsWith("/articles/")) {
    const slug = getSlug(path);
    mockArticles = mockArticles.filter((article) => article.slug !== slug);
    mockComments = mockComments.filter((comment) => comment.body !== slug);
    return {
      result: "success",
      // the real API returns an empty object on delete
      data: {} as any,
    } as ApiResponse<P, M>;
  }

  if (method === "get" && path === "/articles/feed") {
    return {
      result: "success",
      data: { articles: mockArticles, articlesCount: mockArticles.length },
    } as ApiResponse<P, M>;
  }

  if (method === "post" && isCommentsPath(path)) {
    const slug = getSlug(path);
    const body = (params as any)?.body?.comment?.body ?? "";
    const newComment: Comment = {
      id: `${Date.now()}`,
      body,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: mockProfile,
    };
    mockComments = [newComment, ...mockComments];
    return {
      result: "success",
      data: { comment: newComment, article: mockArticles.find((a) => a.slug === slug) ?? mockArticles[0] },
    } as ApiResponse<P, M>;
  }

  if (method === "delete" && isCommentsPath(path)) {
    const id = path.split("/").pop();
    mockComments = mockComments.filter((comment) => comment.id !== id);
    return {
      result: "success",
      data: {},
    } as ApiResponse<P, M>;
  }

  return {
    result: "error",
    statusCode: 501,
    error: { message: "Mock endpoint not implemented", path, method },
  } as ApiResponse<P, M>;
};
