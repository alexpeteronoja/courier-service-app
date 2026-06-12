import { Package, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer id="contact" className="bg-[#160f55] text-gray-300 py-12">
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
                <Link
                  to="/track-parcel"
                  className="hover:text-blue-400 transition-colors"
                >
                  Track a Parcel
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
              {/* <li>
                <a href="#" className="hover:text-blue-400 transition-colors">
                  Pricing
                </a>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>Same-Day Delivery</li>
              <li>International Shipping</li>
              <li>Express Delivery</li>
              <li>Freight Services</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">
                  <a
                    href="tel:+447448338490"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    +447448338490
                  </a>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">
                  <a
                    href="mailto:support@FastLink.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    support@FastLink.com
                  </a>
                </span>
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
