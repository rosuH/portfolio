import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "rosu",
  url: "https://rosuh.me",
  description:
    "Software engineer at TikTok with Android/Kotlin roots, now building creative agent systems.",
  avatarUrl: "/me.png",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "https://blog.rosuh.me", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hi@rosuh.me",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/rosuH",
        icon: Icons.github,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/rosu_h",
        icon: Icons.x,
        navbar: true,
      },
      Email: {
        name: "Email",
        url: "mailto:hi@rosuh.me",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
} as const;
