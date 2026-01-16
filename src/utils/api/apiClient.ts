import { flags } from "@/config/featureFlags";
import { createApiClient as createApiClientV1, isExpectedErrorCode as isExpectedErrorCodeV1 } from "./apiClientV1";
import { createApiClient as createApiClientV2, isExpectedErrorCode as isExpectedErrorCodeV2 } from "./apiClientV2";

const useV2 = flags.USE_V2_API_CLIENT;

export const createApiClient = useV2 ? createApiClientV2 : createApiClientV1;
export const isExpectedErrorCode = useV2 ? isExpectedErrorCodeV2 : isExpectedErrorCodeV1;
