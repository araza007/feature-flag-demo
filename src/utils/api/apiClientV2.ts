import { API_BASE_URL, USE_MOCK_API } from "@/config/constants";
import { getSession } from "@/utils/auth/session";
import { ApiPath, ApiResponse, HttpErrorCode, HttpMethodOfPath, RequestParams } from "./apiTypes";
import { mockApiResponse } from "./mockApi";

const buildPathString = ({
  pathTemplate,
  params,
}: {
  pathTemplate: string;
  params: {
    path?: Record<PropertyKey, string | number>;
    query?: Record<PropertyKey, string | number>;
  };
}) => {
  const path = Object.entries(params?.path ?? {}).reduce(
    (prev, [key, value]) => prev.replace(new RegExp(`\\{${key}\\}`), String(value)),
    pathTemplate,
  );

  const searchParam = Object.entries(params.query ?? {})
    .reduce((prev, [key, value]) => {
      prev.set(key, String(value));
      return prev;
    }, new URLSearchParams())
    .toString();

  return searchParam.length > 0 ? path + "?" + searchParam : path;
};

export const isExpectedErrorCode = (statusCode: number): statusCode is HttpErrorCode => {
  return HttpErrorCode.map(Number).includes(statusCode);
};

const safeParseBody = async (response: Response) => {
  try {
    return await response.clone().json();
  } catch {
    try {
      return await response.text();
    } catch {
      return null;
    }
  }
};

export const createApiClient = <P extends ApiPath, M extends HttpMethodOfPath<P>>({
  path,
  method,
  params,
  tags,
  cache,
  revalidate,
}: {
  path: P;
  method: M;
  params: RequestParams<P, M>;
  token?: string;
  tags?: string[];
  cache?: RequestCache;
  revalidate?: number | false;
}) => {
  const fullPath = buildPathString({
    pathTemplate: path,
    params,
  });

  const sendRequest = async (): Promise<ApiResponse<P, M>> => {
    const token = await getSession();

    if (USE_MOCK_API) {
      return mockApiResponse<P, M>({
        path: fullPath,
        method,
        params,
      });
    }

    let response: Response;
    try {
      const headers: HeadersInit = {
        Accept: "application/json",
        ...(params.body && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Token ${token}` }),
      };

      response = await fetch(API_BASE_URL + fullPath, {
        method,
        headers,
        ...(params.body && { body: JSON.stringify(params.body) }),
        cache,
        next: { tags, revalidate },
      });
    } catch (error) {
      console.error("API request failed", { path: fullPath, error });
      return {
        result: "error",
        statusCode: 0,
        error,
      };
    }

    if (response.ok) {
      const data = await safeParseBody(response);
      return {
        result: "success",
        data,
      };
    }

    const errorBody = await safeParseBody(response);

    if (isExpectedErrorCode(response.status)) {
      return {
        result: "error",
        statusCode: response.status,
        error: errorBody,
      };
    }

    console.error("Unexpected API response", {
      path: fullPath,
      statusCode: response.status,
      body: errorBody,
    });

    return {
      result: "error",
      statusCode: response.status,
      error: errorBody ?? response.statusText,
    };
  };

  return { path: fullPath, sendRequest };
};
