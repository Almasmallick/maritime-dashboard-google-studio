import { 
  LaneRate, 
  MarketDevelopment, 
  OpportunitySignal, 
  HardestFallSignal, 
  FreightIndexQuote, 
  PortChokepointStatus, 
  IndiaTradeSector, 
  IndiaPortAdvisory, 
  DataSourceMeta 
} from '../types';

export const SNAPSHOT_DATE = "24 Oct 2026";
export const SNAPSHOT_LABEL = "Sourced snapshot of 24 Oct 2026 · Not live AIS/streaming";

export const BASELINE_DATES = [
  { index: 0, date: "20 Aug 2026", shortLabel: "20 Aug" },
  { index: 1, date: "8 Oct 2026", shortLabel: "8 Oct" }
];

export const LATEST_DATE_LABEL = "22 Oct 2026";

// Drewry World Container Index Composite history
export const WCI_COMPOSITE = [
  { date: "20 Aug", value: 4526 },
  { date: "8 Oct", value: 4351 },
  { date: "15 Oct", value: 4485 },
  { date: "22 Oct", value: 4585 }
];

// Drewry 8 key trade lanes (rates in USD/FEU)
// Index 0 = 20 Aug, Index 1 = 8 Oct, Index 2 = 22 Oct (latest)
export const LANES_DATA: LaneRate[] = [
  {
    id: "SHA-LAX",
    name: "Shanghai → Los Angeles",
    rates: [6802, 7624, 8007],
    origin: "Shanghai (East Asia)",
    destination: "Los Angeles (US West Coast)",
    direction: "Transpacific Eastbound",
    source: "Drewry WCI"
  },
  {
    id: "SHA-NYC",
    name: "Shanghai → New York",
    rates: [9507, 10220, 10166],
    origin: "Shanghai (East Asia)",
    destination: "New York (US East Coast)",
    direction: "Transpacific Eastbound / Panama / Suez",
    source: "Drewry WCI"
  },
  {
    id: "SHA-RTM",
    name: "Shanghai → Rotterdam",
    rates: [4401, 3337, 3632],
    origin: "Shanghai (East Asia)",
    destination: "Rotterdam (North Europe)",
    direction: "Asia–Europe Westbound",
    source: "Drewry WCI"
  },
  {
    id: "SHA-GOA",
    name: "Shanghai → Genoa",
    rates: [4955, null, 4152],
    origin: "Shanghai (East Asia)",
    destination: "Genoa (Mediterranean)",
    direction: "Asia–Med Westbound",
    source: "Drewry WCI"
  },
  {
    id: "RTM-NYC",
    name: "Rotterdam → New York",
    rates: [null, null, 3181],
    origin: "Rotterdam (North Europe)",
    destination: "New York (US East Coast)",
    direction: "Transatlantic Westbound",
    source: "Drewry WCI"
  },
  {
    id: "NYC-RTM",
    name: "New York → Rotterdam",
    rates: [null, null, 1158],
    origin: "New York (US East Coast)",
    destination: "Rotterdam (North Europe)",
    direction: "Transatlantic Eastbound",
    source: "Drewry WCI"
  },
  {
    id: "LAX-SHA",
    name: "Los Angeles → Shanghai",
    rates: [null, null, 847],
    origin: "Los Angeles (US West Coast)",
    destination: "Shanghai (East Asia)",
    direction: "Transpacific Westbound (Backhaul)",
    source: "Drewry WCI"
  },
  {
    id: "RTM-SHA",
    name: "Rotterdam → Shanghai",
    rates: [null, null, 646],
    origin: "Rotterdam (North Europe)",
    destination: "Shanghai (East Asia)",
    direction: "Europe–Asia Eastbound (Backhaul)",
    source: "Drewry WCI"
  }
];

