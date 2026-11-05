import { CircleAlert, CircleCheck, Info } from 'lucide-react';

const TONES = {
  error: { box: 'bg-terracotta/10 text-terracotta-dark', Icon: CircleAlert, role: 'alert' },
  success: { box: 'bg-sage/15 text-forest', Icon: CircleCheck, role: 'status' },
  info: { box: 'bg-gold/40 text-ink', Icon: Info, role: 'status' },
};

/** Inline message box used throughout the admin area. */
export function AdminNotice({ tone = 'info', title, children, action }) {
  const { box, Icon, role } = TONES[tone] ?? TONES.info;
  return (
    <div role={role} className={`flex items-start gap-3 rounded-2xl p-4 text-sm leading-relaxed ${box}`}>
      <Icon size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={title ? 'mt-1' : ''}>{children}</div>}
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}

export default AdminNotice;
