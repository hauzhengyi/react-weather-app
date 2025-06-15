export const dateFormatter = (time: number, timezone: number) => {
  const datetime = new Date((time + timezone) * 1000);
  const year = datetime.getUTCFullYear();
  const month = (datetime.getUTCMonth() + 1).toString().padStart(2, "0");
  const date = datetime.getUTCDate();
  const hours = datetime.getUTCHours();
  const hours12 = hours % 12 || 12;
  const minutes = datetime.getUTCMinutes().toString().padStart(2, "0");
  const seconds = datetime.getUTCSeconds().toString().padStart(2, "0");
  const meridian = hours < 12 ? "AM" : "PM";
  const gmt = "GMT" + (timezone > 0 ? "+" : "-") + Math.abs(timezone / 3600);

  return `${year}/${month}/${date} ${hours12}:${minutes}:${seconds}${meridian} ${gmt}`;
};