// Market Developments: Each answers the 5 required questions
export const MARKET_DEVELOPMENTS: MarketDevelopment[] = [
  {
    id: "dev-1",
    title: "Asia–Europe Spot Rebounds on Carrier Blank Sailings & GRIs Ahead of 2027 Contracts",
    category: "Capacity / Blanks",
    whatChanged: "Shanghai to Rotterdam spot rates lifted +8.8% to $3,632/FEU following 8 announced blank sailings for next week (up from 2), alongside carrier general rate increases (GRIs).",
    comparedPeriod: "Compared to the 8 Oct trough ($3,337/FEU), though still -17.5% below 20 Aug summer peak ($4,401/FEU).",
    whyItMatters: "Carriers are aggressively withdrawing vessel capacity to halt spot erosion before negotiating multi-year 2027 enterprise freight contracts. Price moves here represent artificial supply contraction, not organic demand resurgence.",
    evidence: "Drewry WCI reported 8 blank sailings on Asia-Europe next week vs 2; Freightos reported carriers pushing GRIs while European import bookings remain stable.",
    nextSteps: "Monitor whether announced blank sailings actually stick or trigger roll pools, and inspect booking confirmation ratios into week 44.",
    severity: "warning",
    source: "Drewry WCI & Freightos Research",
    sourceUrl: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry",
    date: "22 Oct 2026"
  },
  {
    id: "dev-2",
    title: "Strait of Hormuz Security Escalation: Sunk Container Vessel & War-Risk Premia Surge",
    category: "Chokepoint / Security",
    whatChanged: "Iranian naval attacks on commercial shipping escalated in the Strait of Hormuz, resulting in a Dubai-linked container feeder being sunk last week and crude touching ~$100/bbl.",
    comparedPeriod: "Compared with relative stability in late September 2026.",
    whyItMatters: "Drewry Intra-Asia index highlights Shanghai–Jebel Ali container rates hovering at an elevated $8,451/FEU. Feeders connecting India (Mundra/JNPT) to Arabian Gulf ports face soaring P&I war-risk surcharges.",
    evidence: "Freightos Maritime Update (20 Oct); Drewry Intra-Asia Container Index (IACI 22 Oct). Multiple P&I clubs issued emergency breach notifications.",
    nextSteps: "Check insurance war-risk rider costs prior to Gulf-bound bookings and review alternate land-bridge transshipment options via Oman (Sohar/Salalah).",
    severity: "down",
    source: "Freightos & Drewry IACI",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/",
    date: "20 Oct 2026"
  },
  {
    id: "dev-3",
    title: "Transpacific Eastbound Maintains High Plateau: Shanghai to LA Breaks $8,000/FEU",
    category: "Rate Movement",
    whatChanged: "Shanghai to Los Angeles spot rates gained +5.0% WoW to reach $8,007/FEU, reflecting persistent post-peak inventory replenishment and tight West Coast railcar supply.",
    comparedPeriod: "Compared to 8 Oct ($7,624/FEU, +5.0%) and 20 Aug ($6,802/FEU, +17.7%).",
    whyItMatters: "US West Coast remains the preferred hedge against US East Coast ILA labor uncertainties. Meanwhile, Shanghai–New York held flat at $10,166/FEU (-0.5% vs 8 Oct), narrowing the East/West coast price spread.",
    evidence: "Drewry WCI 22 Oct report; Freightos FBX01 printed $8,126/FEU on 20 Oct, providing dual independent corroboration of $8k+ levels.",
    nextSteps: "Evaluate inland intermodal dwell at LA/Long Beach and compare landed ocean differential vs direct East Coast water routes.",
    severity: "up",
    source: "Drewry WCI & Freightos FBX",
    sourceUrl: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry",
    date: "22 Oct 2026"
  },
  {
    id: "dev-4",
    title: "Indian Export Boom Reaches +23.0% YoY in September, Deficit Widens to $30.2B",
    category: "Trade Flow",
    whatChanged: "India's monthly merchandise exports jumped +23.04% YoY to $44.40B in September (second consecutive month above 20%), led by electronics (+33.8%) and engineering goods (+10.5%).",
    comparedPeriod: "Compared with September 2025 ($36.08B) and August 2026 ($41.5B).",
    whyItMatters: "Containerized export volumes from JNPT (Nhava Sheva) and Mundra are running hot, yet merchandise imports grew to $74.61B (+8.0%), swelling the half-year trade deficit to $177.64B and pressuring exporter net margins.",
    evidence: "Ministry of Commerce and Industry (MoCI), Government of India press release 15 Oct 2026; confirmed by Export Promotion Councils.",
    nextSteps: "Verify container equipment availability at inland container depots (ICDs like Dadri, Ludhiana) and verify that forwarders do not pass on phantom demurrage.",
    severity: "up",
    source: "Ministry of Commerce & Industry, India",
    sourceUrl: "https://www.jmfinancialservices.in/market-news-and-insights/1737084",
    date: "15 Oct 2026"
  },
  {
    id: "dev-5",
    title: "Port of Shanghai Berth Congestion Eases 61%, Reducing Transpacific Transit Delays",
    category: "Port Dwell",
    whatChanged: "Average vessel waiting time at Shanghai anchorages plummeted from 97 hours in week 38 down to 38 hours in week 42 (-61%).",
    comparedPeriod: "Compared with week 38 (late September 2026 typhoon backlog).",
    whyItMatters: "Vessel turnarounds have normalized, reducing scheduled departure slippage for Pacific and European strings and releasing stranded empty container equipment back into Asian circulation.",
    evidence: "Drewry Port Berth Tracker week 42 report, corroborating terminal gate throughput recovery post-Golden Week.",
    nextSteps: "Shippers can expect reduced port origin delays at Yangshan and Waigaoqiao; verify feeder connection reliability from Ningbo and Qingdao.",
    severity: "up",
    source: "Drewry Port Tracker",
    sourceUrl: "https://www.drewry.co.uk/trackers-and-indices/latest-trackers-and-indices",
    date: "22 Oct 2026"
  }
];

