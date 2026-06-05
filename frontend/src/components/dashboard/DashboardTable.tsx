import { Search } from "lucide-react";

import { useNavigate } from "react-router-dom";

interface Shipment {
  id: string;
  receiver: string;
  destination: string;
  status: string;
  date: string;
}

interface DashboardTableProps {
  filteredShipments: Shipment[];
}

function DashboardTable({ filteredShipments }: DashboardTableProps) {
  const navigate = useNavigate();

  return (
    <>
      <div>
        {/* Table Content */}

        <div className="overflow-x-auto w-full mt-5">
          <table className="w-full dash-table min-w-max">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-3 text-base text-muted-foreground">
                  Tracking ID
                </th>
                <th className="pb-3 text-base text-muted-foreground">
                  Receiver
                </th>
                <th className="pb-3 text-base text-muted-foreground">
                  Destination
                </th>
                <th className="pb-3 text-base text-muted-foreground">Status</th>
                <th className="pb-3 text-base text-muted-foreground">Date</th>
                <th className="pb-3 text-base text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.length > 0 ? (
                filteredShipments.map((shipment, index) => (
                  <tr
                    key={shipment.id}
                    className={`border-b border-border last:border-0 ${index % 2 === 0 ? "bg-white" : ""}`}
                  >
                    <td className="py-4">
                      <span className="font-mono text-base">{shipment.id}</span>
                    </td>
                    <td className="py-4 text-base">{shipment.receiver}</td>
                    <td className="py-4 text-base text-muted-foreground">
                      {shipment.destination}
                    </td>
                    <td className="py-4">{shipment.status}</td>
                    <td className="py-4 text-base text-muted-foreground">
                      {shipment.date}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => navigate(`/shipment/${shipment.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-muted-foreground"
                  >
                    <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No shipments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DashboardTable;
