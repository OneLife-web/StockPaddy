import SalesChart from "@/components/charts/SalesChart";
import ShortCut from "@/components/Navigation/ShortCut";
import SaleHighlight from "@/components/charts/SaleHighlight";
import BestProductChart from "@/components/charts/BestProductChart";
import BestProductTable from "@/components/Tables/BestProductTable";
import LowStockAlertTable from "@/components/Tables/LowStockAlertTable";
import { MoveRight } from "lucide-react";
import RecentSalesTable from "@/components/Tables/RecentSalesTable";
import RecentActivities from "@/components/RecentActivities";
import ProductModals from "@/components/Modals/ProductModals";
import SalesModals from "@/components/Modals/SalesModal";

const DashboardPage = () => {
  return (
    <main className="pageContainer">
      <section className="sectionContainer">
        <SaleHighlight />
      </section>
      <section className="sectionContainer !pt-0">
        <div className="myCard">
          <h1 className="heading2 p-4">Sales Dashboard</h1>
          <SalesChart />
        </div>
      </section>
      <section className="sectionContainer !pt-0">
        <div className="myCard pb-7">
          <h1 className="heading2 p-4">Top Selling Products</h1>
          <BestProductChart />
          <BestProductTable />
        </div>
      </section>
      <section className="sectionContainer !pt-0">
        <div className="myCard pb-7">
          <div className="flex items-center justify-between p-4">
            <h1 className="heading2">Low Stock Alert</h1>
            <button className="heading3 !text-text-2 border-b flex items-center gap-1">
              View All
              <MoveRight strokeWidth={1.3} />
            </button>
          </div>
          <LowStockAlertTable />
        </div>
      </section>
      <section className="sectionContainer !pt-0">
        <div className="myCard pb-7">
          <div className="flex items-center justify-between p-4">
            <h1 className="heading2">Recent Sales</h1>
            <button className="heading3 !text-text-2 border-b flex items-center gap-1">
              View All
              <MoveRight strokeWidth={1.3} />
            </button>
          </div>
          <RecentSalesTable />
        </div>
      </section>
      <section className="sectionContainer !pt-0">
        <div className="myCard pb-7">
          <div className="flex items-center justify-between p-4">
            <h1 className="heading2">Recent Activities</h1>
            <button className="heading3 !text-text-2 border-b flex items-center gap-1">
              View All
              <MoveRight strokeWidth={1.3} />
            </button>
          </div>
          <RecentActivities />
        </div>
      </section>
      <section>
        <ShortCut />
      </section>
      <section>
        <ProductModals />
        <SalesModals />
      </section>
    </main>
  );
};

export default DashboardPage;