// Opportunities Radar with verified evidence count & clear commercial distinction
export const OPPORTUNITIES_DATA: OpportunitySignal[] = [
  {
    id: "opp-1",
    name: "India Engineering, Electronics & Petroleum Export Expansion",
    type: "Trade flow",
    scope: "India → Global Markets (US, EU, UAE)",
    metric: "Sep merch exports $44.40B (+23.04% YoY)",
    growthPct: 23.04,
    comparisonPeriod: "September 2026 vs September 2025; H1 $259.89B (+18.51%)",
    evidenceCount: 2,
    evidenceText: "Official MoCI monthly trade data corroborated by Engineering Export Promotion Council (EEPC) and FIEO shipment logs.",
    whoCouldBenefit: "High-value electronics/engineering manufacturers; ocean forwarders with dedicated block allocations at JNPT and Mundra.",
    commercialHypothesis: "Trade volume expansion is verified fact; commercial profit margins remain an unconfirmed hypothesis due to ocean freight surcharges and Gulf war-risk additions.",
    risksAndCounterEvidence: "Merchandise imports expanded +8% to $74.61B, widening H1 deficit to $177.64B. Carrier bunker surcharges and high feeder fees at regional transshipment hubs threaten net trading margins.",
    confidence: "High",
    source: "Ministry of Commerce & Industry, GoI",
    observationDate: "15 Oct 2026",
    sourceUrl: "https://www.jmfinancialservices.in/market-news-and-insights/1737084"
  },
  {
    id: "opp-2",
    name: "Asia–Europe 2027 Annual Contract Tender Timing Window",
    type: "Freight",
    scope: "Asia → Northern Europe & Mediterranean",
    metric: "WCI SHA–RTM spot at $3,632/FEU (-17.5% vs 20 Aug)",
    growthPct: -17.47,
    comparisonPeriod: "October 2026 vs August 2026 summer peak ($4,401)",
    evidenceCount: 2,
    evidenceText: "Drewry WCI lane tracking + Freightos weekly market commentary on carrier Q1 2027 full Suez canal return projections.",
    whoCouldBenefit: "BCO importers and freight forwarders negotiating long-term contracts for the 2027 calendar year.",
    commercialHypothesis: "Importers can leverage current spot depression and returning Suez canal capacity to lock in lower fixed base rates before carriers establish higher GRI baselines.",
    risksAndCounterEvidence: "Carrier blank sailings (8 next week) are actively pushing spot upward; any new Red Sea/Hormuz security escalation will immediately overturn capacity recovery assumptions.",
    confidence: "Medium",
    source: "Drewry WCI & Freightos Intelligence",
    observationDate: "22 Oct 2026",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/"
  },
  {
    id: "opp-3",
    name: "Transatlantic Westbound Rate Stability for European Exporters",
    type: "Freight",
    scope: "North Europe ↔ US East Coast",
    metric: "Spot at ~$2,850 – $3,181/FEU (~+25% YoY)",
    growthPct: 25.0,
    comparisonPeriod: "October 2026 vs October 2025 baseline (~$2,280/FEU)",
    evidenceCount: 2,
    evidenceText: "Freightos FBX weekly assessment (~$2,850) and Drewry WCI RTM–NYC ($3,181/FEU). Rate rose only ~$200 despite announced October GRIs.",
    whoCouldBenefit: "European machinery, chemical and automotive parts shippers facing stable Transatlantic vessel scheduling.",
    commercialHypothesis: "Transatlantic is exhibiting high operational resilience compared to volatile Suez-affected routes.",
    risksAndCounterEvidence: "Higher bunker expenses erode carrier margins; port turnaround time at Antwerp and Rotterdam remains vulnerable to European rail feeder bottlenecks.",
    confidence: "Medium",
    source: "Freightos Weekly & Drewry WCI",
    observationDate: "20 Oct 2026",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/"
  },
  {
    id: "opp-4",
    name: "Nhava Sheva & Mundra as Regional Gulf-Diversion Hubs",
    type: "Port connectivity",
    scope: "West Coast India ↔ Arabian Sea & Middle East",
    metric: "Vessels naming Nhava Sheva as arrival port rose from 21 to 36 (historical mid-2026 trade press)",
    growthPct: null,
    comparisonPeriod: "Mid-2026 trade press reporting vs early 2026 baseline",
    evidenceCount: 1,
    evidenceText: "Single trade press report (The Loadstar) quoting carrier intentions; no subsequent real-time container throughput verification available in free databases.",
    whoCouldBenefit: "Regional transshipment feeder operators; Indian customs-bonded free trade warehousing zones.",
    commercialHypothesis: "Indian western seaboard ports could capture transshipment traffic avoiding dangerous Gulf waterways.",
    risksAndCounterEvidence: "INSUFFICIENT CONTEMPORARY EVIDENCE: Reports from May–July noted severe truck-driver shortages and yard density at JNPT; current berth waiting times are unavailable in public feeds.",
    confidence: "Low-Medium",
    source: "The Loadstar (Historical Trade Press)",
    observationDate: "Mid-2026 (Dated)",
    sourceUrl: "https://theloadstar.com/india-waives-storage-fees-as-ports-and-carriers-tackle-trade-disruption/"
  }
];

