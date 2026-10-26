export const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

const relativeTimeFormatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'always' });
const shortDateFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
const shortDateWithYearFormatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

export function formatPostAge(date: Date, now: Date = new Date()): string {
    const elapsedMinutes = Math.max(0, Math.floor((now.getTime() - date.getTime()) / 60_000));

    if (elapsedMinutes < 1) return 'Just now';
    if (elapsedMinutes < 60) return relativeTimeFormatter.format(-elapsedMinutes, 'minute');

    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) return relativeTimeFormatter.format(-elapsedHours, 'hour');

    const elapsedDays = Math.floor(elapsedHours / 24);
    if (elapsedDays < 7) return relativeTimeFormatter.format(-elapsedDays, 'day');

    return date.getFullYear() === now.getFullYear()
        ? shortDateFormatter.format(date)
        : shortDateWithYearFormatter.format(date);
}
