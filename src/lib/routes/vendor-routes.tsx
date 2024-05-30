
export interface VendorRoute{
  name:string,
  description:string,
  path: string,
}

export const VendorRoutes : VendorRoute[] = [
  {
    name: 'Manage Menu',
    description: 'This is a page for inserting, viewing, and deleting vendor menu',
    path: '/vendor/manage/menu'
  },
  {
    name: 'Manage Order',
    description: 'This is a page for maning vendor order',
    path: '/vendor/manage/order'
  },

]