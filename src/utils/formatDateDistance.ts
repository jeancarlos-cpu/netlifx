import { formatDistance, parseISO } from 'date-fns';

export default function formatDateDistance(stringDate?: string) {
  if (!stringDate) return null;

  return formatDistance(parseISO(stringDate), new Date(), {
    addSuffix: true,
  });
}
