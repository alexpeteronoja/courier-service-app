import { HeroImage } from "../../assets";

function HeroSection() {
  return (
    <section
      className="relative pt-10 pb-10 w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${HeroImage})`,
        backgroundSize: "cover",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 py-10 max-w-5xl">
        <h1 className="font-nunito text-4xl md:text-6xl font-bold leading-tight">
          Fast Delivery, Smarter Tracking
        </h1>

        <p className="font-poppins mt-4 text-lg md:text-xl text-gray-200">
          We deliver your packages safely and on time, anywhere across the
          country. Track every shipment in real-time with complete transparency
          and confidence.
        </p>

        <div className="mt-8 flex gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition">
            Contact Us
          </button>

          <button className="border border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition">
            Track a Parcel
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-y-3 gap-x-2 mt-10">
          <div>
            <input
              type="text"
              className="bg-white py-3 px-4 text-black outline-0 rounded-xl md:w-88"
              placeholder="Enter Tracking Code"
            />
          </div>
          <div>
            <button className="bg-blue-600 hover:bg-blue-700  font-semibold px-9 py-3 rounded-lg transition cursor-pointer">
              Track
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
