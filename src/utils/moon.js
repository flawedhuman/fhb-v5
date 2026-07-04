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

export function moonSVG(phase, color) {
  const r = 16;
  const cx = 20;
  const cy = 20;
  const w = 40;
  const h = 40;
  const pos = phase * 2;
  let litPath = '';

  if (phase > 0.02 && phase < 0.98) {
    if (pos <= 1) {
      const x = cx + r - 2 * r * pos;
      litPath = `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${Math.abs(x - cx)} ${r} 0 0 ${x > cx ? 0 : 1} ${cx} ${cy - r} Z" fill="none" stroke="${color}" stroke-width="1.2"/>`;
    } else {
      const x = cx - r + 2 * r * (pos - 1);
      litPath = `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${Math.abs(x - cx)} ${r} 0 0 ${x < cx ? 0 : 1} ${cx} ${cy - r} Z" fill="none" stroke="${color}" stroke-width="1.2"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" aria-hidden="true"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="1.2"/>${litPath}</svg>`;
}

export function formatDate(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${mm}.${dd}`;
}
