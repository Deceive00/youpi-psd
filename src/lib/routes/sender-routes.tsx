export interface SenderRoute {
  name: string;
  description: string;
  path: string;
}

export const SenderRoutes: SenderRoute[] = [
  {
    name: "History",
    description: "This is a page for viewing sender order history",
    path: "/sender/history",
  },
  {
    name: "Manage Order",
    description: "This is a page for managing sender order",
    path: "/sender/manage/order",
  },
];
