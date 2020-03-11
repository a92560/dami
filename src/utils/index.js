export const formatTime = time => {
  if (!time) {
    return ''
  } else if (time.indexOf(" ") === -1) {
    return time
  } else {
    const months = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 4,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    }
    const target = time.split(" ")
    const y = target[3]
    const m = months[target[1]]
    const d = target[2]
    const datetime = target[4]
    return `${y}-${m}-${d} ${datetime}`
  }
}