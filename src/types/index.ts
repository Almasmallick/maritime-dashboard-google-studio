export type ConfidenceLevel = 'High' | 'Medium' | 'Low-Medium' | 'Insufficient evidence';

export type SignalClassification = 
  | 'Improving' 
  | 'Deteriorating' 
  | 'Emerging warning' 
  | 'Temporary volatility' 
  | 'Persistent decline' 
  | 'Sharp deterioration'
  | 'Insufficient evidence';

export type SignalKind = 'price' | 'demand' | 'capacity' | 'ops' | 'geopolitical';

export interface LaneRate {
  id: string;
  name: string;
  rates: (number | null)[]; // [20 Aug, 8 Oct, 22 Oct] in USD/FEU
  origin: string;
  destination: string;
  direction: string;
  source: string;
}

export interface MarketDevelopment {
  id: string;
  title: string;
  category: 'Rate Movement' | 'Capacity / Blanks' | 'Trade Flow' | 'Chokepoint / Security' | 'Port Dwell';
  whatChanged: string;
  comparedPeriod: string;
  whyItMatters: string;
  evidence: string;
  nextSteps: string;
  severity: 'up' | 'down' | 'warning' | 'neutral';
  source: string;
  sourceUrl?: string;
  date: string;
}

export interface OpportunitySignal {
  id: string;
  name: string;
  type: 'Trade flow' | 'Port connectivity' | 'Freight' | 'Equipment / Repositioning';
  scope: string; // e.g. "India → world", "Asia → Europe"
  metric: string;
  growthPct: number | null;
  comparisonPeriod: string;
  evidenceCount: number;
  evidenceText: string;
  whoCouldBenefit: string;
  commercialHypothesis: string;
  risksAndCounterEvidence: string;
  confidence: ConfidenceLevel;
  source: string;
  observationDate: string;
  sourceUrl: string;
}

export interface HardestFallSignal {
  id: string;
  name: string;
  laneKey?: string;
  changePct: number | null;
  basis: string;
  classification: SignalClassification;
  kind: SignalKind;
  plausibleDriver: string;
  exposedStakeholders: string;
  confirmationCheck: string;
  evidenceCount: number;
  source: string;
  observationDate: string;
  sourceUrl: string;
}

export interface FreightIndexQuote {
  name: string;
  points: [string, string, number][]; // [dateLabel, displayValue, numericValue]
  description: string;
  methodology: string;
  source: string;
  sourceUrl: string;
}

export interface PortChokepointStatus {
  id: string;
  node: string;
  region: string;
  reading: string;
  status: 'up' | 'wa' | 'dn' | 'mu'; // up = improving, wa = emerging warning, dn = high risk/deteriorating, mu = stale/unknown
  source: string;
  date: string;
  sourceUrl?: string;
  actionGuidance: string;
  freshness: 'Verified recent' | 'Dated snapshot' | 'Stale advisory';
}

export interface IndiaTradeSector {
  category: string;
  exportValueBillion: number;
  growthYoY: number;
  shareOfExports: number;
  freightContext: string;
  topDestination: string;
}

export interface IndiaPortAdvisory {
  port: string;
  reportedWait: string;
  snapshotDate: string;
  status: 'wa' | 'dn' | 'mu' | 'up';
  notes: string;
  feederRoute: string;
}

export interface DataSourceMeta {
  name: string;
  asOf: string;
  url: string;
  coverage: string;
  refreshCycle: string;
  methodology: string;
  status: 'Verified snapshot' | 'Periodic update' | 'Not connected';
}
