import { schoolConfig } from '../../config/schoolConfig';

export function MapEmbed() {
  const { contact, identity } = schoolConfig;

  return (
    <div className="overflow-hidden rounded-3xl border border-forest/8 shadow-soft">
      <iframe
        title={`Map showing the location of ${identity.name}`}
        src={contact.mapEmbedUrl}
        width="100%"
        height="320"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[280px] w-full sm:h-[320px]"
      />
    </div>
  );
}

export default MapEmbed;
