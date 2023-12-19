export default function calculateTimeUntil(startDate, startTime) {
  const now = new Date();
  const target = new Date(`${startDate}T${startTime}`);
  const diff = target - now;

  const minutesTotal = Math.floor(diff / (1000 * 60));
  const hoursTotal = Math.floor(minutesTotal / 60);
  const days = Math.floor(hoursTotal / 24);

  const hours = hoursTotal % 24;
  const minutes = minutesTotal % 60;

  return `${days} days, ${hours} hours, ${minutes} minutes `;
}
