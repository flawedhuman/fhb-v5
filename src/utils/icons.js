// src/utils/icons.js
export function typeIcon(type, color) {
  const paths = {
    thoughts: 'M4 20h16 M12 20c.3-3.5-.4-6 .2-9.3 M9 13c-1.6-.6-2.6-2-2.4-3.6 1.7.3 2.8 1.7 2.4 3.6 M12.4 11c1.6-.7 2.4-2.2 2-3.8-1.7.4-2.6 1.9-2 3.8',
    art: 'M17 4c-3 1-9 7-11 16 M15 6.5c-1 .3-2.3 1-2.6 2.2 M13.3 9.3c-1 .3-2.3 1-2.6 2.2 M11.6 12.1c-1 .3-2.2 1-2.5 2.1 M9.9 14.9c-.9.3-2 .9-2.3 1.9',
    music: 'M2 13h2l1-6 2 11 2-14 2 16 2-9 1 4 2-7 2 10 2-5h2',
    'design-work': 'M6 4h12v16l-6-4-6 4z'
  };
  return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
    <path d="${paths[type]}" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>
  </svg>`;
}