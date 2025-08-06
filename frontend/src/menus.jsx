import handleNavigation from "./menusredirect";

export default {
  items: [
    {
      id: "navigation",
      title: "Navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "Indepth-view",
          title: "Indepth View",
          type: "item",
          url: "/indepthpage",
          classes: "nav-item",
          icon: "feather icon-eye", // Updated icon
        },
        {
          id: "Add-Asset",
          title: "Add Asset",
          type: "item",
          url: "/addAsset",
          classes: "nav-item",
          icon: "feather icon-plus-circle", // Updated icon
        },
        {
          id: "Storeroom",
          title: "Store Room",
          type: "item",
          url: "/storeroom",
          classes: "nav-item",
          icon: "feather icon-server", // Updated icon
        },
        {
          id: "dashboard",
          title: "Dashboard",
          type: "collapse",
          icon: "feather icon-home",
          children: [
            {
              id: "default",
              title: "ItemWise",
              type: "item",
              url: "/indepthpage/itemwise",
              icon: "feather icon-layers",
            },
            {
              id: "sales",
              title: "PlaceWise",
              type: "item",
              url: "/indepthpage/placewise",
              icon: "feather icon-map",
            },
          ],
        },
        // {
        //   id: "default",
        //   title: "ItemWise View",
        //   type: "item",
        //   url: "/indepthpage/itemwise",
        //   classes: "nav-item",
        //   icon: "feather icon-layers", // Updated icon
        // },
        // {
        //   id: "Indepth-veiw",
        //   title: "PlaceWise View",
        //   type: "item",
        //   url: "/indepthpage/placewise",
        //   classes: "nav-item",
        //   icon: "feather icon-map", // Updated icon
        // },
      ],
    },
  ],
};
