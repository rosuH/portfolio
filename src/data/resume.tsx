import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { Android } from "@/components/ui/svgs/android";
import { Java } from "@/components/ui/svgs/java";
import { JetpackCompose } from "@/components/ui/svgs/jetpackCompose";
import { Kotlin } from "@/components/ui/svgs/kotlin";
import { KotlinMultiplatform } from "@/components/ui/svgs/kotlinMultiplatform";
import { LangGraph } from "@/components/ui/svgs/langGraph";
import { Python } from "@/components/ui/svgs/python";

export const DATA = {
  name: "rosu",
  initials: "RH",
  url: "https://rosuh.me",
  location: "Shenzhen, China",
  locationLink:
    "https://www.google.com/maps/place/Shenzhen,+Guangdong+Province,+China",
  description:
    "Senior Android engineer with 6+ years in live audio/video and RTC, now building creative agent systems at TikTok.",
  summary:
    "I’m a senior Android engineer with 6+ years of experience shipping Android products, live streaming features, and RTC systems. Since March 2026, I’ve been at [TikTok](https://www.tiktok.com/) building creative agent systems, focused mainly on backend engineering.",
  avatarUrl: "/me.png",
  skills: [
    { name: "Kotlin", icon: Kotlin },
    { name: "Java", icon: Java },
    { name: "Android", icon: Android },
    { name: "Jetpack Compose", icon: JetpackCompose },
    { name: "Kotlin Multiplatform", icon: KotlinMultiplatform },
    { name: "Python", icon: Python },
    { name: "LangGraph", icon: LangGraph },
  ],
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

  work: [
    {
      company: "TikTok",
      href: "https://www.tiktok.com/",
      badges: [],
      location: "Shenzhen, China",
      title: "Senior Software Engineer, Creative Agent Systems",
      logoUrl: "/tiktok-light.png",
      darkLogoUrl: "/tiktok-dark.png",
      start: "March 2026",
      end: "Present",
      description:
        "Building creative agent systems, focused mainly on backend engineering for AI-driven creative workflows.",
    },
    {
      company: "Tencent Music Entertainment Group",
      href: "https://www.tencentmusic.com/en-us/",
      badges: [],
      location: "Shenzhen, China",
      title: "Senior Android Software Engineer",
      logoUrl: "/tme.webp",
      start: "October 2021",
      end: "February 2026",
      description:
        "Led development of live streaming, real-time audio/video interaction, and PK features. Drove Kotlin Multiplatform exploration and implementation to improve cross-platform development efficiency.",
    },
    {
      company: "Shifang Ronghai Technology",
      href: "https://www.tenclass.com/",
      badges: [],
      location: "Shenzhen, China",
      title: "Android Software Engineer",
      logoUrl: "/tenclass.webp",
      start: "March 2019",
      end: "September 2021",
      description:
        "Developed and maintained Android apps focused on audio/video experiences. Built and optimized custom views, reduced crash rate, established Jenkins CI, and implemented coroutine-based networking and robust file upload tooling.",
    },
    {
      company: "Tuputech",
      href: "https://www.tuputech.com/",
      badges: [],
      location: "Guangzhou, China",
      title: "Android Software Engineer Intern",
      logoUrl: "/tuputech.jpg",
      start: "May 2018",
      end: "December 2018",
      description:
        "Contributed to facial recognition and video applications. Worked on video validation pipelines, liveness detection integration, and memory-safe image/file workflows.",
    },
  ],
  education: [
    {
      school: "Jiaying University",
      href: "https://www.jyu.edu.cn/",
      degree: "Bachelor's Degree in Computer Science and Technology",
      logoUrl: "/jyu.webp",
      start: "2015",
      end: "2019",
    },
  ],
  projects: [
    {
      title: "YSL",
      href: "https://ysl.rosuh.me/atlas/",
      dates: "2025 · Listening Atlas",
      active: true,
      description:
        "A browsable Yellowstone Sound Atlas that turns the park's public sound library into a shareable listening experience. The project includes the crawler, archive pipeline, and a static specimen-style interface for exploring field recordings.",
      technologies: ["Python", "Static Web", "Data Collection"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/rosuH/YSL",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ysl-banner.png",
      video: "",
    },
    {
      title: "Easy Watermark",
      href: "https://github.com/rosuH/EasyWatermark",
      dates: "July 2020 - Present",
      active: true,
      description:
        "An open-source tool for adding watermarks to photos to protect privacy.",
      technologies: ["Kotlin", "Android"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/rosuH/EasyWatermark",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ewm.webp",
      video: "",
    },
    {
      title: "AICommit",
      href: "http://aicommit.app/",
      dates: "Personal Project",
      active: true,
      description:
        "An IntelliJ IDEA plugin that improves commit message writing with AI assistance.",
      technologies: ["Kotlin", "AI"],
      links: [
        {
          type: "Website",
          href: "http://aicommit.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/ai-commit.webp",
      video: "",
    },
    {
      title: "AndroidFilePicker",
      href: "https://github.com/rosuH/AndroidFilePicker",
      dates: "December 2018 - Present",
      active: true,
      description:
        "An open-source Android file picker library with a smooth and efficient selection experience.",
      technologies: ["Kotlin", "Android"],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/rosuH/AndroidFilePicker",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/afp.webp",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "KotlinConf 2024 Shenzhen",
      dates: "June 22, 2024",
      location: "Shenzhen, China",
      description:
        "Presented a session on building Kotlin Multiplatform cross-platform UI from scratch.",
      image: "/kotlin_conf_2024.webp",
      links: [
        {
          title: "Code",
          href: "https://github.com/rosuH/Playground/tree/main/KotlinConf24/KMPUI",
          icon: <Icons.github className="h-4 w-4" />,
        },
      ],
    },
  ],
} as const;
