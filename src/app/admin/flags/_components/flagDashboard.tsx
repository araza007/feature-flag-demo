"use client";

import { FlagRegistryItem } from "@/config/featureFlags";
import { useState } from "react";
import { FlagCard } from "./flagCard";
import { RemoveModal } from "./removeModal";
import { triggerFlagRemoval } from "../_actions/triggerRemoval";

type Props = {
  flags: FlagRegistryItem[];
};

type RemovalState = {
  status: "idle" | "loading" | "success" | "error";
  sessionUrl?: string;
  error?: string;
};

export const FlagDashboard = ({ flags }: Props) => {
  const [selectedFlag, setSelectedFlag] = useState<FlagRegistryItem | null>(null);
  const [removalState, setRemovalState] = useState<RemovalState>({ status: "idle" });

  const handleRemoveClick = (flag: FlagRegistryItem) => {
    setSelectedFlag(flag);
    setRemovalState({ status: "idle" });
  };

  const handleCloseModal = () => {
    setSelectedFlag(null);
    setRemovalState({ status: "idle" });
  };

  const handleConfirmRemoval = async () => {
    if (!selectedFlag) return;

    setRemovalState({ status: "loading" });

    try {
      const result = await triggerFlagRemoval(selectedFlag.name);

      if (result.success) {
        setRemovalState({
          status: "success",
          sessionUrl: result.sessionUrl,
        });
      } else {
        setRemovalState({
          status: "error",
          error: result.error || "Failed to trigger removal",
        });
      }
    } catch (error) {
      setRemovalState({
        status: "error",
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      });
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {flags.map((flag) => (
          <FlagCard key={flag.name} flag={flag} onRemoveClick={() => handleRemoveClick(flag)} />
        ))}
      </div>

      {selectedFlag && (
        <RemoveModal
          flag={selectedFlag}
          removalState={removalState}
          onClose={handleCloseModal}
          onConfirm={handleConfirmRemoval}
        />
      )}
    </>
  );
};