// Hardest Falls with separate classifications and kind
export const HARDEST_FALLS_DATA: HardestFallSignal[] = [
  {
    id: "fall-1",
    name: "Asia → North Europe Spot Freight (Drewry WCI SHA–RTM)",
    laneKey: "SHA-RTM",
    changePct: -17.47,
    basis: "vs 20 Aug 2026 ($4,401 → $3,632/FEU)",
    classification: "Persistent decline",
    kind: "price",
    plausibleDriver: "Post-summer seasonal volume slack combined with gradual market pricing in anticipated Q1 2027 Suez canal return; partial rebound underway via 8 blank sailings.",
    exposedStakeholders: "Ocean carriers (EBITDA contraction); freight forwarders with high fixed-contract commitments. Beneficiaries: European BCO importers.",
    confirmationCheck: "Check if carrier GRIs stick beyond week 44 and verify Shanghai booking volumes into November.",
    evidenceCount: 2,
    source: "Drewry WCI",
    observationDate: "22 Oct 2026",
    sourceUrl: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry"
  },
  {
    id: "fall-2",
    name: "Freightos FBX11 Asia → North Europe Spot Assessment",
    laneKey: "FBX11",
    changePct: -40.66,
    basis: "vs 14 Jul 2026 (~$5,800 → $3,442/FEU)",
    classification: "Persistent decline",
    kind: "price",
    plausibleDriver: "Steep drop from summer panic peaks as Cape of Good Hope routings became standardized and European retail inventories stabilized.",
    exposedStakeholders: "Container lines operating on Asia–Europe loop; non-vessel operating common carriers (NVOCCs).",
    confirmationCheck: "Compare spot vs contract spread in European freight tenders.",
    evidenceCount: 2,
    source: "Freightos Baltic Index",
    observationDate: "20 Oct 2026",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/"
  },
  {
    id: "fall-3",
    name: "Asia → Mediterranean Spot Freight (Drewry WCI SHA–GOA)",
    laneKey: "SHA-GOA",
    changePct: -16.21,
    basis: "vs 20 Aug 2026 ($4,955 → $4,152/FEU)",
    classification: "Persistent decline",
    kind: "price",
    plausibleDriver: "Decline in Mediterranean import demand following peak season; transshipment bypass via Mediterranean hubs (Valencia, Algeciras) stabilizing.",
    exposedStakeholders: "Southern European retail importers; Italian and Spanish forwarders.",
    confirmationCheck: "Examine Asia–Med vessel booking utilization and weekly Suez transit figures.",
    evidenceCount: 2,
    source: "Drewry WCI",
    observationDate: "22 Oct 2026",
    sourceUrl: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry"
  },
  {
    id: "fall-4",
    name: "Baltic Exchange Asia → US East Coast Daily Index",
    laneKey: "USEC-Daily",
    changePct: -7.69,
    basis: "Week to 23 Oct (10,754 → 9,927 index points)",
    classification: "Temporary volatility",
    kind: "price",
    plausibleDriver: "Single-week daily index contraction following settlement of immediate port strike threats; note: this daily index uses a different methodology from weekly FBX/WCI.",
    exposedStakeholders: "USEC carrier loops and spot forwarders.",
    confirmationCheck: "Wait for two consecutive weekly FBX prints to determine if a structural downward trend exists.",
    evidenceCount: 1,
    source: "Baltic Exchange (via The Edge Malaysia)",
    observationDate: "23 Oct 2026",
    sourceUrl: "https://theedgemalaysia.com/node/823074"
  },
  {
    id: "fall-5",
    name: "Global Container Port Throughput Index (Drewry)",
    laneKey: "PORT-THRU",
    changePct: -1.30,
    basis: "YoY July 2026 (-3.3% MoM contraction)",
    classification: "Emerging warning",
    kind: "demand",
    plausibleDriver: "Macroeconomic volume deceleration; this is a genuine trade physical volume metric, unlike spot freight prices.",
    exposedStakeholders: "Global terminal operators, port authorities, feeder service providers.",
    confirmationCheck: "Review upcoming August and September Drewry throughput index releases to verify whether contraction persists.",
    evidenceCount: 1,
    source: "Drewry Trackers & Indices",
    observationDate: "1 Oct 2026",
    sourceUrl: "https://www.drewry.co.uk/trackers-and-indices/latest-trackers-and-indices"
  },
  {
    id: "fall-6",
    name: "Strait of Hormuz Security & Gulf Operational Passage",
    laneKey: "HORMUZ-RISK",
    changePct: null,
    basis: "Qualitative physical security degradation",
    classification: "Sharp deterioration",
    kind: "ops",
    plausibleDriver: "Escalation of state and proxy attacks in Strait of Hormuz; sinking of commercial container vessel and spike in crude to ~$100/bbl.",
    exposedStakeholders: "India–Gulf trade routes, Jebel Ali transshipment cargo, fuel-sensitive international liner networks.",
    confirmationCheck: "Daily Hormuz vessel transit tracking, war-risk P&I insurance premia quotes, and emergency bunker surcharge announcements.",
    evidenceCount: 2,
    source: "Freightos & Drewry IACI",
    observationDate: "20 Oct 2026",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/"
  }
];

