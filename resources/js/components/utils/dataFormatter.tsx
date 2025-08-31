export function formatDate(dateString: string): string {
    if (!dateString) return "—";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "Invalid date";

    return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
