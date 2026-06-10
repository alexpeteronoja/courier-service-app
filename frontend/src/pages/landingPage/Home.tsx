import { AboutPic } from "../../assets";
import HeroSection from "../../components/Home/HeroSection";
import LandingNavbar from "../../components/navbar/LandingNavbar";
import Footer from "../../components/Footer";
import Stats from "../../components/Stats";
import Testimonials from "../../components/testimonial";
import Services from "../../components/Home/Services";
import { StepsData } from "../../data/StepsData";

function Home() {
  return (
    <>
      <LandingNavbar />

      <HeroSection />

      <Services />

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

      {/* How It Works */}
      <section className="py-24 px-[5%] bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-20">
            <div className="flex justify-center mb-3.5">
              <div className="bg-[#ef770e1f] text-accent font-bold font-nunito py-1 px-5 rounded-2xl">
                The Process
              </div>
            </div>

            <h2 className="font-syne text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mt-5">
              Ship in <span className="text-accent">4 Simple Steps</span>
            </h2>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            {StepsData.map((step, i) => (
              <div key={i} className="relative text-center">
                {/* Line */}
                {i !== StepsData.length - 1 && (
                  <div className=" hidden lg:block absolute top-8  left-[60%] w-full h-0.5  bg-linear-to-r from-accent to-primary" />
                )}

                {/* Circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center
              mx-auto mb-6
              shadow-xl
              relative z-10
              ${
                i % 2 === 0
                  ? "bg-primary shadow-primary/40"
                  : "bg-accent shadow-accent/40"
              }
            `}
                >
                  <span className="font-syne text-white font-extrabold text-lg">
                    {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="
              font-syne
              text-xl
              font-bold
              text-primary
              mb-3
            "
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted text-sm leading-7 text-[#6b7280]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Stats />

      <Testimonials />

      <Footer />
    </>
  );
}

export default Home;