// Freightos FBX weekly assessment points
export const FBX_INDEX_DATA: FreightIndexQuote[] = [
  {
    name: "Asia → US West Coast (FBX01)",
    points: [
      ["14 Jul", "~$7,500", 7500],
      ["18 Aug", "~$7,400", 7400],
      ["20 Oct", "$8,126", 8126]
    ],
    description: "Assesses 40ft spot container rates from major ports in China/East Asia to US West Coast ports.",
    methodology: "Freightos transactional algorithm including bunker adjustment factor (BAF).",
    source: "Freightos Weekly Update",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/"
  },
  {
    name: "Asia → US East Coast (FBX03)",
    points: [
      ["14 Jul", "~$9,000", 9000],
      ["18 Aug", "~$9,400", 9400],
      ["20 Oct", "$9,700", 9700]
    ],
    description: "Assesses spot rates from East Asia to US East Coast ports via Panama or Suez/Cape.",
    methodology: "Freightos transactional marketplace median.",
    source: "Freightos Weekly Update",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/"
  },
  {
    name: "Asia → North Europe (FBX11)",
    points: [
      ["14 Jul", "~$5,800", 5800],
      ["20 Oct", "$3,442", 3442]
    ],
    description: "Assesses spot container rates from East Asia to Antwerp, Rotterdam, Hamburg, Southampton.",
    methodology: "Freightos transactional quotes including Cape of Good Hope transit adjustments.",
    source: "Freightos Weekly Update",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/"
  },
  {
    name: "Asia → Mediterranean (FBX13)",
    points: [
      ["18 Aug", "~$5,000", 5000],
      ["20 Oct", "$3,927", 3927]
    ],
    description: "Assesses spot rates from East Asia to West Mediterranean base ports (Genoa, Barcelona, Valencia).",
    methodology: "Freightos transactional marketplace benchmark.",
    source: "Freightos Weekly Update",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/"
  }
];

