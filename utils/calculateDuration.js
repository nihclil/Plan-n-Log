export default function calculateDuration(
  startDate,
  endDate,
  startTime,
  endTime
) {
  const startD = new Date(startDate);
  const endD = new Date(endDate);

  const dateDiff = endD - startD;
  const diffDays = Math.abs(dateDiff / (1000 * 60 * 60 * 24));

  const startT = new Date(`1970-01-01T${startTime}`);
  const endT = new Date(`1970-01-01T${endTime}`);
  const timeDiff = endT - startT;
  const diffMinutes = Math.abs(timeDiff / 1000 / 60);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return ` ${diffDays} days, ${hours} hours, ${minutes} minutes`;
}
