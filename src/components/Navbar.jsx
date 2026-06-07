import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaShoppingCart,
  FaSignOutAlt,
  FaCheckCircle
} from "react-icons/fa";
import {
  FaMosque,
  FaHome,
  FaUsers,
  FaUserFriends,
  FaFileSignature,
  FaCertificate,
  FaListAlt,
  FaNewspaper,
  FaImages,
  FaVideo,
  FaDonate,
  FaHandHoldingHeart,
  FaUserPlus,
  FaUserCheck,
  FaHandsHelping,
  FaClipboardList,
  FaHandshake,
  FaFileContract,
  FaBoxOpen,
  FaBookOpen,
  FaBalanceScale,
  FaEnvelope,
  FaPhoneAlt,
  FaInstagram,
  FaTwitter,
  FaSignInAlt,
  FaUserCircle,
  FaSnapchatGhost,
  FaComments,
  FaChartBar
} from "react-icons/fa";
import { useUserAuth } from "../context/UserAuthContext";
import { useCart } from "../context/CartContext";
import Logo from "../assets/images/MATHWA LOGO [Recovered].png";

// Menu structure with icons per item
const ABOUT_ITEMS = [
  { to: "/about#who_we_are", key: "about_who_we_are", icon: FaMosque },
  { to: "/about#vision", key: "about_vision", icon: FaMosque },
  { to: "/about#mission", key: "about_mission", icon: FaMosque },
  { to: "/about#goals", key: "about_goals", icon: FaMosque },
  { to: "/about#values", key: "about_values", icon: FaMosque },
  { to: "/organization-certificate", key: "about_license", icon: FaCertificate },
  { to: "/basic-standards", key: "about_official_data", icon: FaListAlt },
];

const GOVERNANCE_ITEMS = [
  { to: "/board-members", key: "gov_board", icon: FaUserCircle },
  { to: "/organizational-structure", key: "gov_structure", icon: FaUsers },
  { to: "/regulations", key: "gov_basic_reg", icon: FaClipboardList },
  { to: "/policies", key: "gov_policies", icon: FaFileSignature },
  { to: "/regulations", key: "gov_regulations", icon: FaClipboardList },
  { to: "/annual-reports", key: "gov_reports", icon: FaBookOpen },
  { to: "/annual-reports", key: "gov_financials", icon: FaChartBar },
  { to: "/general-assembly", key: "gov_assembly", icon: FaUserFriends },
  { to: "/complaints", key: "gov_complaints", icon: FaEnvelope },
];

const SERVICES_ITEMS = [
  { to: "/beneficiary-services", key: "srv_beneficiary", icon: FaHandsHelping },
  { to: "/programs", key: "srv_programs", icon: FaBoxOpen },
  { to: "/how-to-benefit", key: "srv_how_to", icon: FaListAlt },
  { to: "/faq", key: "srv_faq", icon: FaComments },
];

const MEMBERSHIP_ITEMS = [
  { to: "/membership", key: "mem_types", icon: FaUserFriends },
  { to: "/membership-conditions", key: "mem_conditions", icon: FaListAlt },
  { to: "/membership-apply", key: "mem_apply", icon: FaUserPlus },
  { to: "/membership-rights", key: "mem_rights", icon: FaBalanceScale },
  { to: "/membership-payment", key: "mem_payment", icon: FaDonate },
];

const MEDIA_CENTER_ITEMS = [
  { to: "/news", key: "med_news", icon: FaNewspaper },
  { to: "/announcements", key: "med_announcements", icon: FaClipboardList },
  { to: "/media-reports", key: "med_reports", icon: FaFileContract },
  { to: "/photo-albums", key: "med_photos", icon: FaImages },
  { to: "/video-albums", key: "med_videos", icon: FaVideo },
];

const SATISFACTION_ITEMS = [
  { to: "/satisfaction-beneficiaries", key: "sat_beneficiaries", icon: FaUserCheck },
  { to: "/satisfaction-donors", key: "sat_donors", icon: FaHandHoldingHeart },
  { to: "/satisfaction-volunteers", key: "sat_volunteers", icon: FaHandsHelping },
  { to: "/satisfaction-results", key: "sat_results", icon: FaChartBar },
];

