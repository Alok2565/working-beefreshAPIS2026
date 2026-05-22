// src/config/categoryMegaMenu.ts

export interface CategoryChild {
  label: string;
  path: string;
}

export interface CategoryMenu {
  category_name: string;
  category_slug: string;
  children?: CategoryChild[];
}

export const categoryMegaMenuConfig: CategoryMenu[] = [
  {
    category_name: "Honey",
    category_slug: "/category/honey",

    children: [
      {
        label: "Raw Honey",
        path: "/products/raw-honey",
      },

      {
        label: "Organic Honey",
        path: "/products/organic-honey",
      },

      {
        label: "Wild Forest Honey",
        path: "/products/wild-forest-honey",
      },

      {
        label: "Acacia Honey",
        path: "/products/acacia-honey",
      },
    ],
  },

  {
    category_name: "Bee Products",
    category_slug: "/category/bee-products",

    children: [
      {
        label: "Bee Wax",
        path: "/products/bee-wax",
      },

      {
        label: "Bee Pollen",
        path: "/products/bee-pollen",
      },

      {
        label: "Royal Jelly",
        path: "/products/royal-jelly",
      },

      {
        label: "Propolis",
        path: "/products/propolis",
      },
    ],
  },

  {
    category_name: "Health & Wellness",
    category_slug: "/category/health-wellness",

    children: [
      {
        label: "Immunity Boosters",
        path: "/products/immunity",
      },

      {
        label: "Ayurvedic Honey",
        path: "/products/ayurvedic-honey",
      },

      {
        label: "Diabetic Honey",
        path: "/products/diabetic-honey",
      },

      {
        label: "Kids Honey",
        path: "/products/kids-honey",
      },
    ],
  },

  {
    category_name: "Gift Hampers",
    category_slug: "/category/gifts",

    children: [
      {
        label: "Festival Gifts",
        path: "/products/festival-gifts",
      },

      {
        label: "Wedding Hampers",
        path: "/products/wedding-hampers",
      },

      {
        label: "Corporate Gifts",
        path: "/products/corporate-gifts",
      },

      {
        label: "Premium Boxes",
        path: "/products/premium-boxes",
      },
    ],
  },
];
