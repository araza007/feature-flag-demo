// Formats a Date in UTC so server and client output match for hydration.
export const formatDateUTC = (date: Date) => date.toISOString().slice(0, 10);
