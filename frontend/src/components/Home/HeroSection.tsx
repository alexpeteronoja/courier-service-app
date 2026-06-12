import { useNavigate } from "react-router-dom";
import { HeroImage } from "../../assets";
import { useState } from "react";
import { notifyError } from "../../utils/toast";

function HeroSection() {
  const navigate = useNavigate();
  const [trackingId, setTrackingId] = useState<string>("");

  const handleTracking = () => {
    if (!trackingId.trim()) return;

    const input = trackingId.trim().toLocaleUpperCase();

    if (!input.startsWith("TRK-202")) {
      notifyError("Invalid Tracking Code");
      return;
    }

    navigate(`/track-parcel/${input}`);
  };

  return (
    <section
      className="relative w-full min-h-140 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "rgba(32,24,109,0.88)" }}
      />

      <div className="relative z-10 px-6 py-16 max-w-170 w-full flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="font-poppins text-[11px] font-medium tracking-widest uppercase text-accent">
            Reliable Logistics Partner
          </span>
        </div>

        <h1 className="font-nunito text-5xl md:text-6xl font-extrabold leading-tight text-white">
          Fast Delivery, <span className="text-accent">Smarter</span> Tracking
        </h1>

        <p className="font-poppins mt-4 text-[15px] text-white/70 leading-relaxed max-w-125">
          We deliver your packages safely and on time, anywhere across the
          country. Track every shipment in real-time with complete transparency
          and confidence.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => navigate("/contact")}
            className="font-poppins cursor-pointer bg-accent hover:bg-[#d46509] text-white px-7 py-3 rounded-lg font-medium transition"
          >
            Contact Us
          </button>
          <button
            onClick={() => navigate("/track-parcel")}
            className="font-poppins cursor-pointer border border-white/40 hover:border-white hover:bg-white/10 text-white px-7 py-3 rounded-lg font-medium transition"
          >
            Track a Parcel
          </button>
        </div>

        <div className="mt-8 flex w-full max-w-120 rounded-xl overflow-hidden border border-white/15">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="flex-1 bg-white/10 text-white placeholder-white/40 font-poppins text-sm px-5 py-3.5 outline-none min-w-0"
            placeholder="Enter Tracking Code"
          />
          <button
            onClick={handleTracking}
            className="font-poppins bg-accent hover:bg-[#d46509] cursor-pointer text-white text-sm font-medium px-7 py-3.5 transition whitespace-nowrap"
          >
            Track
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