const Navbar = ({ language, onLanguageChange }) => {
  const { user, isAuthenticated, logout } = useUserAuth()
  const { cartItems, getCartTotal } = useCart()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState({ about: false, news: false, contribute: false, beneficiary: false, reports: false });
  const hoverTimeoutRef = React.useRef(null);

  const closeAll = () => {
    setOpenDropdown(null);
    setIsOpen(false);
  };

  const handleDropdownEnter = (id) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenDropdown(id);
  };
  const handleDropdownLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const translations = {
    en: {
      home: "Home",
      about_us: "About Us",
      about_who_we_are: "Who We Are",
      about_vision: "Vision",
      about_mission: "Mission",
      about_goals: "Goals",
      about_values: "Values",
      about_license: "License",
      about_official_data: "Official Data",
      organization_certificate: "License",
      basic_standards: "Official Data",
      governance_disclosure: "Governance & Disclosure",
      gov_board: "Board of Directors",
      gov_structure: "Organizational Structure",
      gov_basic_reg: "Basic Regulation",
      gov_policies: "Policies",
      gov_regulations: "Regulations",
      gov_reports: "Reports",
      gov_financials: "Financials",
      gov_assembly: "General Assembly",
      gov_complaints: "Complaints & Reports",
      board_members: "Board of Directors",
      annual_reports: "Reports",
      financial_statements: "Financial Statements",
      complaints_reports: "Complaints",
      services: "Services",
      srv_beneficiary: "Beneficiary Services",
      srv_programs: "Programs",
      srv_how_to: "How to Benefit",
      srv_faq: "FAQs",
      membership_menu: "Membership",
      mem_types: "Membership Types",
      mem_conditions: "Conditions",
      mem_apply: "Apply",
      mem_rights: "Rights & Duties",
      mem_payment: "Payment",
      media_center: "Media Center",
      med_news: "News",
      med_announcements: "Announcements",
      med_reports: "Media Reports",
      med_photos: "Photos",
      med_videos: "Videos",
      satisfaction: "Satisfaction",
      sat_beneficiaries: "Beneficiaries",
      sat_donors: "Donors",
      sat_volunteers: "Volunteers",
      sat_results: "Results",
      contact_us: "Contact Us",
      donate_now: "Donate Now",
    },
    ar: {
      home: "الرئيسية",
      about_us: "عن الجمعية",
      about_who_we_are: "من نحن",
      about_vision: "الرؤية",
      about_mission: "الرسالة",
      about_goals: "الأهداف",
      about_values: "القيم",
      about_license: "الترخيص",
      about_official_data: "البيانات الرسمية",
      organization_certificate: "الترخيص",
      basic_standards: "البيانات الرسمية",
      governance_disclosure: "الحوكمة والإفصاح",
      gov_board: "مجلس الإدارة",
      gov_structure: "الهيكل التنظيمي",
      gov_basic_reg: "اللائحة الأساسية",
      gov_policies: "السياسات",
      gov_regulations: "اللوائح",
      gov_reports: "التقارير",
      gov_financials: "المالية",
      gov_assembly: "الجمعية العمومية",
      gov_complaints: "الشكاوى والبالغات",
      board_members: "مجلس الإدارة",
      annual_reports: "التقارير المالية",
      financial_statements: "القوائم المالية",
      complaints_reports: "الشكاوى",
      services: "خدماتنا",
      srv_beneficiary: "خدمات المستفيدين",
      srv_programs: "البرامج والمبادرات",
      srv_how_to: "آلية الاستفادة",
      srv_faq: "الأسئلة الشائعة",
      membership_menu: "العضوية",
      mem_types: "أنواع العضوية",
      mem_conditions: "شروط العضوية",
      mem_apply: "التقديم على العضوية",
      mem_rights: "حقوق العضو",
      mem_payment: "سداد الاشتراك",
      media_center: "المركز الإعلامي",
      med_news: "الأخبار",
      med_announcements: "الإعلانات",
      med_reports: "التقارير الإعلامية",
      med_photos: "الصور",
      med_videos: "الفيديو",
      satisfaction: "قياس الرضا",
      sat_beneficiaries: "رضا المستفيدين",
      sat_donors: "رضا المتبرعين",
      sat_volunteers: "رضا المتطوعين",
      sat_results: "نتائج مؤشرات الرضا",
      contact_us: "اتصل بنا",
      donate_now: "تبرع الآن",
    },
  };

  const t = translations[language];

  const renderDropdown = (id, labelKey, items, Icon) => (
    <div
      className="relative"
      onMouseEnter={() => handleDropdownEnter(id)}
      onMouseLeave={handleDropdownLeave}
    >
      <button
        onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
        className="flex items-center gap-1 px-3 py-2 rounded-xl font-bold transition-colors hover:text-[#C89B3C] hover:bg-[#0E4B33]/5 text-sm xl:text-lg whitespace-nowrap"
        style={{ color: "#0E4B33" }}
      >
        <Icon size={18} style={{ color: "#C89B3C", flexShrink: 0 }} />
        <span>{t[labelKey]}</span>
        <FaChevronDown size={14} className={`transition-transform duration-300 ${openDropdown === id ? "rotate-180" : ""}`} />
      </button>
      {openDropdown === id && (
        <div
          className="absolute top-full left-0 mt-3 min-w-[260px] rounded-3xl shadow-[0_20px_40px_rgba(14,75,51,0.15)] py-3 z-50 max-h-[70vh] overflow-y-auto bg-white/95 backdrop-blur-2xl border border-white/50 animate-fadeInUp"
        >
          {items.map(({ to, key, icon: ItemIcon }) => (
            <Link
              key={key}
              to={to}
              onClick={closeAll}
              className="flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-[#0E4B33]/5 font-body group"
              style={{ color: "#0E4B33" }}
            >
              <span className="p-1.5 rounded-lg bg-[#C89B3C]/10 group-hover:bg-[#C89B3C]/20 transition-colors">
                <ItemIcon size={18} style={{ color: "#C89B3C", flexShrink: 0 }} />
              </span>
              {t[key]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  const renderMobileSection = (id, labelKey, items, Icon) => {
    const isExpanded = mobileOpen[id];
    return (
      <div key={id} className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setMobileOpen((s) => ({ ...s, [id]: !s[id] }))}
          className="flex items-center gap-3 w-full px-4 py-3 text-left font-body"
          style={{ color: "#000000" }}
        >
          <span className="flex-shrink-0 rounded-lg p-1.5" style={{ backgroundColor: "rgba(200,155,60,0.15)" }}>
            <Icon size={20} style={{ color: "#C89B3C" }} />
          </span>
          <span>{t[labelKey]}</span>
          <FaChevronDown size={18} className={`ml-auto ${isExpanded ? "rotate-180" : ""}`} />
        </button>
        {isExpanded && (
          <div className="bg-gray-50 border-t border-gray-200">
            {items.map(({ to, key, icon: ItemIcon }) => (
              <Link
                key={key}
                to={to}
                onClick={closeAll}
                className="flex items-center gap-2 px-4 py-2.5 pl-12 font-body text-sm"
                style={{ color: "#0E4B33" }}
              >
                <ItemIcon size={18} style={{ color: "#C89B3C" }} />
                {t[key]}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* 1. DEDICATED GOVERNANCE & TRUST STRIP (Very Top) */}
      <div className="w-full" style={{ backgroundColor: "#C89B3C", color: "#0E4B33" }}>
        <div className="container mx-auto px-2 sm:px-6 py-1.5 sm:py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex items-center justify-center sm:justify-between gap-4 sm:gap-6 font-extrabold text-[11px] sm:text-sm">
            <Link to="/about" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FaCertificate size={14} className="sm:w-4 sm:h-4" /> 
              <span>{language === 'ar' ? 'الترخيص: 1000827300' : 'License: 1000827300'}</span>
            </Link>
            <Link to="/board-members" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FaUserCircle size={14} className="sm:w-4 sm:h-4" /> 
              <span>{t.board_members}</span>
            </Link>
            <Link to="/annual-reports" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FaChartBar size={14} className="sm:w-4 sm:h-4" /> 
              <span>{t.financial_statements}</span>
            </Link>
            <Link to="/annual-reports" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FaBookOpen size={14} className="sm:w-4 sm:h-4" /> 
              <span>{t.gov_reports}</span>
            </Link>
            <Link to="/complaints" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FaEnvelope size={14} className="sm:w-4 sm:h-4" /> 
              <span>{t.complaints_reports}</span>
            </Link>
            <Link to="/membership" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FaUserFriends size={14} className="sm:w-4 sm:h-4" /> 
              <span>{t.membership_menu}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. CONTACT & UTILITIES BAR */}
      <div className="text-sm border-b border-[#C89B3C]/20" style={{ backgroundColor: "#0E4B33", color: "#FFFFFF" }}>
        <div className="container mx-auto px-6 py-2 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-4 md:gap-6 flex-wrap">
            
            {/* Email Contact */}
            <a 
              href="mailto:info@mathwaa.org"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
              title="Email us"
            >
              <FaEnvelope size={16} style={{ color: "#C89B3C" }} />
              <span className="hidden md:inline">info@mathwaa.org</span>
              <span className="hidden group-hover:inline md:hidden text-xs absolute bg-gray-800 px-2 py-1 rounded whitespace-nowrap">info@mathwaa.org</span>
            </a>
            
            {/* Phone Contact */}
            <a 
              href="tel:+966539626662"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
              title="Call us"
            >
              <FaPhoneAlt size={16} style={{ color: "#C89B3C" }} />
              <span className="hidden md:inline">+966 53 962 6662</span>
              <span className="hidden group-hover:inline md:hidden text-xs absolute bg-gray-800 px-2 py-1 rounded whitespace-nowrap">+966 53 962 6662</span>
            </a>
            
            {/* Social Media */}
            <div className="flex items-center gap-2 border-l border-white/30 pl-4">
              <a href="https://www.snapchat.com/add/mathwaah" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-white/20 transition-all hover:-translate-y-0.5" style={{ color: "#C89B3C" }} aria-label="Snapchat"><FaSnapchatGhost size={16} /></a>
              <a href="https://www.instagram.com/mathwaah" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-white/20 transition-all hover:-translate-y-0.5" style={{ color: "#C89B3C" }} aria-label="Instagram"><FaInstagram size={16} /></a>
              <a href="https://x.com/mathwaah" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-white/20 transition-all hover:-translate-y-0.5" style={{ color: "#C89B3C" }} aria-label="X (Twitter)"><FaTwitter size={16} /></a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Cart Icon */}
            {isAuthenticated ? (
              <Link to="/cart" className="relative group">
                <FaShoppingCart size={18} style={{ color: "#C89B3C" }} className="cursor-pointer hover:opacity-80 transition" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            ) : (
              <div className="relative group">
                <FaShoppingCart size={18} style={{ color: "#C89B3C" }} className="cursor-pointer hover:opacity-80 transition" title="Login to access cart" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartItems.length}
                  </span>
                )}
              </div>
            )}
            
            {/* User Profile / Login */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2 py-1 rounded text-sm font-medium transition-opacity hover:opacity-90"
                  style={{ color: "#C89B3C" }}
                >
                  <FaUserCircle size={18} />
                  <span className="hidden sm:inline truncate max-w-[100px]">{user.name}</span>
                </button>
                
                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-xl z-50 border border-gray-100 animate-fadeInUp">
                    <div className="p-4 border-b border-gray-100/50">
                      <p className="font-semibold text-gray-800 truncate">{user.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false)
                          logout()
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <FaSignOutAlt size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/admin/login" className="flex items-center gap-1.5 px-2 py-1 rounded text-sm font-medium transition-opacity hover:opacity-90" style={{ color: "#C89B3C" }} title="Admin Login">
                <FaSignInAlt size={16} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
            <span className="h-4 w-px bg-white/30" aria-hidden />
            <button onClick={() => onLanguageChange("en")} className="px-2 py-1 rounded text-sm font-medium transition-colors" style={{ backgroundColor: language === "en" ? "#C89B3C" : "rgba(255,255,255,0.2)", color: "#FFFFFF" }}>EN</button>
            <button onClick={() => onLanguageChange("ar")} className="px-2 py-1 rounded text-sm font-medium transition-colors" style={{ backgroundColor: language === "ar" ? "#C89B3C" : "rgba(255,255,255,0.2)", color: "#FFFFFF" }}>AR</button>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 navbar-glass transition-all duration-300 border-b border-[#0E4B33]/20">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center min-h-[5rem] py-2 gap-4">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <img
                src={Logo}
                alt="Mathwaa Logo"
                className="h-16 md:h-20 lg:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
                onError={(e) => { e.target.onerror = null; const base = (import.meta.env.BASE_URL || "").replace(/\/$/, ""); e.target.src = `${base}/logo.png`; }}
              />
            </Link>

            <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center px-2 max-w-4xl">
              <Link to="/" className="flex items-center gap-1 px-3 py-2 rounded-xl font-bold transition-colors hover:bg-[#0E4B33]/5 hover:text-[#C89B3C] text-sm xl:text-lg whitespace-nowrap" style={{ color: "#0E4B33" }}>
                <FaHome size={18} style={{ color: "#C89B3C", flexShrink: 0 }} />
                <span>{t.home}</span>
              </Link>
              {renderDropdown("about", "about_us", ABOUT_ITEMS, FaMosque)}
              {renderDropdown("governance", "governance_disclosure", GOVERNANCE_ITEMS, FaBalanceScale)}
              {renderDropdown("services", "services", SERVICES_ITEMS, FaHandsHelping)}
              {renderDropdown("membership", "membership_menu", MEMBERSHIP_ITEMS, FaUserFriends)}
              {renderDropdown("media", "media_center", MEDIA_CENTER_ITEMS, FaNewspaper)}
              {renderDropdown("satisfaction", "satisfaction", SATISFACTION_ITEMS, FaChartBar)}
              <Link to="/contact" className="flex items-center gap-1 px-3 py-2 rounded-xl font-bold transition-colors hover:bg-[#0E4B33]/5 hover:text-[#C89B3C] text-sm xl:text-lg whitespace-nowrap" style={{ color: "#0E4B33" }}>
                <FaComments size={18} style={{ color: "#C89B3C", flexShrink: 0 }} />
                <span>{t.contact_us}</span>
              </Link>
            </div>

            <div className="hidden lg:flex items-center flex-shrink-0 pl-4">
              <Link to="/donate" className="btn-primary py-3 px-8 text-base shadow-[0_8px_20px_rgba(14,75,51,0.2)]">
                {t.donate_now}
              </Link>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg" style={{ color: "#0E4B33" }}>
              {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
            </button>
          </div>

          {isOpen && (
            <div className="lg:hidden pb-4 pt-2 space-y-1 px-2">
              <Link to="/" onClick={closeAll} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 font-body" style={{ color: "#000000" }}>
                <span className="rounded-lg p-1.5" style={{ backgroundColor: "rgba(200,155,60,0.15)" }}><FaHome size={20} style={{ color: "#C89B3C" }} /></span>
                {t.home}
              </Link>
              {renderMobileSection("about", "about_us", ABOUT_ITEMS, FaMosque)}
              {renderMobileSection("governance", "governance_disclosure", GOVERNANCE_ITEMS, FaBalanceScale)}
              {renderMobileSection("services", "services", SERVICES_ITEMS, FaHandsHelping)}
              {renderMobileSection("membership", "membership_menu", MEMBERSHIP_ITEMS, FaUserFriends)}
              {renderMobileSection("media", "media_center", MEDIA_CENTER_ITEMS, FaNewspaper)}
              {renderMobileSection("satisfaction", "satisfaction", SATISFACTION_ITEMS, FaChartBar)}
              <Link to="/contact" onClick={closeAll} className="flex items-center gap-3 w-full px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 font-body" style={{ color: "#000000" }}>
                <span className="rounded-lg p-1.5" style={{ backgroundColor: "rgba(200,155,60,0.15)" }}><FaComments size={20} style={{ color: "#C89B3C" }} /></span>
                {t.contact_us}
              </Link>
              <Link to="/donate" onClick={closeAll} className="flex items-center justify-center gap-2 w-full mt-3 px-4 py-3 rounded-full font-semibold" style={{ backgroundColor: "#0E4B33", color: "#FFFFFF" }}>
                <FaDonate size={20} />
                {t.donate_now}
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;