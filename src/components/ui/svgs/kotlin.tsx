import type { SVGProps } from "react";

const Kotlin = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 48 48" fill="none">
    <path
      d="M48 48H0V0H48L23.505 23.6475L48 48Z"
      fill="url(#kotlinGradient)"
    />
    <defs>
      <radialGradient
        id="kotlinGradient"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(48 0) rotate(180) scale(48)"
      >
        <stop stopColor="#E44857" />
        <stop offset="0.504494" stopColor="#C711E1" />
        <stop offset="1" stopColor="#7F52FF" />
      </radialGradient>
    </defs>
  </svg>
);

export { Kotlin };
