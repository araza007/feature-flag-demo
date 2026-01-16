import registryData from "../../flags/registry.json";

export type FlagName = "ENABLE_NEW_NAVBAR" | "SHOW_POPULAR_TAGS" | "USE_V2_API_CLIENT";

export type FlagRegistryItem = {
  name: FlagName;
  description: string;
  owner: string;
  createdAt: string;
  expiresAt: string;
  defaultValue: boolean;
  removalDecision: string;
};

const registryList = registryData as FlagRegistryItem[];

export const flagRegistry = registryList.reduce<Record<FlagName, FlagRegistryItem>>(
  (acc, item) => {
    acc[item.name] = item;
    return acc;
  },
  {} as Record<FlagName, FlagRegistryItem>,
);

const envVarByFlag: Record<FlagName, string> = {
  ENABLE_NEW_NAVBAR: "NEXT_PUBLIC_ENABLE_NEW_NAVBAR",
  SHOW_POPULAR_TAGS: "NEXT_PUBLIC_SHOW_POPULAR_TAGS",
  USE_V2_API_CLIENT: "NEXT_PUBLIC_USE_V2_API_CLIENT",
};

export const parseFlagBoolean = (value: string | undefined, defaultValue: boolean): boolean => {
  if (value === undefined) {
    return defaultValue;
  }

  const normalized = value.trim().toLowerCase();

  if (["true", "1", "yes"].includes(normalized)) {
    return true;
  }

  if (["false", "0", "no"].includes(normalized)) {
    return false;
  }

  return defaultValue;
};

export const flags = registryList.reduce<Record<FlagName, boolean>>(
  (acc, item) => {
    acc[item.name] = parseFlagBoolean(process.env[envVarByFlag[item.name]], item.defaultValue);
    return acc;
  },
  {} as Record<FlagName, boolean>,
);
