export default function formatNumber(number: number) {
  return new Intl.NumberFormat('us', {
    style: 'decimal',
  }).format(number);
}
