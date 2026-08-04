import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  LinearProgress,
  Chip,
  Badge,
  IconButton,
  Tooltip,
  Paper,
  Divider,
  Stack,
  Snackbar,
  Alert,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  PlayArrow as PlayIcon,
  Tune as TuneIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  FlashOn as ElectricalIcon,
  Business as BuildingIcon,
  Layers as GalleryIcon,
  ViewInAr as View3DIcon,
  GridOn as View2DIcon,
  Code as CodeIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

// --- Technical Engineering CAD & SLD Presets ---
const BUILDING_CAD_PRESETS = [
  {
    title: 'High-Rise Commercial Floor Plan & Core Wireframe',
    viewType: '2D CAD Floorplan',
    style: 'Modern High-Tech Glass & Steel',
    type: 'Commercial Tower',
    floors: 42,
    squareFeet: '145,000',
    gridSpacing: '8.5m x 8.5m Structural Grid',
    wallSpecs: '200mm Reinforced Concrete Shear Wall',
    columns: '600mm x 600mm Composite Columns',
    prompt: 'AutoCAD 2D structural floor plan displaying central elevator core, perimeter column grid, emergency stairwells, and curtain wall glazing offsets.'
  },
  {
    title: 'Parametric Cultural Atrium 3D Structural Mesh',
    viewType: '3D BIM Wireframe',
    style: 'Parametric Structural Steel',
    type: 'Cultural Center',
    floors: 6,
    squareFeet: '62,000',
    gridSpacing: '12m Radial Grid',
    wallSpecs: 'Curved Glass Curtain Wall & Space Frame',
    columns: '450mm Tubular Steel Truss Columns',
    prompt: '3D BIM structural wireframe model showing steel space-frame atrium roof, cantilevered floor plates, and radial column nodes.'
  },
  {
    title: 'Mass Timber Residential Layout Schematic',
    viewType: '2D CAD Floorplan',
    style: 'Nordic Mass Timber',
    type: 'Residential Complex',
    floors: 14,
    squareFeet: '98,000',
    gridSpacing: '6.0m x 6.0m Modular Grid',
    wallSpecs: '160mm Cross-Laminated Timber (CLT)',
    columns: '350mm Glulam Structural Pillars',
    prompt: '2D architectural CAD plan with CLT partition layout, fire-rated stair shafts, balcony projections, and utility riser sleeves.'
  }
];

const ELECTRICAL_SLD_PRESETS = [
  {
    title: '132kV/33kV High-Voltage Industrial Substation SLD',
    viewType: 'Single-Line Diagram',
    type: 'Industrial Substation',
    voltage: '132kV / 33kV',
    load: '60 MVA',
    breakerType: 'SF6 Gas Circuit Breaker',
    busbarConfig: 'Double Busbar with Bus Coupler',
    transformer: '60MVA 132/33kV Step-Down Transformer',
    prompt: 'High-voltage electrical single-line diagram (SLD) depicting dual 132kV utility feeds, SF6 breakers, step-down transformers, and 33kV distribution feeders.'
  },
  {
    title: 'Tier IV Data Center Dual-Path Power Distribution',
    viewType: 'Electrical Schematic',
    type: 'Data Center Power Distribution',
    voltage: '11kV / 415V / 240V',
    load: '12 MW Tier IV',
    breakerType: 'Vacuum Circuit Breakers (VCB) & Air Breakers (ACB)',
    busbarConfig: '2N Redundant Busway Distribution',
    transformer: '2.5MVA Cast Resin Transformers (x6)',
    prompt: 'Tier IV data center single-line schematic showing dual utility feeds, diesel generator sync panels, static UPS arrays, and PDU busway taps.'
  }
];

