import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { Android } from "@/components/ui/svgs/android";
import { Java } from "@/components/ui/svgs/java";
import { JetpackCompose } from "@/components/ui/svgs/jetpackCompose";
import { Kotlin } from "@/components/ui/svgs/kotlin";
import { KotlinMultiplatform } from "@/components/ui/svgs/kotlinMultiplatform";
import { Python } from "@/components/ui/svgs/python";

export const DATA = {
  name: "rosu",
  initials: "RH",
  url: "https://rosuh.me",
  location: "Shenzhen, China",
  locationLink:
    "https://www.google.com/maps/place/Shenzhen,+Guangdong+Province,+China",
  description:
    "Senior Android engineer focused on real-time audio/video features and Kotlin Multiplatform.",
  summary:
    "I have 6+ years of experience building Android products with a focus on live streaming and RTC. I currently work at [Tencent Music Entertainment](https://www.tencentmusic.com/en-us/) and enjoy shipping reliable mobile infrastructure and developer-friendly abstractions.",
  avatarUrl: "/me.png",
  skills: [
    { name: "Kotlin", icon: Kotlin },
    { name: "Java", icon: Java },
    { name: "Android", icon: Android },
    { name: "Jetpack Compose", icon: JetpackCompose },
    { name: "Kotlin Multiplatform", icon: KotlinMultiplatform },
    { name: "Python", icon: Python },
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
      company: "Tencent Music Entertainment Group",
      href: "https://www.tencentmusic.com/en-us/",
      badges: [],
      location: "Shenzhen, China",
      title: "Senior Android Software Engineer",
      logoUrl: "/tme.webp",
      start: "October 2021",
      end: "Present",
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
