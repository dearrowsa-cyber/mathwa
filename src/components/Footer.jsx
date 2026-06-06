import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaSnapchatGhost } from 'react-icons/fa'
import Logo from "../assets/images/MATHWA LOGO [Recovered].png";

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const translations = {
    en: {
      about_us: 'About Us',
      description: 'Mathwa is a leading charity organization dedicated to serving communities and making a positive impact through various programs and initiatives.',
      quick_links: 'Quick Links',
      contact_info: 'Contact Info',
      follow_us: 'Follow Us',
      phone: '+966 53 962 6662',
      email: 'info@mathwaa.org',
      address: 'Al Ahsa, Saudi Arabia',
      rights: 'All rights reserved.',
      developed: 'Developed with',
    },
    ar: {
      about_us: 'عنا',
      description: 'جمعية مثوى هي جمعية خيرية رائدة مكرسة لخدمة المجتمعات والتأثير الإيجابي من خلال برامج مختلفة.',
      quick_links: 'روابط سريعة',
      contact_info: 'معلومات الاتصال',
      follow_us: 'تابعنا',
      phone: '+966 53 962 6662',
      email: 'info@mathwaa.org',
      address:' الأحساء, المملكة العربية السعودية',
      rights: 'جميع الحقوق محفوظة.',
      developed: 'تم التطوير بـ',
    }
  }

  const [language] = React.useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]

  return (
    <footer className="bg-dark text-white pt-16 pb-8 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
             <Link to="/" className="flex items-center gap-2 flex-shrink-0 bg-white rounded px-2 py-1">
                           <img
                             src={Logo}
                             alt="Mathwaa Logo"
                             className="h-16 md:h-20 w-auto object-contain"
                               />
                         </Link>
             
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-secondary">{t.quick_links}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-all">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-all">About</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white transition-all">News</Link></li>
              <li><Link to="/donate" className="text-gray-400 hover:text-white transition-all">Donate</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-all">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-secondary">{t.contact_info}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <span className="p-1 rounded bg-[#0E4B33]"><FaPhoneAlt size={14} className="text-[#C89B3C] flex-shrink-0" /></span>
                <a href="tel:+966539626662" className="text-gray-400 hover:text-white transition-all">{t.phone}</a>
              </div>
              <div className="flex items-start space-x-3">
                <span className="p-1 rounded bg-[#0E4B33]"><FaEnvelope size={14} className="text-[#C89B3C] flex-shrink-0" /></span>
                <a href="mailto:info@mathwaa.org" className="text-gray-400 hover:text-white transition-all">{t.email}</a>
              </div>
              <div className="flex items-start space-x-3">
                <span className="p-1 rounded bg-[#0E4B33]"><FaMapMarkerAlt size={14} className="text-[#C89B3C] flex-shrink-0" /></span>
                <span className="text-gray-400">{t.address}</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#C89B3C]">{t.follow_us}</h3>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-full bg-[#0E4B33] hover:bg-[#C89B3C]/20 transition-all flex items-center justify-center border border-[#C89B3C]/10">
                <FaFacebookF size={18} className="text-[#C89B3C]" />
              </a>
              <a href="https://x.com/mathwaah?s=21" className="w-10 h-10 rounded-full bg-[#0E4B33] hover:bg-[#C89B3C]/20 transition-all flex items-center justify-center border border-[#C89B3C]/10">
                <FaTwitter size={18} className="text-[#C89B3C]" />
              </a>
              <a href="https://www.instagram.com/mathwaah?igsh=MWU2c2t4N3hiMjVleQ==" className="w-10 h-10 rounded-full bg-[#0E4B33] hover:bg-[#C89B3C]/20 transition-all flex items-center justify-center border border-[#C89B3C]/10">
                <FaInstagram size={18} className="text-[#C89B3C]" />
              </a>
              <a href="https://www.snapchat.com/add/mathwaah?share_id=QezIcEMU5aM&locale=en-US" className="w-10 h-10 rounded-full bg-[#0E4B33] hover:bg-[#C89B3C]/20 transition-all flex items-center justify-center border border-[#C89B3C]/10">
                <FaSnapchatGhost size={18} className="text-[#C89B3C]" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {currentYear} MATHWA. {t.rights}</p>
            <p className="mt-2 font-bold md:mt-0"><a href="http://www.d-arrow.com/" target="_blank" rel="noopener noreferrer">{t.developed} ❤️ by D-Arrow Team</a></p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
