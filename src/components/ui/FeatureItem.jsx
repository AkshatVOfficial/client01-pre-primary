import { Check } from 'lucide-react';

/**
 * Small inline check-list item — used for facility lists, FAQs, objectives.
 */
export function FeatureItem({ children, icon: Icon = Check }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage/20 text-sage-dark">
        <Icon size={14} aria-hidden="true" />
      </span>
      <span className="text-sm leading-relaxed text-ink/80">{children}</span>
    </li>
  );
}

export default FeatureItem;