// --- Vector CAD Viewport Engine (Interactive SVG Drawing) ---
const TechnicalCADViewport = ({ domain, data, viewMode, seed }) => {
  const isBuilding = domain === 0;

  return (
    <Box
      sx={{
        width: '100%',
        height: 440,
        backgroundColor: '#F8FAFC', // Light architectural viewport background
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #1e293b',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
        fontFamily: 'monospace'
      }}
    >
      {/* Viewport Status Header */}
      <Box
        sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 10,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          border: '1px solid #334155'
        }}
      >
        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#00e676' }} />
        <Typography variant="caption" sx={{ color: '#38bdf8', fontWeight: 700, letterSpacing: 1 }}>
          AUTOCAD VIEWPORT [{isBuilding ? viewMode.toUpperCase() : 'SINGLE-LINE DIAGRAM'}] - WCS
        </Typography>
      </Box>

      {/* Crosshair Coordinate Overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 12,
          right: 12,
          zIndex: 10,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          border: '1px solid #334155'
        }}
      >
        <Typography variant="caption" sx={{ color: '#94a3b8' }}>
          X: {(124.5 + seed * 2.3).toFixed(2)} Y: {(88.1 + seed * 1.7).toFixed(2)} Z: 0.00
        </Typography>
      </Box>

      {/* Vector Graphics Viewport Surface */}
      <svg width="100%" height="100%" viewBox="0 0 800 500" style={{ display: 'block' }}>
        <defs>
          {/* Engineering CAD Grid Pattern */}
          <pattern id={`cadGrid_${seed}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" />
            <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#334155" strokeWidth="1.2" />
          </pattern>

          {/* Busbar Hatch Pattern */}
          <pattern id="busHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#ffb703" strokeWidth="2" />
          </pattern>
        </defs>

        {/* Viewport Grid Background */}
        <rect width="100%" height="100%" fill={`url(#cadGrid_${seed})`} />

        {/* ARCHITECTURAL CAD RENDERING */}
        {isBuilding && viewMode === '2d' && (
          <g transform="translate(100, 40)">
            {/* Structural Column Grid Lines */}
            <line x1="50" y1="20" x2="550" y2="20" stroke="#00e5ff" strokeWidth="1" strokeDasharray="6,4" />
            <line x1="50" y1="180" x2="550" y2="180" stroke="#00e5ff" strokeWidth="1" strokeDasharray="6,4" />
            <line x1="50" y1="340" x2="550" y2="340" stroke="#00e5ff" strokeWidth="1" strokeDasharray="6,4" />

            <line x1="100" y1="0" x2="100" y2="380" stroke="#00e5ff" strokeWidth="1" strokeDasharray="6,4" />
            <line x1="300" y1="0" x2="300" y2="380" stroke="#00e5ff" strokeWidth="1" strokeDasharray="6,4" />
            <line x1="500" y1="0" x2="500" y2="380" stroke="#00e5ff" strokeWidth="1" strokeDasharray="6,4" />

            {/* Grid Markers */}
            {['A', 'B', 'C'].map((label, i) => (
              <g key={`h_${i}`}>
                <circle cx={40} cy={20 + i * 160} r="12" fill="#0f172a" stroke="#00e5ff" strokeWidth="1.5" />
                <text x={40} y={24 + i * 160} textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">{label}</text>
              </g>
            ))}
            {['1', '2', '3'].map((label, i) => (
              <g key={`v_${i}`}>
                <circle cx={100 + i * 200} cy={395} r="12" fill="#0f172a" stroke="#00e5ff" strokeWidth="1.5" />
                <text x={100 + i * 200} y={399} textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">{label}</text>
              </g>
            ))}

            {/* Main Outer Perimeter Walls */}
            <rect x="100" y="20" width="400" height="320" fill="none" stroke="#ffffff" strokeWidth="4" />
            <rect x="106" y="26" width="388" height="308" fill="none" stroke="#00e5ff" strokeWidth="1" />

            {/* Elevator & Service Core (Concrete Shear Walls) */}
            <rect x="250" y="120" width="100" height="120" fill="#1e293b" stroke="#ffea00" strokeWidth="3" />
            <line x1="250" y1="180" x2="350" y2="180" stroke="#ffea00" strokeWidth="2" />
            <line x1="300" y1="120" x2="300" y2="240" stroke="#ffea00" strokeWidth="2" />
            <text x="300" y="155" textAnchor="middle" fill="#ffea00" fontSize="11" fontFamily="sans-serif">STAIR SHAFT</text>
            <text x="300" y="215" textAnchor="middle" fill="#ffea00" fontSize="11" fontFamily="sans-serif">ELEV core</text>

            {/* Structural Columns */}
            {[100, 300, 500].map((cx) =>
              [20, 180, 340].map((cy, idx) => (
                <rect key={`col_${cx}_${cy}_${idx}`} x={cx - 10} y={cy - 10} width="20" height="20" fill="#00e676" stroke="#ffffff" strokeWidth="1" />
              ))
            )}

            {/* Interior Partition Walls & Door Swings */}
            <path d="M 100 180 L 250 180" stroke="#ffffff" strokeWidth="2" />
            <path d="M 350 180 L 500 180" stroke="#ffffff" strokeWidth="2" />
            {/* Door Arc Swing */}
            <path d="M 180 180 A 40 40 0 0 1 220 220" fill="none" stroke="#00e5ff" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="180" y1="180" x2="180" y2="220" stroke="#00e5ff" strokeWidth="2" />

            {/* Dimension Lines */}
            <line x1="100" y1="365" x2="500" y2="365" stroke="#ffaa00" strokeWidth="1" />
            <line x1="100" y1="360" x2="100" y2="370" stroke="#ffaa00" strokeWidth="1.5" />
            <line x1="500" y1="360" x2="500" y2="370" stroke="#ffaa00" strokeWidth="1.5" />
            <text x="300" y="360" textAnchor="middle" fill="#ffaa00" fontSize="11">40.00 m OVERALL DIMENSION</text>
          </g>
        )}

        {/* 3D BIM ISOMETRIC WIREFRAME RENDERING */}
        {isBuilding && viewMode === '3d' && (
          <g transform="translate(400, 260) scale(1.1)">
            {/* 3D Floor Plate Extrusions */}
            {[0, -60, -120, -180].map((levelY, levelIdx) => (
              <g key={`level_${levelIdx}`} transform={`translate(0, ${levelY})`}>
                {/* Floor Slab Projection */}
                <polygon points="0,-60 180,-10 0,40 -180,-10" fill="rgba(0, 229, 255, 0.05)" stroke="#00e5ff" strokeWidth="1.5" />

                {/* Core Tower Block */}
                <polygon points="-30,-25 30,-10 30,10 -30,-5" fill="rgba(255, 234, 0, 0.1)" stroke="#ffea00" strokeWidth="1" />

                {/* Perimeter Columns connecting down */}
                {levelIdx < 3 && (
                  <>
                    <line x1="0" y1="40" x2="0" y2="-20" stroke="#00e676" strokeWidth="1.5" />
                    <line x1="180" y1="-10" x2="180" y2="-70" stroke="#00e676" strokeWidth="1.5" />
                    <line x1="-180" y1="-10" x2="-180" y2="-70" stroke="#00e676" strokeWidth="1.5" />
                    <line x1="0" y1="-60" x2="0" y2="-120" stroke="#00e676" strokeWidth="1.5" />
                  </>
                )}

                <text x="195" y="-10" fill="#38bdf8" fontSize="10" fontFamily="sans-serif">
                  LEVEL 0{levelIdx + 1} (+{(levelIdx * 4.2).toFixed(1)}m)
                </text>
              </g>
            ))}

            {/* Structural Axis Envelope */}
            <line x1="0" y1="40" x2="0" y2="-240" stroke="#ff00ff" strokeWidth="1" strokeDasharray="4,4" />
          </g>
        )}

        {/* ELECTRICAL SINGLE-LINE DIAGRAM (SLD) RENDERING */}
        {!isBuilding && (
          <g transform="translate(100, 30)">
            {/* Utility Grid Feed Line */}
            <text x="300" y="20" textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="bold">UTILITY INCOMER FEED 132kV</text>
            <line x1="300" y1="30" x2="300" y2="70" stroke="#00e5ff" strokeWidth="2.5" />

            {/* Utility Disconnect Switch & Breaker Symbol */}
            <rect x="290" y="70" width="20" height="20" fill="#0f172a" stroke="#00e676" strokeWidth="2" />
            <line x1="290" y1="70" x2="310" y2="90" stroke="#00e676" strokeWidth="2" />
            <text x="320" y="85" fill="#00e676" fontSize="11">132kV VCB-01</text>

            <line x1="300" y1="90" x2="300" y2="130" stroke="#00e5ff" strokeWidth="2.5" />

            {/* Power Transformer Symbol (Two Overlapping Circles) */}
            <g transform="translate(300, 150)">
              <circle cx="0" cy="-10" r="18" fill="none" stroke="#ffea00" strokeWidth="2.5" />
              <circle cx="0" cy="10" r="18" fill="none" stroke="#ffea00" strokeWidth="2.5" />
              <text x="30" y="5" fill="#ffea00" fontSize="11" fontWeight="bold">T1: 60MVA 132/33kV</text>
            </g>

            <line x1="300" y1="180" x2="300" y2="230" stroke="#00e5ff" strokeWidth="2.5" />

            {/* Main 33kV Busbar Line */}
            <line x1="100" y1="230" x2="500" y2="230" stroke="#ffb703" strokeWidth="6" />
            <text x="300" y="222" textAnchor="middle" fill="#ffb703" fontSize="11" fontWeight="bold">MAIN 33kV DISTRIBUTION BUSBAR A</text>

            {/* Branch Feeders */}
            {[150, 300, 450].map((fx, idx) => (
              <g key={`feeder_${idx}`}>
                <line x1={fx} y1="230" x2={fx} y2="270" stroke="#00e5ff" strokeWidth="2" />

                {/* Circuit Breaker Box */}
                <rect x={fx - 12} y="270" width="24" height="24" fill="#0f172a" stroke="#ff00ff" strokeWidth="2" />
                <line x1={fx - 8} y1="278" x2={fx + 8} y2="286" stroke="#ff00ff" strokeWidth="2" />

                <line x1={fx} y1="294" x2={fx} y2="340" stroke="#00e5ff" strokeWidth="2" />

                {/* Downstream Load Symbol (Triangle) */}
                <polygon points={`${fx - 15},340 ${fx + 15},340 ${fx},365`} fill="#00e676" stroke="#ffffff" strokeWidth="1" />
                <text x={fx} y="380" textAnchor="middle" fill="#ffffff" fontSize="10">FEEDER 0{idx + 1}</text>
                <text x={fx} y="393" textAnchor="middle" fill="#94a3b8" fontSize="9">10 MVA LOAD</text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </Box>
  );
};

export default function AiArchitectureStudio() {
  // --- Global Component State ---
  const [mode, setMode] = useState('live'); // 'live' | 'studio'
  const [activeDomain, setActiveDomain] = useState(0); // 0: Building, 1: Electrical
  const [generationsLeft, setGenerationsLeft] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [cadViewMode, setCadViewMode] = useState('2d'); // '2d' | '3d'

  // --- Live Engine State ---
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [liveIndex, setLiveIndex] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const [seedOffset, setSeedOffset] = useState(100);

  // --- Toast Feedback State ---
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' });

  // --- Studio Interactive Technical Form State ---
  const [buildingForm, setBuildingForm] = useState({
    title: 'Custom Architectural CAD Floor Plan',
    viewType: '2D CAD Floorplan',
    style: 'Modern High-Tech Glass & Steel',
    type: 'Commercial Tower',
    floors: 24,
    squareFeet: '75,000',
    gridSpacing: '9.0m x 9.0m Structural Grid',
    wallSpecs: '200mm Reinforced Concrete',
    columns: '500mm Square Columns',
    customNotes: ''
  });

  const [electricalForm, setElectricalForm] = useState({
    title: 'Custom Power Single-Line Diagram',
    viewType: 'Single-Line Diagram',
    type: 'Industrial Substation',
    voltage: '33kV / 11kV',
    load: '15 MVA',
    breakerType: 'Vacuum Circuit Breaker (VCB)',
    busbarConfig: 'Single Busbar with Sectionalizer',
    transformer: '15MVA 33/11kV Step-Down Transformer',
    customNotes: ''
  });

  // --- Generated CAD Gallery State ---
  const [gallery, setGallery] = useState([]);

  // --- Live Automation Timer Effect ---
  useEffect(() => {
    let intervalId;
    let timeoutId;

    if (mode === 'live' && isAutoPlay) {
      const TICK_MS = 50;
      const DURATION_MS = 6000;
      const increment = (TICK_MS / DURATION_MS) * 100;

      intervalId = setInterval(() => {
        setTimerProgress((prev) => (prev >= 100 ? 0 : prev + increment));
      }, TICK_MS);

      timeoutId = setTimeout(() => {
        setLiveIndex((prev) => (prev + 1) % (activeDomain === 0 ? BUILDING_CAD_PRESETS.length : ELECTRICAL_SLD_PRESETS.length));
        setSeedOffset((prev) => prev + 1);
        setTimerProgress(0);
      }, DURATION_MS);
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [mode, isAutoPlay, activeDomain]);

  // --- Handlers ---
  const handleDomainChange = (event, newValue) => {
    setActiveDomain(newValue);
    setLiveIndex(0);
    setTimerProgress(0);
  };

  const handleTransferToStudio = (preset) => {
    if (activeDomain === 0) {
      setBuildingForm((prev) => ({
        ...prev,
        title: preset.title,
        style: preset.style || prev.style,
        type: preset.type || prev.type,
        floors: preset.floors || prev.floors,
        squareFeet: preset.squareFeet || prev.squareFeet,
        gridSpacing: preset.gridSpacing || prev.gridSpacing,
        wallSpecs: preset.wallSpecs || prev.wallSpecs,
        columns: preset.columns || prev.columns,
        customNotes: preset.prompt || ''
      }));
    } else {
      setElectricalForm((prev) => ({
        ...prev,
        title: preset.title,
        type: preset.type || prev.type,
        voltage: preset.voltage || prev.voltage,
        load: preset.load || prev.load,
        breakerType: preset.breakerType || prev.breakerType,
        busbarConfig: preset.busbarConfig || prev.busbarConfig,
        transformer: preset.transformer || prev.transformer,
        customNotes: preset.prompt || ''
      }));
    }
    setMode('studio');
    setToast({ open: true, message: 'CAD concept specs transferred to Design Studio', severity: 'info' });
  };

  const handleGenerate = () => {
    if (generationsLeft <= 0) return;

    setIsGenerating(true);

    setTimeout(() => {
      const isBuilding = activeDomain === 0;
      const currentForm = isBuilding ? buildingForm : electricalForm;

      const newConcept = {
        id: Date.now(),
        seed: Math.floor(Math.random() * 899) + 100,
        domain: isBuilding ? 'Building' : 'Electrical',
        viewMode: cadViewMode,
        title: currentForm.title || (isBuilding ? `${currentForm.style} ${currentForm.type}` : `${currentForm.type} SLD`),
        specs: isBuilding
          ? `${currentForm.floors} Floors | ${currentForm.squareFeet} sq ft | Grid: ${currentForm.gridSpacing}`
          : `${currentForm.voltage} | Load: ${currentForm.load} | ${currentForm.breakerType}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        details: { ...currentForm }
      };

      setGallery((prev) => [newConcept, ...prev]);
      setGenerationsLeft((prev) => prev - 1);
      setIsGenerating(false);
      setToast({ open: true, message: 'Technical CAD blueprint generated successfully!', severity: 'success' });
    }, 1200);
  };

  const handleDownloadDWG = (title, details) => {
    const header = `SECTION\nHEADER\n$ACADVER\nAC1027\n0\nENDSEC\nSECTION\nENTITIES\n; AUTOCAD GENERATED DWG/DXF SPECIFICATION\n; TITLE: ${title}\n; SPECIFICATION: ${JSON.stringify(details, null, 2)}\nENDSEC\n0\nEOF\n`;
    const blob = new Blob([header], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_cad_drawings.dwg`;
    link.click();
    URL.revokeObjectURL(url);
    setToast({ open: true, message: `Downloading DWG file package for ${title}...`, severity: 'success' });
  };

  const handleCopySpecs = (details) => {
    const formatted = Object.entries(details)
      .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
      .join('\n');
    navigator.clipboard.writeText(formatted);
    setToast({ open: true, message: 'Technical specifications copied to clipboard!', severity: 'info' });
  };

  const currentPreset = activeDomain === 0 ? BUILDING_CAD_PRESETS[liveIndex] : ELECTRICAL_SLD_PRESETS[liveIndex];

  return (
    <Container maxWidth="xl" sx={{ py: 4, backgroundColor: '#090d16', color: '#f8fafc', minHeight: '100vh' }}>
      {/* Header & Mode Switcher Bar */}
      <Paper elevation={4} sx={{ p: 2.5, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid #334155' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={5}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <AutoAwesomeIcon sx={{ color: '#00e5ff', fontSize: 34 }} />
              <Box>
                <Typography variant="h5" fontWeight="bold" letterSpacing={0.5} sx={{ color: '#ffffff' }}>
                  AutoCAD & BIM Studio AI
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Engineering CAD Blueprints & Electrical Single-Line Diagrams (SLD)
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent={{ xs: 'start', md: 'center' }}>
              <Tabs
                value={mode}
                onChange={(e, val) => setMode(val)}
                textColor="inherit"
                IndicatorProps={{ style: { backgroundColor: '#00e5ff', height: 3 } }}
                sx={{
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem', minWidth: 120, color: '#94a3b8' },
                  '& .Mui-selected': { color: '#00e5ff' }
                }}
              >
                <Tab icon={<PlayIcon fontSize="small" />} iconPosition="start" label="Live Viewport Showcase" value="live" />
                <Tab icon={<TuneIcon fontSize="small" />} iconPosition="start" label="Design Studio" value="studio" />
              </Tabs>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box display="flex" justifyContent={{ xs: 'start', md: 'flex-end' }} alignItems="center" gap={2}>
              <Badge badgeContent={generationsLeft} color={generationsLeft > 1 ? 'primary' : 'error'}>
                <Chip
                  label={`CAD Renders Remaining: ${generationsLeft}/5`}
                  variant="outlined"
                  sx={{ color: '#00e5ff', borderColor: '#00e5ff', fontWeight: 600 }}
                />
              </Badge>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Domain Navigation (Building vs Electrical) & Viewport Controls */}
      <Box sx={{ borderBottom: 1, borderColor: '#334155', mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Tabs
          value={activeDomain}
          onChange={handleDomainChange}
          indicatorColor="primary"
          sx={{
            '& .MuiTab-root': { color: '#94a3b8', textTransform: 'none', fontWeight: 600 },
            '& .Mui-selected': { color: '#00e5ff' }
          }}
        >
          <Tab icon={<BuildingIcon />} iconPosition="start" label="Architectural CAD & BIM" />
          <Tab icon={<ElectricalIcon />} iconPosition="start" label="Electrical Single-Line Diagrams" />
        </Tabs>

        {activeDomain === 0 && (
          <ToggleButtonGroup
            value={cadViewMode}
            exclusive
            onChange={(e, val) => val && setCadViewMode(val)}
            size="small"
            sx={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}
          >
            <ToggleButton value="2d" sx={{ color: '#94a3b8', '&.Mui-selected': { color: '#00e5ff', backgroundColor: '#1e293b' } }}>
              <View2DIcon fontSize="small" sx={{ mr: 0.5 }} /> 2D CAD Blueprint
            </ToggleButton>
            <ToggleButton value="3d" sx={{ color: '#94a3b8', '&.Mui-selected': { color: '#00e5ff', backgroundColor: '#1e293b' } }}>
              <View3DIcon fontSize="small" sx={{ mr: 0.5 }} /> 3D BIM Wireframe
            </ToggleButton>
          </ToggleButtonGroup>
        )}

        {mode === 'live' && (
          <FormControlLabel
            control={
              <Switch
                checked={isAutoPlay}
                onChange={(e) => setIsAutoPlay(e.target.checked)}
                color="primary"
              />
            }
            label={<Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>{isAutoPlay ? 'Viewport Auto-Rotate' : 'Paused'}</Typography>}
          />
        )}
      </Box>

      {/* MODE 1: LIVE CAD SHOWCASE ENGINE */}
      {mode === 'live' && (
        <Box>
          {isAutoPlay && (
            <LinearProgress
              variant="determinate"
              value={timerProgress}
              sx={{ height: 3, borderRadius: 2, mb: 3, backgroundColor: '#1e293b', '& .MuiLinearProgress-bar': { backgroundColor: '#00e5ff' } }}
            />
          )}

          <Grid container spacing={3}>
            {/* Vector CAD Interactive Viewport */}
            <Grid item xs={12} lg={8}>
              <Card elevation={3} sx={{ borderRadius: 3, backgroundColor: '#0f172a', border: '1px solid #334155', p: 1.5 }}>
                <TechnicalCADViewport
                  domain={activeDomain}
                  data={currentPreset}
                  viewMode={cadViewMode}
                  seed={seedOffset + liveIndex}
                />
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#ffffff' }}>
                      {currentPreset.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                      {currentPreset.prompt}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownloadDWG(currentPreset.title, currentPreset)}
                      sx={{ color: '#00e5ff', borderColor: '#00e5ff' }}
                    >
                      DWG
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<CopyIcon />}
                      onClick={() => handleCopySpecs(currentPreset)}
                      sx={{ color: '#94a3b8', borderColor: '#334155' }}
                    >
                      Specs
                    </Button>
                  </Stack>
                </Box>
              </Card>
            </Grid>

            {/* Engineering Parameter Sidebar */}
            <Grid item xs={12} lg={4}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold" sx={{ color: '#00e5ff' }}>
                      Technical Specifications
                    </Typography>
                    <IconButton size="small" onClick={() => setSeedOffset((prev) => prev + 1)} sx={{ color: '#94a3b8' }}>
                      <RefreshIcon />
                    </IconButton>
                  </Box>

                  <Divider sx={{ mb: 2, borderColor: '#334155' }} />

                  {activeDomain === 0 ? (
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Structural Architectural Style</Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ color: '#f8fafc' }}>{currentPreset.style}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Building Classification</Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ color: '#f8fafc' }}>{currentPreset.type}</Typography>
                      </Box>
                      <Box display="flex" gap={4}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>Total Storeys</Typography>
                          <Typography variant="body1" fontWeight={600} sx={{ color: '#f8fafc' }}>{currentPreset.floors} Floors</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>Floor Area</Typography>
                          <Typography variant="body1" fontWeight={600} sx={{ color: '#f8fafc' }}>{currentPreset.squareFeet} sq ft</Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Grid Spacing / Column Layout</Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ color: '#00e676' }}>{currentPreset.gridSpacing}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Wall Material Specification</Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ color: '#ffea00' }}>{currentPreset.wallSpecs}</Typography>
                      </Box>
                    </Stack>
                  ) : (
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Substation / System Classification</Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ color: '#f8fafc' }}>{currentPreset.type}</Typography>
                      </Box>
                      <Box display="flex" gap={4}>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>Voltage Rating</Typography>
                          <Typography variant="body1" fontWeight={600} sx={{ color: '#00e5ff' }}>{currentPreset.voltage}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>Load Capacity</Typography>
                          <Typography variant="body1" fontWeight={600} sx={{ color: '#00e5ff' }}>{currentPreset.load}</Typography>
                        </Box>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Circuit Breaker Specification</Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ color: '#00e676' }}>{currentPreset.breakerType}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Busbar Configuration</Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ color: '#ffb703' }}>{currentPreset.busbarConfig}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>Transformer Rating</Typography>
                        <Typography variant="body1" fontWeight={600} sx={{ color: '#ffea00' }}>{currentPreset.transformer}</Typography>
                      </Box>
                    </Stack>
                  )}
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<EditIcon />}
                    onClick={() => handleTransferToStudio(currentPreset)}
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 700,
                      backgroundColor: '#00e5ff',
                      color: '#0f172a',
                      '&:hover': { backgroundColor: '#38bdf8' }
                    }}
                  >
                    Load Specs into Design Studio
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* MODE 2: INTERACTIVE CAD DESIGN STUDIO */}
      {mode === 'studio' && (
        <Grid container spacing={4}>
          {/* Engineering Form Inputs */}
          <Grid item xs={12} lg={5}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, backgroundColor: '#0f172a', border: '1px solid #334155' }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom display="flex" alignItems="center" gap={1} sx={{ color: '#00e5ff' }}>
                <TuneIcon />
                {activeDomain === 0 ? 'Architectural & Structural CAD Specs' : 'Electrical System & SLD Parameters'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>
                Adjust parameters to generate vector blueprints, 3D BIM models, and single-line schematics.
              </Typography>

              {activeDomain === 0 ? (
                /* Architectural CAD Inputs */
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Drawing Title"
                    value={buildingForm.title}
                    onChange={(e) => setBuildingForm({ ...buildingForm, title: e.target.value })}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                  />

                  <FormControl fullWidth size="small">
                    <InputLabel sx={{ color: '#94a3b8' }}>Architectural Style</InputLabel>
                    <Select
                      value={buildingForm.style}
                      label="Architectural Style"
                      onChange={(e) => setBuildingForm({ ...buildingForm, style: e.target.value })}
                      sx={{ color: '#ffffff', '.MuiOutlinedInput-notchedOutline': { borderColor: '#334155' } }}
                    >
                      <MenuItem value="Modern High-Tech Glass & Steel">Modern High-Tech Glass & Steel</MenuItem>
                      <MenuItem value="Parametric Structural Steel">Parametric Structural Steel</MenuItem>
                      <MenuItem value="Nordic Mass Timber">Nordic Mass Timber</MenuItem>
                      <MenuItem value="Industrial Reinforced Concrete">Industrial Reinforced Concrete</MenuItem>
                    </Select>
                  </FormControl>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Storeys"
                        value={buildingForm.floors}
                        onChange={(e) => setBuildingForm({ ...buildingForm, floors: Number(e.target.value) })}
                        sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Floor Area (sq ft)"
                        value={buildingForm.squareFeet}
                        onChange={(e) => setBuildingForm({ ...buildingForm, squareFeet: e.target.value })}
                        sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    size="small"
                    label="Structural Column Grid Spacing"
                    value={buildingForm.gridSpacing}
                    onChange={(e) => setBuildingForm({ ...buildingForm, gridSpacing: e.target.value })}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    label="Wall & Partition Specifications"
                    value={buildingForm.wallSpecs}
                    onChange={(e) => setBuildingForm({ ...buildingForm, wallSpecs: e.target.value })}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="CAD Layer Instructions / Notes"
                    placeholder="Specify column offsets, stair shaft locations, shear walls..."
                    value={buildingForm.customNotes}
                    onChange={(e) => setBuildingForm({ ...buildingForm, customNotes: e.target.value })}
                    sx={{ textarea: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                  />
                </Stack>
              ) : (
                /* Electrical SLD Inputs */
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Schematic Title"
                    value={electricalForm.title}
                    onChange={(e) => setElectricalForm({ ...electricalForm, title: e.target.value })}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Operating Voltage"
                        value={electricalForm.voltage}
                        onChange={(e) => setElectricalForm({ ...electricalForm, voltage: e.target.value })}
                        sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Load Capacity"
                        value={electricalForm.load}
                        onChange={(e) => setElectricalForm({ ...electricalForm, load: e.target.value })}
                        sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    size="small"
                    label="Circuit Breaker Spec"
                    value={electricalForm.breakerType}
                    onChange={(e) => setElectricalForm({ ...electricalForm, breakerType: e.target.value })}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    label="Busbar Configuration"
                    value={electricalForm.busbarConfig}
                    onChange={(e) => setElectricalForm({ ...electricalForm, busbarConfig: e.target.value })}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    label="Transformer Specifications"
                    value={electricalForm.transformer}
                    onChange={(e) => setElectricalForm({ ...electricalForm, transformer: e.target.value })}
                    sx={{ input: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                  />

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Protection & SCADA Notes"
                    placeholder="Specify relay codes, CT/PT ratios, interlocks..."
                    value={electricalForm.customNotes}
                    onChange={(e) => setElectricalForm({ ...electricalForm, customNotes: e.target.value })}
                    sx={{ textarea: { color: '#ffffff' }, label: { color: '#94a3b8' } }}
                  />
                </Stack>
              )}

              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={isGenerating || generationsLeft <= 0}
                startIcon={<AutoAwesomeIcon />}
                onClick={handleGenerate}
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: 'none',
                  backgroundColor: '#00e5ff',
                  color: '#0f172a',
                  '&:hover': { backgroundColor: '#38bdf8' }
                }}
              >
                {isGenerating ? 'Synthesizing CAD Geometry...' : 'Generate Technical CAD Blueprint'}
              </Button>
            </Paper>
          </Grid>

          {/* Generated Studio Blueprint Output Panel */}
          <Grid item xs={12} lg={7}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 3, minHeight: 520, backgroundColor: '#0f172a', border: '1px solid #334155' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1} sx={{ color: '#ffffff' }}>
                  <GalleryIcon color="action" />
                  Generated CAD Output Workspace ({gallery.length})
                </Typography>
              </Box>

              <Divider sx={{ mb: 3, borderColor: '#334155' }} />

              {gallery.length === 0 ? (
                <Box textAlign="center" py={10} color="#64748b">
                  <CodeIcon sx={{ fontSize: 56, color: '#334155', mb: 1.5 }} />
                  <Typography variant="h6" fontWeight={500} sx={{ color: '#94a3b8' }}>No Generated CAD Blueprints Yet</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b' }}>Configure parameters on the left and click "Generate Technical CAD Blueprint".</Typography>
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {gallery.map((item) => (
                    <Grid item xs={12} key={item.id}>
                      <Card elevation={2} sx={{ borderRadius: 2, backgroundColor: '#090d16', border: '1px solid #334155', p: 1.5 }}>
                        <TechnicalCADViewport
                          domain={item.domain === 'Building' ? 0 : 1}
                          data={item.details}
                          viewMode={item.viewMode}
                          seed={item.seed}
                        />
                        <CardContent sx={{ p: 2 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="start" mb={0.5}>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#ffffff' }}>
                              {item.title}
                            </Typography>
                            <Chip
                              label={item.domain}
                              size="small"
                              variant="outlined"
                              sx={{
                                color: item.domain === 'Building' ? '#00e5ff' : '#00e676',
                                borderColor: item.domain === 'Building' ? '#00e5ff' : '#00e676'
                              }}
                            />
                          </Box>
                          <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mb: 1.5 }}>
                            {item.specs} • Generated at {item.timestamp}
                          </Typography>
                          <Box display="flex" justifyContent="flex-end" gap={1}>
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<CopyIcon />}
                              onClick={() => handleCopySpecs(item.details)}
                              sx={{ color: '#94a3b8', borderColor: '#334155' }}
                            >
                              Copy Specs
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<DownloadIcon />}
                              onClick={() => handleDownloadDWG(item.title, item.details)}
                              sx={{ backgroundColor: '#00e5ff', color: '#0f172a', fontWeight: 700 }}
                            >
                              Export DWG
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      {/* Action Toast Feedback */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={toast.severity} onClose={() => setToast({ ...toast, open: false })} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}