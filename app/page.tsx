import Header from "@/components/Navigation/Header";
import dynamic from "next/dynamic";
import Link from "next/link";

const DatePickerWithRange = dynamic(() => import("@/components/DatePicker"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const PolarAreaChart = dynamic(() => import("@/components/PolarAreaChart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
const SalesLineChart = dynamic(() => import("@/components/SalesLineChart"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const HomePage = () => {
  const weeklyData = [
    { label: "Mon", value: 1000 },
    { label: "Tue", value: 1500 },
    { label: "Wed", value: 1200 },
    { label: "Thu", value: 1800 },
    { label: "Fri", value: 2000 },
    { label: "Sat", value: 2200 },
    { label: "Sun", value: 1900 },
  ];

  return (
    <div>
      <Header />
      <Link href="/dashboard">
      Dashboard
      </Link>
      <DatePickerWithRange />
      <PolarAreaChart />
      <SalesLineChart data={weeklyData} timeFrame="week" />
    </div>
  );
};

export default HomePage;
