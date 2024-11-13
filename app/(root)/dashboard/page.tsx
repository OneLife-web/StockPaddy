import SalesChart from "@/components/charts/SalesChart";
import ShortCut from "@/components/Navigation/ShortCut";
import SaleHighlight from "@/components/SaleHighlight";

const DashboardPage = () => {
  return (
    <main className="pageContainer">
      <section className="sectionContainer">
        <SaleHighlight />
      </section>
      <section className="sectionContainer !pt-0">
        <div className="myCard p-4">
          <h1 className="heading2">Sales Dashboard</h1>
          <SalesChart />
        </div>
      </section>
      <section>
        <ShortCut />
      </section>
    </main>
  );
};

export default DashboardPage;
