// src/config/menuConfig.ts

export interface MegaMenuItem {
  label: string;
  path: string;
}

export interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
}

export interface MainMenu {
  label: string;
  path?: string;
  megaMenu?: boolean;
  sections?: MegaMenuSection[];
}

export const megaMenuConfig: MainMenu[] = [
  {
    label: "Home",
    path: "/",
  },

  {
    label: "About Us",
    path: "/about-us",
  },
  {
    label: "All Products",
    path: "/shops",
  },
  {
    label: "Products",
    megaMenu: true,

    sections: [
      {
        title: "Honey Products",

        items: [
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
            path: "/products/wild-honey",
          },

          {
            label: "Comb Honey",
            path: "/products/comb-honey",
          },
        ],
      },

      {
        title: "Bee Products",

        items: [
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
        title: "Health & Wellness",

        items: [
          {
            label: "Immunity Boosters",
            path: "/products/immunity",
          },

          {
            label: "Ayurvedic Honey",
            path: "/products/ayurvedic",
          },

          {
            label: "Kids Honey",
            path: "/products/kids-honey",
          },

          {
            label: "Diabetic Honey",
            path: "/products/diabetic-honey",
          },
        ],
      },

      {
        title: "Gift Collections",

        items: [
          {
            label: "Festival Gift Packs",
            path: "/products/festival-gifts",
          },

          {
            label: "Premium Boxes",
            path: "/products/premium-boxes",
          },

          {
            label: "Corporate Gifts",
            path: "/products/corporate-gifts",
          },

          {
            label: "Wedding Hampers",
            path: "/products/wedding-hampers",
          },
        ],
      },
    ],
  },

  {
    label: "Blogs",
    path: "/blogs",
  },

  {
    label: "Contact Us",
    path: "/contact-us",
  },
];
