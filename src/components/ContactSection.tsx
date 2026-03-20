import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const CONTACT = {
  phone: '+91 998688919',
  address: 'Farfalle Coffee Gonikoppal, Coorg 571213',
};

const EMAILS = [
  { label: 'General', email: 'info@farfallecoffee.com' },
  { label: 'Customer Care', email: 'customercare@farfallecoffee.com' },
  { label: 'Accounts', email: 'accounts@farfallecoffee.com' },
  { label: 'Sales', email: 'sales@farfallecoffee.com' },
  { label: 'HR', email: 'hr@farfallecoffee.com' },
];

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="relative w-full min-w-0 bg-[#1a1512] py-[0.585rem] sm:py-[0.78rem] md:py-[0.975rem] overflow-hidden">
      <div className="w-full min-w-0 px-3 sm:px-4 md:px-5">
        <div className="bg-[#fbf5ee] rounded-xl md:rounded-2xl border border-[#2A1A12]/10 py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
            <h2 className="text-[#362D24] text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight pb-2 border-b-2 border-[#362D24] mb-6 sm:mb-8">
              Contact us
            </h2>
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-center gap-3 sm:gap-4 text-[#362D24]">
                <span className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#2A1A12]/10 text-[#2A1A12]">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                </span>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="text-sm sm:text-base md:text-lg hover:underline">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 sm:gap-4 text-[#362D24]">
                <span className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#2A1A12]/10 text-[#2A1A12] mt-0.5">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-y-2.5 min-w-0 flex-1">
                  {EMAILS.map(({ label, email }) => (
                    <a
                      key={email}
                      href={`mailto:${email}`}
                      className="text-sm sm:text-base md:text-lg hover:underline break-all text-[#362D24] hover:text-[#2A1A12] transition-colors"
                    >
                      <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#8B4513] font-medium block mb-0.5">
                        {label}
                      </span>
                      {email}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3 sm:gap-4 text-[#362D24]">
                <span className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-[#2A1A12]/10 text-[#2A1A12]">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2} />
                </span>
                <span className="text-sm sm:text-base md:text-lg">
                  {CONTACT.address}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
