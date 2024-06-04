export interface Menu{
  uid: string;
  name: string;
  description: string;
  image: string;
  price: Number;
  notes: string;
}

export interface MenuCategory {
  name: string;
  menus: Menu[];
}

export interface Vendor {
  email: string;
  name: string;
  coverImage: string;
  rating: Number;
  review: Number;
  id: string;
  campusName: string;
  categories: MenuCategory[];
}

export interface Campus {
  name: string;
  vendors: Vendor[];
}

export interface VendorRegis {
  campusName: string;
  email: string;
  name: string;
  coverImage: string;
  password: string;
  confirmationPassword: string;
} 