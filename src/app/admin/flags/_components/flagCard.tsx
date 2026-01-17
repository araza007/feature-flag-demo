import { FlagRegistryItem } from "@/config/featureFlags";
import { StatusBadge } from "./statusBadge";

type Props = {
  flag: FlagRegistryItem;
  onRemoveClick: () => void;
};

export const FlagCard = ({ flag, onRemoveClick }: Props) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: "4px",
        padding: "1.5rem",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <h3 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>{flag.name}</h3>
            <StatusBadge expiresAt={flag.expiresAt} />
          </div>
          <p style={{ margin: "0.5rem 0 0", color: "#666", fontSize: "0.95rem" }}>{flag.description}</p>
        </div>
        <button
          onClick={onRemoveClick}
          style={{
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Remove Flag
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
          fontSize: "0.875rem",
          color: "#666",
          borderTop: "1px solid #eee",
          paddingTop: "1rem",
        }}
      >
        <div>
          <span style={{ fontWeight: 500, color: "#333" }}>Owner:</span> {flag.owner}
        </div>
        <div>
          <span style={{ fontWeight: 500, color: "#333" }}>Created:</span> {formatDate(flag.createdAt)}
        </div>
        <div>
          <span style={{ fontWeight: 500, color: "#333" }}>Expires:</span> {formatDate(flag.expiresAt)}
        </div>
        <div>
          <span style={{ fontWeight: 500, color: "#333" }}>Default:</span>{" "}
          <code
            style={{
              backgroundColor: "#f5f5f5",
              padding: "0.125rem 0.375rem",
              borderRadius: "3px",
              fontSize: "0.8rem",
            }}
          >
            {String(flag.defaultValue)}
          </code>
        </div>
        <div>
          <span style={{ fontWeight: 500, color: "#333" }}>Removal:</span> {flag.removalDecision.replace(/_/g, " ")}
        </div>
      </div>
    </div>
  );
};
