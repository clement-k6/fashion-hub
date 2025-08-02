import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building, CheckCircle, Shield, Users, Home, Menu, ChevronLeft, ChevronRight, Heart, X, UserPlus, Check, Handshake, Mail, Phone } from 'lucide-react';

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

interface Listing {
  title: string;
  location: string;
  price: string;
  image: string;
  description: string;
  badge: string;
  badgeColor: string;
}

const features: Feature[] = [
  {
    icon: <Building className="h-12 w-12 text-[#E9C46A]" />,
    title: 'Property Management',
    description: 'Easily list and manage all your rental properties in one place',
  },
  {
    icon: <Shield className="h-12 w-12 text-[#A8DADC]" />,
    title: 'Verified Listings',
    description: 'Build trust with verified property documentation and landlord credentials',
  },
  {
    icon: <Users className="h-12 w-12 text-[#E9C46A]" />,
    title: 'Direct Tenant Contact',
    description: 'Connect directly with potential tenants through our messaging system',
  },
  {
    icon: <CheckCircle className="h-12 w-12 text-[#1D3557]" />,
    title: 'Easy Verification',
    description: 'Quick and simple property verification process to get your listings live',
  },
];

const listings: Listing[] = [
  {
    title: 'Modern Apartment',
    location: 'Nairobi, Westlands',
    price: 'Ksh 45,000/mo',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'A modern, spacious apartment in the heart of Westlands. 2 bedrooms, 2 baths, secure parking.',
    badge: 'New',
    badgeColor: 'bg-[#E9C46A] text-[#1D3557]',
  },
  {
    title: 'Cozy Bedsitter',
    location: 'Kisumu, Milimani',
    price: 'Ksh 12,000/mo',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'A cozy bedsitter ideal for students or young professionals. Close to amenities.',
    badge: 'Verified',
    badgeColor: 'bg-[#1D3557] text-[#F1FAEE]',
  },
  {
    title: 'Family House',
    location: 'Mombasa, Nyali',
    price: 'Ksh 80,000/mo',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80',
    description: 'Spacious family house with a garden, 4 bedrooms, 3 baths, and close to the beach.',
    badge: 'New',
    badgeColor: 'bg-[#E9C46A] text-[#1D3557]',
  },
  {
    title: 'Student Room',
    location: 'Eldoret, Kimumu',
    price: 'Ksh 7,500/mo',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80',
    description: 'Affordable student room, walking distance to campus, secure and quiet neighborhood.',
    badge: 'Verified',
    badgeColor: 'bg-[#1D3557] text-[#F1FAEE]',
  },
];

