import { CirclePlus, Eye, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { shortenText } from "../../utils/shortenText";
import { useTrackingStores } from "../../zustandStores/openModalStore";
import type { TrackingTableProps } from "./TrackingTypes";

function TrackingTable({ filteredShipments }: TrackingTableProps) {
  const navigate = useNavigate();
  const { openAddTracking, setTrackingDataStore } = useTrackingStores();

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
              {filteredShipments?.length > 0 ? (
                filteredShipments?.map((shipment, index) => (
                  <tr
                    key={shipment._id}
                    className={`border-b border-border last:border-0 ${index % 2 === 0 ? "bg-white" : ""}`}
                  >
                    <td className="py-4">
                      <span className="font-mono text-base">
                        {shipment.trackingCode}
                      </span>
                    </td>
                    <td className="py-4 text-base">
                      {shortenText(shipment.recipientName, 16)}
                    </td>
                    <td className="py-4 text-base text-muted-foreground">
                      Abuja
                    </td>
                    <td className="py-4">{shipment.status}</td>
                    <td className="py-4 text-base text-muted-foreground">
                      10/60/2020
                    </td>
                    <td className="py-4">
                      <div

                      // onClick={() => navigate(`/shipment/${shipment.id}`)}
                      >
                        <button
                          className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-[#f4faf0] transition-colors cursor-pointer hover:scale-110 duration-300"
                          onClick={() => {
                            openAddTracking();
                            setTrackingDataStore(shipment);
                          }}
                          title="Add Tracking Event"
                        >
                          <CirclePlus />
                        </button>

                        <button
                          className="p-1.5 rounded-lg text-gray-400 hover:text-primary hover:bg-[#f4faf0] transition-colors cursor-pointer hover:scale-110 duration-300"
                          onClick={() =>
                            navigate(`/shipment-details/${shipment._id}`)
                          }
                          title="View Product"
                        >
                          <Eye />
                        </button>
                      </div>
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

export default TrackingTable;
