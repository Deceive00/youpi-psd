import { Button } from "@components/ui/button";
import { useEffect, useState } from "react";
import AdminLayout from "src/layout/vendor-layout";
import { Vendor } from "@lib/types/vendor-types";
import { useAuth } from "@lib/hooks/useAuth";
import CategoryCard from "./category-card";

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
      <div className="font-nunito">
        <Button variant={"outline"}>+ Add Category</Button>
        <div className="grid mt-10 gap-4">
          {vendor?.categories.map((category, index) => {
            return <CategoryCard category={category} key={index}/> 
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
