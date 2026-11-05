import { STATUS_LABELS } from '../../lib/enquiries';

const COLORS = {
  pending: 'bg-gold/60 text-ink',
  contacted: 'bg-sage/25 text-forest',
  enrolled: 'bg-forest text-cream',
  rejected: 'bg-terracotta/20 text-terracotta-dark',
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${COLORS[status] ?? 'bg-forest/10 text-forest'}`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

export default StatusBadge;
