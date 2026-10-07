import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const events = [
  { id: 1, title: "Global Tech Summit 2026", date: "24 Oct 2026", dateValue: "2026-10-24", city: "Chennai", country: "India", age: "18–35", category: "Technology", price: "₹499", image: "photo-1540575467063-178a50c2df87", description: "A day of big ideas, emerging technology and conversations with the people building what's next." },
  { id: 2, title: "The Sunlit Music Sessions", date: "31 Oct 2026", dateValue: "2026-10-31", city: "Austin", country: "USA", age: "18–35", category: "Music", price: "Free", image: "photo-1459749411175-04bf5292ceea", description: "An open-air evening of live music, new sounds and good company under the Texas sky." },
  { id: 3, title: "Future Makers: Design & AI", date: "08 Nov 2026", dateValue: "2026-11-08", city: "London", country: "UK", age: "18–35", category: "Technology", price: "£25", image: "photo-1517245386807-bb43f82c33c4", description: "Where creative minds meet intelligent tools for a hands-on day of ideas, talks and workshops." },
  { id: 4, title: "The Good Food Gathering", date: "14 Nov 2026", dateValue: "2026-11-14", city: "Dubai", country: "UAE", age: "36–50", category: "Arts & Culture", price: "AED 80", image: "photo-1511795409834-ef04bbd61622", description: "A generous table celebrating regional chefs, thoughtful ingredients and the joy of sharing a meal." },
  { id: 5, title: "City Run Club: Harbour Edition", date: "21 Nov 2026", dateValue: "2026-11-21", city: "Singapore", country: "Singapore", age: "18–35", category: "Sports", price: "Free", image: "photo-1533561052604-c3beb6d55b8d", description: "A relaxed group run along the waterfront, made for first-timers, regulars and everyone in between." },
  { id: 6, title: "Creative Futures Festival", date: "05 Dec 2026", dateValue: "2026-12-05", city: "Melbourne", country: "Australia", age: "Under 18", category: "Education", price: "A$15", image: "photo-1523580494863-6f3031224c94", description: "A bright, hands-on festival for young creators curious about art, ideas and what they can make." },
];
const countries = [
  { name: "India", flag: "🇮🇳", city: "Chennai · Mumbai · Bengaluru", image: "photo-1524492412937-b28074a5d7da" },
  { name: "USA", flag: "🇺🇸", city: "New York · Austin · LA", image: "photo-1485738422979-f5c462d49f74" },
  { name: "UK", flag: "🇬🇧", city: "London · Manchester · Bristol", image: "photo-1513635269975-59663e0ac1ad" },
  { name: "UAE", flag: "🇦🇪", city: "Dubai · Abu Dhabi · Sharjah", image: "photo-1512453979798-5ea266f8880c" },
  { name: "Singapore", flag: "🇸🇬", city: "Singapore · Sentosa", image: "photo-1525625293386-3f8f99389edd" },
  { name: "Australia", flag: "🇦🇺", city: "Sydney · Melbourne · Perth", image: "photo-1506973035872-a4f6e58a6b2b" },
];
const ageGroups = [
  { age: "Under 18", description: "Youth and school events, made for curious minds.", icon: "✳", tint: "peach" },
  { age: "18–35", description: "Culture, careers, sport and new connections.", icon: "↗", tint: "lavender" },
  { age: "36–50", description: "Fresh ideas, meaningful networks and community.", icon: "◒", tint: "mint" },
  { age: "50+", description: "Wellness, culture and experiences to savour.", icon: "✦", tint: "butter" },
];
const categories = [
  { name: "Technology", icon: "⌘", image: "photo-1518770660439-4636190af475" },
  { name: "Sports", icon: "↗", image: "photo-1530549387789-4c1017266635" },
  { name: "Music", icon: "♫", image: "photo-1501386761578-eac5c94b800a" },
  { name: "Business", icon: "▤", image: "photo-1556761175-b413da4baf72" },
  { name: "Education", icon: "⌂", image: "photo-1522202176988-66273c2fd55f" },
  { name: "Arts & Culture", icon: "◉", image: "photo-1579783902614-a3fb3927b6a5" },
];
const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function Icon({ name, size = 18 }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Logo() {
  return <a href="#home" className="logo" aria-label="EventHub home"><span className="logo-mark"><span /></span><span>event<span className="logo-hub">hub</span></span></a>;
}

function Navbar({ onRegister }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="site-header"><nav className="navbar container"><Logo /><button className="mobile-menu" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? "close" : "menu"} size={22} /></button><div className={`nav-links${menuOpen ? " nav-open" : ""}`}><a href="#events" onClick={() => setMenuOpen(false)}>Discover</a><a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a><a href="#locations" onClick={() => setMenuOpen(false)}>Locations</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a><button className="login-link" onClick={onRegister}>Log in</button><button className="button button-dark nav-register" onClick={onRegister}>Register <span>↗</span></button></div></nav></header>;
}

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState("");
  const submit = (event) => { event.preventDefault(); onSearch({ query, country, date }); document.querySelector("#events")?.scrollIntoView({ behavior: "smooth" }); };
  return <form className="search-bar" onSubmit={submit}>
    <label className="search-field search-keyword"><span className="field-icon"><Icon name="search" /></span><span className="field-copy"><span className="field-label">I'm looking for</span><input aria-label="Search events" placeholder="Events, ideas, experiences..." value={query} onChange={(e) => setQuery(e.target.value)} /></span></label>
    <label className="search-field"><span className="field-icon"><Icon name="pin" /></span><span className="field-copy"><span className="field-label">Where</span><select aria-label="Choose a location" value={country} onChange={(e) => setCountry(e.target.value)}><option value="">Anywhere</option>{countries.map((item) => <option key={item.name}>{item.name}</option>)}</select></span></label>
    <label className="search-field search-date"><span className="field-icon"><Icon name="calendar" /></span><span className="field-copy"><span className="field-label">When</span><input aria-label="Choose a date" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></span></label>
    <button className="button button-primary search-submit" type="submit">Find events <Icon name="arrow" size={16} /></button>
  </form>;
}

