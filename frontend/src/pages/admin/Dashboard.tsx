import { Dashdata } from "../../data/Dashdata";
import StatCard from "../../components/dashboard/StatCard";
import DashboardTable from "../../components/dashboard/DashboardTable";
import { recentShipments } from "../../data/RecentShipments";
import { useState } from "react";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredShipments = recentShipments.filter(
    (shipment) =>
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <>
      <div className="mt-18 pb-10 ml-0 lg:ml-71 px-4 md:px-8.5 bg-background text-textcol min-h-dvh">
        <div className="pt-5 pb-3">
          <h1 className="text-3xl sm:text-4xl mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of all shipments and logistics operations
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {Dashdata.map((item) => (
            <div key={item.header}>
              <StatCard {...item} />
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-md">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-lg font-semibold font-nunito">
              Recent Shipments
            </h3>

            <div className="w-72">
              <input
                type="text"
                placeholder="Search shipments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9  border  focus:border-primary w-full px-4 outline rounded-2xl "
              />
            </div>
          </div>

          {/* Dashboard Table */}
          <DashboardTable filteredShipments={filteredShipments} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
