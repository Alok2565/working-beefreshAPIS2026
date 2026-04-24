// import blog1 from "../assets/images/blogs/blog1.jpg";
// import blog2 from "../assets/images/blogs/blog2.jpg";
// import blog3 from "../assets/images/blogs/blog3.jpg";

// export interface Blog {
//   id: number;
//   title: string;
//   description: string;
//   image: string;
// }

// export const blogData: Blog[] = [
//   {
//     id: 1,
//     title: "Organic Honey Benefits",
//     description: "Discover the health benefits of organic honey.",
//     image: blog1,
//   },
//   {
//     id: 2,
//     title: "Beekeeping Guide",
//     description: "Learn how to start beekeeping at home.",
//     image:blog2,
//   },
//   {
//     id: 3,
//     title: "Natural Sweeteners",
//     description: "Why honey is better than sugar.",
//     image: blog3,
//   },
// ];

// src/blogs/blogData.ts
import blog1 from "../assets/images/blogs/blog1.jpg";
import blog2 from "../assets/images/blogs/blog2.jpg";
import blog3 from "../assets/images/blogs/blog3.jpg";
export interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  author: string;   
  date: string;     
  rating: number;   

}

export const blogData: Blog[] = [
   {
    id: 1,
    title: "Organic Honey Benefits",
     slug: "organic-honey-benefits",
    description: "Discover the health benefits of organic honey.",
    content: `<p>Honey improves immunity...</p>`,
    image: blog1,
    author: "Admin",            
    date: "2026-04-10",
    rating: 4,                  
  },
  {
    id: 2,
    title: "Beekeeping Guide",
    slug: "beekeeping-guide",
    description: "Learn how to start beekeeping at home.",
    content: "Beekeeping requires proper setup and knowledge.",
    image: blog2,
    rating: 4,
    author: "Admin",            
    date: "2026-04-10",
  },
  {
    id: 3,
    title: "Natural Sweeteners",
    slug: "natural-sweeteners",
    description: "Why honey is better than sugar.",
    content: "Honey is healthier than refined sugar.",
    image: blog3,
     author: "Admin",            
    date: "2026-04-10",
    rating: 4,
  },
  {
    id: 4,
    title: "Honey for Skin",
    slug: "honey-for-skin",
    description: "Use honey for glowing skin naturally.",
    content: "Honey acts as a natural moisturizer.",
    image: blog1,
     author: "Admin",            
    date: "2026-04-10",
    rating: 4,
  },
  {
    id: 5,
    title: "Organic Honey Benefits2",
    slug: "organic-honey-benefits2",
    description: "Discover the health benefits of organic honey.",
    content: "More benefits of organic honey explained here.",
    image: blog2,
     author: "Admin",            
    date: "2026-04-10",
    rating: 4,
  },
  {
    id: 6,
    title: "Natural Sweeteners2",
    slug:"natural-sweeteners2",
    description: "Why honey is better than sugar.",
    content: "Natural sweeteners are better for health.",
    image: blog3,
     author: "Admin",            
    date: "2026-04-10",
    rating: 4,
  },
];