function Hero({ onSearch }) {
  return <section className="hero" id="home"><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="container hero-inner"><div className="hero-content"><div className="eyebrow"><span className="eyebrow-dot" /> GOOD THINGS HAPPEN TOGETHER</div><h1>Discover Events.<br /><span>Experience More.</span></h1><p className="hero-subtitle">Find your people, your passions and your next unforgettable moment.</p><div className="hero-proof"><div className="avatar-stack"><span>J</span><span>M</span><span>A</span><span>+</span></div><span><strong>12,000+</strong> experiences to explore</span></div></div><div className="hero-visual"><img className="hero-photo" src={photo("photo-1506157786151-b8491531f063", 1400)} alt="Crowd enjoying a live outdoor music event" /><div className="photo-shade" /><div className="hero-photo-caption"><span className="live-dot" /> LIVE THE MOMENT <span className="caption-line" /> 01 / 06</div><div className="floating-card"><div className="float-icon">♫</div><div><strong>Live music, tonight</strong><span>Find your next sound</span></div><span className="float-arrow">↗</span></div><div className="photo-stamp"><span>Make<br />memories</span><b>✳</b></div></div><SearchBar onSearch={onSearch} /></div></section>;
}

function SectionHeading({ eyebrow, title, text, link }) {
  return <div className="section-heading"><div><div className="eyebrow section-eyebrow">{eyebrow}</div><h2>{title}</h2>{text && <p>{text}</p>}</div>{link && <a className="text-link" href={link.href}>{link.label} <Icon name="arrow" size={15} /></a>}</div>;
}

