/* ==========================================================================
   TRIP DATA — Tokyo + Seoul + Osaka + Hakone/Mt Fuji, Nov 3–17, 2026
   --------------------------------------------------------------------------
   This is the "published" default content for the site. Anything you change
   in Edit Mode is saved in your browser (localStorage) on top of this file.

   To make a PERMANENT change everyone sees (on a fresh browser / device):
     1. Turn on Edit Mode and make your changes as normal.
     2. Click "Export data" — this downloads a trip-data.json snapshot.
     3. Send that file back to Claude (or edit this file yourself) to bake
        the changes into DEFAULT_TRIP below, then re-upload the site.
   Everyday tweaks (adding a restaurant idea, checking off a to-do) don't
   require any of that — they just live in your browser via Edit Mode.
   ========================================================================== */

const DEFAULT_TRIP = {
  meta: {
    title: "Japan + Korea Family Trip",
    subtitle: "Tokyo → Seoul → Osaka → Hakone/Mt. Fuji → Tokyo",
    start: "2026-11-03",
    end: "2026-11-17",
    notes: "Whole group travels together this time — no more split itinerary. Every day has at least one easy-pace option flagged for the elders, Emma, Duke, and Michelle."
  },

  // ------------------------------------------------------------------------
  // TRAVELERS
  // ------------------------------------------------------------------------
  travelers: [
    { id: "dave",     name: "Dave",     role: "Trip organizer", easyPace: false, email: "dkeschner@gmail.com", phone: "", whatsapp: "", notes: "" },
    { id: "linda",    name: "Linda",    role: "", easyPace: false, email: "", phone: "", whatsapp: "", notes: "" },
    { id: "leah",     name: "Leah",     role: "", easyPace: false, email: "", phone: "", whatsapp: "", notes: "" },
    { id: "brian",    name: "Brian",    role: "", easyPace: false, email: "", phone: "", whatsapp: "", notes: "" },
    { id: "john",     name: "John",     role: "", easyPace: false, email: "", phone: "", whatsapp: "", notes: "" },
    { id: "duke",     name: "Duke",     role: "", easyPace: true,  email: "", phone: "", whatsapp: "", notes: "Traveling with Emma" },
    { id: "michelle", name: "Michelle", role: "", easyPace: true,  email: "", phone: "", whatsapp: "", notes: "Traveling with Emma" },
    { id: "mary",     name: "Mary",     role: "", easyPace: true,  email: "", phone: "", whatsapp: "", notes: "" },
    { id: "aunt",     name: "Lan",      role: "Aunt", easyPace: true,  email: "", phone: "", whatsapp: "", notes: "" },
    { id: "tony",     name: "Tony",     role: "", easyPace: false, email: "", phone: "", whatsapp: "", notes: "" },
    { id: "emma",     name: "Emma",     role: "Toddler", easyPace: true, email: "", phone: "", whatsapp: "", notes: "Bring stroller/carrier" }
  ],

  // ------------------------------------------------------------------------
  // FLIGHTS (placeholders — fill in real confirmation numbers / times)
  // ------------------------------------------------------------------------
  flights: [
    { id: "f1", date: "2026-11-03", route: "LAX → Tokyo (Narita, NRT)", travelers: "All 10", airline: "", flightNo: "", depart: "", arrive: "", confirmation: "", notes: "Overnight flight" },
    { id: "f2", date: "2026-11-06", route: "Tokyo (Narita, NRT) → Seoul (Incheon, ICN)", travelers: "All 10", airline: "", flightNo: "", depart: "", arrive: "", confirmation: "", notes: "Staying near Narita the night before to make this easier" },
    { id: "f3", date: "2026-11-09", route: "Seoul (Incheon, ICN) → Osaka (Kansai, KIX)", travelers: "All 10", airline: "", flightNo: "", depart: "", arrive: "", confirmation: "", notes: "Flying straight to Osaka instead of backtracking through Tokyo" },
    { id: "f4", date: "2026-11-17", route: "Tokyo (Narita, NRT) → LAX", travelers: "All 10", airline: "", flightNo: "", depart: "", arrive: "", confirmation: "", notes: "Departure must be out of Narita" }
  ],

  // ------------------------------------------------------------------------
  // HOTEL BOOKINGS (fill in as reservations are confirmed)
  // ------------------------------------------------------------------------
  hotelBookings: [
    { name: "Hotel Nikko Narita", cityAddress: "500 Tokko, Narita-shi, Chiba, Japan 286-0106", contact: "+81 476 32 1133 · Booked via Agoda.com, includes round-trip Narita Airport transfers", checkIn: "2026-11-04", checkOut: "2026-11-05", nights: "1", confirmation: "1027793554", website: "" }
  ],

  // ------------------------------------------------------------------------
  // FLIGHT BOOKINGS (fill in as reservations are confirmed)
  // ------------------------------------------------------------------------
  flightBookings: [],

  // ------------------------------------------------------------------------
  // BOOKINGS (general log of what's been booked and what it cost)
  // ------------------------------------------------------------------------
  bookings: [
    { city: "Narita", type: "Hotel", name: "Hotel Nikko Narita", price: "444.75" }
  ],

  // ------------------------------------------------------------------------
  // ITINERARY — each day has morning / lunch / afternoon / dinner / night
  // Each slot has 1-2 activity options plus a built-in "On your own" option.
  // tag: easy | active | foodie | travel | own
  // ------------------------------------------------------------------------
  itinerary: [
    {
      date: "2026-11-03", label: "Day 1 — Tue", city: "En route → Narita", hotel: "",
      summary: "Overnight flight to Japan — nothing else planned today besides the flight.",
      slots: {
        morning: [
          { title: "Depart LAX", desc: "Overnight flight to Tokyo Narita begins.", tag: "travel" }
        ],
        lunch: [
          { title: "In-flight", desc: "Somewhere over the Pacific.", tag: "travel" }
        ],
        afternoon: [
          { title: "In-flight", desc: "Still en route — timezone changes mean it's already tomorrow in Japan.", tag: "travel" }
        ],
        dinner: [
          { title: "In-flight meal", desc: "", tag: "travel" }
        ],
        night: [
          { title: "In-flight — try to sleep", desc: "Long overnight flight, rest up before arrival.", tag: "travel" }
        ]
      }
    },
    {
      date: "2026-11-04", label: "Day 2 — Wed", city: "Narita", hotel: "Hotel Nikko Narita",
      summary: "Arrive in Narita in the afternoon, check in to Hotel Nikko Narita, and ease into Japan nearby.",
      slots: {
        morning: [
          { title: "Still in-flight / final approach", desc: "Continuing the overnight flight — arrival isn't until the afternoon.", tag: "travel" }
        ],
        lunch: [
          { title: "In-flight meal", desc: "Final meal before landing.", tag: "travel" }
        ],
        afternoon: [
          { title: "Arrive Narita Airport, transfer to Hotel Nikko Narita", desc: "Clear immigration and customs, then take the round-trip transfer (included via Agoda) to the hotel.", place: "Narita Airport", tag: "travel" },
          { title: "Naritasan Shinshoji Temple + Omotesando street", desc: "Flat, walkable historic approach street lined with shops leading to a major temple complex — an easy afternoon stroll near the hotel.", place: "Naritasan Shinshoji Temple", city: "Narita", tag: "easy" },
          { title: "On your own", desc: "Rest and settle in after the flight.", tag: "own" }
        ],
        dinner: [
          { title: "Narita Omotesando unagi street", desc: "Historic street near Naritasan Temple known for grilled eel — a Narita specialty.", place: "Narita Omotesando", city: "Narita", tag: "foodie" },
          { title: "Hotel restaurant", desc: "No extra travel needed after a long day of flying.", tag: "easy" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Hotel rest / early sleep", desc: "Recover from the flight and get ahead of jet lag.", tag: "easy" },
          { title: "Narita town evening stroll", desc: "Quiet, low-key walk near the hotel.", tag: "easy" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-05", label: "Day 3 — Thu", city: "Tokyo → Narita area", hotel: "Narita-area hotel (TBD)",
      summary: "Last Tokyo morning, then move closer to the airport for tomorrow's early flight to Seoul.",
      slots: {
        morning: [
          { title: "Asakusa Senso-ji + Nakamise shopping street", desc: "Flat, covered arcade — easy and great for all ages.", place: "Senso-ji Temple", city: "Tokyo", tag: "easy" },
          { title: "Tsukiji Outer Market food walk", desc: "Great food stalls, but crowded and more standing/walking.", place: "Tsukiji Outer Market", city: "Tokyo", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        lunch: [
          { title: "Sushi set lunch near Asakusa", desc: "Seated sushi lunch, easy.", place: "Asakusa sushi", city: "Tokyo", tag: "easy" },
          { title: "Tempura counter lunch", desc: "", place: "Tempura restaurant", city: "Tokyo", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        afternoon: [
          { title: "Transfer to Narita-area hotel", desc: "Train (Skyliner/N'EX) or private van — positions us for an easy early flight tomorrow.", place: "Narita", tag: "travel" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Hotel restaurant", desc: "No extra travel needed — easiest option for a travel day.", tag: "easy" },
          { title: "Narita Omotesando unagi street", desc: "Historic street near Naritasan Temple known for grilled eel.", place: "Narita Omotesando", city: "Narita", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Early to bed — pack for the flight", desc: "Early wheels-up tomorrow.", tag: "easy" },
          { title: "Hotel onsen/spa", desc: "If the hotel has one — relaxing before travel.", tag: "easy" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-06", label: "Day 4 — Fri", city: "→ Seoul", hotel: "Seoul hotel (TBD)",
      summary: "Fly to Seoul, check in, ease into the city.",
      slots: {
        morning: [
          { title: "Fly Narita → Incheon", desc: "", tag: "travel" }
        ],
        lunch: [
          { title: "Airport / in-flight", desc: "", tag: "travel" }
        ],
        afternoon: [
          { title: "Arrive Incheon, transfer to hotel", desc: "AREX express train or private van, then check in.", place: "Incheon Airport", tag: "travel" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Korean BBQ near the hotel", desc: "Seated grill tables — great easy group welcome dinner.", place: "Korean BBQ restaurant", city: "Seoul", tag: "easy" },
          { title: "Euljiro food alley crawl", desc: "Old-school food-alley crawl, a Seoul-local favorite (skipping Myeongdong per local recs).", place: "Euljiro", city: "Seoul", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Rest at hotel", desc: "", tag: "easy" },
          { title: "Hongdae nightlife stroll", desc: "Lively student neighborhood, street performers, bars.", place: "Hongdae", city: "Seoul", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-07", label: "Day 5 — Sat", city: "Seoul", hotel: "Seoul hotel (TBD)",
      summary: "Palace, Insadong, and N Seoul Tower.",
      slots: {
        morning: [
          { title: "Gyeongbokgung Palace + changing of the guard", desc: "Flat paved courtyards, benches — easy, and a fun ceremony.", place: "Gyeongbokgung Palace", city: "Seoul", tag: "easy" },
          { title: "Bukchon Hanok Village walk", desc: "Beautiful but hilly, uneven lanes.", place: "Bukchon Hanok Village", city: "Seoul", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        lunch: [
          { title: "Tosokchon Samgyetang (ginseng chicken soup)", desc: "Seated, famous, easy.", place: "Tosokchon Samgyetang", city: "Seoul", tag: "easy" },
          { title: "Insadong noodle alley", desc: "", place: "Insadong", city: "Seoul", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        afternoon: [
          { title: "Insadong shopping street", desc: "Mostly flat, tea houses, galleries, souvenirs — easy.", place: "Insadong", city: "Seoul", tag: "easy" },
          { title: "N Seoul Tower via cable car", desc: "Cable car up (not Lotte Tower, per local recs) — great views, manageable.", place: "N Seoul Tower", city: "Seoul", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Group BBQ dinner in Seongsu", desc: "Trendy neighborhood, per local recs — easy seated dinner.", place: "Seongsu-dong", city: "Seoul", tag: "easy" },
          { title: "Ikseon-dong hanok dinner street", desc: "Renovated hanok alley full of restaurants and cafes.", place: "Ikseon-dong", city: "Seoul", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Hotel rest", desc: "", tag: "easy" },
          { title: "Seongsu/Hongdae bar & cafe hop", desc: "", place: "Seongsu-dong", city: "Seoul", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-08", label: "Day 6 — Sun", city: "Seoul", hotel: "Seoul hotel (TBD)",
      summary: "Markets and Seongsu, with a DMZ day-trip alternative for anyone who wants it.",
      slots: {
        morning: [
          { title: "Mangwon Market food walk", desc: "Flat market streets, great local food — easy (preferred over Gwangjang per local recs).", place: "Mangwon Market", city: "Seoul", tag: "easy" },
          { title: "DMZ day tour (all-day alternative)", desc: "Early departure, full-day bus tour — for anyone who wants to skip the regular day plan entirely.", place: "DMZ", city: "Seoul", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        lunch: [
          { title: "Market food at Mangwon", desc: "", place: "Mangwon Market", city: "Seoul", tag: "easy" },
          { title: "Korean fried chicken", desc: "", place: "Fried chicken restaurant", city: "Seoul", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        afternoon: [
          { title: "Seongsu-dong cafes & design district", desc: "Flat, trendy, easy browsing.", place: "Seongsu-dong", city: "Seoul", tag: "easy" },
          { title: "Hangang River Park bike ride", desc: "Rent bikes along the river — more active.", place: "Hangang Park", city: "Seoul", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Group BBQ send-off dinner", desc: "Last full Seoul dinner together.", place: "Korean BBQ restaurant", city: "Seoul", tag: "easy" },
          { title: "Ikseon-dong fusion Korean", desc: "", place: "Ikseon-dong", city: "Seoul", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Hotel rest, pack for Osaka flight", desc: "", tag: "easy" },
          { title: "Dongdaemun Design Plaza night market", desc: "24-hour shopping and night market scene.", place: "Dongdaemun Design Plaza", city: "Seoul", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-09", label: "Day 7 — Mon", city: "→ Osaka", hotel: "Osaka hotel (TBD)",
      summary: "Fly straight from Seoul to Osaka — skips backtracking through Tokyo.",
      slots: {
        morning: [
          { title: "Late checkout / last Seoul stroll", desc: "Pack up and enjoy a final easy morning.", tag: "easy" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        lunch: [
          { title: "Airport lunch", desc: "", tag: "travel" }
        ],
        afternoon: [
          { title: "Fly Incheon → Kansai (Osaka)", desc: "Arrive, transfer to hotel, check in.", place: "Kansai Airport", tag: "travel" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Dotonbori canal food walk", desc: "Takoyaki, okonomiyaki, neon lights — lively, some standing.", place: "Dotonbori", city: "Osaka", tag: "foodie" },
          { title: "Kuromon Ichiba Market dinner", desc: "Market stalls, easier pacing with places to sit.", place: "Kuromon Ichiba Market", city: "Osaka", tag: "easy" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Hotel rest", desc: "", tag: "easy" },
          { title: "Dotonbori night lights stroll", desc: "Flat, easy walk to see the Glico sign and canal lights.", place: "Dotonbori", city: "Osaka", tag: "easy" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-10", label: "Day 8 — Tue", city: "Osaka", hotel: "Osaka hotel (TBD)",
      summary: "Osaka Castle, markets, and shopping.",
      slots: {
        morning: [
          { title: "Osaka Castle grounds & park", desc: "Paved paths, elevator to the top of the castle — easy.", place: "Osaka Castle", city: "Osaka", tag: "easy" },
          { title: "Osaka Aquarium Kaiyukan", desc: "Indoor, escalator-based, great for all ages.", place: "Osaka Aquarium Kaiyukan", city: "Osaka", tag: "easy" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        lunch: [
          { title: "Kuromon Market lunch", desc: "", place: "Kuromon Ichiba Market", city: "Osaka", tag: "easy" },
          { title: "Okonomiyaki sit-down lunch", desc: "", place: "Okonomiyaki restaurant", city: "Osaka", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        afternoon: [
          { title: "Shinsaibashi covered shopping arcade", desc: "Flat, covered, weatherproof — easy shopping for everyone.", place: "Shinsaibashi", city: "Osaka", tag: "easy" },
          { title: "Umeda Sky Building observation deck", desc: "", place: "Umeda Sky Building", city: "Osaka", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Kushikatsu dinner in Shinsekai", desc: "Seated skewer dinner, easy and fun.", place: "Shinsekai", city: "Osaka", tag: "easy" },
          { title: "Conveyor belt sushi", desc: "Great for the group, keeps kids entertained.", place: "Kaiten-zushi restaurant", city: "Osaka", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Hotel rest", desc: "", tag: "easy" },
          { title: "Dotonbori arcades & second stroll", desc: "", place: "Dotonbori", city: "Osaka", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-11", label: "Day 9 — Wed", city: "Osaka / Kyoto (optional split day)", hotel: "Osaka hotel (TBD)",
      summary: "Choose your own adventure: easy Osaka day, or an active Kyoto day trip (Fushimi Inari).",
      slots: {
        morning: [
          { title: "Easy: Sumiyoshi Taisha Shrine + Tennoji Park/Zoo", desc: "Flat grounds, easy pacing — stays in Osaka.", place: "Sumiyoshi Taisha", city: "Osaka", tag: "easy" },
          { title: "Active: Kyoto day trip — Fushimi Inari full climb", desc: "The famous torii gate trail up the mountain — steep, ~2-3 hours round trip.", place: "Fushimi Inari Taisha", city: "Kyoto", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        lunch: [
          { title: "Tennoji food court (Osaka group)", desc: "", place: "Tennoji", city: "Osaka", tag: "easy" },
          { title: "Street food near Fushimi Inari (Kyoto group)", desc: "", place: "Fushimi Inari", city: "Kyoto", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        afternoon: [
          { title: "Easy: Shitennoji Temple", desc: "Historic, calm, easy walking.", place: "Shitennoji Temple", city: "Osaka", tag: "easy" },
          { title: "Active: Kiyomizu-dera + Higashiyama district", desc: "Beautiful but hilly, more walking (Kyoto group continues).", place: "Kiyomizu-dera", city: "Kyoto", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Group teppanyaki dinner back in Osaka", desc: "Everyone reconvenes.", place: "Teppanyaki restaurant", city: "Osaka", tag: "easy" },
          { title: "Yakitori alley crawl", desc: "", place: "Yakitori alley", city: "Osaka", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Hotel rest", desc: "", tag: "easy" },
          { title: "Namba Yasaka Shrine + local bar", desc: "Quick stop at the lion-head stage, then a nightcap.", place: "Namba Yasaka Shrine", city: "Osaka", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-12", label: "Day 10 — Thu", city: "→ Hakone / Mt. Fuji area", hotel: "Ryokan near Hakone (TBD)",
      summary: "Shinkansen to Odawara, then on to a ryokan near Hakone/Mt. Fuji.",
      slots: {
        morning: [
          { title: "Shinkansen Shin-Osaka → Odawara", desc: "Scenic, seated, easy travel day.", tag: "travel" }
        ],
        lunch: [
          { title: "Ekiben (train bento) on the Shinkansen", desc: "No walking required — easy.", tag: "easy" }
        ],
        afternoon: [
          { title: "Transfer Odawara → Hakone, ryokan check-in", desc: "Hakone Tozan train or direct bus.", place: "Hakone", tag: "travel" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Ryokan kaiseki dinner", desc: "Multi-course, seated, included — the trip's signature group meal.", place: "Ryokan", city: "Hakone", tag: "easy" }
        ],
        night: [
          { title: "Ryokan onsen soak", desc: "Relaxing hot spring — easy and a highlight for everyone.", tag: "easy" },
          { title: "Quiet stroll near the ryokan", desc: "", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-13", label: "Day 11 — Fri", city: "Hakone / Mt. Fuji", hotel: "Ryokan near Hakone (TBD)",
      summary: "Lake Ashi, Owakudani, and Mt. Fuji views (weather permitting).",
      slots: {
        morning: [
          { title: "Easy: Hakone Open-Air Museum", desc: "Flat paths, sculpture garden, indoor pavilions.", place: "Hakone Open-Air Museum", city: "Hakone", tag: "easy" },
          { title: "Active: Old Tokaido Road cedar-lined hike", desc: "Historic stone-paved trail — uneven footing, moderate-strenuous.", place: "Old Tokaido Road", city: "Hakone", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        lunch: [
          { title: "Soba noodle lunch near Lake Ashi", desc: "Seated, easy.", place: "Lake Ashi soba restaurant", city: "Hakone", tag: "easy" },
          { title: "Trail picnic lunch", desc: "For the hiking group.", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        afternoon: [
          { title: "Lake Ashi cruise + Hakone Shrine floating torii", desc: "Boat ride, short walk — easy and scenic.", place: "Lake Ashi", city: "Hakone", tag: "easy" },
          { title: "Owakudani ropeway + black eggs", desc: "Volcanic valley, ropeway, Mt. Fuji views if clear — some walking.", place: "Owakudani", city: "Hakone", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Ryokan kaiseki dinner", desc: "", place: "Ryokan", city: "Hakone", tag: "easy" },
          { title: "Hakone-Yumoto shopping street dinner", desc: "", place: "Hakone-Yumoto", city: "Hakone", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Onsen soak", desc: "", tag: "easy" },
          { title: "Stargazing / Mt. Fuji night view", desc: "If skies are clear.", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-14", label: "Day 12 — Sat", city: "→ Tokyo", hotel: "Tokyo hotel (TBD)",
      summary: "Scenic train back to Tokyo, afternoon shopping/sightseeing.",
      slots: {
        morning: [
          { title: "Odakyu Romancecar Hakone → Shinjuku", desc: "Scenic, seated, easy travel.", tag: "travel" }
        ],
        lunch: [
          { title: "Depachika or noodle lunch in Shinjuku", desc: "", place: "Shinjuku", city: "Tokyo", tag: "easy" }
        ],
        afternoon: [
          { title: "Shibuya Crossing + Shibuya Sky", desc: "Escalators/elevators, easy-ish, iconic.", place: "Shibuya Crossing", city: "Tokyo", tag: "easy" },
          { title: "Harajuku Takeshita Street", desc: "Fun but crowded, more walking.", place: "Takeshita Street", city: "Tokyo", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Group izakaya dinner", desc: "", place: "Shinjuku izakaya", city: "Tokyo", tag: "easy" },
          { title: "Shabu-shabu hot pot", desc: "", place: "Shabu-shabu restaurant", city: "Tokyo", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Hotel rest", desc: "", tag: "easy" },
          { title: "Shinjuku Golden Gai", desc: "", place: "Golden Gai", city: "Tokyo", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-15", label: "Day 13 — Sun", city: "Tokyo", hotel: "Tokyo hotel (TBD)",
      summary: "Ueno, Akihabara, and more.",
      slots: {
        morning: [
          { title: "Asakusa revisit or Tokyo National Museum", desc: "Indoor, seating available — easy.", place: "Tokyo National Museum", city: "Tokyo", tag: "easy" },
          { title: "Tsukiji Outer Market breakfast crawl", desc: "", place: "Tsukiji Outer Market", city: "Tokyo", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        lunch: [
          { title: "Sushi lunch", desc: "", place: "Sushi restaurant", city: "Tokyo", tag: "easy" },
          { title: "Soba shop", desc: "", place: "Soba restaurant", city: "Tokyo", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        afternoon: [
          { title: "Ueno Park + Ueno Zoo", desc: "Flat, benches everywhere — great with Emma.", place: "Ueno Park", city: "Tokyo", tag: "easy" },
          { title: "Akihabara electronics & anime district", desc: "Fun but crowded, more walking.", place: "Akihabara", city: "Tokyo", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Family-style sukiyaki hot pot", desc: "", place: "Sukiyaki restaurant", city: "Tokyo", tag: "easy" },
          { title: "Last-night group izakaya", desc: "", place: "Izakaya", city: "Tokyo", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Pack, hotel rest", desc: "", tag: "easy" },
          { title: "Tokyo Tower night view", desc: "", place: "Tokyo Tower", city: "Tokyo", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-16", label: "Day 14 — Mon", city: "Tokyo", hotel: "Tokyo hotel (TBD)",
      summary: "Buffer day — last-minute shopping, weather makeup day, farewell dinner.",
      slots: {
        morning: [
          { title: "Hamarikyu Gardens", desc: "Flat paths, teahouse, benches — easy.", place: "Hamarikyu Gardens", city: "Tokyo", tag: "easy" },
          { title: "Last-minute Ginza shopping", desc: "", place: "Ginza", city: "Tokyo", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        lunch: [
          { title: "Ginza department store food hall", desc: "", place: "Ginza", city: "Tokyo", tag: "easy" },
          { title: "Try a new ramen spot", desc: "", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        afternoon: [
          { title: "Free time / buffer", desc: "Weather makeup day or last souvenir run.", tag: "easy" },
          { title: "Odaiba (teamLab Borderless / Gundam statue)", desc: "If not already done.", place: "Odaiba", city: "Tokyo", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        dinner: [
          { title: "Group farewell dinner", desc: "Reserve somewhere special — last night together.", tag: "easy" },
          { title: "Casual final izakaya", desc: "", tag: "foodie" },
          { title: "On your own", desc: "", tag: "own" }
        ],
        night: [
          { title: "Final packing, weigh luggage, early rest", desc: "", tag: "easy" },
          { title: "One last night view / dessert spot", desc: "", tag: "active" },
          { title: "On your own", desc: "", tag: "own" }
        ]
      }
    },
    {
      date: "2026-11-17", label: "Day 15 — Tue", city: "Tokyo → LAX", hotel: "—",
      summary: "Head home.",
      slots: {
        morning: [
          { title: "Check out, transfer to Narita", desc: "Skyliner/N'EX or private van (recommended given luggage).", place: "Narita Airport", tag: "travel" }
        ],
        lunch: [
          { title: "Airport lunch / duty-free", desc: "", tag: "travel" }
        ],
        afternoon: [
          { title: "Depart Narita → LAX", desc: "", tag: "travel" }
        ],
        dinner: [
          { title: "In-flight", desc: "", tag: "travel" }
        ],
        night: [
          { title: "In-flight / arrive LAX", desc: "Welcome home!", tag: "travel" }
        ]
      }
    }
  ],

  // ------------------------------------------------------------------------
  // TO-DO LIST BY PERSON
  // ------------------------------------------------------------------------
  todosByPerson: {
    dave:     [ { text: "Coordinate group reservations (ryokan, group dinners)", done: false }, { text: "Confirm all flight bookings", done: false }, { text: "Share this site link with everyone", done: false } ],
    linda:    [ { text: "Check passport expiration (6+ months validity)", done: false }, { text: "Pack for cool Nov weather (~50–60°F)", done: false } ],
    leah:     [ { text: "Check passport expiration", done: false }, { text: "Confirm Korea entry requirements (K-ETA/visa)", done: false } ],
    brian:    [ { text: "Check passport expiration", done: false }, { text: "Arrange international phone plan / eSIM", done: false } ],
    john:     [ { text: "Check passport expiration", done: false }, { text: "Confirm Korea entry requirements (K-ETA/visa)", done: false } ],
    duke:     [ { text: "Pack toddler travel essentials for Emma", done: false }, { text: "Bring stroller/carrier", done: false }, { text: "Check if a car seat is needed for transfers", done: false } ],
    michelle: [ { text: "Pack Emma's medications / snacks / entertainment", done: false }, { text: "Check passport expiration (Emma's too)", done: false } ],
    mary:     [ { text: "Check passport expiration", done: false }, { text: "Pack comfortable walking shoes", done: false } ],
    aunt:     [ { text: "Check passport expiration", done: false }, { text: "Flag any mobility needs for daily planning", done: false } ],
    tony:     [ { text: "Check passport expiration (6+ months validity)", done: false } ],
    emma:     [ { text: "Pack comfort items (favorite toy/blanket)", done: false } ]
  },

  // ------------------------------------------------------------------------
  // ACTION ITEMS (trip-wide bookings / logistics)
  // ------------------------------------------------------------------------
  actionItems: [
    { text: "Book all flights (LAX↔NRT, NRT→ICN, ICN→KIX)", owner: "Dave", due: "", done: false },
    { text: "Book Hakone ryokan (signature group experience)", owner: "Dave", due: "", done: false },
    { text: "Pre-book teamLab Planets tickets", owner: "Dave", due: "", done: false },
    { text: "Book Seoul group lodging", owner: "Dave", due: "", done: false },
    { text: "Book Osaka group lodging", owner: "Dave", due: "", done: false },
    { text: "Book Tokyo group lodging (both stays)", owner: "Dave", due: "", done: false },
    { text: "Confirm Korea entry requirements (K-ETA/visa) for all 10 travelers", owner: "Dave", due: "", done: false },
    { text: "Arrange travel insurance for the group", owner: "Dave", due: "", done: false },
    { text: "Arrange pocket WiFi or SIM/eSIM for Japan and Korea", owner: "Dave", due: "", done: false },
    { text: "Get Suica/Pasmo cards for Japan transit", owner: "Dave", due: "", done: false },
    { text: "Get T-money cards for Seoul transit", owner: "Dave", due: "", done: false },
    { text: "Reserve group-size restaurant tables in advance where needed", owner: "Dave", due: "", done: false },
    { text: "Book Shinkansen tickets (Shin-Osaka → Odawara)", owner: "Dave", due: "", done: false },
    { text: "Arrange airport ride for departure day", owner: "", due: "", done: false },
    { text: "Arrange ride home for return day", owner: "", due: "", done: false }
  ],

  // ------------------------------------------------------------------------
  // PARKING LOT ITEMS (loose ideas / things to figure out later)
  // ------------------------------------------------------------------------
  parkingLot: [],

  // ------------------------------------------------------------------------
  // PREP TIMELINE (packing/organizing → airport → trip → arrival back)
  // ------------------------------------------------------------------------
  timeline: [
    { when: "8 weeks before", text: "Confirm final headcount & rooming, finalize all flights", done: false },
    { when: "6 weeks before", text: "Book key reservations: ryokan, teamLab, big group dinners", done: false },
    { when: "4 weeks before", text: "Confirm Korea entry requirements and apply for any needed authorization", done: false },
    { when: "3 weeks before", text: "Arrange pocket WiFi/SIM rental and travel insurance", done: false },
    { when: "2 weeks before", text: "Start packing lists per person, check weather forecast", done: false },
    { when: "1 week before", text: "Confirm airport ride/parking, notify banks of travel, get some JPY/KRW cash", done: false },
    { when: "2 days before", text: "Charge devices/power banks, download offline maps, save key confirmations", done: false },
    { when: "Day before departure", text: "Pack bags, weigh luggage, lay out day-of essentials", done: false },
    { when: "Departure day", text: "Ride to airport, check in, security, board", done: false },
    { when: "On arrival in Tokyo", text: "Immigration, SIM/WiFi pickup, transfer to hotel", done: false },
    { when: "Mid-trip", text: "Laundry day, restock essentials, check in on everyone's energy levels", done: false },
    { when: "Last day", text: "Pack up, reconfirm departure transfer time", done: false },
    { when: "Return day", text: "Ride to Narita, flight home", done: false },
    { when: "On arrival back home", text: "Ride from airport, unpack, ease back into routine", done: false },
    { when: "Few days after return", text: "Share photos, settle up any shared expenses", done: false }
  ]
};
