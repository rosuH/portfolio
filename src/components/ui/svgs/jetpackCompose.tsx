import type { SVGProps } from "react";

const JetpackCompose = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 96 96" fill="none">
    <rect x="48" y="56" width="40" height="32" rx="8" fill="#174EA6" />
    <rect x="8" y="8" width="80" height="40" rx="8" fill="#4285F4" />
    <rect x="8" y="56" width="32" height="32" rx="8" fill="#34A853" />
  </svg>
);

export { JetpackCompose };
