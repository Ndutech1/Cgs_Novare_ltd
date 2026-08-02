import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
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
  Stack
} from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Tune as TuneIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  FlashOn as ElectricalIcon,
  Business as BuildingIcon,
  Layers as GalleryIcon
} from '@mui/icons-material';

// --- Preset Data for Live Rotation & Prompt Generation ---
const BUILDING_PRESETS = [
  {
    style: 'Futuristic Eco-Minimalism',
    type: 'Commercial Tower',
    floors: 45,
    squareFeet: '120,000',
    features: ['Biophilic Facade', 'Solar Glass', 'Sky Gardens'],
    prompt: 'A futuristic eco-minimalist commercial tower featuring biophilic glass facades, integrated sky gardens, and clean solar geometry.'
  },
  {
    style: 'Parametric Brutalism',
    type: 'Cultural Center',
    floors: 6,
    squareFeet: '45,000',
    features: ['Cantilevered Concrete', 'Atrium Skylights', 'Water Feature'],
    prompt: 'A bold parametric brutalist cultural center with sweeping cantilevered concrete ribbons and dramatic central skylights.'
  },
  {
    style: 'Nordic Organic',
    type: 'Residential Complex',
    floors: 12,
    squareFeet: '85,000',
    features: ['Timber Cladding', 'Green Roof', 'Passive Cooling'],
    prompt: 'A warm Nordic organic residential complex constructed from mass timber with undulating green roofs and natural stone accents.'
  }
];

const ELECTRICAL_PRESETS = [
  {
    type: 'Industrial Substation',
    voltage: '132kV / 33kV',
    load: '50 MVA',
    features: ['GIS Switchgear', 'Smart Grid Sensors', 'Redundant Busbars'],
    prompt: 'A high-voltage industrial GIS substation schematic featuring redundant dual-busbar topology and digital protection relays.'
  },
  {
    type: 'Data Center Power Distribution',
    voltage: '415V / 240V',
    load: '10 MW Tier IV',
    features: ['UPS Battery Array', 'Dual Utility Feed', 'Busway System'],
    prompt: 'A Tier IV data center power distribution single-line diagram with dual-path redundant UPS topology and modular busways.'
  }
];

