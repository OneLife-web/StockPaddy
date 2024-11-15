import SalesChart from "@/components/charts/SalesChart";
import ShortCut from "@/components/Navigation/ShortCut";
import SaleHighlight from "@/components/charts/SaleHighlight";
import BestProductChart from "@/components/charts/BestProductChart";
import BestProductTable from "@/components/BestProductTable";

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
        <div className="myCard">
          <h1 className="heading2 p-4">Top Selling Products</h1>
          <BestProductChart />
          <BestProductTable />
        </div>
      </section>
      <section>
        <ShortCut />
      </section>
    </main>
  );
};

export default DashboardPage;
