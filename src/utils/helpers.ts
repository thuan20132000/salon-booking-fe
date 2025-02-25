import dayjs from 'dayjs';

export const formatDateTime = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD');
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0 
    ? `${hours}h ${remainingMinutes}min`
    : `${remainingMinutes}min`;
}

export const formatTime = (time: dayjs.Dayjs) => {
  return time.format('HH:mm');
}