const Index: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [detailsModal, setDetailsModal] = useState<{ open: boolean; listing: Listing | null }>({ open: false, listing: null });
  const [authModal, setAuthModal] = useState<{ open: boolean; activeTab: 'tenant' | 'owner' }>({ open: false, activeTab: 'tenant' });
  const [activeSection, setActiveSection] = useState('');
  const [isFavorite, setIsFavorite] = useState<{ [key: number]: boolean }>({});
  const carouselRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleFavoriteClick = (index: number) => {
    setIsFavorite((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const openDetailsModal = (listing: Listing) => {
    setDetailsModal({ open: true, listing });
  };

  const closeDetailsModal = () => {
    setDetailsModal({ open: false, listing: null });
  };

  const openAuthModal = (tab: 'tenant' | 'owner' = 'tenant') => {
    setAuthModal({ open: true, activeTab: tab });
  };

  const closeAuthModal = () => {
    setAuthModal({ open: false, activeTab: 'tenant' });
  };

  const handleCarouselScroll = (direction: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: direction * 320, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['how-it-works', 'why-us', 'about-us', 'cta', 'footer-contact'];
      let current = '';
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= window.scrollY + 120) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#F1FAEE] font-poppins">
      {/* Navigation */}
      <nav id="main-navbar" className="bg-[#1D3557] bg-opacity-95 text-[#F1FAEE] py-4 px-6 shadow-md sticky top-0 z-50 transition-all">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Home className="h-6 w-6 text-[#E9C46A] mr-2" />
            <span className="text-xl font-bold">
              Nyumba<span className="text-[#E9C46A]">Yangu</span>
            </span>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#how-it-works" className={`hover:text-[#A8DADC] transition-all font-medium ${activeSection === 'how-it-works' ? 'text-[#E9C46A] font-bold' : ''}`}>
              How It Works
            </a>
            <a href="#why-us" className={`hover:text-[#A8DADC] transition-all font-medium ${activeSection === 'why-us' ? 'text-[#E9C46A] font-bold' : ''}`}>
              Why Choose Us
            </a>
            <a href="#about-us" className={`hover:text-[#A8DADC] transition-all font-medium ${activeSection === 'about-us' ? 'text-[#E9C46A] font-bold' : ''}`}>
              About Us
            </a>
            <a href="#footer-contact" className={`hover:text-[#A8DADC] transition-all font-medium ${activeSection === 'footer-contact' ? 'text-[#E9C46A] font-bold' : ''}`}>
              Contact
            </a>
            <NavLink to="/landlord/dashboard" className="hover:text-[#E9C46A] transition-all font-medium">
              Get Started
            </NavLink>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6 text-[#F1FAEE]" />
            </Button>
          </div>
        </div>
        <div id="mobile-menu" className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden bg-[#1D3557] absolute left-0 right-0 px-6 pb-4 shadow-lg`}>
          <div className="flex flex-col space-y-3">
            <a href="#how-it-works" className="hover:text-[#A8DADC] transition-all font-medium">
              How It Works
            </a>
            <a href="#why-us" className="hover:text-[#A8DADC] transition-all font-medium">
              Why Choose Us
            </a>
            <a href="#about-us" className="hover:text-[#A8DADC] transition-all font-medium">
              About Us
            </a>
            <a href="#footer-contact" className="hover:text-[#A8DADC] transition-all font-medium">
              Contact
            </a>
            <NavLink to="/landlord/dashboard" className="hover:text-[#E9C46A] transition-all font-medium">
              Get Started
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="bg-[url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center text-[#F1FAEE] py-24 md:py-36 relative overflow-hidden flex items-center min-h-[80vh]"
        style={{ backgroundImage: `linear-gradient(rgba(29, 53, 87, 0.7), rgba(29, 53, 87, 0.7)), url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')` }}
      >
        <div className="container mx-auto px-6 flex flex-col items-center justify-center relative z-10">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">🏡 Find a Home You Can Trust</h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
              NyumbaYangu is a Kenyan rental platform built for students, professionals, and families — agent-free, verified, and secure.
            </p>
            <form className="max-w-xl w-full mx-auto flex flex-col md:flex-row items-center gap-4 mb-2">
              <input
                type="text"
                placeholder="Search by location, property type..."
                className="w-full md:flex-1 px-5 py-3 rounded-full border border-[#A8DADC] focus:outline-none focus:ring-2 focus:ring-[#E9C46A] text-[#1D3557] bg-[#F1FAEE]/90 font-semibold"
              />
              <Button className="bg-[#E9C46A] text-[#1D3557] font-bold px-8 py-3 rounded-full shadow-lg hover:bg-[#A8DADC]">Search</Button>
            </form>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
            <path fill="#fff" d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z" />
          </svg>
        </div>
      </section>

      {/* Featured Listings Carousel */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1D3557] mb-12">Featured Listings</h2>
          <div className="relative group" id="carousel-container">
            <Button
              id="carousel-prev"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#1D3557] text-[#F1FAEE] rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[#A8DADC]"
              onClick={() => handleCarouselScroll(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div id="carousel-track" ref={carouselRef} className="flex gap-8 overflow-x-auto scroll-smooth pb-4 md:pb-0 md:overflow-hidden snap-x snap-mandatory">
              {listings.map((listing, index) => (
                <Card key={index} className="min-w-[300px] max-w-xs bg-[#F1FAEE] rounded-xl shadow-lg p-0 flex-shrink-0 hover:scale-105 hover:shadow-2xl transition-all relative group snap-center">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-xl">
                      <img src={listing.image} alt={listing.title} className="rounded-t-xl h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                      <span className={`absolute top-3 left-3 ${listing.badgeColor} text-xs font-bold px-3 py-1 rounded-full shadow`}>{listing.badge}</span>
                      <Button
                        className="absolute top-3 right-3 bg-white/80 rounded-full p-2 text-[#E63946] shadow hover:scale-125 transition-transform"
                        onClick={() => handleFavoriteClick(index)}
                        aria-label="Add to favorites"
                      >
                        <Heart className={`h-5 w-5 ${isFavorite[index] ? 'fill-[#E63946]' : ''}`} />
                      </Button>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-[#1D3557] mb-1">{listing.title}</h3>
                      <p className="text-[#A8DADC] mb-1">{listing.location}</p>
                      <p className="font-bold text-[#1D3557] mb-2">{listing.price}</p>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button className="bg-[#E9C46A] text-[#1D3557] px-4 py-2 rounded-full font-semibold shadow hover:bg-[#A8DADC]" onClick={() => openDetailsModal(listing)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              id="carousel-next"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#1D3557] text-[#F1FAEE] rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-[#A8DADC]"
              onClick={() => handleCarouselScroll(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild className="bg-[#1D3557] text-[#F1FAEE] px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#A8DADC] hover:text-[#1D3557]">
              <NavLink to="/listings">View All Listings</NavLink>
            </Button>
          </div>
        </div>
      </section>

      {/* View Details Modal */}
      {detailsModal.open && detailsModal.listing && (
        <div id="details-modal" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeDetailsModal}>
          <Card className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <Button className="absolute top-3 right-3 text-[#1D3557] text-2xl hover:text-[#E63946]" onClick={closeDetailsModal}>
              &times;
            </Button>
            <img id="modal-img" src={detailsModal.listing.image} alt={detailsModal.listing.title} className="rounded-lg mb-4 w-full h-56 object-cover" />
            <h3 id="modal-title" className="text-2xl font-bold text-[#1D3557] mb-2">
              {detailsModal.listing.title}
            </h3>
            <p id="modal-location" className="text-[#A8DADC] mb-1">
              {detailsModal.listing.location}
            </p>
            <p id="modal-price" className="font-bold text-[#1D3557] mb-2">
              {detailsModal.listing.price}
            </p>
            <p id="modal-desc" className="text-gray-700 mb-4">
              {detailsModal.listing.description}
            </p>
            <Button className="bg-[#E9C46A] text-[#1D3557] px-6 py-3 rounded-full font-semibold shadow hover:bg-[#A8DADC] w-full">Contact Landlord</Button>
          </Card>
        </div>
      )}

      {/* Authentication Modal */}
      {authModal.open && (
        <div id="auth-modal" className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeAuthModal}>
          <Card className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative" onClick={(e) => e.stopPropagation()}>
            <Button className="absolute top-3 right-3 text-[#1D3557] text-2xl hover:text-[#E63946]" onClick={closeAuthModal}>
              &times;
            </Button>
            <h2 className="text-2xl font-bold text-[#1D3557] mb-6 text-center">Get Started</h2>
            <div className="flex justify-center gap-4 mb-6">
              <Button
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  authModal.activeTab === 'tenant' ? 'bg-[#A8DADC] text-[#1D3557]' : 'bg-[#F1FAEE] text-[#1D3557] border border-[#A8DADC]'
                }`}
                onClick={() => setAuthModal({ ...authModal, activeTab: 'tenant' })}
              >
                Tenant
              </Button>
              <Button
                className={`px-4 py-2 rounded-full font-semibold transition-all ${
                  authModal.activeTab === 'owner' ? 'bg-[#A8DADC] text-[#1D3557]' : 'bg-[#F1FAEE] text-[#1D3557] border border-[#A8DADC]'
                }`}
                onClick={() => setAuthModal({ ...authModal, activeTab: 'owner' })}
              >
                Property Owner
              </Button>
            </div>
            {authModal.activeTab === 'tenant' ? (
              <form id="form-tenant" className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg border border-[#A8DADC] focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-[#A8DADC] focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-[#A8DADC] focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
                  required
                />
                <Button type="submit" className="bg-[#E9C46A] text-[#1D3557] px-6 py-3 rounded-full font-semibold shadow hover:bg-[#A8DADC] w-full">
                  Register as Tenant
                </Button>
              </form>
            ) : (
              <form id="form-owner" className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg border border-[#A8DADC] focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-[#A8DADC] focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg border border-[#A8DADC] focus:outline-none focus:ring-2 focus:ring-[#E9C46A]"
                  required
                />
                <Button type="submit" className="bg-[#E9C46A] text-[#1D3557] px-6 py-3 rounded-full font-semibold shadow hover:bg-[#A8DADC] w-full">
                  Register as Owner
                </Button>
              </form>
            )}
          </Card>
        </div>
      )}

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#F1FAEE]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1D3557] mb-16">How NyumbaYangu Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transition-all border-t-4 border-[#A8DADC]">
              <CardContent>
                <div className="bg-[#E9C46A] text-[#1D3557] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-md">
                  <UserPlus className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#1D3557] mb-2">Sign Up</h3>
                <p className="text-gray-600">Register as a tenant or landlord in just 1 minute.</p>
              </CardContent>
            </Card>
            <Card className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transition-all border-t-4 border-[#A8DADC]">
              <CardContent>
                <div className="bg-[#E9C46A] text-[#1D3557] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-md">
                  <Home className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#1D3557] mb-2">Post or Browse</h3>
                <p className="text-gray-600">List your property or find your perfect home.</p>
              </CardContent>
            </Card>
            <Card className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transition-all border-t-4 border-[#A8DADC]">
              <CardContent>
                <div className="bg-[#E9C46A] text-[#1D3557] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-md">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#1D3557] mb-2">Get Verified</h3>
                <p className="text-gray-600">Our team verifies all listings and users for safety.</p>
              </CardContent>
            </Card>
            <Card className="bg-white p-6 rounded-lg shadow-md text-center hover:scale-105 transition-all border-t-4 border-[#A8DADC]">
              <CardContent>
                <div className="bg-[#E9C46A] text-[#1D3557] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl shadow-md">
                  <Handshake className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-[#1D3557] mb-2">Rent Safely</h3>
                <p className="text-gray-600">Connect directly, no middlemen, no scams.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-20 bg-gradient-to-br from-[#F1FAEE] via-[#A8DADC]/30 to-[#F1FAEE] relative">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1D3557] mb-16">Why Choose NyumbaYangu?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-to-br from-[#A8DADC]/30 to-[#F1FAEE] p-6 rounded-2xl shadow-xl text-[#1D3557] hover:scale-105 hover:shadow-2xl transition-all border-l-4 border-[#E9C46A]">
                <CardContent className="flex items-start">
                  <div className="bg-[#E9C46A] w-14 h-14 rounded-2xl flex items-center justify-center mr-4 mt-1 shadow-lg">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connecting Tenants & Landlords */}
      <section className="py-20 bg-[#F1FAEE]">
        <div className="container mx-auto px-6">
          <Card className="max-w-5xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
            <CardContent className="p-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1D3557] mb-4">Connecting Tenants & Landlords</h2>
              <p className="text-gray-600 mb-6">NyumbaYangu brings together real people—tenants and property owners—making renting safe, easy, and direct for everyone in Kenya.</p>
            </CardContent>
            <div className="bg-[#A8DADC] p-4 flex justify-center">
              <img src="symbolimage.png" alt="NyumbaYangu community" className="rounded-lg shadow-md max-h-96 object-cover" />
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="py-20 bg-[#1D3557] text-[#F1FAEE]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to find your next home?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">Join thousands of Kenyans who have found their perfect homes through NyumbaYangu.</p>
          <Button className="bg-[#E9C46A] text-[#1D3557] font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:bg-[#A8DADC] hover:text-[#1D3557]" onClick={() => openAuthModal()}>
            Get Started
          </Button>
          <p className="mt-4 text-sm opacity-80">It's free and only takes 1 minute.</p>
        </div>
      </section>

      {/* About Us */}
      <section id="about-us" className="py-20 bg-[#F1FAEE] relative">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D3557] mb-6">About Us</h2>
            <p className="text-lg text-[#1D3557] mb-4">
              NyumbaYangu is a Kenyan rental platform dedicated to connecting tenants and property owners directly, safely, and transparently. Our mission is to eliminate middlemen, scams, and hidden fees, making the rental process simple and trustworthy for everyone—students, professionals, and families alike.
            </p>
            <p className="text-[#1D3557]">
              We verify every listing and user, offer a secure in-app messaging system, and provide a beautiful, easy-to-use dashboard for both tenants and landlords. Join us and experience a new era of renting in Kenya!
            </p>
          </div>
          <div className="flex-1 flex flex-col items-center gap-6">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white rounded-full shadow-lg w-24 h-24 flex items-center justify-center border-4 border-[#A8DADC]">
                <img src="" alt="Team Member" className="rounded-full w-20 h-20 object-cover" />
              </div>
              <div className="bg-white rounded-full shadow-lg w-24 h-24 flex items-center justify-center border-4 border-[#A8DADC]">
                <img src="" alt="Team Member" className="rounded-full w-20 h-20 object-cover" />
              </div>
              <div className="bg-white rounded-full shadow-lg w-24 h-24 flex items-center justify-center border-4 border-[#A8DADC]">
                <img src="" alt="Team Member" className="rounded-full w-20 h-20 object-cover" />
              </div>
                <div className="bg-white rounded-full shadow-lg w-24 h-24 flex items-center justify-center border-4 border-[#A8DADC]">
                <img src="" alt="Team Member" className="rounded-full w-20 h-20 object-cover" />
              </div>
            </div>
            <span className="text-[#1D3557] mt-2 font-semibold">Meet our team</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1D3557] text-[#F1FAEE] py-12 border-t-4 border-[#A8DADC]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Home className="h-6 w-6 text-[#E9C46A] mr-2" />
                <span className="text-xl font-bold">
                  Nyumba<span className="text-[#E9C46A]">Yangu</span>
                </span>
              </div>
              <p className="opacity-80">Kenya's trusted rental platform connecting verified landlords with tenants directly.</p>
            </div>
            <div id="footer-contact">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-[#E9C46A] mr-2" />
                  <span>info@nyumbayangu.co.ke</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-[#E9C46A] mr-2" />
                  <span>+254 700 123456</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-[#E9C46A] hover:text-[#A8DADC] text-2xl transition-all">
                  <i className="fab fa-facebook" />
                </a>
                <a href="#" className="text-[#E9C46A] hover:text-[#A8DADC] text-2xl transition-all">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="text-[#E9C46A] hover:text-[#A8DADC] text-2xl transition-all">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#" className="text-[#E9C46A] hover:text-[#A8DADC] text-2xl transition-all">
                  <i className="fab fa-linkedin" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-[#A8DADC] mt-10 pt-6 text-center opacity-80 text-sm">
            <p>&copy; 2025 NyumbaYangu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;