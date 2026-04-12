import type { SVGProps } from "react";

const KotlinMultiplatform = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <path
      d="M0 22.5629V0.0835311L22.4794 22.5629H0ZM0 25.4372V48H0.0572568L22.6201 25.4372H0ZM25.9906 22.0094L48 0H3.98128L25.9906 22.0094ZM26.0193 26.1028L4.1221 48H47.9164L26.0193 26.1028Z"
      fill="url(#kotlinMultiplatformGradient)"
    />
    <defs>
      <radialGradient
        id="kotlinMultiplatformGradient"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(43.5 4.5) rotate(135) scale(61.5183)"
      >
        <stop stopColor="#37BCFD" />
        <stop offset="0.580197" stopColor="#7F52FF" />
        <stop offset="1" stopColor="#C711E1" />
      </radialGradient>
    </defs>
  </svg>
);

export { KotlinMultiplatform };