function LocationExplorer({ selectedCountry, onSelect }) {
  return <section className="section location-section" id="locations"><div className="container"><SectionHeading eyebrow="GO SOMEWHERE" title="The world is your venue." text="Find something worth leaving the house for, wherever you are." /><div className="location-grid">{countries.map((item, index) => <button key={item.name} className={`location-card${selectedCountry === item.name ? " location-selected" : ""}`} onClick={() => onSelect(selectedCountry === item.name ? "" : item.name)} style={{ "--location-image": `url(${photo(item.image, 700)})`, "--location-index": index }}><span className="location-image" /><span className="location-content"><span className="location-top"><span className="location-flag">{item.flag}</span><span className="location-arrow">↗</span></span><strong>{item.name}</strong><span>{item.city}</span></span></button>)}</div></div></section>;
}

function AgeGroups({ selectedAge, onSelect }) {
  return <section className="section age-section"><div className="container"><SectionHeading eyebrow="MADE FOR YOUR MOMENT" title="Find events for you." text="Whatever chapter you're in, there's a good time with your name on it." /><div className="age-grid">{ageGroups.map((item) => <button key={item.age} onClick={() => onSelect(selectedAge === item.age ? "" : item.age)} className={`age-card ${item.tint}${selectedAge === item.age ? " age-selected" : ""}`}><span className="age-icon">{item.icon}</span><span className="age-card-bottom"><strong>{item.age}</strong><span>{item.description}</span><span className="age-explore">Explore events <Icon name="arrow" size={15} /></span></span></button>)}</div></div></section>;
}

function Categories({ selectedCategory, onSelect }) {
  return <section className="section categories-section" id="categories"><div className="container"><SectionHeading eyebrow="FOLLOW YOUR CURIOSITY" title="A little bit of everything." link={{ label: "See all categories", href: "#events" }} /><div className="category-grid">{categories.map((item) => <button className={`category-card${selectedCategory === item.name ? " category-selected" : ""}`} key={item.name} onClick={() => onSelect(selectedCategory === item.name ? "" : item.name)}><img src={photo(item.image, 700)} alt="" /><span className="category-shade" /><span className="category-icon">{item.icon}</span><span className="category-name">{item.name}<span> ↗</span></span></button>)}</div></div></section>;
}

function EventCard({ event, onDetails, onRegister }) {
  return <article className="event-card"><button className="event-image-button" onClick={() => onDetails(event)} aria-label={`View details for ${event.title}`}><img className="event-image" src={photo(event.image, 1000)} alt="" /><span className="event-category">{event.category}</span><span className="event-save" aria-hidden="true">♡</span></button><div className="event-info"><div className="event-date"><Icon name="calendar" size={14} /> {event.date}</div><button className="event-title" onClick={() => onDetails(event)}>{event.title}</button><div className="event-location"><Icon name="pin" size={14} /> {event.city}, {event.country}</div><p className="event-description">{event.description}</p><div className="event-meta"><span><Icon name="users" size={14} /> {event.age}</span><span className={`event-price${event.price === "Free" ? " free-price" : ""}`}>{event.price === "Free" ? "Free entry" : event.price}</span></div><div className="event-actions"><button className="event-details" onClick={() => onDetails(event)}>Details</button><button className="button button-dark event-register" onClick={() => onRegister(event)}>Register Now <Icon name="arrow" size={14} /></button></div></div></article>;
}

