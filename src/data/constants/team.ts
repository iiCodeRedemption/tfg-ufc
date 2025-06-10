type TeamMember = {
  name: string
  nick: string
  role: string
  bio: string
  git: string
  img: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Another One",
    nick: "anotherone",
    role: "UI Developer",
    bio: "MMA enthusiast turned developer, combining passion for combat sports with technical expertise.",
    git: "https://github.com/AnotherOne661",
    img: "/imgs/team/anotherone.webp",
  },
  {
    name: "iiCodeRedemption",
    nick: "iicoderedemption",
    role: "Lead Developer",
    bio: "Specializes in web design, with huge full-stack experience.",
    git: "https://github.com/iiCodeRedemption",
    img: "/imgs/team/iicoderedemption.webp",
  },
] as const satisfies TeamMember[]
