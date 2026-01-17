import { FlagRegistryItem } from "@/config/featureFlags";

type RemovalState = {
  status: "idle" | "loading" | "success" | "error";
  sessionUrl?: string;
  error?: string;
};

type Props = {
  flag: FlagRegistryItem;
  removalState: RemovalState;
  onClose: () => void;
  onConfirm: () => void;
};

export const RemoveModal = ({ flag, removalState, onClose, onConfirm }: Props) => {
  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyle: React.CSSProperties = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "2rem",
    maxWidth: "500px",
    width: "90%",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  };

  const renderContent = () => {
    if (removalState.status === "loading") {
      return (
        <div style={{ textAlign: "center", padding: "2rem 0" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid #e5e5e5",
              borderTopColor: "#5cb85c",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 1rem",
            }}
          />
          <p style={{ margin: 0, color: "#666" }}>Triggering Devin session...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      );
    }

    if (removalState.status === "success") {
      return (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#d4edda",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "1.5rem",
            }}
          >
            <span style={{ color: "#155724" }}>&#10003;</span>
          </div>
          <h3 style={{ margin: "0 0 0.5rem", color: "#155724" }}>Session Started</h3>
          <p style={{ margin: "0 0 1.5rem", color: "#666" }}>
            Devin is working on removing the flag and creating a PR.
          </p>
          {removalState.sessionUrl && (
            <a
              href={removalState.sessionUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                backgroundColor: "#5cb85c",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              View Devin Session
            </a>
          )}
          <button
            onClick={onClose}
            style={{
              display: "block",
              margin: "1rem auto 0",
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Close
          </button>
        </div>
      );
    }

    if (removalState.status === "error") {
      return (
        <div style={{ textAlign: "center", padding: "1rem 0" }}>
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#f8d7da",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              fontSize: "1.5rem",
            }}
          >
            <span style={{ color: "#721c24" }}>!</span>
          </div>
          <h3 style={{ margin: "0 0 0.5rem", color: "#721c24" }}>Error</h3>
          <p style={{ margin: "0 0 1.5rem", color: "#666" }}>{removalState.error}</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button
              onClick={onConfirm}
              style={{
                backgroundColor: "#5cb85c",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.75rem 1.5rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Retry
            </button>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "#e5e5e5",
                color: "#333",
                border: "none",
                borderRadius: "4px",
                padding: "0.75rem 1.5rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      );
    }

    // Idle state - confirmation
    return (
      <>
        <h2 style={{ margin: "0 0 1rem", fontSize: "1.5rem" }}>Remove Feature Flag</h2>
        <p style={{ margin: "0 0 1rem", color: "#666" }}>
          Are you sure you want to remove <strong>{flag.name}</strong>?
        </p>
        <div
          style={{
            backgroundColor: "#fff3cd",
            border: "1px solid #ffc107",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ margin: "0 0 0.5rem", fontWeight: 500, color: "#856404" }}>
            This will trigger a Devin session to:
          </p>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", color: "#856404", fontSize: "0.9rem" }}>
            <li>Remove the flag from flags/registry.json</li>
            <li>Remove the flag from src/config/featureFlags.ts</li>
            <li>Find and remove all conditional code using this flag</li>
            <li>Create a PR with the changes</li>
          </ul>
        </div>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              backgroundColor: "#e5e5e5",
              color: "#333",
              border: "none",
              borderRadius: "4px",
              padding: "0.75rem 1.5rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              padding: "0.75rem 1.5rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Confirm Removal
          </button>
        </div>
      </>
    );
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </div>
    </div>
  );
};
