import { Booking } from '@/interfaces/booking';
import dayjs from 'dayjs';

export const formatDateTime = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

export const formatDate = (date: string) => {
  return dayjs(date).format('YYYY-MM-DD');
}

export const formatPrice = (price: number | null | undefined) => {
  if (!price) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export const formatDuration = (minutes: number | null | undefined) => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0
    ? `${hours}h ${remainingMinutes}min`
    : `${remainingMinutes}min`;
}

export const formatTime = (time: dayjs.Dayjs) => {
  return time.format('HH:mm');
}

export const generateUUID = () => {
  return crypto.randomUUID();
}

export const generateTimestampNumber = (): number => {
  return new Date().getTime();
}


// check if the string input is a numeric value
export const isOnlyNumbers = (value: string) => {
  return !isNaN(Number(value));
}

// check if the string input is only alphabets
export const isOnlyAlphabets = (value: string) => {
  return /^[a-zA-Z\s]+$/.test(value);
}

export const getBookingStatusColor = (status: Booking['status']) => {
  switch (status) {
    case 'scheduled':
      return '#ffe58f';
    case 'in_service':
      return '#91caff';
    case 'cancelled':
      return '#ffd591';
    case 'checked_in':
      return '#eaff8f';
    case 'checked_out':
      return '#13c2c2';
    default:
      return '#91caff';
  }
}
