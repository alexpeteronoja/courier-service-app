import { Box, Calendar, CheckCircle, Truck } from "lucide-react";
import { AboutPic } from "../../assets";
import HeroSection from "../../components/Home/HeroSection";
import LandingNavbar from "../../components/navbar/LandingNavbar";
import Footer from "../../components/Footer";
import Stats from "../../components/Stats";
import Testimonials from "../../components/testimonial";

function Home() {
  return (
    <>
      <LandingNavbar />

      <HeroSection />

      {/* About Section */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 py-10 px-5 md:px-15 md:py-15 bg-[#20186D] text-white">
        <div>
          <img
            src={AboutPic}
            alt=""
            className="rounded-2xl w-full h-50 md:h-100 object-cover"
          />
        </div>

        <div className="self-center">
          <div></div>
          <div className="flex justify-between">
            <div className="font-bold font-nunito text-4xl">
              <h2>About Us</h2>
            </div>

            <div>
              <button className="bg-[#EFD063] text-black px-6 py-2 rounded-full font-medium transition">
                About
              </button>
            </div>
          </div>

          <div className="space-y-3 mt-5 md:mt-10">
            <p>
              We are a fast, reliable, and customer focused courier company
              committed to delivering your packages safely, securely, and on
              time. With a strong logistics network and a dedication to
              excellence, we ensure that every shipment is handled with care
              from pickup to final delivery.
            </p>

            <p>
              Our services are built around speed, transparency, and
              convenience, giving you access to real-time tracking so you can
              monitor your parcel at every stage of its journey. Whether it’s
              local deliveries or nationwide shipping, we provide seamless
              logistics solutions tailored to your needs.
            </p>

            <p>
              We believe in making shipping simple, stress-free, and dependable
              for individuals and businesses alike. Your delivery is not just a
              package to us it’s a promise we are committed to keeping.
            </p>
          </div>
        </div>
      </div>

      {/* Steps How it works */}

      <div className="py-10 px-5 md:px-15 md:py-15 text-[#1E1E1E] bg-[#F5F7FA]">
        <div className="flex justify-center">
          <button className="bg-[#EFD063] flex justify-center px-6 py-2 rounded-full font-semibold text-black">
            STEPS
          </button>
        </div>

        <div className="flex justify-center">
          <div className="max-w-2xl text-center space-y-5 mt-7">
            <h2 className="text-3xl  font-extrabold">How it Works</h2>

            <p className="font-semibold">
              From booking to delivery, it only takes three simple and efficient
              steps making your shipping experience fast, smooth and hassle free
            </p>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-7 rounded-[40px] text-center bg-white shadow-[0_1px_10px_0_rgba(0,0,0,0.10)]">
            <Calendar className="w-30 h-10 text-blue-700 mx-auto" />

            <p className="text-[#2D2D2D] my-1 font-medium text-xl">
              Book Your Delivery
            </p>

            <p className="text-[#9D9D9D] text-base">
              Schedule a pickup online or via our app in just a few clicks.
            </p>
          </div>

          <div className="p-7 rounded-[40px] text-center bg-white shadow-[0_1px_10px_0_rgba(0,0,0,0.10)]">
            <Box className="w-30 h-10 text-blue-700 mx-auto" />

            <p className="text-[#2D2D2D] my-1 font-medium text-xl">
              We Collect Your Package
            </p>

            <p className="text-[#9D9D9D] text-base">
              Our courier picks up your package from your specified location.
            </p>
          </div>

          <div className="p-7 rounded-[40px] text-center bg-white shadow-[0_1px_10px_0_rgba(0,0,0,0.10)]">
            <Truck className="w-30 h-10 text-blue-700 mx-auto" />

            <p className="text-[#2D2D2D] my-1 font-medium text-xl">
              Track your item
            </p>

            <p className="text-[#9D9D9D] text-base">
              Monitor your package's journey.
            </p>
          </div>

          <div className="p-7 rounded-[40px] text-center bg-white shadow-[0_1px_10px_0_rgba(0,0,0,0.10)]">
            <CheckCircle className="w-30 h-10 text-blue-700 mx-auto" />

            <p className="text-[#2D2D2D] my-1 font-medium text-xl">
              Delivered Safely
            </p>

            <p className="text-[#9D9D9D] text-base">
              Your package arrives on time with proof of delivery.
            </p>
          </div>
        </div>
      </div>

      <Stats />

      <Testimonials />

      <Footer />
    </>
  );
}

export default Home;
