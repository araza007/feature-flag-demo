type Props = {
  expiresAt: string;
};

export const StatusBadge = ({ expiresAt }: Props) => {
  const isExpired = new Date(expiresAt) < new Date();

  const style = {
    display: "inline-block",
    padding: "0.25rem 0.5rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    borderRadius: "3px",
    textTransform: "uppercase" as const,
    ...(isExpired
      ? {
          backgroundColor: "#f8d7da",
          color: "#721c24",
        }
      : {
          backgroundColor: "#d4edda",
          color: "#155724",
        }),
  };

  return <span style={style}>{isExpired ? "Expired" : "Active"}</span>;
};
