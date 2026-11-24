/* =========================================================
   Arkadia Travel — Unified Data Catalog
   Single source of truth across all pages
   ========================================================= */

window.ARKADIA_DATA = {
    destinations: [
        {
            id: "albania",
            name: "Ionian Riviera",
            country: "Albania",
            location: "Ksamil & Himarë, Albania",
            category: "coastal",
            categoryLabel: "Coastal & Islands",
            badge: "Hidden Gem",
            rating: 4.9,
            reviews: 214,
            bestSeason: "May – October",
            image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=900&q=80",
            shortDesc: "Turquoise hidden coves, sunlit limestone cliffs, and untouched Mediterranean serenity without the crowds.",
            fullDesc: "Escape to Europe's best-kept coastal secret. Along Albania's Ionian Riviera, crystal-clear waters meet secluded boutique cliffside suites, ancient hilltop villages, and fresh Mediterranean coastal dining.",
            durations: [
                { id: "short", label: "3 Days / 2 Nights", days: 3, price: 450 },
                { id: "extended", label: "6 Days / 5 Nights", days: 6, price: 820 }
            ],
            highlights: [
                "Private speedboat excursion across the Ksamil islands",
                "Sunset cliffside dinner in historic Himarë",
                "Guided walk through UNESCO-listed Butrint National Park",
                "Boutique sea-view sanctuary with daily organic breakfast"
            ],
            included: ["Boutique Accommodation", "Private Airport Transfers", "Boat Excursion", "Daily Breakfast", "24/7 Local Concierge"]
        },
        {
            id: "spain",
            name: "Charm of Andalusia",
            country: "Spain",
            location: "Seville & Granada, Spain",
            category: "culture",
            categoryLabel: "Culture & Heritage",
            badge: "Most Loved",
            rating: 4.8,
            reviews: 342,
            bestSeason: "March – November",
            image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=900&q=80",
            shortDesc: "Moorish palaces, orange-blossom courtyards, and timeless architectural wonder across southern Spain.",
            fullDesc: "Journey through the poetic soul of Andalusia. Wander lantern-lit alleys in Seville, enjoy private skip-the-line access to Granada's Alhambra Palace, and unwind in restored historic courtyard riads.",
            durations: [
                { id: "short", label: "4 Days / 3 Nights", days: 4, price: 620 },
                { id: "extended", label: "7 Days / 6 Nights", days: 7, price: 1120 }
            ],
            highlights: [
                "Private historian-led tour of the Alhambra & Generalife Gardens",
                "Intimate acoustic flamenco evening in Triana, Seville",
                "Andalusian olive-grove tasting & tapas culinary walk",
                "Luxury restored courtyard palace hotel"
            ],
            included: ["5-Star Heritage Hotel", "High-Speed Rail Transfers", "Private Cultural Guide", "Culinary Tasting", "24/7 Concierge"]
        },
        {
            id: "nepal",
            name: "Himalayan Sanctuary",
            country: "Nepal",
            location: "Pokhara & Annapurna, Nepal",
            category: "mountains",
            categoryLabel: "Mountains & Trekking",
            badge: "Adventure",
            rating: 4.9,
            reviews: 189,
            bestSeason: "Oct – Dec & Mar – May",
            image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=80",
            shortDesc: "Breathtaking alpine ridges, serene lakeside lodges, and guided trails beneath snow-dusted Himalayan peaks.",
            fullDesc: "Experience the majesty of the Annapurna range with refined comfort. Combine scenic sunrise ridge treks with boutique mountain lodges, Phewa Lake boat meditations, and expert local Sherpa guides.",
            durations: [
                { id: "short", label: "5 Days / 4 Nights", days: 5, price: 750 },
                { id: "extended", label: "10 Days / 9 Nights", days: 10, price: 1420 }
            ],
            highlights: [
                "Golden-hour Himalayan panoramic viewpoint above Pokhara",
                "Certified private alpine trekking guide & porter support",
                "Boutique eco-luxury mountain & lakeside lodges",
                "Traditional Nepali wellness spa & sound-healing session"
            ],
            included: ["Mountain Luxury Lodges", "Domestic Flights & Transfers", "Expert Trekking Guide", "All Trek Permits & Meals", "24/7 Support"]
        },
        {
            id: "greece",
            name: "Santorini & Milos",
            country: "Greece",
            location: "Cyclades Islands, Greece",
            category: "coastal",
            categoryLabel: "Coastal & Islands",
            badge: "Top Rated",
            rating: 5.0,
            reviews: 418,
            bestSeason: "May – October",
            image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
            shortDesc: "Whitewashed caldera suites, lunar-white beaches of Sarakiniko, and golden Aegean catamaran sunsets.",
            fullDesc: "Pair Santorini's iconic cliffside elegance with the unspoiled volcanic coves of Milos. Drift across deep-blue Aegean waters on a private catamaran and stay in infinity-plunge caldera suites.",
            durations: [
                { id: "short", label: "5 Days / 4 Nights", days: 5, price: 980 },
                { id: "extended", label: "8 Days / 7 Nights", days: 8, price: 1650 }
            ],
            highlights: [
                "Private sunset catamaran cruise around the Santorini caldera",
                "Full-day exploration of Milos sea caves & Kleftiko",
                "Volcanic vineyard wine tasting overlooking the Aegean",
                "Private plunge-pool cave suite in Oia"
            ],
            included: ["Caldera Cave Suite", "Inter-Island Fast Ferry", "Sunset Catamaran Cruise", "Daily Champagne Breakfast", "VIP Port Transfers"]
        },
        {
            id: "japan",
            name: "Kyoto & Hakone",
            country: "Japan",
            location: "Kyoto & Mt. Fuji Region, Japan",
            category: "wellness",
            categoryLabel: "Wellness & Serenity",
            badge: "Signature",
            rating: 4.9,
            reviews: 276,
            bestSeason: "Mar – May & Oct – Nov",
            image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80",
            shortDesc: "Bamboo groves, private volcanic onsen ryokans, and serene Zen temple gardens steeped in timeless grace.",
            fullDesc: "Immerse yourself in the art of stillness. Walk Kyoto's quiet Arashiyama paths at dawn, participate in a private matcha ceremony, and soak in open-air hot springs beneath Mount Fuji in Hakone.",
            durations: [
                { id: "short", label: "6 Days / 5 Nights", days: 6, price: 1450 },
                { id: "extended", label: "10 Days / 9 Nights", days: 10, price: 2290 }
            ],
            highlights: [
                "Private stay in a luxury Hakone hot-spring ryokan with kaiseki dinner",
                "Early-morning guided walk through Fushimi Inari & Arashiyama",
                "Authentic tea ceremony with a Kyoto tea master",
                "First-class Shinkansen bullet train passes included"
            ],
            included: ["Luxury Ryokan & Boutique Hotel", "Shinkansen Rail Passes", "Private Cultural Host", "Kaiseki Dinners", "Pocket Wi-Fi & Concierge"]
        },
        {
            id: "switzerland",
            name: "Lauterbrunnen Alps",
            country: "Switzerland",
            location: "Bernese Oberland, Switzerland",
            category: "mountains",
            categoryLabel: "Mountains & Trekking",
            badge: "Alpine Luxury",
            rating: 4.9,
            reviews: 231,
            bestSeason: "Year-Round",
            image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=900&q=80",
            shortDesc: "Glacial waterfalls, panoramic alpine trains, and timber chalets framed by towering snow-capped peaks.",
            fullDesc: "Step into a living alpine postcard in the valley of 72 waterfalls. Ride the Jungfraujoch scenic railway, cruise emerald Lake Brienz, and unwind beside crackling chalet fireplaces with thermal spa views.",
            durations: [
                { id: "short", label: "4 Days / 3 Nights", days: 4, price: 1280 },
                { id: "extended", label: "7 Days / 6 Nights", days: 7, price: 2150 }
            ],
            highlights: [
                "First-class Jungfraujoch Top of Europe scenic rail journey",
                "Private alpine chalet suite with glacier valley balcony",
                "Thermal infinity spa & Swiss fondue dining experience",
                "Guided meadow hike from Mürren to Gimmelwald"
            ],
            included: ["5-Star Alpine Chalet", "Swiss First-Class Travel Pass", "Jungfraujoch Tickets", "Thermal Spa Access", "24/7 Concierge"]
        },
        {
            id: "morocco",
            name: "Marrakech & Atlas",
            country: "Morocco",
            location: "Marrakech & Agafay, Morocco",
            category: "culture",
            categoryLabel: "Culture & Heritage",
            badge: "Best Value",
            rating: 4.8,
            reviews: 265,
            bestSeason: "Sep – May",
            image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=900&q=80",
            shortDesc: "Lantern-lit luxury riads, starlit desert glamping, and vibrant artisan souks beneath the High Atlas.",
            fullDesc: "Awaken every sense in Morocco. Experience private courtyard tranquility inside Marrakech's finest riads, explore Berber mountain villages, and spend an unforgettable night beneath the desert stars.",
            durations: [
                { id: "short", label: "4 Days / 3 Nights", days: 4, price: 590 },
                { id: "extended", label: "6 Days / 5 Nights", days: 6, price: 940 }
            ],
            highlights: [
                "Starlit luxury desert camp dinner & overnight stay in Agafay",
                "Private curator-led artisan tour of Marrakech Medina & Majorelle",
                "Royal Moroccan hammam & argan oil spa ritual",
                "High Atlas scenic 4x4 valley excursion"
            ],
            included: ["Luxury Riad & Desert Camp", "Private 4x4 Chauffeur", "Royal Hammam Ritual", "Daily Breakfast & 2 Dinners", "24/7 Local Host"]
        },
        {
            id: "maldives",
            name: "Baa Atoll Retreat",
            country: "Maldives",
            location: "Baa Atoll UNESCO Reserve, Maldives",
            category: "wellness",
            categoryLabel: "Wellness & Serenity",
            badge: "Ultra Luxury",
            rating: 5.0,
            reviews: 198,
            bestSeason: "Nov – April",
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80",
            shortDesc: "Overwater glass-floor villas, coral lagoon snorkeling, and barefoot island tranquility in pure paradise.",
            fullDesc: "Disconnect completely in a UNESCO Biosphere Reserve. Wake up above shimmering turquoise lagoons, dine on private sandbanks under the stars, and rejuvenate at an overwater holistic wellness sanctuary.",
            durations: [
                { id: "short", label: "5 Days / 4 Nights", days: 5, price: 1890 },
                { id: "extended", label: "7 Days / 6 Nights", days: 7, price: 2780 }
            ],
            highlights: [
                "Private overwater villa with direct lagoon ladder & infinity pool",
                "Scenic seaplane transfer from Malé International Airport",
                "Guided coral reef snorkeling with marine biologist",
                "Private candlelit sandbank dinner at sunset"
            ],
            included: ["Overwater Pool Villa", "Return Seaplane Transfers", "Half-Board Fine Dining", "Snorkeling & Kayaking", "Personal Island Host"]
        }
    ],

    packages: [
        {
            id: "tranquility",
            name: "The Tranquility Pack",
            subtitle: "Short restorative escape for pure relaxation",
            badge: "Essential Escape",
            nights: "3–4 Nights",
            upgradePrice: 0,
            displayBasePrice: 490,
            featured: false,
            idealFor: "Weekend recharge & solo or couple getaways",
            features: [
                "Handpicked 4-Star Boutique Sanctuary stay",
                "Private airport pick-up & drop-off transfers",
                "Daily artisanal breakfast included",
                "1 signature guided serenity or cultural tour",
                "24/7 WhatsApp & phone concierge access",
                "Free date flexibility up to 14 days before travel"
            ]
        },
        {
            id: "explorer",
            name: "The Explorer Pack",
            subtitle: "Our signature all-in curated adventure & comfort",
            badge: "Most Popular",
            nights: "5–7 Nights",
            upgradePrice: 280,
            displayBasePrice: 1150,
            featured: true,
            idealFor: "Travelers wanting effortless luxury & deep discovery",
            features: [
                "5-Star Luxury Sanctuary or Panoramic Suite",
                "All private ground transfers & local rail/ferries",
                "Daily breakfast + 3 curated local fine dining evenings",
                "Daily private guided excursions & skip-the-line access",
                "Complimentary signature wellness spa session",
                "Dedicated 24/7 personal trip concierge & VIP check-in"
            ]
        },
        {
            id: "royal",
            name: "The Bespoke Royal Suite",
            subtitle: "Ultra-exclusive private villa & tailor-made itinerary",
            badge: "Ultra Luxury",
            nights: "7–10 Nights",
            upgradePrice: 690,
            displayBasePrice: 2200,
            featured: false,
            idealFor: "Honeymoons, anniversaries & bespoke VIP journeys",
            features: [
                "Private Pool Villa, Overwater Suite or Heritage Penthouse",
                "Private chauffeur, VIP airport fast-track & lounge access",
                "All-inclusive fine dining & private chef dinner experience",
                "Private yacht charter or scenic helicopter excursion",
                "Dedicated travel butler & custom day-by-day itinerary",
                "Complimentary professional travel photography session"
            ]
        }
    ],

    addons: [
        {
            id: "insurance",
            name: "Comprehensive Travel Protection",
            desc: "Full medical, trip cancellation, and baggage coverage worldwide",
            price: 65,
            perPerson: true
        },
        {
            id: "vipTransfer",
            name: "VIP Fast-Track & Luxury Chauffeur",
            desc: "Airport tarmac meet-and-greet, lounge access, and Mercedes transfer",
            price: 120,
            perPerson: false
        },
        {
            id: "spaPass",
            name: "Holistic Spa & Wellness Ritual",
            desc: "90-minute signature massage and private thermal sanctuary access",
            price: 140,
            perPerson: true
        },
        {
            id: "photography",
            name: "Private Travel Photographer (2 hrs)",
            desc: "50+ professionally edited high-resolution memories from your destination",
            price: 195,
            perPerson: false
        }
    ],

    promoCodes: {
        "ARKADIA10": { type: "percent", value: 10, label: "10% Exclusive Welcome Discount" },
        "SERENITY15": { type: "percent", value: 15, label: "15% Early Bird Serenity Offer" },
        "WELCOME50": { type: "flat", value: 50, label: "$50 Instant Trip Credit" }
    },

    testimonials: [
        {
            name: "Elena Vance",
            role: "Creative Director · London",
            trip: "Santorini & Milos · Explorer Pack",
            rating: 5,
            initials: "EV",
            quote: "Every single transfer, cave suite, and catamaran sunset ran like clockwork. Arkadia handled details we didn't even know to ask for. Easily the most effortless trip we've ever taken."
        },
        {
            name: "Omar El-Sayed",
            role: "Product Lead · Cairo",
            trip: "Kyoto & Hakone · Bespoke Royal",
            rating: 5,
            initials: "OE",
            quote: "Our private ryokan overlooking Mt. Fuji and early morning Arashiyama tour felt surreal. Having a 24/7 concierge adjust our dinner reservations in real time made it truly 5-star."
        },
        {
            name: "Sophia Lindqvist",
            role: "Architect · Stockholm",
            trip: "Albania Ionian Riviera · Tranquility",
            rating: 5,
            initials: "SL",
            quote: "We wanted Mediterranean beauty without tourist chaos, and Arkadia delivered beyond imagination. The Ksamil private boat day and cliffside hotel were pure perfection."
        }
    ],

    faqs: [
        {
            q: "Can I reschedule or cancel my trip if my plans change?",
            a: "Yes. Every Arkadia booking includes free date changes up to 14 days prior to departure and a full 100% refund for cancellations made 21+ days before your start date."
        },
        {
            q: "Are international flights included in the listed prices?",
            a: "Listed prices include boutique accommodation, domestic transfers/trains/seaplanes, curated experiences, and specified meals. Our concierge happily books matching international flights at zero markup upon request."
        },
        {
            q: "Can I customize an existing package or combine two destinations?",
            a: "Absolutely! Choose 'Bespoke Royal Suite' or note your wishes in the Special Requests box during checkout—or message our specialists via the Contact page for a tailored multi-country itinerary within 2 hours."
        },
        {
            q: "How does payment work? Is my booking confirmed instantly?",
            a: "Once you complete checkout, your reservation is confirmed immediately with an official Arkadia booking reference and printable itinerary. You can pay via Visa/MasterCard, PayPal, or secure Bank Transfer."
        },
        {
            q: "Do you support solo travelers, families, and corporate retreats?",
            a: "Yes! We cater to solo explorers, couples, families (with 30% reduced pricing for children under 12), and executive retreats up to 40 guests."
        }
    ],

    legal: {
        terms: {
            title: "Terms & Conditions",
            body: `
                <p><strong>Effective Date:</strong> January 2026 — Arkadia Travel International Ltd.</p>
                <h4>1. Reservations & Confirmations</h4>
                <p>All bookings made through Arkadia Travel receive an instant booking reference. Final travel vouchers, hotel confirmations, and local concierge contacts are issued immediately upon payment verification.</p>
                <h4>2. Flexible Changes & Cancellations</h4>
                <p>Travelers may modify travel dates free of charge up to 14 days before departure. Cancellations requested 21+ days prior to arrival receive a 100% refund. Cancellations between 7 and 20 days receive a 100% future travel credit valid for 24 months.</p>
                <h4>3. Travel Documentation & Insurance</h4>
                <p>Travelers are responsible for holding valid passports (minimum 6 months validity). We strongly recommend adding Comprehensive Travel Protection during checkout.</p>
                <h4>4. Concierge Commitment</h4>
                <p>Our 24/7 concierge team guarantees a response within 15 minutes during active trips and within 2 hours for pre-departure planning.</p>
            `
        },
        privacy: {
            title: "Privacy Policy",
            body: `
                <p><strong>Your privacy matters deeply to Arkadia Travel.</strong></p>
                <h4>1. Information We Collect</h4>
                <p>We collect only the details necessary to craft and confirm your journey: traveler names, contact information, itinerary preferences, and special dietary or accessibility notes.</p>
                <h4>2. Secure Payment Handling</h4>
                <p>All online payment flows use encrypted tokenization. Arkadia Travel never stores full credit card numbers or CVV codes on local or remote servers.</p>
                <h4>3. Zero Third-Party Data Selling</h4>
                <p>We never sell or rent your personal information. Booking details are shared solely with verified boutique hotel partners and private transfer hosts directly fulfilling your trip.</p>
                <h4>4. Your Rights</h4>
                <p>You may request deletion or export of your trip data at any time by contacting <strong>privacy@arkadiatravel.com</strong>.</p>
            `
        },
        careers: {
            title: "Careers at Arkadia Travel",
            body: `
                <p>We are a remote-first team of travel curators, storytellers, and hospitality technologists redefining meaningful travel.</p>
                <h4>Open Roles (2026)</h4>
                <ul>
                    <li><strong>Senior Luxury Travel Curator (Mediterranean & Japan)</strong> — Remote / Hybrid</li>
                    <li><strong>24/7 Guest Experience Concierge</strong> — Europe / MENA Timezones</li>
                    <li><strong>Destination Partnerships Manager</strong> — London / Zurich / Remote</li>
                    <li><strong>Frontend & Experience Engineer</strong> — Remote</li>
                </ul>
                <p>Think you belong on our journey? Send your portfolio or CV to <strong>careers@arkadiatravel.com</strong> and tell us about the place that changed how you see the world.</p>
            `
        }
    }
};
