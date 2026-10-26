# 🍃 VeriPure — Authentic Product & Nutritional Verification Web Application

> **"Eat Authentically. Know Every Ingredient."**  
> Dual-Diagnostic Web Platform for Real-Time Counterfeit Detection & Deep Nutritional Intelligence.

---

## 🎨 Visual Aesthetics & Design System: *"Bright, Airy, & Precision Glass"*

- **Palette**:
  - **Background**: Warm off-white (`#FBFBFB`), subtle cream tinting (`#F4F6F4`) with pale pastel accents.
  - **Sage / Emerald** (Authentic & Healthy): `#2E7D32` and `#E8F5E9` (light sage overlay)
  - **Amber / Coral** (Suspicious / Moderate): `#EF6C00` and `#FFF3E0`
  - **Crimson / Rose** (Fake / High Risk): `#C62828` and `#FFEBEE`
  - **Deep Navy** (Contrast & Text): `#1A237E` and `#0A192F`
- **Micro-Glassmorphism**: Translucent panels (`backdrop-filter: blur(14px)`), subtle borders (`rgba(226, 232, 240, 0.7)`), soft rounded corners (`border-radius: 16px / 24px`), and elevated drop shadows (`0 8px 30px rgba(0,0,0,0.04)`).
- **Audio Feedback**: Synthesized Web Audio API sound effects for scanning chirps, harmonic success chords, and counterfeit alert klaxons.

---

## 🚀 Key Pages & Architecture

### 1. Landing Page (`/`)
- **Dynamic Hero Section**: Real-time animated live scan demo showcasing transition from *"Scanning Barcode & Image..."* to *"VERIFIED AUTHENTIC 100%"* with Nutri-Score A grade and canvas-confetti particle celebrations.
- **Instant Search Bar**: Direct input supporting EAN-13, UPC-A, and GTIN codes with 1-click test chips.
- **Bento Box Features**:
  1. *3-Layer Fake Detection* (Barcode Checksum, OCR typography, Packaging Seal match).
  2. *Instant Nutri-Score & Quality Index* (Grades A-E + NOVA 1-4).
  3. *Personalized AI Chrono-Nutritionist* (Intake safety & metabolic warnings).
  4. *Global Counterfeit Heatmaps & Fraud Alerts*.
- **Interactive Live Counters**: Over 1.4M+ products verified, 43K+ fakes caught, and 8.9M+ nutritional analyses performed.

### 2. Multi-Scanner Hub (`/scan`)
- **Camera Scan**: Embedded webcam viewer with active targeting reticle, laser scan-line animation, and simulated fallback feed.
- **Image Upload & OCR**: Drag-and-drop zone for packaging photos (front label, back ingredient tag, barcode close-up) with client-side OCR parsing via `tesseract.js`.
- **Manual Barcode**: Standard barcode entry with live Modulo-10 GTIN checksum calculation and 1-click sample presets.
- **Step-by-Step Animated Loader**:
  - `[✓] Querying Brand Registry & Open Food Database...`
  - `[✓] Running OCR on Packaging & Typography...`
  - `[✓] Evaluating Logo Geometry & Seal Tamper Analysis...`
  - `[✓] Calculating Nutri-Score & AI Safety Index...`

### 3. Dual-Diagnostic Result Dashboard (`/result/:id`)
- **TAB 1: Authenticity & Counterfeit Analysis**:
  - Radial Authenticity Score Gauge (`99% Genuine` vs `14% Suspicious`).
  - 3-Layer Forensic Diagnostic Checklist (GS1 Registry, Optical Typography OCR, Packaging Hologram & Seal, MSRP Price Variance).
  - **Explainable AI (XAI) Heatmap Viewer**: Interactive packaging frame with clickable bounding boxes highlighting Barcode, Expiry Stamp, Brand Emblem, and Tamper Seals.
  - Whistleblower Fraud Report Modal with official reference tracking.
- **TAB 2: Nutrition, Quality & AI Intake Guide**:
  - Open Food Facts live API query with offline fallback.
  - Official Nutri-Score (A-E) & NOVA Group (1-4) badges.
  - Macronutrients per serving with visual % Daily Value (% DV) bars.
  - Additives & Allergen Radar with EFSA / FDA risk levels.
  - **Personalized Health Match Engine**: Real-time warnings dynamically triggered against active health conditions (Diabetic, Hypertension, Nut Allergy, Celiac, Vegan, Muscle Gain, Low Sodium).

### 4. Database Catalog (`/search`)
- Searchable catalog of consumer goods with real-time filters by verification state, category, and Nutri-Score.

### 5. Analytics & Fraud Heatmaps (`/analytics`)
- Telemetry dashboard with category fraud distribution, regional intercept radars, and active public health fraud bulletins.

### 6. Health Profile Management (`/profile`)
- Customizable health protocols and metabolic threshold sliders (Max Sugar / Serving, Max Sodium / Serving, Daily Calories).
- Quick 1-click persona switching (Sarah Chen - Diabetic, Marcus Vance - Fitness, Elena Rostova - Nut Allergy, Jordan Lee - Hypertension).

---

## 🧪 Barcodes Ready for 1-Click Testing

| Product Name | Barcode | Status | Key Feature Tested |
|---|---|---|---|
| **Nutella Hazelnut Spread** | `3017620422003` | Verified Authentic (99%) | Nutri-Score E, High Sugar warning for Diabetics, Hazelnuts allergen |
| **Optimum Nutrition 100% Whey** | `0748927028669` | Verified Authentic (98%) | Nutri-Score A, 24g Protein, Muscle Gain match |
| **⚠️ FAKE ON Whey Tub (Lot X9)** | `0748927028670` | **Counterfeit Detected (14%)** | Misspelled "Nutriton", missing hologram, cheap maltodextrin filler |
| **Coca-Cola Original 330ml** | `5449000000996` | Verified Authentic (98%) | Nutri-Score E, 35g liquid sugar warning |
| **KIND Dark Chocolate Nuts Bar** | `0602652171926` | Verified Authentic (99%) | Whole almonds, Severe Nut Allergy danger flag |
| **⚠️ FAKE The Ordinary Serum** | `0769915190311` | **Counterfeit Detected (18%)** | Expired batch clone, wrong font weight, toxic cosmetic hazard |
| **⚠️ FAKE Enfamil Formula** | `0076870514126` | **Critical Counterfeit (8%)** | Tampered seal, fatal dilution misprint, public health alert |
| **Oatly Barista Oat Drink** | `7394376616037` | Verified Authentic (99%) | Nutri-Score B, 100% Vegan verified, oat beta-glucans |
| **La Roche-Posay Anthelios SPF** | `3337875545778` | Verified Authentic (98%) | Patented Mexoryl 400, Dermatologically certified |
| **Monster Energy Drink 500ml** | `5060166692247` | Verified Authentic (97%) | High caffeine & sodium warning for Hypertension |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS v3, Vite
- **Icons & Animation**: `lucide-react`, `framer-motion`, `canvas-confetti`
- **Audio Synthesizer**: Web Audio API oscillator synthesis
- **OCR Engine**: `tesseract.js` for client-side packaging text extraction
- **Data Integration**: Open Food Facts Public API (`https://world.openfoodfacts.org/api/v2/product/{barcode}.json`)
- **State Management**: React Context (`AuthContext`, `HealthProfileContext`) + LocalStorage persistence

---

## 🏃 Running the Application

```bash
# 1. Start the Vite development server (default port 3000)
npm run dev

# 2. Build for production
npm run build

# 3. Preview production build
npm run preview
```

Access the application in your browser at `http://localhost:3000/`.
