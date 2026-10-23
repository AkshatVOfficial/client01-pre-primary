import { Brain, Activity, Users, Heart, Palette } from 'lucide-react';
import { IconBadge } from '../ui/IconBadge';

const AREA_ICONS = {
  Cognitive: Brain,
  Physical: Activity,
  Social: Users,
  Emotional: Heart,
  Creative: Palette,
};

const TONES = ['sage', 'terracotta', 'forest', 'gold', 'sage'];

export function HolisticGrid({ areas }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {areas.map((area, index) => {
        const Icon = AREA_ICONS[area.title] ?? Heart;
        return (
          <div
            key={area.title}
            className="flex flex-col items-start gap-3 rounded-3xl border border-forest/8 bg-white/70 p-5"
          >
            <IconBadge icon={Icon} tone={TONES[index % TONES.length]} size={40} />
            <h3 className="text-base text-forest">{area.title}</h3>
            <p className="text-sm leading-relaxed text-ink/70">{area.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default HolisticGrid;
