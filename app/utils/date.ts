export const parseInterval = (interval: Record<string, number>) => {
  return Object.entries(interval).map(item => `${item[1]} ${item[0]}`).join(" ");
}

export const parseDateTime = (datetime: string, raw?: boolean) => {
  const res = [
    new Date(datetime).toLocaleDateString(),
    new Date(datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  ];

  if (raw) {
    return res;
  }

  return res.join(" ");
}
