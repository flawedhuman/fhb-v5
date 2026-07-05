export function moonPhase(date) {
  const refNewMoon = new Date('2000-01-06T18:14:00Z');
  const synodic = 29.53058867;
  const diffDays = (date - refNewMoon) / 86400000;
  let phase = (diffDays % synodic) / synodic;
  if (phase < 0) phase += 1;
  const illumination = Math.round((1 - Math.cos(2 * Math.PI * phase)) / 2 * 100);
  const names = ['new moon', 'waxing crescent', 'first quarter', 'waxing gibbous',
    'full moon', 'waning gibbous', 'last quarter', 'waning crescent'];
  const name = names[Math.floor(phase * 8 + 0.5) % 8];
  return { phase, illumination, name };
}

export function moonSVG(phase, color, bg = '#0c0908') {
  const r = 8;
  const cx = 10;
  const cy = 10;
  const w = 20;
  const h = 20;

  const lit = 1 - Math.abs(phase - 0.5) * 2;   // 0 at new moon, 1 at full moon
  const dir = phase < 0.5 ? -1 : 1;             // which side the light grows from
  const offset = (1 - lit) * r * 2 * dir;
  const uid = 'moon' + Math.round(phase * 10000);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    <defs><clipPath id="${uid}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath></defs>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>
    <circle cx="${cx + offset}" cy="${cy}" r="${r}" fill="${bg}" clip-path="url(#${uid})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="1" opacity="0.4"/>
  </svg>`;
}

export function formatDate(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${mm}.${dd}`;
}