// Strategic Chokepoints & Ports
export const CHOKEPOINTS_DATA: PortChokepointStatus[] = [
  {
    id: "choke-1",
    node: "Strait of Hormuz",
    region: "Middle East / Persian Gulf",
    reading: "Attacks escalating; commercial container ship sunk last week; Brent crude ~$100/bbl",
    status: "dn",
    source: "Freightos Maritime Advisory",
    date: "20 Oct 2026",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/",
    actionGuidance: "Verify war-risk insurance surcharges before booking Gulf-bound cargo; evaluate overland trucking via Oman.",
    freshness: "Verified recent"
  },
  {
    id: "choke-2",
    node: "Bab el-Mandeb / Southern Red Sea",
    region: "Red Sea",
    reading: "Houthi missile threat elevated; carriers planning phased return; full return projected Q1 2027",
    status: "wa",
    source: "Freightos Weekly Update",
    date: "20 Oct 2026",
    sourceUrl: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/",
    actionGuidance: "Continue factoring 10-14 days Cape detour into European delivery schedules until formal carrier network shifts.",
    freshness: "Verified recent"
  },
  {
    id: "choke-3",
    node: "Suez Canal Transits",
    region: "Egypt / Red Sea",
    reading: "55 weekly container sailings recorded in week 42 (vs 54 in week 41)",
    status: "wa",
    source: "Drewry Maritime Research",
    date: "22 Oct 2026",
    sourceUrl: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry",
    actionGuidance: "Monitor weekly transit counts as an early indicator of carrier fleet repositioning.",
    freshness: "Verified recent"
  },
  {
    id: "choke-4",
    node: "Port of Shanghai (Yangshan & Waigaoqiao)",
    region: "East Asia",
    reading: "Average vessel waiting time dropped to 38 hours (from 97 hours in wk38, -61%)",
    status: "up",
    source: "Drewry Port Tracker",
    date: "22 Oct 2026",
    sourceUrl: "https://www.drewry.co.uk/trackers-and-indices/latest-trackers-and-indices",
    actionGuidance: "Origin dwell delays substantially cleared; expect on-time departure confirmations.",
    freshness: "Verified recent"
  },
  {
    id: "choke-5",
    node: "Nhava Sheva (JNPT) & Mundra",
    region: "West Coast India",
    reading: "7-day average vessel wait ~2.5 days as of 19 May snapshot (stale advisory; no current public feed)",
    status: "mu",
    source: "Kuehne+Nagel Advisory (Historical)",
    date: "19 May 2026 (Dated)",
    actionGuidance: "Confirm terminal gate cutoffs and inland container depot (ICD) rail wagon allocation directly with local agents.",
    freshness: "Dated snapshot"
  },
  {
    id: "choke-6",
    node: "Port of Jeddah",
    region: "Saudi Arabia / Red Sea",
    reading: "Vessel waiting times reported at 5–10 days; some feeder operators temporarily suspended direct calls",
    status: "wa",
    source: "FreshPlaza Trade Logistics",
    date: "Mid-2026 (Historical)",
    actionGuidance: "Inspect transshipment feeder bills of lading for potential discharge at King Abdullah Port or Dubai.",
    freshness: "Dated snapshot"
  }
];

