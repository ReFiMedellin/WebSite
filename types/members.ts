export type TeamMemberType = {
  name: string;
  role: string;
  imageSrc: any;
  isPastMember?: boolean
  socialLinks: {
    twitter: string;
    instagram: string;
    telegram: string;
    linkedin: string;
  };
};
