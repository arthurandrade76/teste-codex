const icons = {
  home: (
    <path d="M3 8.4 8 4l5 4.4v6.1a.5.5 0 0 1-.5.5H9.7v-4.1H6.3V15H3.5a.5.5 0 0 1-.5-.5V8.4Z" />
  ),
  case: (
    <path d="M8 2.7a5.3 5.3 0 1 0 0 10.6 5.3 5.3 0 0 0 0-10.6Zm0 2.5v5.6M5.2 8h5.6" />
  ),
  folder: (
    <path d="M2.3 5.2h4l1.1 1.4h6.3v6.2a1.2 1.2 0 0 1-1.2 1.2h-9a1.2 1.2 0 0 1-1.2-1.2V5.2Zm0 0V4a1 1 0 0 1 1-1h2.5l1.1 1.2h5.4a1 1 0 0 1 1 1v1.4" />
  ),
  people: (
    <path d="M6.7 7.7a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Zm5.1-.4a1.9 1.9 0 1 0 0-3.8M2.7 13.6c.4-2 1.8-3.2 4-3.2s3.7 1.2 4.1 3.2m.4-2.8c1.3.1 2.1 1 2.4 2.3" />
  ),
  cluster: (
    <>
      <circle cx="5.5" cy="5.6" r="1.45" fill="currentColor" stroke="none" />
      <path d="M3.6 10c.2-1.5 1-2.4 1.9-2.4s1.7.9 1.9 2.4c-.5.5-1.1.8-1.9.8S4.1 10.5 3.6 10Z" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="5.6" r="1.45" fill="currentColor" stroke="none" />
      <path d="M8.6 10c.2-1.5 1-2.4 1.9-2.4s1.7.9 1.9 2.4c-.5.5-1.1.8-1.9.8s-1.4-.3-1.9-.8Z" fill="currentColor" stroke="none" />
      <circle cx="8" cy="8.2" r="1.55" fill="currentColor" stroke="none" />
      <path d="M5.8 12.8c.2-1.7 1.1-2.7 2.2-2.7s2 1 2.2 2.7c-.5.6-1.3 1-2.2 1s-1.7-.4-2.2-1Z" fill="currentColor" stroke="none" />
    </>
  ),
  chart: (
    <path d="M3 13.5h10M4.5 11V7.5m3.5 3.5V4m3.5 7V6" />
  ),
  metricBars: (
    <>
      <rect x="4" y="7.5" width="1.6" height="4" rx=".8" fill="currentColor" stroke="none" />
      <rect x="7.2" y="4.4" width="1.6" height="7.1" rx=".8" fill="currentColor" stroke="none" />
      <rect x="10.4" y="6.2" width="1.6" height="5.3" rx=".8" fill="currentColor" stroke="none" />
    </>
  ),
  settings: (
    <path d="M8 10.4A2.4 2.4 0 1 0 8 5.6a2.4 2.4 0 0 0 0 4.8Zm5.4-1.7V7.3l-1.6-.5-.4-1 1-1.5-1-1-1.5 1-.9-.4L8.6 2H7.4L7 3.9l-.9.4-1.5-1-1 1 1 1.5-.4 1-1.6.5v1.4l1.6.5.4 1-1 1.5 1 1 1.5-1 .9.4.4 1.9h1.2l.4-1.9.9-.4 1.5 1 1-1-1-1.5.4-1 1.6-.5Z" />
  ),
  info: (
    <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm0-6.5V11m0-6h.01" />
  ),
  logout: (
    <path d="M6.4 4.2H4.2a1 1 0 0 0-1 1v5.6a1 1 0 0 0 1 1h2.2M9.8 5.2 12.6 8l-2.8 2.8M12.4 8H6.8" />
  ),
  note: (
    <path d="M5 2.8h5l2 2v8.4H5a1 1 0 0 1-1-1V3.8a1 1 0 0 1 1-1Zm5 .1V5h2M6.4 10h3.2" />
  ),
  metricNote: (
    <>
      <path d="M5.1 3.2h4.2l1.6 1.6v7.7H5.1a1 1 0 0 1-1-1V4.2a1 1 0 0 1 1-1Z" />
      <path d="M9.3 3.3V5h1.6M6.2 7.2h2.9M6.2 9.2h3.6" />
    </>
  ),
  pendingList: (
    <>
      <path d="M4.4 3.2h5.2a1 1 0 0 1 1 1v7.6a1 1 0 0 1-1 1H4.4a1 1 0 0 1-1-1V4.2a1 1 0 0 1 1-1Z" />
      <path d="m5.3 6.2.6.6 1.1-1.2M8.2 6.3h2.4M5.3 9.5l.6.6L7 8.9M8.2 9.6h2.4" />
    </>
  ),
  lamp: (
    <path d="M8 2.6a3.8 3.8 0 0 0-2.3 6.8c.5.4.8 1 .8 1.6h3c0-.6.3-1.2.8-1.6A3.8 3.8 0 0 0 8 2.6Zm-1.2 10h2.4" />
  ),
  chevronDown: <path d="m4 6 4 4 4-4" />,
  chevronRight: <path d="m6 4 4 4-4 4" />,
  arrowLeft: <path d="M10.5 4 6.5 8l4 4M7 8h6" />,
  check: <path d="m4 8.2 2.4 2.4L12 5" />,
  man: (
    <path d="M10.6 3.4h2v2M12.3 3.7 9.8 6.2M7.1 13.4V9.5M5 11.4h4.2M7.1 9.6a3.1 3.1 0 1 0 0-6.2 3.1 3.1 0 0 0 0 6.2Z" />
  ),
  woman: (
    <path d="M8 9.5a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Zm0 0v4.1M6.1 11.7h3.8" />
  ),
  maximize: <path d="M5.8 3.2H3.2v2.6M3.2 3.2 6 6m4.2 6.8h2.6v-2.6M12.8 12.8 10 10" />,
  upload: (
    <path d="M5.3 5.8 8 3.1l2.7 2.7M8 3.2v7.1M4.2 7.4H3.1a1 1 0 0 0-1 1v3.5a1 1 0 0 0 1 1h9.8a1 1 0 0 0 1-1V8.4a1 1 0 0 0-1-1h-1.1" />
  ),
  download: (
    <path d="M8 2.8v7.1m0 0 2.7-2.7M8 9.9 5.3 7.2M4.2 10.2H3.1a1 1 0 0 0-1 1v1.1a1 1 0 0 0 1 1h9.8a1 1 0 0 0 1-1v-1.1a1 1 0 0 0-1-1h-1.1" />
  ),
  sparkle: (
    <path d="M8.2 2.6 9.6 6l3.5 1.4-3.5 1.4-1.4 3.6-1.4-3.6-3.5-1.4L6.8 6l1.4-3.4Zm4.1 8.3.4 1 .9.4-.9.4-.4.9-.4-.9-.9-.4.9-.4.4-1Z" />
  ),
  refresh: <path d="M12.4 6.4A4.5 4.5 0 1 0 11.1 11M12.4 3.4v3h-3" />,
  minus: <path d="M4 8h8" />,
  arrowUp: <path d="M8 12V4m0 0L4.8 7.2M8 4l3.2 3.2" />,
  edit: <path d="M9.7 3.2 12.8 6.3 6 13.1H2.9V10L9.7 3.2Zm-1.2 1.2 3.1 3.1" />,
  eye: (
    <path d="M2.2 8s2.1-3.7 5.8-3.7S13.8 8 13.8 8 11.7 11.7 8 11.7 2.2 8 2.2 8Zm5.8 1.8A1.8 1.8 0 1 0 8 6.2a1.8 1.8 0 0 0 0 3.6Z" />
  ),
  search: <path d="M7.2 12.1a4.9 4.9 0 1 0 0-9.8 4.9 4.9 0 0 0 0 9.8Zm3.5-1.4 3 3" />,
  trash: (
    <path d="M3.5 4.5h9M6.5 4.5V3.2h3v1.3m2.1 0-.5 8.1a1 1 0 0 1-1 .9H5.9a1 1 0 0 1-1-.9l-.5-8.1m2.2 2.2v4.1m2.8-4.1v4.1" />
  ),
  globe: (
    <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm0-12c1.6 1.4 2.4 3.4 2.4 6S9.6 12.6 8 14m0-12C6.4 3.4 5.6 5.4 5.6 8s.8 4.6 2.4 6M2.4 8h11.2M3.4 5.1h9.2M3.4 10.9h9.2" />
  ),
  lock: (
    <path d="M4.4 7.1V5.4a3.6 3.6 0 0 1 7.2 0v1.7M3.5 7.1h9v6.1h-9V7.1Zm4.5 2.3v1.6" />
  ),
  group: (
    <path d="M6.6 7.1a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Zm4.2-.4a1.7 1.7 0 1 0 0-3.4M2.9 13.1c.3-2 1.6-3.1 3.7-3.1s3.4 1.1 3.8 3.1m.4-2.7c1.1.2 1.9 1 2.2 2.3" />
  ),
  clock: (
    <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm0-8.8V8l2 1.3" />
  ),
  calendar: (
    <path d="M4.5 2.5v2m7-2v2M2.8 5h10.4M3.8 3.8h8.4a1 1 0 0 1 1 1v7.4a1 1 0 0 1-1 1H3.8a1 1 0 0 1-1-1V4.8a1 1 0 0 1 1-1Zm2.2 4h.01m2 0h.01m2 0h.01M6 10h.01m2 0h.01m2 0h.01" />
  ),
  star: (
    <path d="m8 2.8 1.5 3 3.3.5-2.4 2.3.6 3.3L8 10.3l-3 1.6.6-3.3-2.4-2.3 3.3-.5L8 2.8Z" />
  ),
  send: (
    <path d="M13.5 2.6 2.6 7.3l4 1.6 1.6 4 5.3-10.3ZM6.6 8.9l2.3-2.3" />
  ),
};

export default function Icon({ name, size = 16, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`icon ${className}`}
      fill="none"
      height={size}
      viewBox="0 0 16 16"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35">
        {icons[name]}
      </g>
    </svg>
  );
}