// India Trade Data: Official MoCI statistics (15 Oct 2026)
export const INDIA_TRADE_MACRO = {
  sepExportsBillion: 44.40,
  sepExportsYoY: 23.04,
  sepImportsBillion: 74.61,
  sepImportsYoY: 8.00,
  sepTradeDeficitBillion: 30.21,
  h1ExportsBillion: 259.89,
  h1ExportsYoY: 18.51,
  h1TradeDeficitBillion: 177.64,
  h1TradeDeficitPriorBillion: 156.88,
  source: "Ministry of Commerce and Industry, Government of India",
  publishedDate: "15 Oct 2026",
  sourceUrl: "https://www.jmfinancialservices.in/market-news-and-insights/1737084"
};

export const INDIA_SECTORS: IndiaTradeSector[] = [
  {
    category: "Electronics Goods",
    exportValueBillion: 3.42,
    growthYoY: 33.8,
    shareOfExports: 7.7,
    freightContext: "High-value, air-ocean multimodal; strong outbound air freight demand via Delhi (DEL) and Mumbai (BOM); ocean containerized via JNPT.",
    topDestination: "United States, United Arab Emirates, Netherlands"
  },
  {
    category: "Engineering Goods",
    exportValueBillion: 10.85,
    growthYoY: 10.5,
    shareOfExports: 24.4,
    freightContext: "Heavy containerized manufacturing; vulnerable to ocean spot increases on West India to Europe/US corridors.",
    topDestination: "United States, Saudi Arabia, Germany, UAE"
  },
  {
    category: "Petroleum Products",
    exportValueBillion: 6.95,
    growthYoY: 12.2,
    shareOfExports: 15.6,
    freightContext: "Clean tanker product movements from Jamnagar/Vadinar; high sensitivity to Hormuz transit security and bunker fuel prices.",
    topDestination: "Netherlands, UAE, Singapore"
  },
  {
    category: "Drugs & Pharmaceuticals",
    exportValueBillion: 2.75,
    growthYoY: 7.4,
    shareOfExports: 6.2,
    freightContext: "Temperature-controlled reefer containers; cold-chain integrity required during extended Cape of Good Hope transit times.",
    topDestination: "United States, United Kingdom, South Africa"
  },
  {
    category: "Readymade Garments (Textiles)",
    exportValueBillion: 1.35,
    growthYoY: 17.3,
    shareOfExports: 3.0,
    freightContext: "Seasonal fashion shipments; tight holiday retail delivery windows requiring reliable vessel scheduling.",
    topDestination: "United States, United Kingdom, Germany"
  },
  {
    category: "Gems & Jewellery",
    exportValueBillion: 2.65,
    growthYoY: -8.4,
    shareOfExports: 6.0,
    freightContext: "High-value secure air cargo; domestic consumption strong but sluggish export demand in traditional Western markets.",
    topDestination: "United States, Hong Kong, UAE"
  }
];

export const INDIA_PORTS: IndiaPortAdvisory[] = [
  {
    port: "Nhava Sheva (JNPT / Mumbai)",
    reportedWait: "~2.5 days (snapshot from May 2026)",
    snapshotDate: "19 May 2026 (Historical)",
    status: "wa",
    notes: "Historically subject to yard congestion and ICD Dadri/Ludhiana rail wagon turnarounds. Free storage waivers were previously instituted.",
    feederRoute: "Direct mother vessel calls to Europe/US; extensive Middle East Gulf feeder shuttles."
  },
  {
    port: "Mundra Port (APSEZ / Gujarat)",
    reportedWait: "~1.5 – 2.0 days (historical estimates)",
    snapshotDate: "Mid-2026 (Trade press)",
    status: "up",
    notes: "Deep draft container terminal handling Northern hinterland export cargo. CMA CGM scheduled Gulf shuttle via Sohar/Fujairah.",
    feederRoute: "Asia–Europe mainline calls, Gulf feeder loops, coastal feeder network."
  },
  {
    port: "Chennai & Ennore (East Coast)",
    reportedWait: "Not published in free official datasets",
    snapshotDate: "Unavailable",
    status: "mu",
    notes: "Automotive and electronics hub. Heavy dependence on transshipment via Port of Colombo (Sri Lanka) or Singapore.",
    feederRoute: "Feeder shuttle to Colombo / Singapore / Port Klang."
  }
];

