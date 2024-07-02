import { Icons } from "@/components/icons";
import { Mail } from "lucide-react";
import { title } from "process";

export const DATA = {
  name: "rosu",
  initials: "rosu",
  url: "https://rosuh.me",
  location: "Shenzhen, China",
  locationLink: "https://www.google.com/maps/place/Shenzhen,+Guangdong+Province,+China",
  description:
    "A passionate and experienced Android Developer with a knack for delivering high-quality mobile applications. Enthusiastic about Kotlin Multiplatform and live streaming technologies.",
  summary:
    "With 5 years of experience in Android development, I specialize in live streaming, real-time audio-video interactions, and cross-platform capabilities using Kotlin Multiplatform (KMP). I currently work at Tencent Music Entertainment Group, leading the development of innovative mobile features and exploring new technologies. I’m actively looking for overseas opportunities that offer a great work-life balance and the chance to contribute to exciting projects.",
  avatarUrl: "/me.webp",
  skills: [
    "Kotlin",
    "Java",
    "Android",
    "Jetpack Compose",
    "Kotlin Multiplatform",
    "Python",
  ],
  contact: {
    email: "hi@rosuh.me",
    social: {
      GitHub: {
        url: "https://github.com/rosuH",
        icon: Icons.github,
      },
      X: {
        url: "https://x.com/rosu_h",
        icon: Icons.x,
      },
      Email: {
        url: "mailto:hi@rosuh.me",
        icon: Mail,
      }
    },
  },
  work: [
    {
      company: "Tencent Music Entertainment Group",
      href: "https://www.tencentmusic.com/en-us/",
      location: "Shenzhen, China",
      title: "Senior Android Software Engineer",
      start: "October 2021",
      end: "Present",
      logoUrl: "/tme.webp",
      badges: [],
      description:
        "Lead the development of live streaming, real-time audio-video interaction, and PK features. Spearheaded the research and implementation of Kotlin Multiplatform (KMP) cross-platform capabilities, enhancing development efficiency.",
    },
    {
      company: "Shifang Ronghai Technology",
      href: "https://www.tenclass.com/",
      location: "Shenzhen, China",
      title: "Android Software Engineer",
      start: "March 2019",
      end: "September 2021",
      logoUrl: "/tenclass.webp",
      badges: [],
      description:
        "Maintained and iterated an online education app, focusing on features such as audio editing and media playback.",
    },
  ],
  education: [
    {
      school: "Jiaying University",
      href: "https://www.jyu.edu.cn/",
      logoUrl: "/jyu.webp",
      degree: "Bachelor's Degree in Computer Science and Technology",
      location: "China",
      start: "2015",
      end: "2019",
    },
  ],
  projects: [
    {
      title: "Easy Watermark",
      href: "https://github.com/rosuH/EasyWatermark",
      dates: "July 2020 - Present",
      description:
        "An open-source tool for adding watermarks to photos to protect privacy. The project is well-received and actively maintained.",
      technologies: ["Kotlin", "Android"],
      image: "/ewm.webp",
      video: "",
      links: [
        {
          type: "GitHub",
          href: "https://github.com/rosuH/EasyWatermark",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
    {
      title: "AICommit",
      href: "http://aicommit.app/",
      dates: "Personal Project",
      description:
        "An IDEA plugin designed to optimize the commit message writing experience using AI.",
      technologies: ["Kotlin", "AI"],
      image: "/ai-commit.webp",
      video: "",
      links: [
        {
          type: "Website",
          href: "http://aicommit.app/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
    {
      title: "AndroidFilePicker",
      href: "https://github.com/rosuH/AndroidFilePicker",
      dates: "December 2018 - Present",
      description:
        "An open-source file picker library for Android, providing a smooth and efficient file selection experience.",
      technologies: ["Kotlin", "Android"],
      image: "/afp.webp",
      video: "",
      links: [
        {
          type: "GitHub",
          href: "https://github.com/rosuH/AndroidFilePicker",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
  ],
  hackathons: [],
  talks: [
    {
      title: "KotlinConf'24 Shenzhen",
      description: "Presented on 'Building Kotlin Multiplatform Cross-Platform UI from Scratch'.",
      dates: "June 22, 2024",
      location: "Shenzhen, China",
      image: "/kotlin_conf_2024.webp",
      links: [
        {
          title: "GitHub",
          href: "https://github.com/rosuH/Playground/tree/main/KotlinConf24/KMPUI",
          icon: <Icons.github className="size-3" />,
        },
      ],
    },
  ],
} as const;
