import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LandingNavbar from "../../components/navbar/LandingNavbar";
import { Check, Loader2, MapPin, Package, Search, Truck } from "lucide-react";
import Footer from "../../components/Footer";
import type {
  ParcelEventProps,
  ParcelStatusType,
} from "../../components/landingTrackParcel/TrackParcelTypes";
import { usePublicTracking } from "../../datahooks/shipment/shipmentHook";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { notifyError } from "../../utils/toast";
import { formatDate, formatDateTime } from "../../utils/dateformat";
import axios from "axios";

/** status styles */
function statusStyle(status: ParcelStatusType): string {
  if (status === "Delivered")
    return "text-[#16a34a] bg-green-50 border-green-200";

  if (status === "In Transit")
    return "text-accent bg-orange-50 border-orange-200";

  return "text-[#20186d] bg-indigo-50 border-indigo-200";
}

export default function TrackParcel() {
  const navigate = useNavigate();
  const { trackingId = "" } = useParams();
  const [query, setQuery] = useState<string>("");

  //   const trackingId = "TRK-20260606-B2AFD885";
  const { publicTracking, publicTrackingLoading, publicTrackingErrorMessage } =
    usePublicTracking(trackingId);

  // Handle Tracking Function

  const handleTrack = (): void => {
    if (!query.trim()) return;

    const trackingId = query.trim().toLocaleUpperCase();

    if (!trackingId.startsWith("TRK-202")) {
      notifyError("Invalid Tracking Code");
      return;
    }

    navigate(`/track-parcel/${trackingId}`);
  };

  // Update Search Form on Tracking ID Change

  useEffect(() => {
    if (trackingId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery(trackingId);
    }
  }, [trackingId]);

  // Get Error Message Once

  useEffect(() => {
    if (publicTrackingErrorMessage) {
      getErrorMessage(publicTrackingErrorMessage);
    }
  }, [publicTrackingErrorMessage]);

  return (
    <>
      <LandingNavbar />

      <div className="min-h-screen bg-background font-['DM_Sans',sans-serif]">
        {/* HEADER */}
        <section className="relative px-[5%] pt-20 pb-16 overflow-hidden bg-[linear-gradient(135deg,#160f55,#20186d)]">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <svg className="w-full h-full">
              <defs>
                <pattern
                  id="dots"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <span className="inline-block text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full mb-5 bg-accent/20 text-accent font-['Syne',sans-serif]">
              Real-Time Tracking
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 font-['Syne',sans-serif] tracking-tight">
              Where&apos;s Your <span className="text-accent">Package?</span>
            </h1>

            <p className="text-white/60 mb-9 text-[15px]">
              Enter your FastLink tracking ID to get live updates.
            </p>

            <div className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
              <input
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === "Enter" && handleTrack()
                }
                placeholder="e.g. TRK-20260"
                className="flex-1 px-5 py-4 rounded-lg text-white text-[15px] tracking-wider outline-none bg-white/10 border border-white/20"
              />

              <button
                onClick={handleTrack}
                disabled={publicTrackingLoading || !query.trim()}
                className="px-7 py-4 rounded-lg font-bold text-white bg-accent disabled:opacity-50  cursor-pointer"
              >
                {publicTrackingLoading ? (
                  <Loader2 className="animate-spin duration-300" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Search className="text-white w-4.5 h-4.5" />
                    <p>Track</p>
                  </div>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* BODY */}
        <section className="px-[5%] py-16 max-w-4xl mx-auto">
          {publicTrackingLoading ? (
            <div className="text-center py-20">
              <div className="w-11 h-11 mx-auto mb-5 rounded-full border-4 border-[#e2e6ef] border-t-accent animate-spin" />
              <p className="text-gray-500">Searching for your shipment…</p>
            </div>
          ) : axios.isAxiosError(publicTrackingErrorMessage) &&
            publicTrackingErrorMessage?.response?.status === 400 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-5">📦</div>
              <h3 className="text-xl font-bold text-primary mb-2 font-['Syne',sans-serif]">
                No shipment found
              </h3>
              <p className="text-gray-500">
                We couldn't find that tracking ID.
              </p>
            </div>
          ) : publicTracking ? (
            <div className="flex flex-col gap-5 animate-[fadeUp_0.5s_ease] font-nunito">
              {/* STATUS CARD */}
              <div className="bg-white rounded-xl p-7 flex flex-col md:flex-row justify-between items-center gap-y-5 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <div className="w-13 h-13 rounded-xl flex  items-center justify-center bg-accent/10">
                    <Package className="w-6.5 h-6.5 text-accent" />
                  </div>

                  <div>
                    <p className="text-xl font-extrabold text-primary font-nunito">
                      {publicTracking?.trackingCode}
                    </p>
                    <p className="text-sm text-gray-500 text-center md:text-start mt-1 md:mt-0">
                      {publicTracking?.category} ·{" "}
                      {`${publicTracking?.weight}kg`}
                    </p>
                  </div>
                </div>

                <span
                  className={`px-5 py-2 rounded-full border text-sm font-bold font-['Syne',sans-serif] ${statusStyle(
                    publicTracking?.status,
                  )}`}
                >
                  {publicTracking?.status}
                </span>
              </div>

              {/* PROGRESS */}
              <div className="bg-white rounded-xl p-7 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between text-xs text-gray-500 mb-2">
                  <span>{publicTracking?.senderAddress}</span>
                  <span>{publicTracking?.recipientAddress}</span>
                </div>

                {/* <div className="h-2.5 bg-[#e2e6ef] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[linear-gradient(90deg,#20186d,#ef770e)] transition-all duration-1000"
                    style={{ width: `${tracked.progress}%` }}
                  />
                </div> */}

                <div className="flex justify-between gap-4 mt-2 text-sm">
                  <span>
                    ETA:{" "}
                    <strong>
                      {formatDate(publicTracking?.estimatedDelivery)}
                    </strong>
                  </span>
                  {/* <span className="text-accent font-bold">
                    {tracked.progress}% Complete
                  </span> */}
                </div>
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Sender", value: publicTracking?.senderName },
                  { label: "Recipient", value: publicTracking?.recipientName },
                  { label: "Origin", value: publicTracking?.senderAddress },
                  {
                    label: "Destination",
                    value: publicTracking?.recipientAddress,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white rounded-xl px-6 py-5 shadow-sm"
                  >
                    <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">
                      {item.label}
                    </p>

                    <p className="text-[15px] font-bold text-textcol">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* TIMELINE */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-lg font-bold mb-7 text-primary font-['Syne',sans-serif]">
                  Shipment Timeline
                </h3>

                <div className="flex flex-col">
                  {publicTracking.events.map(
                    (item: ParcelEventProps, i: number) => (
                      <div
                        key={i}
                        className="relative flex gap-5 pb-7 last:pb-0"
                      >
                        {/* Vertical line */}
                        {i < publicTracking.events.length - 1 && (
                          <div
                            className={`absolute left-5 top-10 bottom-0 w-0.5 ${
                              item.done ? "bg-accent/40" : "bg-gray-200"
                            }`}
                          />
                        )}

                        {/* Dot */}
                        <div
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                            i === 0 || item.status === "delivered"
                              ? "bg-accent"
                              : "bg-accent/20 border-2 border-accent/60"
                          }`}
                        >
                          <Check
                            className={`w-3.5 h-3.5 ${i === 0 || item.status === "delivered" ? "text-white" : "text-accent"}`}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                          <div className="flex flex-col md:flex-row justify-between gap-2 flex-wrap mb-1">
                            <p
                              className={`font-bold text-[15px] font-['Syne',sans-serif] 
                              text-textcol
                            `}
                            >
                              {item.status}
                            </p>

                            <p className="text-xs text-gray-400">
                              {formatDateTime(item.timestamp)}
                            </p>
                          </div>

                          <p className="text-[13px] text-gray-500">
                            {item.description}
                          </p>

                          <p className="text-sm text-gray-500 mt-1 flex gap-x-1">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center bg-primary/10">
                <Truck className="w-11 h-11 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary font-['Syne',sans-serif] mb-2">
                Enter a Tracking ID Above
              </h3>
              <p className="text-gray-500">
                Your shipment details will appear here.
              </p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}
