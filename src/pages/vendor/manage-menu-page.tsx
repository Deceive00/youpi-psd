
import { useEffect, useState } from "react";
import AdminLayout from "src/layout/vendor-layout";
import { Vendor } from "@lib/types/vendor-types";
import { useAuth } from "@lib/hooks/useAuth";
import CategoryCard from "./category-card";
import { Accordion } from "@components/ui/accordion";
import AddCategoryPopup from "./add-category-popup";
import { Toaster } from "@components/ui/toaster";


export default function ManageMenuPage() {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const { user } = useAuth();
  useEffect(() => {
    if (user && (user as Vendor)?.categories !== undefined) {
      setVendor(user as Vendor);
    }
  }, [user]);

  return (
    <AdminLayout
      menuDescription={`Manage ${vendor?.name} Menus`}
      menuName="Manage Menu"
    >
      <div className="font-nunito ">
        <AddCategoryPopup vendor={vendor} />
        <Accordion type="single" collapsible className="mt-4">
          {vendor?.categories.map((category, index) => {
            return <CategoryCard category={category} key={index} />;
          })}
        </Accordion>
      </div>
      <Toaster/>
    </AdminLayout>
  );
}
