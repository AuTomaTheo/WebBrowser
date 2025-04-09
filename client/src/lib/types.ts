export interface Category {
  id: number;
  title: string;
  image: string;
  link: string;
}

export interface ServiceHighlight {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface PopularCategory {
  id: number;
  title: string;
  image: string;
  link: string;
}

export interface Testimonial {
  id: number;
  name: string;
  content: string[];
  rating: number;
}

export interface Subscription {
  email: string;
}