export default function AiArchitectureStudio() {
  // --- Global Component State ---
  const [mode, setMode] = useState('live'); // 'live' | 'studio'
  const [activeDomain, setActiveDomain] = useState(0); // 0: Building, 1: Electrical
  const [generationsLeft, setGenerationsLeft] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);

  // --- Live Engine State ---
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [liveIndex, setLiveIndex] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const [seedOffset, setSeedOffset] = useState(100);

  // --- Studio Interactive Form State ---
  const [buildingForm, setBuildingForm] = useState({
    style: 'Futuristic Eco-Minimalism',
    type: 'Commercial Tower',
    floors: 20,
    squareFeet: '50,000',
    features: ['Solar Panels', 'Smart HVAC'],
    customNotes: ''
  });

  const [electricalForm, setElectricalForm] = useState({
    type: 'Commercial Microgrid',
    voltage: '11kV / 415V',
    load: '2.5 MVA',
    features: ['Solar Inverter', 'Battery Storage'],
    customNotes: ''
  });

  // --- Gallery State ---
  const [gallery, setGallery] = useState([]);

  // --- Live Automation Timer Effect ---
  useEffect(() => {
    let intervalId;
    let timeoutId;

    if (mode === 'live' && isAutoPlay) {
      const TICK_MS = 50;
      const DURATION_MS = 5000;
      const increment = (TICK_MS / DURATION_MS) * 100;

      intervalId = setInterval(() => {
        setTimerProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + increment;
        });
      }, TICK_MS);

      timeoutId = setTimeout(() => {
        setLiveIndex((prev) => (prev + 1) % (activeDomain === 0 ? BUILDING_PRESETS.length : ELECTRICAL_PRESETS.length));
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
        style: preset.style || prev.style,
        type: preset.type || prev.type,
        floors: preset.floors || prev.floors,
        squareFeet: preset.squareFeet || prev.squareFeet,
        features: preset.features || prev.features,
        customNotes: preset.prompt || ''
      }));
    } else {
      setElectricalForm((prev) => ({
        ...prev,
        type: preset.type || prev.type,
        voltage: preset.voltage || prev.voltage,
        load: preset.load || prev.load,
        features: preset.features || prev.features,
        customNotes: preset.prompt || ''
      }));
    }
    setMode('studio');
  };

  const handleGenerate = () => {
    if (generationsLeft <= 0) return;

    setIsGenerating(true);

    setTimeout(() => {
      const isBuilding = activeDomain === 0;
      const currentForm = isBuilding ? buildingForm : electricalForm;
      
      const newConcept = {
        id: Date.now(),
        domain: isBuilding ? 'Building' : 'Electrical',
        title: isBuilding ? `${currentForm.style} ${currentForm.type}` : `${currentForm.type} Schematic`,
        specs: isBuilding 
          ? `${currentForm.floors} Floors | ${currentForm.squareFeet} sq ft`
          : `${currentForm.voltage} | Load: ${currentForm.load}`,
        imageUrl: `https://picsum.photos/seed/${Date.now()}/800/600`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        details: currentForm
      };

      setGallery((prev) => [newConcept, ...prev]);
      setGenerationsLeft((prev) => prev - 1);
      setIsGenerating(false);
    }, 1500);
  };

  const currentPreset = activeDomain === 0 ? BUILDING_PRESETS[liveIndex] : ELECTRICAL_PRESETS[liveIndex];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header & Mode Switcher Bar */}
      <Paper elevation={2} sx={{ p: 2.5, mb: 4, borderRadius: 3, background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} md={5}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <AutoAwesomeIcon sx={{ color: '#38bdf8', fontSize: 32 }} />
              <Box>
                <Typography variant="h5" fontWeight="bold" letterSpacing={0.5}>
                  ArchitectAI Unified Suite
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Next-Gen Generative Building & Electrical Engineering Platform
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
                IndicatorProps={{ style: { backgroundColor: '#38bdf8', height: 3 } }}
                sx={{
                  '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem', minWidth: 120 }
                }}
              >
                <Tab icon={<PlayIcon fontSize="small" />} iconPosition="start" label="Live Showcase" value="live" />
                <Tab icon={<TuneIcon fontSize="small" />} iconPosition="start" label="Design Studio" value="studio" />
              </Tabs>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Box display="flex" justifyContent={{ xs: 'start', md: 'flex-end' }} alignItems="center" gap={2}>
              <Badge badgeContent={generationsLeft} color={generationsLeft > 1 ? 'primary' : 'error'}>
                <Chip
                  label={`Generations Remaining: ${generationsLeft}/5`}
                  variant="outlined"
                  sx={{ color: 'white', borderColor: '#334155', fontWeight: 500 }}
                />
              </Badge>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Domain Navigation (Building vs. Electrical) */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Tabs
          value={activeDomain}
          onChange={handleDomainChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<BuildingIcon />} iconPosition="start" label="Architectural Design" />
          <Tab icon={<ElectricalIcon />} iconPosition="start" label="Electrical & Power Systems" />
        </Tabs>

        {mode === 'live' && (
          <FormControlLabel
            control={
              <Switch
                checked={isAutoPlay}
                onChange={(e) => setIsAutoPlay(e.target.checked)}
                color="primary"
              />
            }
            label={<Typography variant="body2" fontWeight={500}>{isAutoPlay ? 'Auto-Cycle Active' : 'Paused'}</Typography>}
          />
        )}
      </Box>

      {/* MODE 1: LIVE SHOWCASE ENGINE */}
      {mode === 'live' && (
        <Box>
          {isAutoPlay && (
            <LinearProgress
              variant="determinate"
              value={timerProgress}
              sx={{ height: 4, borderRadius: 2, mb: 3, backgroundColor: '#e2e8f0', '& .MuiLinearProgress-bar': { backgroundColor: '#0284c7' } }}
            />
          )}

          <Grid container spacing={3}>
            {/* Featured Active Concept Showcase */}
            <Grid item xs={12} lg={8}>
              <Card elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="460"
                  image={`https://picsum.photos/seed/${seedOffset + liveIndex}/1000/600`}
                  alt="Live Concept Render"
                  sx={{ filter: 'brightness(0.92)' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.95))',
                    color: 'white',
                    p: 3
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip label={activeDomain === 0 ? currentPreset.style : currentPreset.type} color="primary" size="small" />
                    <Chip label={activeDomain === 0 ? `${currentPreset.floors} Floors` : currentPreset.voltage} variant="outlined" sx={{ color: 'white', borderColor: 'white' }} size="small" />
                  </Stack>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {currentPreset.prompt}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {currentPreset.features.map((feat, i) => (
                      <Chip key={i} label={feat} size="small" sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }} />
                    ))}
                  </Stack>
                </Box>
              </Card>
            </Grid>

            {/* Sidebar Inspiration Control & Parameter Transfer */}
            <Grid item xs={12} lg={4}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Live Concept Parameters
                    </Typography>
                    <IconButton size="small" onClick={() => setSeedOffset((prev) => prev + 1)}>
                      <RefreshIcon />
                    </IconButton>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {activeDomain === 0 ? (
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Architectural Style</Typography>
                        <Typography variant="body1" fontWeight={600}>{currentPreset.style}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="caption" color="text.secondary">Building Type</Typography>
                        <Typography variant="body1" fontWeight={600}>{currentPreset.type}</Typography>
                      </Box>
                      <Box display="flex" gap={4}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Floors</Typography>
                          <Typography variant="body1" fontWeight={600}>{currentPreset.floors}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Total Area</Typography>
                          <Typography variant="body1" fontWeight={600}>{currentPreset.squareFeet} sq ft</Typography>
                        </Box>
                      </Box>
                    </Stack>
                  ) : (
                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">System Classification</Typography>
                        <Typography variant="body1" fontWeight={600}>{currentPreset.type}</Typography>
                      </Box>
                      <Box display="flex" gap={4}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Voltage Level</Typography>
                          <Typography variant="body1" fontWeight={600}>{currentPreset.voltage}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">Capacity Rating</Typography>
                          <Typography variant="body1" fontWeight={600}>{currentPreset.load}</Typography>
                        </Box>
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
                    sx={{ borderRadius: 2, py: 1.5, textTransform: 'none', fontWeight: 600 }}
                  >
                    Customize Concept in Studio
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* MODE 2: INTERACTIVE DESIGN STUDIO */}
      {mode === 'studio' && (
        <Grid container spacing={4}>
          {/* Form Control Panel */}
          <Grid item xs={12} lg={5}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom display="flex" alignItems="center" gap={1}>
                <TuneIcon color="primary" />
                {activeDomain === 0 ? 'Architectural Parameters' : 'Electrical System Specs'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Configure parameters to generate customized detailed concepts and schematics.
              </Typography>

              {activeDomain === 0 ? (
                /* Architectural Inputs */
                <Stack spacing={2.5}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Architectural Style</InputLabel>
                    <Select
                      value={buildingForm.style}
                      label="Architectural Style"
                      onChange={(e) => setBuildingForm({ ...buildingForm, style: e.target.value })}
                    >
                      <MenuItem value="Futuristic Eco-Minimalism">Futuristic Eco-Minimalism</MenuItem>
                      <MenuItem value="Parametric Brutalism">Parametric Brutalism</MenuItem>
                      <MenuItem value="Nordic Organic">Nordic Organic</MenuItem>
                      <MenuItem value="Modern High-Tech Glass">Modern High-Tech Glass</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth size="small">
                    <InputLabel>Building Type</InputLabel>
                    <Select
                      value={buildingForm.type}
                      label="Building Type"
                      onChange={(e) => setBuildingForm({ ...buildingForm, type: e.target.value })}
                    >
                      <MenuItem value="Commercial Tower">Commercial Tower</MenuItem>
                      <MenuItem value="Cultural Center">Cultural Center</MenuItem>
                      <MenuItem value="Residential Complex">Residential Complex</MenuItem>
                      <MenuItem value="Mixed-Use Facility">Mixed-Use Facility</MenuItem>
                    </Select>
                  </FormControl>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        type="number"
                        label="Number of Floors"
                        value={buildingForm.floors}
                        onChange={(e) => setBuildingForm({ ...buildingForm, floors: Number(e.target.value) })}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Floor Area (sq ft)"
                        value={buildingForm.squareFeet}
                        onChange={(e) => setBuildingForm({ ...buildingForm, squareFeet: e.target.value })}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Custom Design Notes / Instructions"
                    placeholder="e.g., Include cantilevered balconies and high-translucency photovoltaic facades..."
                    value={buildingForm.customNotes}
                    onChange={(e) => setBuildingForm({ ...buildingForm, customNotes: e.target.value })}
                  />
                </Stack>
              ) : (
                /* Electrical Inputs */
                <Stack spacing={2.5}>
                  <FormControl fullWidth size="small">
                    <InputLabel>System Classification</InputLabel>
                    <Select
                      value={electricalForm.type}
                      label="System Classification"
                      onChange={(e) => setElectricalForm({ ...electricalForm, type: e.target.value })}
                    >
                      <MenuItem value="Commercial Microgrid">Commercial Microgrid</MenuItem>
                      <MenuItem value="Industrial Substation">Industrial Substation</MenuItem>
                      <MenuItem value="Data Center Power Distribution">Data Center Power Distribution</MenuItem>
                    </Select>
                  </FormControl>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Voltage Rating"
                        value={electricalForm.voltage}
                        onChange={(e) => setElectricalForm({ ...electricalForm, voltage: e.target.value })}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Load Capacity"
                        value={electricalForm.load}
                        onChange={(e) => setElectricalForm({ ...electricalForm, load: e.target.value })}
                      />
                    </Grid>
                  </Grid>

                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Electrical Specification Notes"
                    placeholder="e.g., Dual-redundant busbar setup with SCADA monitoring nodes..."
                    value={electricalForm.customNotes}
                    onChange={(e) => setElectricalForm({ ...electricalForm, customNotes: e.target.value })}
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
                sx={{ mt: 3, py: 1.5, borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
              >
                {isGenerating ? 'Generating Render...' : 'Generate Architecture'}
              </Button>
            </Paper>
          </Grid>

          {/* Generated Studio Outputs & Gallery Panel */}
          <Grid item xs={12} lg={7}>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 3, minHeight: 480, backgroundColor: '#f8fafc' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold" display="flex" alignItems="center" gap={1}>
                  <GalleryIcon color="action" />
                  Generated Studio Outputs ({gallery.length})
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {gallery.length === 0 ? (
                <Box textAlign="center" py={8} color="text.secondary">
                  <AutoAwesomeIcon sx={{ fontSize: 48, color: '#cbd5e1', mb: 1 }} />
                  <Typography variant="h6" fontWeight={500}>No Custom Renders Yet</Typography>
                  <Typography variant="body2">Adjust parameters on the left and click "Generate Architecture" to produce concepts.</Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {gallery.map((item) => (
                    <Grid item xs={12} sm={6} key={item.id}>
                      <Card elevation={2} sx={{ borderRadius: 2 }}>
                        <CardMedia component="img" height="180" image={item.imageUrl} alt={item.title} />
                        <CardContent sx={{ p: 2 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="start" mb={0.5}>
                            <Typography variant="subtitle2" fontWeight="bold" noWrap sx={{ maxWidth: '70%' }}>
                              {item.title}
                            </Typography>
                            <Chip label={item.domain} size="small" variant="outlined" color={item.domain === 'Building' ? 'primary' : 'secondary'} />
                          </Box>
                          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                            {item.specs} • Generated at {item.timestamp}
                          </Typography>
                          <Box display="flex" justifyContent="flex-end" gap={0.5} mt={1}>
                            <Tooltip title="Copy Specs">
                              <IconButton size="small"><CopyIcon fontSize="small" /></IconButton>
                            </Tooltip>
                            <Tooltip title="Download High-Res">
                              <IconButton size="small"><DownloadIcon fontSize="small" /></IconButton>
                            </Tooltip>
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
    </Container>
  );
}