function FeaturedEvents({ filters, selectedCategory, setSelectedCategory, selectedAge, setSelectedAge, onDetails, onRegister }) {
  const [priceFilter, setPriceFilter] = useState("");
  const filteredEvents = useMemo(() => events.filter((event) => {
    const query = filters.query.trim().toLowerCase();
    return (!query || `${event.title} ${event.city} ${event.country} ${event.category}`.toLowerCase().includes(query))
      && (!filters.country || event.country === filters.country)
      && (!filters.date || event.dateValue === filters.date)
      && (!selectedAge || event.age === selectedAge)
      && (!selectedCategory || event.category === selectedCategory)
      && (!priceFilter || (priceFilter === "Free" ? event.price === "Free" : event.price !== "Free"));
  }), [filters, selectedAge, selectedCategory, priceFilter]);
  const clearFilters = () => { setSelectedAge(""); setSelectedCategory(""); setPriceFilter(""); };
  const hasFilters = filters.query || filters.country || filters.date || selectedAge || selectedCategory || priceFilter;
  return <section className="section events-section" id="events"><div className="container"><SectionHeading eyebrow="GOOD THINGS COMING UP" title={hasFilters ? "Your kind of plans." : "Worth putting on the calendar."} text={hasFilters ? `${filteredEvents.length} ${filteredEvents.length === 1 ? "experience" : "experiences"} found for you.` : "A few of the moments everyone's talking about."} link={!hasFilters ? { label: "Explore all events", href: "#events" } : null} /><div className="filter-row"><span className="filter-label">Narrow it down</span><select aria-label="Filter by age group" value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}><option value="">Any age</option>{ageGroups.map((age) => <option key={age.age}>{age.age}</option>)}</select><select aria-label="Filter by category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}><option value="">Any category</option>{categories.map((category) => <option key={category.name}>{category.name}</option>)}</select><select aria-label="Filter by price" value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)}><option value="">Any price</option><option value="Free">Free</option><option value="Paid">Paid</option></select>{hasFilters && <button className="clear-filters" onClick={clearFilters}>Clear filters</button>}</div>{filteredEvents.length ? <div className="event-grid">{filteredEvents.map((event) => <EventCard key={event.id} event={event} onDetails={onDetails} onRegister={onRegister} />)}</div> : <div className="empty-state"><span>✳</span><h3>No events found just yet.</h3><p>Try a different search or clear a filter to see more experiences.</p><button className="button button-dark" onClick={clearFilters}>Clear all filters</button></div>}</div></section>;
}

function FinalCTA({ onExplore }) {
  return <section className="final-cta" id="about"><div className="cta-pattern pattern-a">✳</div><div className="cta-pattern pattern-b">✳</div><div className="container final-cta-inner"><div className="eyebrow cta-eyebrow"><span className="eyebrow-dot" /> YOUR NEXT CHAPTER</div><h2>Your next experience<br />starts <em>here.</em></h2><p>Discover events. Meet people. Make a story worth telling.</p><button className="button button-light" onClick={onExplore}>Explore events <Icon name="arrow" size={16} /></button><div className="cta-note">GOOD PEOPLE. GREAT PLANS. ZERO FOMO.</div></div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Logo /><p>Find your people.<br />Make your moments.</p><div className="social-links"><a href="#home" aria-label="Instagram">ig</a><a href="#home" aria-label="LinkedIn">in</a><a href="#home" aria-label="Facebook">f</a></div></div><div className="footer-column"><strong>Explore</strong><a href="#events">Discover events</a><a href="#categories">Categories</a><a href="#locations">Locations</a></div><div className="footer-column"><strong>EventHub</strong><a href="#about">About us</a><a href="#about">Create an event</a><a href="#about">Help center</a></div><div className="footer-column"><strong>Say hello</strong><a href="mailto:hello@eventhub.example">hello@eventhub.example</a><span>Good plans start here.</span></div></div><div className="footer-bottom"><span>© 2026 EventHub. Made for moments.</span><div><a href="#about">Privacy</a><a href="#about">Terms</a><span>Made with a little ✳</span></div></div></div></footer>;
}

