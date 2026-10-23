import { Blocks, HeartHandshake, ShieldCheck, Sprout } from 'lucide-react';
import { Container } from '../ui/Container';
import { IconBadge } from '../ui/IconBadge';
import { schoolConfig } from '../../config/schoolConfig';

const TONES = ['sage', 'terracotta', 'forest', 'gold'];
const ICONS = { Blocks, HeartHandshake, ShieldCheck, Sprout };

export function TrustHighlights() {
  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {schoolConfig.trustHighlights.map((item, index) => {
            const Icon = ICONS[item.icon] ?? Sprout;
            return (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-3xl border border-forest/8 bg-white/60 p-6 transition-shadow hover:shadow-soft"
              >
                <IconBadge icon={Icon} tone={TONES[index % TONES.length]} />
                <div>
                  <h3 className="text-lg text-forest">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/75">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default TrustHighlights;
