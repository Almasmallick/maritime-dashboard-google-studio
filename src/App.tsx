import React, { useState, useEffect } from 'react';
import { Sidebar, NavView } from './components/Sidebar';
import { TopToolbar } from './components/TopToolbar';
import { DetailDossier } from './components/DetailDossier';
import { MarketPulseView } from './views/MarketPulseView';
import { OpportunitiesRadarView } from './views/OpportunitiesRadarView';
import { HardestFallsView } from './views/HardestFallsView';
import { FreightCapacityView } from './views/FreightCapacityView';
import { IndiaTradeLensView } from './views/IndiaTradeLensView';
import { PortsDisruptionView } from './views/PortsDisruptionView';
import { LandedCostView } from './views/LandedCostView';
import { SourcesMethodologyView } from './views/SourcesMethodologyView';
import { 
  LANES_DATA, 
  OPPORTUNITIES_DATA, 
  HARDEST_FALLS_DATA, 
  INDIA_SECTORS, 
  CHOKEPOINTS_DATA, 
  DATA_SOURCES,
  BASELINE_DATES,
  calculatePercentageChange
} from './data/maritimeData';
import { OpportunitySignal, HardestFallSignal, MarketDevelopment } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('pulse');
  const [selectedLane, setSelectedLane] = useState<string>('ALL');
  const [baselineIndex, setBaselineIndex] = useState<number>(1); // Default to 8 Oct (Autumn trough)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [dossierItem, setDossierItem] = useState<OpportunitySignal | HardestFallSignal | MarketDevelopment | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // CSV Export implementation
  const handleExportCSV = () => {
    let rows: string[][] = [];
    const baselineLabel = BASELINE_DATES[baselineIndex].shortLabel;

    if (currentView === 'pulse' || currentView === 'freight') {
      rows = [
        ['Lane ID', 'Lane Name', 'Direction', '20 Aug 2026', '8 Oct 2026', '22 Oct 2026', `Delta vs ${baselineLabel} (%)`],
        ...LANES_DATA.map(l => {
          const chg = calculatePercentageChange(l.rates[2], l.rates[baselineIndex]);
          return [
            l.id,
            l.name,
            l.direction,
            l.rates[0] !== null ? String(l.rates[0]) : '',
            l.rates[1] !== null ? String(l.rates[1]) : '',
            l.rates[2] !== null ? String(l.rates[2]) : '',
            chg !== null ? chg.toFixed(2) : ''
          ];
        })
      ];
    } else if (currentView === 'opps') {
      rows = [
        ['Signal Name', 'Family Type', 'Scope', 'Metric', 'Growth (%)', 'Evidence Count', 'Confidence', 'Source', 'Date'],
        ...OPPORTUNITIES_DATA.map(o => [
          o.name,
          o.type,
          o.scope,
          o.metric,
          o.growthPct !== null ? String(o.growthPct) : '',
          String(o.evidenceCount),
          o.confidence,
          o.source,
          o.observationDate
        ])
      ];
    } else if (currentView === 'falls') {
      rows = [
        ['Item Name', 'Change (%)', 'Comparison Basis', 'Kind', 'Classification', 'Plausible Driver', 'Source', 'Date'],
        ...HARDEST_FALLS_DATA.map(f => [
          f.name,
          f.changePct !== null ? f.changePct.toFixed(2) : 'Qualitative',
          f.basis,
          f.kind,
          f.classification,
          f.plausibleDriver,
          f.source,
          f.observationDate
        ])
      ];
    } else if (currentView === 'india') {
      rows = [
        ['Category', 'Sep 2026 Export Value (USD B)', 'YoY Growth (%)', 'Export Share (%)', 'Top Destinations', 'Freight Context'],
        ...INDIA_SECTORS.map(s => [
          s.category,
          String(s.exportValueBillion),
          String(s.growthYoY),
          String(s.shareOfExports),
          s.topDestination,
          s.freightContext
        ])
      ];
    } else if (currentView === 'ports') {
      rows = [
        ['Node', 'Region', 'Verified Reading', 'Status', 'Date', 'Source'],
        ...CHOKEPOINTS_DATA.map(c => [
          c.node,
          c.region,
          c.reading,
          c.status,
          c.date,
          c.source
        ])
      ];
    } else if (currentView === 'sources') {
      rows = [
        ['Data Source', 'As Of', 'Coverage', 'Refresh Cycle', 'Methodology & Status', 'URL'],
        ...DATA_SOURCES.map(d => [
          d.name,
          d.asOf,
          d.coverage,
          d.refreshCycle,
          `${d.status}: ${d.methodology}`,
          d.url
        ])
      ];
    } else {
      // Default general export
      rows = [
        ['Module', 'Observation Date', 'Description'],
        ['Maritime Intelligence Terminal', '24 Oct 2026', 'Evidence-first maritime freight intelligence export']
      ];
    }

    const csvContent = "data:text/csv;charset=utf-8," + 
      rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(',')).join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `maritime-intel-${currentView}-snapshot.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Sidebar Navigation */}
      <Sidebar
        currentView={currentView}
        onSelectView={(view) => {
          setCurrentView(view);
          setSearchQuery('');
        }}
      />

      {/* Main Terminal Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Controls Toolbar */}
        <TopToolbar
          selectedLane={selectedLane}
          onSelectLane={setSelectedLane}
          baselineIndex={baselineIndex}
          onSelectBaseline={setBaselineIndex}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onExportCSV={handleExportCSV}
        />

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          {currentView === 'pulse' && (
            <MarketPulseView
              selectedLane={selectedLane}
              baselineIndex={baselineIndex}
              searchQuery={searchQuery}
              onSelectLane={setSelectedLane}
              onOpenDossier={setDossierItem}
              onNavigate={setCurrentView}
            />
          )}

          {currentView === 'opps' && (
            <OpportunitiesRadarView
              searchQuery={searchQuery}
              onOpenDossier={setDossierItem}
            />
          )}

          {currentView === 'falls' && (
            <HardestFallsView
              searchQuery={searchQuery}
              onOpenDossier={setDossierItem}
            />
          )}

          {currentView === 'freight' && (
            <FreightCapacityView
              selectedLane={selectedLane}
              baselineIndex={baselineIndex}
              searchQuery={searchQuery}
              onSelectLane={setSelectedLane}
              onSelectBaseline={setBaselineIndex}
            />
          )}

          {currentView === 'india' && (
            <IndiaTradeLensView />
          )}

          {currentView === 'ports' && (
            <PortsDisruptionView />
          )}

          {currentView === 'landed' && (
            <LandedCostView />
          )}

          {currentView === 'sources' && (
            <SourcesMethodologyView />
          )}
        </main>
      </div>

      {/* Detail Dossier Modal / Drawer */}
      <DetailDossier
        item={dossierItem}
        onClose={() => setDossierItem(null)}
      />
    </div>
  );
}
