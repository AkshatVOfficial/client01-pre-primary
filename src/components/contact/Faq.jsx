import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: 'How do I schedule a visit to the school?',
    answer:
      'Reach out via WhatsApp, phone, or the enquiry form on this page, and we\'ll help you find a convenient time to visit and see the classrooms for yourself.',
  },
  {
    question: 'What documents are needed for admission?',
    answer:
      'Typically a birth certificate, address proof, and recent photographs of the child are required — our team will confirm the exact checklist for the current academic session when you enquire.',
  },
  {
    question: 'Is transportation available?',
    answer:
      'Please contact the school directly to check current transport availability and routes for your area.',
  },
  {
    question: 'What are the admission timelines for the academic year?',
    answer:
      'Admission timelines vary by session — message us on WhatsApp or email to get the latest dates for the current academic year.',
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      {FAQ_ITEMS.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question} className="overflow-hidden rounded-2xl border border-forest/10 bg-white/70">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-forest"
              >
                {item.question}
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-4 text-sm leading-relaxed text-ink/70"
            >
              {item.answer}
              {index === 0 && (
                <span className="mt-2 block text-xs text-ink/45">
                  Placeholder answer — to be confirmed and edited by the school before launch.
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Faq;
