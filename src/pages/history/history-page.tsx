import MainLayout from "src/layout/main-layout";
import OrderCard from "./finished-order-card";

const HistoryPage = () => {
  // Fetch from firebase 'orders'

  // Use Effect 

  // Set Image berdasarkan Jenis Category Transaksinya, ambil dari static image krn cuman 2 gambar aja
    // Pick Up = 
    // Delivery = 

  // Reorder Handler

  // View Detail Handler

  // Calculate Total Price for each Transaction

  return (
    <MainLayout className={`py-16 overflow-x-hidden`}>
      <div className={`w-screen h-max font-nunito box-border mx-auto flex justify-center`}>
        <div className={`grid lg:grid-cols-3 lg:gap-12`}>
        <OrderCard
            imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            title="Shoes"
            campusName="Binus Alam Sutera"
          />

          {/* 2 */}
          <OrderCard
            imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            title="Ramen"
            campusName="Binus Alam Sutera"
          />

          {/* 3 */}
          <OrderCard
            imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            title="Shoes"
            campusName="Binus Alam Sutera"
          />

          <OrderCard
            imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            title="Shoes"
            campusName="Binus Alam Sutera"
          />

          {/* 2 */}
          <OrderCard
            imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            title="Shoes"
            campusName="Binus Alam Sutera"
          />

          {/* 3 */}
          <OrderCard
            imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            title="Shoes"
            campusName="Binus Alam Sutera"
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default HistoryPage;
