import { Package, Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-semibold text-white">FastLink</span>
            </div>
            <p className="text-sm">
              Fast, reliable delivery services you can trust. We're committed to
              getting your packages where they need to be, on time.
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="hover:text-blue-400 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-blue-400 transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-blue-400 transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Same-Day Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  International Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Express Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Freight Services
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">1-800-COURIER</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@FastLink.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1" />
                <span className="text-sm">
                  123 Delivery St.
                  <br />
                  New York, NY 10001
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} FastLink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
