"use server";

import { FlagName } from "@/config/featureFlags";

type TriggerRemovalResult =
  | { success: true; sessionUrl: string; sessionId: string }
  | { success: false; error: string };

export async function triggerFlagRemoval(flagName: FlagName): Promise<TriggerRemovalResult> {
  const apiKey = process.env.DEVIN_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      error: "DEVIN_API_KEY environment variable is not set. Add it to your .env.local file.",
    };
  }

  const prompt = `Remove the feature flag "${flagName}" from the araza007/feature-flag-demo repository.

Please perform the following steps:
1. Remove the flag entry from flags/registry.json
2. Remove the flag from src/config/featureFlags.ts:
   - Remove from the FlagName type union
   - Remove from the envVarByFlag mapping
3. Find and remove all usages of this flag in the codebase:
   - Search for flags.${flagName} and remove the conditional code
   - Keep the code path that should remain based on the flag's defaultValue and removalDecision
4. Run npm run lint to ensure no errors
5. Create a PR with the changes

Title the PR: "Remove feature flag: ${flagName}"`;

  try {
    const response = await fetch("https://api.devin.ai/v1/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        title: `Remove feature flag: ${flagName}`,
        tags: ["feature-flag-removal", flagName],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Devin API error:", response.status, errorText);
      return {
        success: false,
        error: `Devin API returned ${response.status}: ${errorText}`,
      };
    }

    const data = await response.json();

    return {
      success: true,
      sessionUrl: data.url,
      sessionId: data.session_id,
    };
  } catch (error) {
    console.error("Failed to call Devin API:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to connect to Devin API",
    };
  }
}
