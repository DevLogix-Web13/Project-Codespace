/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Flame, 
  Square, 
  Circle, 
  Scissors, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Factory,
  Play,
  RotateCcw,
  ShoppingCart,
  History,
  Info,
  Volume2,
  VolumeX,
  BarChart as BarChartIcon,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

// Audio Synthesis Utility
class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.value = 0.3;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private createNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return noiseBuffer;
  }

  playFurnace() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    noise.start();
    noise.stop(this.ctx.currentTime + 1.5);
  }

  playClank() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    
    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.2);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playWhir() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    
    const osc = this.ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(300, this.ctx.currentTime + 0.5);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }

  playCut() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    
    const noise = this.ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer();
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    noise.start();
    noise.stop(this.ctx.currentTime + 0.15);
  }

  playQA(approved: boolean) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    
    const osc = this.ctx.createOscillator();
    osc.type = approved ? 'sine' : 'sawtooth';
    osc.frequency.setValueAtTime(approved ? 880 : 110, this.ctx.currentTime);
    if (approved) {
      osc.frequency.exponentialRampToValueAtTime(1320, this.ctx.currentTime + 0.1);
    }
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  playSale() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    
    const osc1 = this.ctx.createOscillator();
    osc1.frequency.setValueAtTime(1000, this.ctx.currentTime);
    const osc2 = this.ctx.createOscillator();
    osc2.frequency.setValueAtTime(1500, this.ctx.currentTime);
    
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);
    
    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.3);
    osc2.stop(this.ctx.currentTime + 0.3);
  }

  playTargetAchieved() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    frequencies.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.1);
      gain.gain.setValueAtTime(0, this.ctx!.currentTime + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.1, this.ctx!.currentTime + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + i * 0.1 + 0.4);
      
      osc.connect(gain);
      gain.connect(this.masterGain!);
      
      osc.start(this.ctx!.currentTime + i * 0.1);
      osc.stop(this.ctx!.currentTime + i * 0.1 + 0.4);
    });
  }
}

const audio = new SoundManager();

// Types
type Stage = 'HEATING' | 'RECTANGULAR_MOLD' | 'SQUARING' | 'GROVE_CIRCLE' | 'SIZING' | 'QA' | 'SALES' | 'IDLE';
type SteelType = 'CARBON' | 'STAINLESS' | 'ALLOY';

const STEEL_TYPES: Record<SteelType, { label: string; heatingFactor: number; minStrength: number; basePrice: number; color: string }> = {
  CARBON: { label: 'Carbon Steel', heatingFactor: 1.0, minStrength: 500, basePrice: 450, color: 'text-slate-400' },
  STAINLESS: { label: 'Stainless Steel', heatingFactor: 0.7, minStrength: 600, basePrice: 850, color: 'text-blue-400' },
  ALLOY: { label: 'Alloy Steel', heatingFactor: 0.85, minStrength: 550, basePrice: 650, color: 'text-purple-400' }
};

interface Rebar {
  id: string;
  timestamp: number;
  qaStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  steelType: SteelType;
  qaReport?: {
    composition: { element: string; percentage: number }[];
    tensileStrength: number; // in MPa
    analysis: string;
  };
  specs: {
    length: number;
    shape: 'RECTANGLE' | 'SQUARE' | 'CIRCLE';
    temperature: number;
  };
}

const STAGES: { id: Stage; label: string; icon: React.ReactNode; color: string; description: string }[] = [
  { 
    id: 'HEATING', 
    label: 'Furnace', 
    icon: <Flame className="w-6 h-6" />, 
    color: 'bg-orange-600',
    description: 'Cooking steel to high temperatures for malleability.'
  },
  { 
    id: 'RECTANGULAR_MOLD', 
    label: 'Rect. Mold', 
    icon: <div className="w-6 h-4 bg-current rounded-sm opacity-80" />, 
    color: 'bg-amber-700',
    description: 'Forming the molten steel into a rectangular billet.'
  },
  { 
    id: 'SQUARING', 
    label: 'Roughing', 
    icon: <Square className="w-6 h-6" />, 
    color: 'bg-amber-800',
    description: 'Compressing the steel into a square cross-section.'
  },
  { 
    id: 'GROVE_CIRCLE', 
    label: 'Grove Machine', 
    icon: <Circle className="w-6 h-6" />, 
    color: 'bg-slate-700',
    description: 'Intermediate rolling to achieve a circular profile.'
  },
  { 
    id: 'SIZING', 
    label: 'Sizing (3m)', 
    icon: <Scissors className="w-6 h-6" />, 
    color: 'bg-blue-700',
    description: 'Cutting the continuous rebar into precise 3-meter lengths.'
  },
  { 
    id: 'QA', 
    label: 'QA Check', 
    icon: <CheckCircle2 className="w-6 h-6" />, 
    color: 'bg-purple-700',
    description: 'Inspecting quality, dimensions, and structural integrity.'
  },
  { 
    id: 'SALES', 
    label: 'Sales', 
    icon: <ShoppingCart className="w-6 h-6" />, 
    color: 'bg-emerald-700',
    description: 'Approved rebar ready for distribution and sale.'
  }
];