function EventDialog({ event, mode, onClose, onDone, onSwitchToRegister }) {
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    document.body.classList.add("modal-open");
    return () => { window.removeEventListener("keydown", handleKey); document.body.classList.remove("modal-open"); };
  }, [onClose]);
  const submitRegistration = async (formEvent) => {
    formEvent.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(formEvent.currentTarget);
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          age: formData.get("age"),
          eventId: event?.id ?? null,
          eventTitle: event?.title || "EventHub",
        }),
      });
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error(response.ok
          ? "The registration service returned an unexpected response."
          : "Registration service is unavailable. Start the Node API and MongoDB, then try again.");
      }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Registration could not be saved.");
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError.message || "Unable to reach the registration service. Please try again.");
    } finally {
      setSaving(false);
    }
  };
  return <div className="dialog-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title"><button className="dialog-close" type="button" onClick={onClose} aria-label="Close"><Icon name="close" /></button>{event && <img className="dialog-image" src={photo(event.image, 1000)} alt="" />}<div className="dialog-content">{submitted ? <div className="dialog-success"><span>✓</span><h2 id="dialog-title">You're on the list.</h2><p>Thanks for your interest. Your event registration has been saved.</p><button className="button button-dark" type="button" onClick={onDone}>Done</button></div> : <><span className="dialog-kicker">{mode === "register" ? "SAVE YOUR SPOT" : event ? event.category : "WELCOME TO EVENTHUB"}</span><h2 id="dialog-title">{mode === "register" ? `Join ${event?.title || "EventHub"}` : event?.title || "Create your next great memory."}</h2>{event && <div className="dialog-event-meta"><span><Icon name="calendar" size={15} /> {event.date}</span><span><Icon name="pin" size={15} /> {event.city}, {event.country}</span></div>}<p>{mode === "register" ? "Leave your details and we'll save your place. No payment needed today." : event?.description || "Sign up to discover experiences picked just for you."}</p>{mode === "register" || !event ? <form className="dialog-form" onSubmit={submitRegistration}><label>Your name<input name="name" required autoComplete="name" placeholder="Alex Morgan" /></label><label>Email address<input name="email" required type="email" autoComplete="email" placeholder="you@example.com" /></label><label>Phone number<input name="phone" required type="tel" autoComplete="tel" placeholder="+1 555 010 1234" /></label><label>Age group<select name="age" required defaultValue=""><option value="" disabled>Select your age group</option>{ageGroups.map((group) => <option key={group.age} value={group.age}>{group.age}</option>)}</select></label>{error && <p className="registration-error" role="alert">{error}</p>}<button className="button button-primary" type="submit" disabled={saving}>{saving ? "Saving..." : mode === "register" ? "Register Now" : "Continue"} <Icon name="arrow" size={15} /></button></form> : <button className="button button-primary dialog-main-button" type="button" onClick={() => onSwitchToRegister(event)}>Register Now <Icon name="arrow" size={15} /></button>}</>}</div></div></div>;
}

function App() {
  const [filters, setFilters] = useState({ query: "", country: "", date: "" });
  const [selectedAge, setSelectedAge] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dialog, setDialog] = useState(null);
  const openDialog = (mode, event = null) => setDialog({ mode, event });
  const closeDialog = useCallback(() => setDialog(null), []);
  const completeRegistration = useCallback(() => {
    closeDialog();
    document.querySelector("#events")?.scrollIntoView({ behavior: "smooth" });
  }, [closeDialog]);
  const explore = () => document.querySelector("#events")?.scrollIntoView({ behavior: "smooth" });
  return <><Navbar onRegister={() => openDialog("register")} /><main><Hero onSearch={setFilters} /><LocationExplorer selectedCountry={filters.country} onSelect={(country) => setFilters((current) => ({ ...current, country }))} /><AgeGroups selectedAge={selectedAge} onSelect={setSelectedAge} /><Categories selectedCategory={selectedCategory} onSelect={setSelectedCategory} /><FeaturedEvents filters={filters} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} selectedAge={selectedAge} setSelectedAge={setSelectedAge} onDetails={(event) => openDialog("details", event)} onRegister={(event) => openDialog("register", event)} /><FinalCTA onExplore={explore} /></main><Footer />{dialog && <EventDialog key={`${dialog.mode}-${dialog.event?.id || "general"}`} event={dialog.event} mode={dialog.mode} onClose={closeDialog} onDone={completeRegistration} onSwitchToRegister={(event) => openDialog("register", event)} />}</>;
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);