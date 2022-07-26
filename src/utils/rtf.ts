export default function rtf(date: string) {
  const today = new Date().getTime();
  const createdAt = new Date(date).getTime();
  const rt = (createdAt - today) / 1000;
  // console.log(rt);

  let value: number;
  let unit: Intl.RelativeTimeFormatUnit;

  if (Math.abs(rt) < 3600) {
    value = rt / 60;
    unit = "minute";
  } else if (Math.abs(rt) < 86400) {
    value = rt / 3600;
    unit = "hour";
  } else if (Math.abs(rt) < 2592000) {
    value = rt / 86400;
    unit = "day";
  } else if (Math.abs(rt) < 31104000) {
    value = rt / 2592000;
    unit = "month";
  } else {
    value = rt / 31104000;
    unit = "year";
  }

  value = Math.ceil(value);

  return new Intl.RelativeTimeFormat("korean", { numeric: "auto" }).format(
    value,
    unit
  );
}