const MIN_TENSILE_STRENGTH = 500; // MPa threshold for "High Quality"
const NEAR_THRESHOLD = 450; // MPa threshold for "Near Quality"

const getStrengthColorClass = (strength: number, type: 'text' | 'bg') => {
  if (strength >= MIN_TENSILE_STRENGTH) return type === 'text' ? 'text-emerald-400' : 'bg-emerald-500';
  if (strength >= NEAR_THRESHOLD) return type === 'text' ? 'text-amber-400' : 'bg-amber-500';
  return type === 'text' ? 'text-red-400' : 'bg-red-500';
};

const QualityRadar = ({ rebar }: { rebar: Rebar }) => {
  const steelInfo = STEEL_TYPES[rebar.steelType];
  const report = rebar.qaReport;
  if (!report) return null;

  // Normalize values to 100 (target/ideal)
  const data = [
    {
      subject: 'Strength',
      value: (report.tensileStrength / steelInfo.minStrength) * 100,
      fullMark: 150,
    },
    {
      subject: 'Temp',
      value: (rebar.specs.temperature / 1200) * 100,
      fullMark: 150,
    },
    {
      subject: 'Carbon',
      value: ((report.composition.find(c => c.element === 'Carbon')?.percentage || 0.22) / 0.22) * 100,
      fullMark: 150,
    },
    {
      subject: 'Manganese',
      value: ((report.composition.find(c => c.element === 'Manganese')?.percentage || 0.65) / 0.65) * 100,
      fullMark: 150,
    },
  ];

  return (
    <div className="w-full h-40 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
          <Radar
            name="Quality"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [currentStage, setCurrentStage] = useState<Stage>('IDLE');
  const [history, setHistory] = useState<Rebar[]>([]);
  const [isAuto, setIsAuto] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentSteel, setCurrentSteel] = useState<Rebar | null>(null);
  const [simSpeed, setSimSpeed] = useState(1); // 1x, 2x, 4x
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [salesTarget, setSalesTarget] = useState(10);
  const [initialTemp, setInitialTemp] = useState(1200);
  const [selectedSteelType, setSelectedSteelType] = useState<SteelType>('CARBON');
  const [totalBatches, setTotalBatches] = useState(0);
  const [hasNotifiedTarget, setHasNotifiedTarget] = useState(false);

  const performAIAnalysis = async (rebar: Rebar) => {
    setIsAnalyzing(true);
    const steelInfo = STEEL_TYPES[rebar.steelType];
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this ${steelInfo.label} batch for composition and tensile strength. The required minimum tensile strength for this type is ${steelInfo.minStrength} MPa. Provide a realistic metallurgical report.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              composition: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    element: { type: Type.STRING },
                    percentage: { type: Type.NUMBER }
                  },
                  required: ["element", "percentage"]
                }
              },
              tensileStrength: { type: Type.NUMBER, description: "Tensile strength in MPa" },
              analysis: { type: Type.STRING, description: "Brief metallurgical summary" },
              isApproved: { type: Type.BOOLEAN }
            },
            required: ["composition", "tensileStrength", "analysis", "isApproved"]
          }
        }
      });

      const report = JSON.parse(response.text);
      return {
        qaStatus: report.isApproved ? 'APPROVED' : 'REJECTED' as const,
        qaReport: {
          composition: report.composition,
          tensileStrength: report.tensileStrength,
          analysis: report.analysis
        }
      };
    } catch (error) {
      console.error("AI Analysis failed:", error);
      // Fallback to random if AI fails
      const approved = Math.random() > 0.1;
      return {
        qaStatus: approved ? 'APPROVED' : 'REJECTED' as const,
        qaReport: {
          composition: [
            { element: 'Carbon', percentage: 0.22 },
            { element: 'Manganese', percentage: 0.65 }
          ],
          tensileStrength: 450 + Math.random() * 100,
          analysis: "Standard inspection performed (AI Fallback)."
        }
      };
    } finally {
      setIsAnalyzing(false);
    }
  };

  const startProcess = () => {
    if (currentStage !== 'IDLE') return;
    
    const newSteel: Rebar = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
      timestamp: Date.now(),
      qaStatus: 'PENDING',
      steelType: selectedSteelType,
      specs: {
        length: 0,
        shape: 'RECTANGLE',
        temperature: initialTemp
      }
    };
    
    setCurrentSteel(newSteel);
    setCurrentStage('HEATING');
    setProgress(0);
  };

  const nextStage = useCallback(async () => {
    const currentIndex = STAGES.findIndex(s => s.id === currentStage);
    if (currentIndex === -1) return;

    if (currentIndex < STAGES.length - 1) {
      const nextS = STAGES[currentIndex + 1].id;
      
      // Update steel specs based on stage
      if (currentSteel) {
        let updatedSteel = { ...currentSteel };
        if (nextS === 'SQUARING') updatedSteel.specs.shape = 'SQUARE' as const;
        if (nextS === 'GROVE_CIRCLE') updatedSteel.specs.shape = 'CIRCLE' as const;
        if (nextS === 'SIZING') updatedSteel.specs.length = 3;
        
        if (nextS === 'QA') {
          const aiResult = await performAIAnalysis(updatedSteel);
          updatedSteel = { ...updatedSteel, ...aiResult };
        }
        setCurrentSteel(updatedSteel);
      }

      setCurrentStage(nextS);
      setProgress(0);
    } else {
      // Process complete
      if (currentSteel) {
        setTotalBatches(prev => prev + 1);
        setHistory(prev => {
          // Prevent duplicate entries with the same ID
          if (prev.some(item => item.id === currentSteel.id)) return prev;
          return [currentSteel, ...prev].slice(0, 50);
        });
      }
      setCurrentStage('IDLE');
      setCurrentSteel(null);
      setProgress(0);
    }
  }, [currentStage, currentSteel]);

  // Handle Sound Effects
  useEffect(() => {
    if (isMuted || currentStage === 'IDLE') return;

    switch (currentStage) {
      case 'HEATING':
        audio.playFurnace();
        break;
      case 'RECTANGULAR_MOLD':
      case 'SQUARING':
        audio.playClank();
        break;
      case 'GROVE_CIRCLE':
        audio.playWhir();
        break;
      case 'SIZING':
        audio.playCut();
        break;
      case 'QA':
        if (currentSteel) audio.playQA(currentSteel.qaStatus === 'APPROVED');
        break;
      case 'SALES':
        audio.playSale();
        break;
    }
  }, [currentStage, isMuted, currentSteel?.qaStatus]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStage !== 'IDLE') {
      interval = setInterval(() => {
        let increment = 5 * simSpeed;
        if (currentStage === 'HEATING') {
          // Higher temp = faster heating (shorter duration)
          // 1200 is baseline. 1500 is faster, 100 is slower.
          // Also affected by steel type heating factor.
          const steelFactor = currentSteel ? STEEL_TYPES[currentSteel.steelType].heatingFactor : 1;
          increment = increment * (initialTemp / 1200) * steelFactor;
        }
        setProgress(prev => Math.min(prev + increment, 100));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [currentStage, simSpeed, initialTemp, currentSteel]);

  useEffect(() => {
    if (progress >= 100 && currentStage !== 'IDLE') {
      nextStage();
    }
  }, [progress, nextStage, currentStage]);

  useEffect(() => {
    if (isAuto && currentStage === 'IDLE') {
      const timeout = setTimeout(startProcess, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isAuto, currentStage]);

  const rerunQA = async (id: string) => {
    const itemToRerun = history.find(item => item.id === id);
    if (!itemToRerun) return;

    setIsAnalyzing(true);
    const aiResult = await performAIAnalysis(itemToRerun);
    
    setHistory(prev => prev.map(item => {
      if (item.id === id) {
        if (!isMuted) audio.playQA(aiResult.qaStatus === 'APPROVED');
        return { ...item, ...aiResult };
      }
      return item;
    }));
    setIsAnalyzing(false);
  };

  const stats = {
    total: history.length,
    approved: history.filter(r => r.qaStatus === 'APPROVED').length,
    rejected: history.filter(r => r.qaStatus === 'REJECTED').length,
    revenue: history.filter(r => r.qaStatus === 'APPROVED').reduce((acc, r) => acc + STEEL_TYPES[r.steelType].basePrice, 0)
  };

  useEffect(() => {
    if (stats.approved >= salesTarget && !hasNotifiedTarget && salesTarget > 0) {
      if (!isMuted) audio.playTargetAchieved();
      setHasNotifiedTarget(true);
    } else if (stats.approved < salesTarget) {
      setHasNotifiedTarget(false);
    }
  }, [stats.approved, salesTarget, hasNotifiedTarget, isMuted]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-600 rounded-lg">
              <Factory className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Steel Rolling Mill</h1>
          </div>
          <p className="text-slate-400">Industrial Rebar Production Control System</p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Target</span>
            <input
              type="number"
              value={salesTarget}
              onChange={(e) => setSalesTarget(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-12 bg-transparent text-blue-400 font-bold text-sm focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Temp</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="100"
                max="1500"
                value={initialTemp}
                onChange={(e) => setInitialTemp(Math.min(1500, Math.max(100, parseInt(e.target.value) || 100)))}
                className="w-12 bg-transparent text-orange-400 font-bold text-sm focus:outline-none"
              />
              <span className="text-[10px] text-slate-500">°C</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Speed</span>
            <div className="flex gap-1">
              {[1, 2, 4, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => setSimSpeed(s)}
                  className={`w-8 h-6 rounded text-[10px] font-bold transition-all ${
                    simSpeed === s 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Type</span>
            <div className="flex gap-1">
              {(Object.keys(STEEL_TYPES) as SteelType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedSteelType(type)}
                  className={`px-3 h-6 rounded text-[10px] font-bold transition-all ${
                    selectedSteelType === type 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                  }`}
                >
                  {STEEL_TYPES[type].label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsAuto(!isAuto)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all ${
              isAuto 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isAuto ? 'Auto-Mode ON' : 'Manual Mode'}
          </button>
          
          <button
            onClick={startProcess}
            disabled={currentStage !== 'IDLE'}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full font-medium transition-all shadow-lg shadow-blue-900/20"
          >
            <Play className="w-4 h-4 fill-current" />
            Start Batch
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Production Line Visualization */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8 overflow-hidden relative">
            <h2 className="text-xl font-semibold mb-8 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Live Production Line
            </h2>

            <div className="relative flex flex-col gap-12">
              {/* Stages Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 relative z-10">
                {STAGES.map((stage, idx) => {
                  const isActive = currentStage === stage.id;
                  const isCompleted = STAGES.findIndex(s => s.id === currentStage) > idx;
                  
                  return (
                    <div key={stage.id} className="flex flex-col items-center text-center group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 p-2 bg-slate-800 text-slate-200 text-[10px] rounded-lg border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                        <p className="font-bold text-blue-400 mb-1">{stage.label}</p>
                        {stage.description}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-r border-b border-slate-700 rotate-45" />
                      </div>

                      <div className={`
                        relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                        ${isActive ? `${stage.color} scale-110 shadow-2xl shadow-${stage.color.split('-')[1]}-500/50` : 'bg-slate-800'}
                        ${isCompleted ? 'border-2 border-emerald-500/50' : 'border border-slate-700'}
                      `}>
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <div className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}>
                            {stage.icon}
                          </div>
                        )}
                        
                        {isActive && (
                          <motion.div 
                            className="absolute -bottom-1 left-0 h-1 bg-white rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                          />
                        )}
                      </div>
                      <span className={`mt-3 text-xs font-medium uppercase tracking-wider ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {stage.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Visual Simulation Area */}
              <div className="h-48 bg-slate-950/50 rounded-2xl border border-slate-800/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="h-full w-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px]" />
                </div>

                <AnimatePresence mode="wait">
                  {currentSteel ? (
                    <motion.div
                      key={currentStage}
                      initial={{ x: -100, opacity: 0, scale: 0.8 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{ x: 100, opacity: 0, scale: 0.8 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="relative">
                        {/* The Steel Piece */}
                        <motion.div
                          animate={{
                            backgroundColor: currentStage === 'HEATING' ? '#ea580c' : 
                                           currentStage === 'RECTANGULAR_MOLD' ? '#b45309' :
                                           currentStage === 'SQUARING' ? '#92400e' : '#334155',
                            width: currentStage === 'SIZING' || currentStage === 'QA' || currentStage === 'SALES' ? 240 : 120,
                            height: currentStage === 'RECTANGULAR_MOLD' ? 40 : 
                                   currentStage === 'SQUARING' ? 60 : 
                                   currentStage === 'GROVE_CIRCLE' ? 60 : 60,
                            borderRadius: currentStage === 'GROVE_CIRCLE' || currentStage === 'QA' || currentStage === 'SALES' ? '9999px' : '4px',
                          }}
                          className="shadow-2xl flex items-center justify-center overflow-hidden"
                        >
                          {currentStage === 'HEATING' && (
                            <motion.div 
                              animate={{ opacity: [0.4, 0.8, 0.4] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                              className="absolute inset-0 bg-gradient-to-t from-orange-400/50 to-transparent" 
                            />
                          )}
                          
                          {/* Rebar Texture */}
                          {(currentStage === 'GROVE_CIRCLE' || currentStage === 'SIZING' || currentStage === 'QA' || currentStage === 'SALES') && (
                            <div className="w-full h-full flex justify-around items-center px-2 opacity-30">
                              {[...Array(12)].map((_, i) => (
                                <div key={i} className="w-1 h-full bg-black/40 -skew-x-12" />
                              ))}
                            </div>
                          )}
                        </motion.div>

                        {/* Temperature Indicator */}
                        {currentStage !== 'IDLE' && (
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                            TEMP: {Math.max(200, 1200 - (STAGES.findIndex(s => s.id === currentStage) * 150))}°C
                          </div>
                        )}
                      </div>

                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-300">
                          {STAGES.find(s => s.id === currentStage)?.description}
                        </p>
                        {currentStage === 'QA' && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-2 flex flex-col items-center gap-2"
                          >
                            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                              currentSteel.qaStatus === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {isAnalyzing ? (
                                <RotateCcw className="w-3 h-3 animate-spin" />
                              ) : (
                                currentSteel.qaStatus === 'APPROVED' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />
                              )}
                              {isAnalyzing ? 'AI ANALYZING...' : `${STEEL_TYPES[currentSteel.steelType].label} - ${currentSteel.qaStatus}`}
                            </div>
                            
                            {currentSteel.qaReport && !isAnalyzing && (
                              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-[10px] text-left max-w-xs backdrop-blur-sm">
                                <p className="text-blue-400 font-bold mb-1 uppercase tracking-tighter">Metallurgical Report</p>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-2">
                                  {currentSteel.qaReport.composition.map((c, i) => (
                                    <div key={i} className="flex justify-between border-b border-slate-700/50 pb-0.5">
                                      <span className="text-slate-500">{c.element}:</span>
                                      <span className="font-mono text-slate-300">{c.percentage}%</span>
                                    </div>
                                  ))}
                                </div>
                                <div className="flex justify-between mb-1">
                                  <span className="text-slate-500">Tensile Strength:</span>
                                  <span className={`font-mono font-bold ${getStrengthColorClass(currentSteel.qaReport.tensileStrength, 'text')}`}>
                                    {currentSteel.qaReport.tensileStrength.toFixed(0)} MPa
                                  </span>
                                </div>
                                <div className="w-full h-2 bg-slate-700 rounded-full mb-2 relative overflow-hidden border border-slate-600/50">
                                  {/* Threshold Marker */}
                                  <div 
                                    className="absolute left-[62.5%] top-0 bottom-0 w-0.5 bg-white/40 z-10" 
                                    title="High Quality Threshold: 500 MPa" 
                                  />
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((currentSteel.qaReport.tensileStrength / 800) * 100, 100)}%` }}
                                    className={`h-full ${getStrengthColorClass(currentSteel.qaReport.tensileStrength, 'bg')}`}
                                  />
                                </div>
                                <p className="text-slate-400 italic leading-tight border-t border-slate-700 pt-1">
                                  {currentSteel.qaReport.analysis}
                                </p>
                                
                                <div className="border-t border-slate-700 mt-2 pt-2">
                                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                                    <Activity className="w-3 h-3" />
                                    Quality Profile (vs Target)
                                  </p>
                                  <QualityRadar rebar={currentSteel} />
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-slate-600 flex flex-col items-center gap-2">
                      <RotateCcw className="w-8 h-8 opacity-20 animate-spin-slow" />
                      <p className="text-sm font-medium">System Idle - Waiting for Batch</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Sales Target Progress */}
          <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-emerald-400" />
                Daily Sales Target
              </h2>
              <div className="text-right">
                <span className="text-2xl font-bold text-emerald-400">{stats.approved}</span>
                <span className="text-slate-500 text-sm font-medium"> / {salesTarget} Units</span>
              </div>
            </div>
            
            <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((stats.approved / salesTarget) * 100, 100)}%` }}
                className={`h-full transition-all duration-1000 ${
                  stats.approved >= salesTarget ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-blue-500'
                }`}
              />
              {stats.approved >= salesTarget && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md">Target Achieved!</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span>0%</span>
              <span>{Math.round((stats.approved / salesTarget) * 100)}% Progress</span>
              <span>100%</span>
            </div>
          </section>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Batches</p>
              <p className="text-3xl font-bold">{totalBatches}</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Produced</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
              <p className="text-emerald-500 text-xs font-bold uppercase tracking-wider mb-1">Approved</p>
              <p className="text-3xl font-bold text-emerald-400">{stats.approved}</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
              <p className="text-red-500 text-xs font-bold uppercase tracking-wider mb-1">Rejected</p>
              <p className="text-3xl font-bold text-red-400">{stats.rejected}</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
              <p className="text-blue-500 text-xs font-bold uppercase tracking-wider mb-1">Est. Revenue</p>
              <p className="text-3xl font-bold text-blue-400">${stats.revenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Sidebar: History & Info */}
        <div className="space-y-8">
          <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col h-[600px]">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-purple-400" />
              Production Log
            </h2>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center p-8">
                  <Info className="w-12 h-12 mb-4 opacity-20" />
                  <p>No production data available yet. Start a batch to see results.</p>
                </div>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="bg-slate-800/50 border border-slate-700/50 p-4 rounded-xl flex flex-col gap-3 group hover:bg-slate-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${item.qaStatus === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                          {item.qaStatus === 'APPROVED' ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold font-mono">#{item.id.toUpperCase()}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-[10px] text-slate-500">{new Date(item.timestamp).toLocaleTimeString()}</p>
                            <span className={`text-[10px] font-bold ${STEEL_TYPES[item.steelType].color}`}>{STEEL_TYPES[item.steelType].label}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <p className="text-xs font-medium text-slate-300">3.0m Rebar</p>
                        <div className="flex items-center gap-2">
                          <p className={`text-[10px] font-bold ${item.qaStatus === 'APPROVED' ? 'text-emerald-500' : 'text-red-500'}`}>
                            {item.qaStatus}
                          </p>
                          <button
                            onClick={() => rerunQA(item.id)}
                            className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white transition-colors"
                            title="Re-run QA Check"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {item.qaReport && (
                      <div className="pt-2 border-t border-slate-700/50">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {item.qaReport.composition.map((c, i) => (
                            <div key={i} className="flex justify-between text-[9px]">
                              <span className="text-slate-500">{c.element}:</span>
                              <span className="text-slate-300 font-mono">{c.percentage}%</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-700/30">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[9px] text-slate-500 uppercase tracking-tighter">Tensile Strength</span>
                            <span className={`text-[10px] font-bold ${getStrengthColorClass(item.qaReport.tensileStrength, 'text')}`}>
                              {item.qaReport.tensileStrength.toFixed(0)} MPa
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden relative">
                            {/* Mini Threshold Marker */}
                            <div className="absolute left-[62.5%] top-0 bottom-0 w-px bg-white/20 z-10" />
                            <div 
                              className={`h-full ${getStrengthColorClass(item.qaReport.tensileStrength, 'bg')}`}
                              style={{ width: `${Math.min((item.qaReport.tensileStrength / 800) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-6">
            <h3 className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Process Overview
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">01.</span>
                <span>Heating steel to 1200°C for maximum plasticity.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">02.</span>
                <span>Primary molding into rectangular billets.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">03.</span>
                <span>Roughing mill reduces cross-section to square.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">04.</span>
                <span>Grove machine finishes the profile to circular.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400 font-bold">05.</span>
                <span>Precision cutting to 3-meter standard lengths.</span>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