// Sources catalog and transparency documentation
export const DATA_SOURCES: DataSourceMeta[] = [
  {
    name: "Drewry World Container Index (WCI)",
    asOf: "22 Oct 2026",
    url: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry",
    coverage: "Composite Index plus 8 major East-West trade lane spot rates (USD per 40ft container).",
    refreshCycle: "Weekly on Thursdays",
    methodology: "Assessed by Drewry analysts across carrier spot quotes, NVOCC bookings, and forwarder submissions. Headline values published freely; granular carrier level licensed.",
    status: "Verified snapshot"
  },
  {
    name: "Freightos Baltic Index (FBX)",
    asOf: "20 Oct 2026",
    url: "https://www.freightos.com/freight-resources/red-sea-container-traffic-set-for-full-return-in-q1-october-20-2026-update/",
    coverage: "Weekly spot rates for Asia–USWC (FBX01), Asia–USEC (FBX03), Asia–NEUR (FBX11), Asia–MED (FBX13).",
    refreshCycle: "Weekly market update with daily underlying points",
    methodology: "Real-time transactional rates from freight marketplace bookings and quotes. Values marked with ~ are quoted approximations from published commentary.",
    status: "Verified snapshot"
  },
  {
    name: "Drewry Intra-Asia Container Index (IACI)",
    asOf: "22 Oct 2026",
    url: "https://www.drewry.co.uk/supply-chain-advisors/supply-chain-expertise/intra-asia-container-index",
    coverage: "Intra-Asia composite ($1,459/FEU) and regional corridors including Shanghai to Jebel Ali ($8,451/FEU).",
    refreshCycle: "Fortnightly / Monthly",
    methodology: "Focuses on high-volume Asian regional and Middle Eastern trade links.",
    status: "Verified snapshot"
  },
  {
    name: "Ministry of Commerce & Industry (GoI)",
    asOf: "15 Oct 2026",
    url: "https://www.jmfinancialservices.in/market-news-and-insights/1737084",
    coverage: "Official monthly merchandise trade statistics for India: September 2026 exports ($44.40B), imports ($74.61B), and H1 totals.",
    refreshCycle: "Monthly provisional release",
    methodology: "Customs declaration aggregate through ICEGATE; preliminary figures subject to revision.",
    status: "Verified snapshot"
  },
  {
    name: "Drewry Port Trackers & Throughput Indices",
    asOf: "1 Oct 2026",
    url: "https://www.drewry.co.uk/trackers-and-indices/latest-trackers-and-indices",
    coverage: "Global container port throughput index (July 2026) and Shanghai port waiting hours (week 42).",
    refreshCycle: "Monthly for throughput; weekly for berth waiting hours",
    methodology: "Terminal operator reported TEU volumes and vessel AIS berth event timestamps.",
    status: "Verified snapshot"
  },
  {
    name: "Baltic Exchange (via The Edge Malaysia)",
    asOf: "23 Oct 2026",
    url: "https://theedgemalaysia.com/node/823074",
    coverage: "Asia to US East Coast daily spot index (10,754 to 9,927 index points).",
    refreshCycle: "Daily index print",
    methodology: "Baltic assessment panel. Warning: Daily index values are not directly comparable to weekly FBX or Drewry WCI dollar figures.",
    status: "Verified snapshot"
  },
  {
    name: "Not Connected / External Unintegrated Services",
    asOf: "Current Terminal Status",
    url: "",
    coverage: "Live satellite AIS ship positioning, carrier contract BCO rate databases, live container demurrage clocks, customs EDI feeds, and current JNPT/Mundra vessel queues.",
    refreshCycle: "Not streaming in this terminal build",
    methodology: "Honest disclosure: These systems require proprietary carrier API credentials, enterprise TMS integrations, or paid satellite AIS subscriptions. They are represented as unavailable or dated snapshots rather than fabricated fake streams.",
    status: "Not connected"
  }
];

// Helper calculation functions
export function calculatePercentageChange(latest: number | null | undefined, baseline: number | null | undefined): number | null {
  if (latest === null || latest === undefined || baseline === null || baseline === undefined || baseline === 0) {
    return null;
  }
  return ((latest / baseline) - 1) * 100;
}

export function formatCurrency(val: number | null | undefined): string {
  if (val === null || val === undefined) return "n/a";
  return "$" + Math.round(val).toLocaleString();
}

export function formatPercent(val: number | null | undefined): string {
  if (val === null || val === undefined) return "n/a";
  const sign = val > 0 ? "+" : "";
  return `${sign}${val.toFixed(1)}%`;
}
