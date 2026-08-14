export interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
   facebook?: string; 
  twitter?: string;
  youtube?: string;
  leetcode?: string;
  hackerrank?: string;
  website?: string; 
  portfolio?: string;
}

export interface Hero {
  heading: string;
  subtitle: string;
  typingWords: string[];
}

export interface Resume {
  url?: string;
  publicId?: string;
  buttonText: string;
}

export interface Profile {
  _id: string;

  fullName: string;

  title: string;

  shortBio: string;

  about: string;

  profileImage?: {
    url: string;
    publicId: string;
  };

  email: string;

  phone?: string;

  location?: string;

  socials: SocialLinks;

  hero: Hero;

  resume: Resume;
}