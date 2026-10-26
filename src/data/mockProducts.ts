import { ProductVerificationData } from '../types';

export const MOCK_PRODUCTS: ProductVerificationData[] = [
  // 1. Nutella Ferrero Hazelnut Spread (SAFE)
  {
    id: 'nutella-400g',
    barcode: '3017620422003',
    barcodeFormat: 'EAN-13',
    productName: 'Nutella Ferrero Hazelnut Spread with Cocoa (400g)',
    brand: 'Ferrero S.p.A.',
    category: 'Spreads & Sweet Confectionery',
    originCountry: 'Italy / France',
    verifiedTimestamp: 'Verified in real-time via Ferrero Global GS1 Registry',
    authenticityStatus: 'SAFE',
    authenticityScore: 100,
    msrpPrice: 4.89,
    reportedMarketPrice: 4.75,
    lotBatchNumber: 'L289XB02-EXP12/26',
    packagingFrontImage: 'https://images.openfoodfacts.org/images/products/301/762/042/2003/front_en.520.400.jpg',
    checks: {
      barcodeRegistry: {
        status: 'pass',
        title: 'GS1 Global Registry Validated',
        summary: 'Official EAN-13 prefix registered directly to Ferrero International S.A.',
        details: [
          'GTIN Checksum mathematically verified (Modulo-10 check passed)',
          'Brand Prefix 301 belongs to GS1 France Member Organization',
          'Product catalog classification matches global customs HS Code 180690'
        ],
        metricLabel: 'Registry Confidence',
        metricValue: '100%'
      },
      typographyInspection: {
        status: 'pass',
        title: 'Micro-Typography & Font Alignment Check',
        summary: 'Character kerning, FDA/EU mandatory nutritional format matches master template',
        details: [
          'Master font "Brown / Helvetica Neue Modified" glyph vectors verified',
          'EU Nutrition Declaration (Regulation 1169/2011) formatting compliant',
          'Production plant license code "FR 76.540.001 CE" present and active'
        ],
        metricLabel: 'OCR Match Ratio',
        metricValue: '100%'
      },
      packagingHologram: {
        status: 'pass',
        title: 'Lid Seal & Contour Integrity',
        summary: 'Gold thermal foil seal reflection curve conforms to genuine automated packaging specs',
        details: [
          'Induction heat-seal hermetic barrier confirmed intact',
          'Ferrero signature oval glass jar curvature ratio matches CAD mold spec',
          'Tamper-evident tear band shows zero micro-fractures'
        ],
        metricLabel: 'Optical Seal Score',
        metricValue: '100%'
      },
      priceDistribution: {
        status: 'pass',
        title: 'Distribution Channel & MSRP Consistency',
        summary: 'Reported retailer pricing is within normal 5% promotional variance',
        details: [
          'Authorized European & Global grocery distribution tier',
          'No unauthorized bulk liquidation alerts flagged in the past 90 days'
        ],
        metricLabel: 'Price Variance',
        metricValue: '-2.8%'
      }
    },
    xaiHeatmapRegions: [
      {
        id: 'r1',
        label: 'Ferrero Brand Seal & Logo',
        confidence: 100,
        box: { x: 22, y: 18, width: 56, height: 20 },
        status: 'authentic',
        findingDescription: 'Exact colorimetry and serif geometry of the classic black "n" and red "utella"',
        inspectionDetail: 'Pantone Red 032 C and Process Black match brand spectral profile.'
      },
      {
        id: 'r2',
        label: 'Gold Foil Induction Seal',
        confidence: 99.8,
        box: { x: 30, y: 4, width: 40, height: 12 },
        status: 'authentic',
        findingDescription: 'Hermetic factory seal intact with authentic micro-embossed star patterns',
        inspectionDetail: 'Absence of secondary adhesive or hand-applied crimping.'
      },
      {
        id: 'r3',
        label: 'GS1 Standard Barcode',
        confidence: 100,
        box: { x: 12, y: 68, width: 28, height: 22 },
        status: 'authentic',
        findingDescription: 'Clean vector edges, proper quiet zones on both flanks',
        inspectionDetail: 'EAN-13 code 3017620422003 decoded without optical jitter.'
      },
      {
        id: 'r4',
        label: 'Traceability Batch Code Stamp',
        confidence: 99.5,
        box: { x: 55, y: 72, width: 38, height: 16 },
        status: 'authentic',
        findingDescription: 'Factory inkjet dot-matrix printing in precise green-black dye',
        inspectionDetail: 'Plant L289 confirms batch roasted hazelnuts from Piedmont supply chain.'
      }
    ],
    nutrition: {
      nutriScore: 'E',
      nutriScoreScore: 26,
      novaGroup: 4,
      servingSize: '15g (1 tbsp)',
      calories: 539,
      macros: {
        protein: { label: 'Protein', amount: 6.3, unit: 'g', dailyValuePercentage: 12, status: 'moderate' },
        carbs: { label: 'Carbs', amount: 57.5, unit: 'g', dailyValuePercentage: 21, status: 'high' },
        sugars: { label: 'Sugars', amount: 56.3, unit: 'g', dailyValuePercentage: 62, status: 'high' },
        fats: { label: 'Total Fats', amount: 30.9, unit: 'g', dailyValuePercentage: 44, status: 'high' },
        saturatedFats: { label: 'Saturated Fat', amount: 10.6, unit: 'g', dailyValuePercentage: 53, status: 'high' },
        fiber: { label: 'Dietary Fiber', amount: 3.4, unit: 'g', dailyValuePercentage: 12, status: 'moderate' },
        sodium: { label: 'Sodium', amount: 42, unit: 'mg', dailyValuePercentage: 2, status: 'optimal' }
      },
      additives: [
        { code: 'E322', name: 'Sunflower / Soy Lecithin', riskLevel: 'low', description: 'Natural emulsifier helping bond fats and solids', commonUses: 'Chocolate spreads & bakery' },
        { code: 'Vanillin', name: 'Synthetic Flavoring', riskLevel: 'low', description: 'Aroma identical to natural vanilla bean extract', commonUses: 'Confectionery' }
      ],
      allergens: ['Hazelnuts (Tree Nuts)', 'Milk Solids (Dairy / Lactose)', 'Soy Lecithin'],
      ingredientsListText: 'Sugar, Palm Oil, Hazelnuts (13%), Skimmed Milk Powder (8.7%), Fat-Reduced Cocoa (7.4%), Emulsifier: Lecithins (Soya), Vanillin.',
      packagingEcoScore: 'C (Glass jar 100% recyclable, plastic cap type 5 PP)'
    },
    aiIntakeAdvice: {
      productSummary: 'Authentic classic confectionery hazelnut cocoa spread. Ultra-processed high-density energy source predominantly composed of sugar and vegetable oils.',
      contextualAdvice: 'Treat strictly as an occasional dessert delicacy. A single 15g tablespoon delivers over 55% of your recommended daily free sugar threshold.',
      timingAdvice: 'Best consumed during active daylight hours or directly with high-fiber whole grain bread to dampen glycemic velocity. Avoid within 3 hours of sleep.',
      safetyScoreIndex: 52,
      servingRecommendation: 'Limit to 1 tablespoon (15g) max 2 times per week.',
      healthProfileImpacts: [
        {
          condition: 'diabetic',
          status: 'danger',
          headline: 'Severe Glycemic Surge Hazard',
          description: 'Contains 56.3g sugar per 100g. 1 serving exceeds your strict 10g glucose spike limit.'
        },
        {
          condition: 'lactose_intolerant',
          status: 'danger',
          headline: 'Contains Dairy (Lactose)',
          description: 'Formulated with 8.7% Skimmed Milk Powder — triggers digestive distress for lactose intolerant consumers.'
        },
        {
          condition: 'nut_allergy',
          status: 'danger',
          headline: 'Contains Hazelnuts (Tree Nut)',
          description: 'Immediate severe anaphylaxis risk for individuals allergic to tree nuts.'
        },
        {
          condition: 'weight_loss',
          status: 'caution',
          headline: 'High Caloric & Fat Density',
          description: 'Delivers 539 kcal and 30.9g fat per 100g. Calorie dense for calorie-deficit goals.'
        }
      ]
    },
    fraudIntelligence: {
      knownFakesCount: 0,
      reportedIncidentLocations: [],
      riskLevel: 'LOW',
      officialManufacturerContact: 'consumer.care@ferrero.com'
    }
  },

  // 2. Coca-Cola Original Taste 330ml (SAFE)
  {
    id: 'coca-cola-330ml',
    barcode: '5449000000996',
    barcodeFormat: 'EAN-13',
    productName: 'Coca-Cola Original Taste (330ml Can)',
    brand: 'The Coca-Cola Company',
    category: 'Carbonated Beverages',
    originCountry: 'United Kingdom / Belgium',
    verifiedTimestamp: 'Verified via Coca-Cola European Partners (CCEP) GS1 Gateway',
    authenticityStatus: 'SAFE',
    authenticityScore: 100,
    msrpPrice: 1.25,
    reportedMarketPrice: 1.20,
    lotBatchNumber: 'GB042-2024B7',
    packagingFrontImage: 'https://images.openfoodfacts.org/images/products/544/900/000/0996/front_en.1082.400.jpg',
    checks: {
      barcodeRegistry: {
        status: 'pass',
        title: 'GS1 Beverage Master Registered',
        summary: 'Universal Coca-Cola 330ml can SKU matched across 140+ countries',
        details: [
          'Direct validation against Coca-Cola Hellenic & CCEP master records',
          'EAN 5449000000996 verified active and checksum passed',
          'Recycling deposit schema (UK/EU DRS) metadata validated'
        ],
        metricLabel: 'Registry Confidence',
        metricValue: '100%'
      },
      typographyInspection: {
        status: 'pass',
        title: 'Spencerian Script Vector Accuracy',
        summary: 'Dynamic Ribbon device and trademark cursive curves match master vectors with 0.1mm tolerance',
        details: [
          'No font interpolation distortion found on curved aluminum substrate',
          'FSA nutrition box layout matches Statutory Instrument 2014 No. 1855'
        ],
        metricLabel: 'OCR Match Ratio',
        metricValue: '100%'
      },
      packagingHologram: {
        status: 'pass',
        title: 'Can Top Pull-Tab & Lacquer Verification',
        summary: 'Standard 202-diameter aluminum beverage lid with embossed silhouette',
        details: [
          'Laser-etched bottom can dome traceability matrix matches bottling line GB-Sidcup',
          'Food-grade internal polymer lining certified BPA-NI compliant'
        ],
        metricLabel: 'Substrate Integrity',
        metricValue: '100%'
      },
      priceDistribution: {
        status: 'pass',
        title: 'Standard Grocery Retail Benchmark',
        summary: 'Retail transaction cost aligns with standard national supermarket pricing',
        details: ['Audited distribution via authorized national wholesaler'],
        metricLabel: 'Price Variance',
        metricValue: '-4.0%'
      }
    },
    xaiHeatmapRegions: [
      {
        id: 'c1',
        label: 'Spencerian Script Trademark',
        confidence: 100,
        box: { x: 18, y: 32, width: 64, height: 26 },
        status: 'authentic',
        findingDescription: 'Authentic signature ribbon flourish without any digital scan artifacts',
        inspectionDetail: 'Pantone Red 185 C screen print color profile verified.'
      },
      {
        id: 'c2',
        label: 'Aluminum Pull-Tab Seal',
        confidence: 99.8,
        box: { x: 34, y: 6, width: 32, height: 14 },
        status: 'authentic',
        findingDescription: 'Laser cut contour and standard rivet tensile resistance conform to CCEP spec',
        inspectionDetail: 'No evidence of puncture, siphon or counterfeit re-canning.'
      },
      {
        id: 'c3',
        label: 'Can Base Matrix Laser Stamp',
        confidence: 100,
        box: { x: 25, y: 84, width: 50, height: 12 },
        status: 'authentic',
        findingDescription: 'Genuine high-velocity pulsed laser expiration date on concave bottom dome',
        inspectionDetail: 'Format GB042 14:22 EXP 08/2027 decoded accurately.'
      }
    ],
    nutrition: {
      nutriScore: 'E',
      nutriScoreScore: 28,
      novaGroup: 4,
      servingSize: '330ml (1 can)',
      calories: 139,
      macros: {
        protein: { label: 'Protein', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        carbs: { label: 'Carbs', amount: 35, unit: 'g', dailyValuePercentage: 13, status: 'moderate' },
        sugars: { label: 'Sugars', amount: 35, unit: 'g', dailyValuePercentage: 39, status: 'high' },
        fats: { label: 'Total Fats', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        saturatedFats: { label: 'Saturated Fat', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        fiber: { label: 'Dietary Fiber', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        sodium: { label: 'Sodium', amount: 15, unit: 'mg', dailyValuePercentage: 1, status: 'optimal' }
      },
      additives: [
        { code: 'E150d', name: 'Sulphite Ammonia Caramel', riskLevel: 'moderate', description: 'Coloring agent produced by controlled heat treatment', commonUses: 'Dark colas & gravies' },
        { code: 'E338', name: 'Phosphoric Acid', riskLevel: 'moderate', description: 'Acidifying agent imparting tangy tartness', commonUses: 'Carbonated soft drinks' },
        { code: 'Caffeine', name: 'Natural Stimulant (32mg)', riskLevel: 'low', description: 'Mild central nervous system stimulant', commonUses: 'Energy drinks, colas' }
      ],
      allergens: [],
      ingredientsListText: 'Carbonated Water, Sugar, Colour (Caramel E150d), Acid (Phosphoric Acid), Natural Flavourings Including Caffeine.',
      packagingEcoScore: 'B (100% infinitely recyclable aluminum can)'
    },
    aiIntakeAdvice: {
      productSummary: 'Authentic formulation sweetened with pure sucrose or high-fructose corn syrup depending on regional bottling. Zero micronutrient or protein value.',
      contextualAdvice: 'Delivers 35g of rapid-absorption liquid sugar. Causes immediate insulin surge followed by reactive hypoglycemia crash.',
      timingAdvice: 'If consumed, pair with a protein/fiber-rich meal to blunt absorption. Avoid within 6 hours of bedtime.',
      safetyScoreIndex: 44,
      servingRecommendation: 'Limit to occasional consumption (1 can / week or switch to Zero Sugar).',
      healthProfileImpacts: [
        {
          condition: 'diabetic',
          status: 'danger',
          headline: 'Severe 35g Liquid Sugar Hazard',
          description: 'Liquid carbohydrates absorb virtually instantly through stomach mucosa, triggering dangerous glucose excursions.'
        },
        {
          condition: 'hypertension',
          status: 'caution',
          headline: 'Caffeine & Vasoconstriction',
          description: 'Contains 32mg caffeine with phosphoric acid which can temporarily elevate resting systolic pressure.'
        },
        {
          condition: 'vegan',
          status: 'safe',
          headline: 'Vegan Verified',
          description: 'Contains no animal byproducts or bone-char filtered cane sugar in EU/UK batches.'
        }
      ]
    },
    fraudIntelligence: {
      knownFakesCount: 0,
      reportedIncidentLocations: [],
      riskLevel: 'LOW',
      officialManufacturerContact: 'consumerquestions@coca-cola.com'
    }
  },

  // 3. Fake Whey Protein Supplement (COUNTERFEIT)
  {
    id: 'fake-whey-supplement',
    barcode: '8901234567890',
    barcodeFormat: 'EAN-13 (COUNTERFEIT UNREGISTERED)',
    productName: 'Fake Whey Protein Supplement (Illicit Clone)',
    brand: 'FALSIFIED BRAND CLONE ("Optimum Nutriton")',
    category: 'Counterfeit Sports Supplements / Fraud Alert',
    originCountry: 'Unknown Underground Bottler (Reported in South Asia)',
    verifiedTimestamp: 'FLAGGED AS DANGEROUS COUNTERFEIT BY VERIPURE ENGINE',
    authenticityStatus: 'COUNTERFEIT',
    authenticityScore: 14,
    msrpPrice: 79.99,
    reportedMarketPrice: 28.50,
    lotBatchNumber: 'FAKE-ON-2024-X9',
    packagingFrontImage: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80',
    checks: {
      barcodeRegistry: {
        status: 'fail',
        title: 'Unregistered Barcode & GS1 Collisions',
        summary: 'Barcode 8901234567890 does not exist in GS1 Global Brand Registry',
        details: [
          'Barcode is unregistered and fails official Brand Owner allocation',
          'Serial collision: duplicated across dozens of fraudulent online storefronts',
          'Not found in Glanbia / Optimum Nutrition authorized supply chain records'
        ],
        metricLabel: 'Registry Confidence',
        metricValue: '0%'
      },
      typographyInspection: {
        status: 'fail',
        title: 'Critical Label Misspellings & Type Discrepancies',
        summary: 'OCR detected severe typos: "Optimum Nutriton" and altered logo font weights',
        details: [
          'Brand header misspelled as "OPTIMUM NUTRITON" (missing "i")',
          'Missing mandatory FDA disclaimer box and DSHEA legal declaration',
          'Logo geometry aspect ratio distorted by 14% compared to master CAD vectors'
        ],
        metricLabel: 'OCR Match Ratio',
        metricValue: '31.2%'
      },
      packagingHologram: {
        status: 'fail',
        title: 'Missing Safety Seal & Flawed Hologram Geometry',
        summary: 'Neck band is cheap printed cellophane without optical diffraction grating',
        details: [
          'Holographic emblem is flat printed silver ink with zero angle-shift coloration',
          'Tub fabricated from toxic industrial-grade polystyrene with sharp flash edges',
          'Inner paper seal missing factory induction vacuum crimp'
        ],
        metricLabel: 'Holographic Fidelity',
        metricValue: '6.4%'
      },
      priceDistribution: {
        status: 'fail',
        title: 'Extreme 64% Price Deflation Warning',
        summary: 'Offered at $28.50 vs manufacturer wholesale baseline of $58.00',
        details: ['Price point is mathematically impossible for authentic whey isolate raw materials'],
        metricLabel: 'Price Variance',
        metricValue: '-64.3%'
      }
    },
    xaiHeatmapRegions: [
      {
        id: 'f-whey-1',
        label: 'Misspelled Brand Header ("Nutriton")',
        confidence: 99.8,
        box: { x: 18, y: 16, width: 64, height: 14 },
        status: 'tampered',
        findingDescription: 'Severe typographic error: "OPTIMUM NUTRITON" with missing letter "i"',
        inspectionDetail: 'Authentic Glanbia labels undergo triple QC proofing. Telltale sign of illicit counterfeit production.'
      },
      {
        id: 'f-whey-2',
        label: 'Distorted Logo Geometry',
        confidence: 99.1,
        box: { x: 26, y: 34, width: 48, height: 22 },
        status: 'tampered',
        findingDescription: 'Gold leaf emblem aspect ratio distorted by 14% along horizontal axis',
        inspectionDetail: 'Fails vector boundary template comparison completely.'
      },
      {
        id: 'f-whey-3',
        label: 'Counterfeit Cloned Barcode',
        confidence: 99.4,
        box: { x: 62, y: 74, width: 28, height: 20 },
        status: 'anomaly',
        findingDescription: 'Unregistered barcode number not found in GS1 database',
        inspectionDetail: 'GS1 country index returns unallocated sequence.'
      },
      {
        id: 'f-whey-4',
        label: 'Missing Induction Safety Seal',
        confidence: 98.7,
        box: { x: 28, y: 4, width: 44, height: 12 },
        status: 'tampered',
        findingDescription: 'No hermetic seal; hand-applied contact adhesive detected',
        inspectionDetail: 'Severe adulteration risk. Unhygienic manual packaging.'
      }
    ],
    nutrition: {
      nutriScore: 'E',
      nutriScoreScore: 35,
      novaGroup: 4,
      servingSize: '30g (Adulterated Powder)',
      calories: 220,
      macros: {
        protein: { label: 'Protein (Suspected Spiked)', amount: 6, unit: 'g', dailyValuePercentage: 12, status: 'high' },
        carbs: { label: 'Carbs (Cheap Starch)', amount: 24, unit: 'g', dailyValuePercentage: 9, status: 'high' },
        sugars: { label: 'Sugars', amount: 14, unit: 'g', dailyValuePercentage: 16, status: 'high' },
        fats: { label: 'Total Fats', amount: 8, unit: 'g', dailyValuePercentage: 11, status: 'high' },
        saturatedFats: { label: 'Saturated Fat', amount: 5, unit: 'g', dailyValuePercentage: 25, status: 'high' },
        fiber: { label: 'Dietary Fiber', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        sodium: { label: 'Sodium (Excess Filler)', amount: 480, unit: 'mg', dailyValuePercentage: 21, status: 'high' }
      },
      additives: [
        { code: 'DANGER', name: 'Industrial Maltodextrin Filler', riskLevel: 'high', description: 'Cheap carbohydrate filler used to fake scoop volume instead of real whey isolate', commonUses: 'Illicit supplement bulking' },
        { code: 'DANGER', name: 'Heavy Metal Contaminant Alert (Lead/Cadmium)', riskLevel: 'high', description: 'Lab tests on seized fakes show heavy metal traces from unwashed industrial blenders', commonUses: 'Underground labs' }
      ],
      allergens: ['UNKNOWN CHEMICALS', 'Gluten / Wheat Starch Filler', 'Undeclared Dairy Waste'],
      ingredientsListText: 'Maltodextrin, Wheat Flour, Industrial Cocoa Powder, Undeclared Dairy Waste, Artificial Sweeteners, Synthetic Thickener Gum.',
      packagingEcoScore: 'E (Toxic non-recyclable solvent plastics)'
    },
    aiIntakeAdvice: {
      productSummary: '🚨 CRITICAL TOXICITY WARNING: CONFIRMED COUNTERFEIT PRODUCT. Lab testing of identical confiscated lots revealed severe adulteration with wheat flour, industrial maltodextrin, and negligible whey protein.',
      contextualAdvice: 'DO NOT CONSUME UNDER ANY CIRCUMSTANCES. Ingesting counterfeit supplements poses acute health risks including gastrointestinal poisoning, heavy metal accumulation, and acute kidney stress.',
      timingAdvice: 'Immediately isolate this container and preserve for authorities.',
      safetyScoreIndex: 2,
      servingRecommendation: 'IMMEDIATELY CEASE USAGE. Return to retailer or file report with VeriPure Fraud Enforcement.',
      healthProfileImpacts: [
        {
          condition: 'muscle_gain',
          status: 'danger',
          headline: 'Severe Protein Fraud (Under 6g vs 24g Claimed)',
          description: 'You are consuming pure starch and maltodextrin filler instead of whey protein isolate.'
        },
        {
          condition: 'diabetic',
          status: 'danger',
          headline: 'Severe High-GI Starch Injection',
          description: 'High glycemic maltodextrin (GI > 110) will trigger catastrophic blood sugar spikes.'
        },
        {
          condition: 'gluten_free',
          status: 'danger',
          headline: 'Contains Undeclared Wheat Flour',
          description: 'Counterfeiters bulked this formula with low-grade wheat flour. High celiac crisis risk.'
        }
      ]
    },
    fraudIntelligence: {
      knownFakesCount: 1420,
      reportedIncidentLocations: ['Online Gray Marketplaces', 'Unlicensed Fitness Gyms'],
      riskLevel: 'CRITICAL',
      officialManufacturerContact: 'brandprotection@glanbia.com'
    }
  },

  // 4. Suspicious Energy Drink (Copycat Packaging) (SUSPICIOUS)
  {
    id: 'suspicious-energy-drink',
    barcode: '1234567890123',
    barcodeFormat: 'EAN-13 (UNVERIFIED BATCH)',
    productName: 'Suspicious Energy Drink (Copycat Packaging)',
    brand: 'Unverified Copycat Bottler',
    category: 'Energy Drinks & Stimulant Beverages',
    originCountry: 'Unverified Third-Party Facility',
    verifiedTimestamp: 'FLAGGED FOR SUSPICIOUS PACKAGING ANOMALIES',
    authenticityStatus: 'SUSPICIOUS',
    authenticityScore: 62,
    msrpPrice: 2.49,
    reportedMarketPrice: 0.99,
    lotBatchNumber: 'COPY-ED-0941',
    packagingFrontImage: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=800&q=80',
    checks: {
      barcodeRegistry: {
        status: 'warning',
        title: 'Unverified Distribution Batch',
        summary: 'Barcode belongs to generic packaging series; distributor chain cannot be validated',
        details: [
          'Barcode prefix allocated to generic packaging importer',
          'No authenticated direct-store delivery (DSD) bill of lading on record'
        ],
        metricLabel: 'Batch Confidence',
        metricValue: '62%'
      },
      typographyInspection: {
        status: 'warning',
        title: 'Label Typos & Altered Font-Family',
        summary: 'OCR identified minor label typos and substituted typography',
        details: [
          'Ingredient list spells "Caffeine" as "Caffine" in secondary warning box',
          'Font family substituted with generic sans-serif instead of official licensed brand vectors'
        ],
        metricLabel: 'OCR Match Ratio',
        metricValue: '68.4%'
      },
      packagingHologram: {
        status: 'warning',
        title: 'Elevated Synthetic Dyes & Lacquer Anomaly',
        summary: 'Can printing lacks official matte/gloss dual-varnish texture',
        details: [
          'Color saturation shifts toward yellowish green under spectrometer',
          'Pull tab lacks custom brand die-cut logo imprint'
        ],
        metricLabel: 'Hardware Score',
        metricValue: '58.0%'
      },
      priceDistribution: {
        status: 'warning',
        title: 'Significant Price Mismatch',
        summary: 'Sold at $0.99 vs category benchmark of $2.49 (60% discount)',
        details: ['High discount rate typical of grey-market liquidation or copycat formulations'],
        metricLabel: 'Price Variance',
        metricValue: '-60.2%'
      }
    },
    xaiHeatmapRegions: [
      {
        id: 's-ed-1',
        label: 'Label Typo ("Caffine")',
        confidence: 96.5,
        box: { x: 14, y: 64, width: 48, height: 20 },
        status: 'anomaly',
        findingDescription: 'Minor misspelling: "Caffine" in legal warning paragraph',
        inspectionDetail: 'Indicates non-standard proofing or unauthorized third-party bottling.'
      },
      {
        id: 's-ed-2',
        label: 'Altered Claw Logo Geometry',
        confidence: 95.2,
        box: { x: 26, y: 22, width: 48, height: 32 },
        status: 'anomaly',
        findingDescription: 'Claw graphic width exceeds standard master dimensions by 8%',
        inspectionDetail: 'Slightly altered geometry suggests copycat imitation.'
      }
    ],
    nutrition: {
      nutriScore: 'E',
      nutriScoreScore: 28,
      novaGroup: 4,
      servingSize: '500ml (1 can)',
      calories: 215,
      macros: {
        protein: { label: 'Protein', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        carbs: { label: 'Carbs', amount: 52, unit: 'g', dailyValuePercentage: 19, status: 'high' },
        sugars: { label: 'Sugars', amount: 50, unit: 'g', dailyValuePercentage: 56, status: 'high' },
        fats: { label: 'Total Fats', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        saturatedFats: { label: 'Saturated Fat', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        fiber: { label: 'Dietary Fiber', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        sodium: { label: 'Sodium', amount: 360, unit: 'mg', dailyValuePercentage: 16, status: 'high' }
      },
      additives: [
        { code: 'E102', name: 'Tartrazine (Yellow 5)', riskLevel: 'moderate', description: 'Elevated synthetic azo dye that may cause allergic reactions', commonUses: 'Imitation beverages' },
        { code: 'Caffeine', name: 'Synthetic Caffeine (180mg)', riskLevel: 'moderate', description: 'Elevated synthetic stimulant dose', commonUses: 'Energy drinks' }
      ],
      allergens: [],
      ingredientsListText: 'Carbonated Water, High Fructose Corn Syrup, Citric Acid, Taurine, Synthetic Caffine, Tartrazine (Yellow 5), Sodium Benzoate.',
      packagingEcoScore: 'C (Aluminum can with non-standard ink)'
    },
    aiIntakeAdvice: {
      productSummary: 'Suspicious copycat energy drink with elevated synthetic food dyes and non-standard packaging typography. Chemical analysis shows high caffeine and sugar load.',
      contextualAdvice: 'Exercise caution. Verify purchase location and inspect batch number before consuming.',
      timingAdvice: 'Avoid consuming if sensitive to high doses of synthetic stimulants or azo dyes.',
      safetyScoreIndex: 58,
      servingRecommendation: 'Recommend opting for authenticated beverages with verified chain of custody.',
      healthProfileImpacts: [
        {
          condition: 'hypertension',
          status: 'danger',
          headline: 'High Stimulant & Sodium Burden',
          description: '180mg synthetic caffeine + 360mg sodium induces acute blood pressure elevation.'
        },
        {
          condition: 'diabetic',
          status: 'danger',
          headline: '50g Sugar Surge Risk',
          description: '50g simple sugars absorbs rapidly, posing acute hyperglycemia threat.'
        }
      ]
    },
    fraudIntelligence: {
      knownFakesCount: 42,
      reportedIncidentLocations: ['Discount Convenience Stores', 'Online Liquidators'],
      riskLevel: 'MEDIUM',
      officialManufacturerContact: 'quality-investigation@veripure.io'
    }
  },

  // 5. Oreo Original Biscuits (SAFE)
  {
    id: 'oreo-original',
    barcode: '7622300441242',
    barcodeFormat: 'EAN-13',
    productName: 'Oreo Original Sandwich Biscuits (154g)',
    brand: 'Mondelez International',
    category: 'Cookies & Sweet Biscuits',
    originCountry: 'Spain / United Kingdom',
    verifiedTimestamp: 'Verified via Mondelez GS1 Master Portal',
    authenticityStatus: 'SAFE',
    authenticityScore: 100,
    msrpPrice: 1.89,
    reportedMarketPrice: 1.85,
    lotBatchNumber: 'MON-SP-2409-A',
    packagingFrontImage: 'https://images.openfoodfacts.org/images/products/762/230/044/1242/front_en.285.400.jpg',
    checks: {
      barcodeRegistry: {
        status: 'pass',
        title: 'GS1 Registered Mondelez Biscuit SKU',
        summary: 'EAN 7622300441242 registered to Mondelez Europe GmbH',
        details: [
          'GTIN Checksum validated',
          'Mondelez European member organization prefix verified',
          'Active master catalog item in 60+ countries'
        ],
        metricLabel: 'Registry Confidence',
        metricValue: '100%'
      },
      typographyInspection: {
        status: 'pass',
        title: 'Iconic Oreo Embossing & Logo Check',
        summary: 'Signature biscuit relief pattern and blue package background vector match',
        details: [
          'Oreo flower and cross emblem relief detail verified',
          'EU Nutrition Declaration compliant'
        ],
        metricLabel: 'OCR Match Ratio',
        metricValue: '100%'
      },
      packagingHologram: {
        status: 'pass',
        title: 'Hermetic Peel-and-Reseal Foil',
        summary: 'Patented resealable adhesive pull tab with tamper indicator',
        details: ['Factory vacuum nitrogen flush intact'],
        metricLabel: 'Seal Score',
        metricValue: '100%'
      },
      priceDistribution: {
        status: 'pass',
        title: 'Normal Supermarket Retail Band',
        summary: 'Pricing consistent with national authorized grocery channels',
        details: ['Unbroken distribution chain from factory in Viana, Spain'],
        metricLabel: 'Price Variance',
        metricValue: '-2.1%'
      }
    },
    xaiHeatmapRegions: [
      {
        id: 'oreo-1',
        label: 'Oreo Blue Brand Emblem',
        confidence: 100,
        box: { x: 22, y: 22, width: 56, height: 26 },
        status: 'authentic',
        findingDescription: 'Authentic 3D white typography with blue shadow contour',
        inspectionDetail: 'Mondelez official Pantone Reflex Blue verified.'
      },
      {
        id: 'oreo-2',
        label: 'Peel-and-Reseal Adhesive Tab',
        confidence: 99.7,
        box: { x: 40, y: 6, width: 28, height: 14 },
        status: 'authentic',
        findingDescription: 'Patented food-safe resealable adhesive membrane',
        inspectionDetail: 'Zero signs of secondary sealing or manual tampering.'
      }
    ],
    nutrition: {
      nutriScore: 'E',
      nutriScoreScore: 24,
      novaGroup: 4,
      servingSize: '4 cookies (44g)',
      calories: 213,
      macros: {
        protein: { label: 'Protein', amount: 2.3, unit: 'g', dailyValuePercentage: 5, status: 'optimal' },
        carbs: { label: 'Carbs', amount: 30.5, unit: 'g', dailyValuePercentage: 11, status: 'moderate' },
        sugars: { label: 'Sugars', amount: 16.5, unit: 'g', dailyValuePercentage: 18, status: 'high' },
        fats: { label: 'Total Fats', amount: 8.8, unit: 'g', dailyValuePercentage: 13, status: 'moderate' },
        saturatedFats: { label: 'Saturated Fat', amount: 2.3, unit: 'g', dailyValuePercentage: 12, status: 'moderate' },
        fiber: { label: 'Dietary Fiber', amount: 1.2, unit: 'g', dailyValuePercentage: 4, status: 'optimal' },
        sodium: { label: 'Sodium', amount: 240, unit: 'mg', dailyValuePercentage: 10, status: 'moderate' }
      },
      additives: [
        { code: 'E500(ii)', name: 'Sodium Hydrogen Carbonate', riskLevel: 'low', description: 'Standard baking leavening agent', commonUses: 'Biscuits' },
        { code: 'E322', name: 'Soy Lecithin', riskLevel: 'low', description: 'Emulsifying agent', commonUses: 'Chocolate & cookies' }
      ],
      allergens: ['Wheat (Gluten)', 'Soy Lecithin', 'May contain milk traces'],
      ingredientsListText: 'Wheat Flour, Sugar, Palm Oil, Rapeseed Oil, Fat-Reduced Cocoa Powder (4.5%), Wheat Starch, Glucose-Fructose Syrup, Raising Agents (Potassium Carbonates, Ammonium Carbonates, Sodium Carbonates), Salt, Emulsifiers (Soya Lecithin, Sunflower Lecithin), Flavouring (Vanillin).',
      packagingEcoScore: 'C (Multilayer film wrapper)'
    },
    aiIntakeAdvice: {
      productSummary: 'Authentic classic sandwich cookies. Processed baked snack with sweet vanilla cream filling.',
      contextualAdvice: 'Portion control recommended. 4 cookies deliver 16.5g sugar.',
      timingAdvice: 'Best enjoyed with tea or milk as an afternoon treat. Avoid late evening consumption.',
      safetyScoreIndex: 65,
      servingRecommendation: 'Limit to 2-3 biscuits per serving.',
      healthProfileImpacts: [
        {
          condition: 'gluten_free',
          status: 'danger',
          headline: 'Contains Wheat Flour (Gluten)',
          description: 'Primary ingredient is wheat flour. Unsafe for celiac or gluten-sensitive diets.'
        },
        {
          condition: 'diabetic',
          status: 'caution',
          headline: 'Moderate Sugar Content',
          description: 'Contains 16.5g sugar per 4 cookies; monitor serving size.'
        },
        {
          condition: 'vegan',
          status: 'safe',
          headline: 'Plant-Based Formulation',
          description: 'Does not contain animal-derived ingredients (produced on line with possible milk traces).'
        }
      ]
    },
    fraudIntelligence: {
      knownFakesCount: 0,
      reportedIncidentLocations: [],
      riskLevel: 'LOW',
      officialManufacturerContact: 'consumerservice@mdlz.com'
    }
  },

  // 6. Fake Luxury Chocolate Bar (COUNTERFEIT)
  {
    id: 'fake-luxury-chocolate',
    barcode: '9999999999999',
    barcodeFormat: 'EAN-13 (FAKE UNREGISTERED)',
    productName: 'Fake Luxury Chocolate Bar (Fraudulent Lot)',
    brand: 'ILLICIT REPACKAGED CLONE',
    category: 'Counterfeit Confectionery / Fraud Alert',
    originCountry: 'Unknown Underground Operation',
    verifiedTimestamp: 'CONFIRMED FRAUDULENT BATCH NUMBER & FAKE BARCODE',
    authenticityStatus: 'COUNTERFEIT',
    authenticityScore: 8,
    msrpPrice: 8.50,
    reportedMarketPrice: 2.00,
    lotBatchNumber: 'BOGUS-LUX-999',
    packagingFrontImage: 'https://images.unsplash.com/photo-1548907040-4ba428022ab2?auto=format&fit=crop&w=800&q=80',
    checks: {
      barcodeRegistry: {
        status: 'fail',
        title: 'Non-Existent Dummy Barcode (9999999999999)',
        summary: 'Dummy sequence 9999999999999 fails all GS1 registry verification',
        details: [
          'Barcode is an arbitrary placeholder sequence not assigned to any legal manufacturer',
          'Modulo-10 checksum fails official calculation'
        ],
        metricLabel: 'Registry Confidence',
        metricValue: '0%'
      },
      typographyInspection: {
        status: 'fail',
        title: 'Forged Gold Foil & Typographic Errors',
        summary: 'Packaging uses cheap offset print imitation of luxury Swiss gold embossing',
        details: [
          'Misspelled cacao origin: "Grand Cru Madagaskar" with incorrect trademark registration',
          'Missing mandatory food safety inspection certification numbers'
        ],
        metricLabel: 'OCR Match Ratio',
        metricValue: '18.2%'
      },
      packagingHologram: {
        status: 'fail',
        title: 'No Inner Aluminum Barrier Foil',
        summary: 'Wrapped in industrial wax paper rather than hermetic food-grade aluminum barrier',
        details: ['High risk of insect infestation, fat bloom, and chemical solvent transfer'],
        metricLabel: 'Barrier Integrity',
        metricValue: '5.0%'
      },
      priceDistribution: {
        status: 'fail',
        title: '76% Price Drop Below Raw Cocoa Cost',
        summary: 'Sold at $2.00 vs $8.50 standard single-origin retail price',
        details: ['Price is below the wholesale cost of authentic single-origin cocoa butter'],
        metricLabel: 'Price Variance',
        metricValue: '-76.5%'
      }
    },
    xaiHeatmapRegions: [
      {
        id: 'f-choc-1',
        label: 'Dummy Barcode (9999999999999)',
        confidence: 99.9,
        box: { x: 65, y: 72, width: 28, height: 22 },
        status: 'tampered',
        findingDescription: 'Fabricated non-existent barcode number',
        inspectionDetail: 'Confirmed dummy sequence used by illicit counterfeiters.'
      },
      {
        id: 'f-choc-2',
        label: 'Forged Swiss Trademark Emblem',
        confidence: 98.4,
        box: { x: 28, y: 16, width: 44, height: 20 },
        status: 'tampered',
        findingDescription: 'Distorted Swiss cross crest with unauthorized gold glitter ink',
        inspectionDetail: 'Swiss Federal Institute of Intellectual Property violation.'
      }
    ],
    nutrition: {
      nutriScore: 'E',
      nutriScoreScore: 32,
      novaGroup: 4,
      servingSize: 'DO NOT CONSUME',
      calories: 590,
      macros: {
        protein: { label: 'Protein', amount: 2.0, unit: 'g', dailyValuePercentage: 4, status: 'optimal' },
        carbs: { label: 'Carbs', amount: 62.0, unit: 'g', dailyValuePercentage: 23, status: 'high' },
        sugars: { label: 'Sugars', amount: 58.0, unit: 'g', dailyValuePercentage: 64, status: 'high' },
        fats: { label: 'Total Fats (Hydrogenated)', amount: 36.0, unit: 'g', dailyValuePercentage: 51, status: 'high' },
        saturatedFats: { label: 'Saturated Fat', amount: 22.0, unit: 'g', dailyValuePercentage: 110, status: 'high' },
        fiber: { label: 'Dietary Fiber', amount: 1.0, unit: 'g', dailyValuePercentage: 4, status: 'optimal' },
        sodium: { label: 'Sodium', amount: 120, unit: 'mg', dailyValuePercentage: 5, status: 'optimal' }
      },
      additives: [
        { code: 'DANGER', name: 'Industrial Hydrogenated Trans-Fats', riskLevel: 'high', description: 'Cheap vegetable tallow substituted for pure cocoa butter', commonUses: 'Counterfeit sweets' },
        { code: 'DANGER', name: 'Industrial Wax & Solvent Residues', riskLevel: 'high', description: 'Non-food wax packaging contamination', commonUses: 'Unauthorized wrapping' }
      ],
      allergens: ['UNKNOWN CHEMICAL RESIDUES', 'Undeclared Peanuts/Tree Nuts', 'Industrial Soy Byproducts'],
      ingredientsListText: 'Hydrogenated Palm Kernel Oil, Low-Grade Cocoa Waste, Refined Sugar, Synthetic Chocolate Flavor, Non-Food Emulsifiers.',
      packagingEcoScore: 'E (Toxic waste classification)'
    },
    aiIntakeAdvice: {
      productSummary: '🚨 FRAUD ALERT: CONFIRMED COUNTERFEIT CHOCOLATE. Chemical analysis confirms complete absence of real cocoa butter; substituted with cheap hydrogenated industrial trans-fats.',
      contextualAdvice: 'DO NOT EAT. Contains dangerous levels of artificial trans-fats and chemical solvent residues from non-food-grade packaging.',
      timingAdvice: 'Dispose of safely or report to local consumer safety department.',
      safetyScoreIndex: 0,
      servingRecommendation: 'DO NOT CONSUME.',
      healthProfileImpacts: [
        {
          condition: 'hypertension',
          status: 'danger',
          headline: 'Severe Trans-Fat Arterial Hazard',
          description: 'Industrial trans-fats sharply elevate LDL cholesterol and promote vascular inflammation.'
        },
        {
          condition: 'diabetic',
          status: 'danger',
          headline: 'Excess Refined Sugar & Palm Sludge',
          description: 'High glycemic load without antioxidant flavonoids.'
        }
      ]
    },
    fraudIntelligence: {
      knownFakesCount: 310,
      reportedIncidentLocations: ['Tourist Markets', 'Unregulated Street Bazaars', 'Auction Websites'],
      riskLevel: 'CRITICAL',
      officialManufacturerContact: 'fraud-alert@veripure.io'
    }
  },

  // 7. Red Bull Energy Drink (SAFE)
  {
    id: 'red-bull-250ml',
    barcode: '9002490100070',
    barcodeFormat: 'EAN-13',
    productName: 'Red Bull Energy Drink (250ml Can)',
    brand: 'Red Bull GmbH',
    category: 'Energy Drinks & Stimulant Beverages',
    originCountry: 'Austria / Switzerland',
    verifiedTimestamp: 'Verified via Red Bull GS1 Austrian Central Registry',
    authenticityStatus: 'SAFE',
    authenticityScore: 100,
    msrpPrice: 2.19,
    reportedMarketPrice: 2.10,
    lotBatchNumber: 'RB-AT-2408-C',
    packagingFrontImage: 'https://images.openfoodfacts.org/images/products/900/249/010/0070/front_en.385.400.jpg',
    checks: {
      barcodeRegistry: {
        status: 'pass',
        title: 'GS1 Austria Red Bull Master Record',
        summary: 'EAN 9002490100070 registered directly to Red Bull GmbH, Fuschl am See',
        details: [
          'GTIN Checksum validated',
          'Company prefix 9002490 allocated to Red Bull Global Operations',
          'Active SKU verified across 170+ national beverage authorities'
        ],
        metricLabel: 'Registry Confidence',
        metricValue: '100%'
      },
      typographyInspection: {
        status: 'pass',
        title: 'Silver-Blue Rhombus & Charging Bull Alignment',
        summary: 'Two charging crimson bulls against golden solar disk match official vector proofs',
        details: [
          'Official Red Bull Gothic Bold typography verified',
          'Taurine (1000mg) and Caffeine (80mg) statutory declarations verified'
        ],
        metricLabel: 'OCR Match Ratio',
        metricValue: '100%'
      },
      packagingHologram: {
        status: 'pass',
        title: 'Laser-Cut Bull Silhouette Pull Tab',
        summary: 'Matte aluminum beverage can with precision stamped charging bull silhouette on tab',
        details: [
          'Bottom can laser dot matrix verifies bottling in Bludenz, Austria',
          'Internal food-grade polymer liner certified BPA-NI'
        ],
        metricLabel: 'Tab Hardware Score',
        metricValue: '100%'
      },
      priceDistribution: {
        status: 'pass',
        title: 'Authorized Retail Distribution Band',
        summary: 'Pricing conforms to standard single-can convenience and supermarket MAP',
        details: ['Audited distribution via authorized national cold-chain logistics'],
        metricLabel: 'Price Variance',
        metricValue: '-4.1%'
      }
    },
    xaiHeatmapRegions: [
      {
        id: 'rb-1',
        label: 'Charging Bulls & Sun Emblem',
        confidence: 100,
        box: { x: 22, y: 26, width: 56, height: 24 },
        status: 'authentic',
        findingDescription: 'Crisp crimson bulls and golden sun contour with micro-precise registration',
        inspectionDetail: 'Pantone Red 199 C and Process Yellow match Austrian design standards.'
      },
      {
        id: 'rb-2',
        label: 'Silver-Blue Anodized Can Facet',
        confidence: 99.8,
        box: { x: 18, y: 52, width: 64, height: 26 },
        status: 'authentic',
        findingDescription: 'Four-quadrant blue and silver geometric facet with tactile brushed finish',
        inspectionDetail: 'Substrate matches official Rexam / Ball canning specification.'
      },
      {
        id: 'rb-3',
        label: 'Charging Bull Die-Cut Pull Tab',
        confidence: 100,
        box: { x: 36, y: 4, width: 28, height: 12 },
        status: 'authentic',
        findingDescription: 'Precision die-cut bull silhouette stamped in aluminum pull tab',
        inspectionDetail: 'Proprietary Red Bull tool die verified.'
      }
    ],
    nutrition: {
      nutriScore: 'E',
      nutriScoreScore: 26,
      novaGroup: 4,
      servingSize: '250ml (1 can)',
      calories: 115,
      macros: {
        protein: { label: 'Protein', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        carbs: { label: 'Carbs', amount: 27, unit: 'g', dailyValuePercentage: 10, status: 'moderate' },
        sugars: { label: 'Sugars', amount: 27, unit: 'g', dailyValuePercentage: 30, status: 'high' },
        fats: { label: 'Total Fats', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        saturatedFats: { label: 'Saturated Fat', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        fiber: { label: 'Dietary Fiber', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        sodium: { label: 'Sodium', amount: 105, unit: 'mg', dailyValuePercentage: 5, status: 'optimal' }
      },
      additives: [
        { code: 'Caffeine', name: 'Natural Caffeine (80mg)', riskLevel: 'low', description: 'Central nervous system stimulant equivalent to 1 cup of coffee', commonUses: 'Energy drinks' },
        { code: 'Taurine', name: 'Taurine (1000mg)', riskLevel: 'low', description: 'Amino sulfonic acid essential for cardiac function and focus', commonUses: 'Energy drinks' },
        { code: 'E331', name: 'Sodium Citrates', riskLevel: 'low', description: 'Acidity buffer', commonUses: 'Beverages' }
      ],
      allergens: [],
      ingredientsListText: 'Carbonated Water, Sucrose, Glucose, Acid (Citric Acid), Taurine (0.4%), Acidity Regulators (Sodium Carbonates, Magnesium Carbonates), Caffeine (0.03%), Vitamins (Niacin, Pantothenic Acid, B6, B12), Flavourings, Colours (Caramel, Riboflavins).',
      packagingEcoScore: 'B (Infinitely recyclable aluminum)'
    },
    aiIntakeAdvice: {
      productSummary: 'Authentic Austrian energy drink formulated with alpine water, pharmaceutical-grade taurine (1000mg), B-complex vitamins, and 80mg caffeine.',
      contextualAdvice: 'Delivers 27g sucrose/glucose for rapid alertness. Best consumed ahead of physical endurance tasks.',
      timingAdvice: 'Avoid within 5-6 hours of sleep to prevent sleep cycle disruption.',
      safetyScoreIndex: 68,
      servingRecommendation: 'Maximum 1-2 cans per day for healthy adults.',
      healthProfileImpacts: [
        {
          condition: 'hypertension',
          status: 'caution',
          headline: 'Contains 80mg Stimulant Caffeine',
          description: 'Caffeine can temporarily increase systolic pressure. Monitor heart rate.'
        },
        {
          condition: 'diabetic',
          status: 'danger',
          headline: '27g Rapid Absorption Sugars',
          description: 'Liquid sucrose/glucose triggers immediate glycemic excursions.'
        },
        {
          condition: 'vegan',
          status: 'safe',
          headline: 'Vegan Verified',
          description: 'Taurine is synthetically produced without animal tissues; 100% vegan.'
        }
      ]
    },
    fraudIntelligence: {
      knownFakesCount: 0,
      reportedIncidentLocations: [],
      riskLevel: 'LOW',
      officialManufacturerContact: 'consumer@redbull.com'
    }
  },

  // 8. Suspicious Organic Honey (SUSPICIOUS)
  {
    id: 'suspicious-organic-honey',
    barcode: '8909876543210',
    barcodeFormat: 'EAN-13 (UNVERIFIED ORIGIN)',
    productName: 'Suspicious Organic Raw Forest Honey (500g)',
    brand: 'Unverified Artisan Brand',
    category: 'Honey & Natural Sweeteners',
    originCountry: 'Unverified Origin Label',
    verifiedTimestamp: 'FLAGGED FOR UNVERIFIED ORIGIN & ADULTERATION RISK',
    authenticityStatus: 'SUSPICIOUS',
    authenticityScore: 58,
    msrpPrice: 12.99,
    reportedMarketPrice: 4.50,
    lotBatchNumber: 'HON-SUSP-241',
    packagingFrontImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    checks: {
      barcodeRegistry: {
        status: 'warning',
        title: 'Unverified Honey Processor License',
        summary: 'Barcode allocated to generic repackaging trader; apiary origin unconfirmed',
        details: [
          'No GS1 traceability to specific registered beekeeping cooperative',
          'Certificate of Origin lacks national agricultural department apostille'
        ],
        metricLabel: 'Apiary Traceability',
        metricValue: '58%'
      },
      typographyInspection: {
        status: 'warning',
        title: 'Missing Mandatory Pollen & Origin Disclosures',
        summary: 'Label claims "100% Pure Raw Organic" without mandatory regional floral source',
        details: [
          'Fails EU Council Directive 2001/110/EC origin labeling regulations',
          'Font styling mimics certified organic logos without official certification body number'
        ],
        metricLabel: 'OCR Match Ratio',
        metricValue: '61.4%'
      },
      packagingHologram: {
        status: 'warning',
        title: 'Adulteration Risk (Corn / Rice Syrup Blending)',
        summary: 'Visual viscosity and NMR spectral profile indicate suspected C4 sugar adulteration',
        details: [
          'Suspected industrial rice or high-fructose corn syrup blending (>35%)',
          'Lid safety button lacks factory vacuum click tension'
        ],
        metricLabel: 'Purity Index',
        metricValue: '54.0%'
      },
      priceDistribution: {
        status: 'warning',
        title: '65% Below Authentic Raw Honey Wholesale Cost',
        summary: 'Sold at $4.50 for 500g vs $12.99 standard raw apiary organic honey',
        details: ['Economically inconsistent with certified sustainable beekeeping labor costs'],
        metricLabel: 'Price Variance',
        metricValue: '-65.3%'
      }
    },
    xaiHeatmapRegions: [
      {
        id: 's-hon-1',
        label: 'Uncertified "Organic" Claim',
        confidence: 94.8,
        box: { x: 20, y: 22, width: 60, height: 18 },
        status: 'anomaly',
        findingDescription: 'Uses generic green leaf emblem without accredited certifier ID',
        inspectionDetail: 'Misleading organic certification claim.'
      },
      {
        id: 's-hon-2',
        label: 'Missing Honey Origin Mandate',
        confidence: 96.1,
        box: { x: 16, y: 68, width: 68, height: 18 },
        status: 'anomaly',
        findingDescription: 'Fails to declare country of harvest or blend proportion',
        inspectionDetail: 'Non-compliant with international honey transparency directives.'
      }
    ],
    nutrition: {
      nutriScore: 'D',
      nutriScoreScore: 16,
      novaGroup: 3,
      servingSize: '20g (1 tbsp)',
      calories: 64,
      macros: {
        protein: { label: 'Protein', amount: 0.1, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        carbs: { label: 'Carbs', amount: 17.0, unit: 'g', dailyValuePercentage: 6, status: 'optimal' },
        sugars: { label: 'Sugars (Suspected Syrups)', amount: 16.5, unit: 'g', dailyValuePercentage: 18, status: 'high' },
        fats: { label: 'Total Fats', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        saturatedFats: { label: 'Saturated Fat', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        fiber: { label: 'Dietary Fiber', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        sodium: { label: 'Sodium', amount: 2, unit: 'mg', dailyValuePercentage: 0, status: 'optimal' }
      },
      additives: [
        { code: 'ADULTERATION', name: 'Suspected C4 Invert Sugar / Rice Syrup', riskLevel: 'moderate', description: 'Industrial carbohydrate syrup used to artificially dilute genuine honey volume', commonUses: 'Honey adulteration' }
      ],
      allergens: ['Possible undeclared pollen allergens'],
      ingredientsListText: 'Honey (Suspected High Fructose Corn Syrup / Invert Rice Syrup Adulteration).',
      packagingEcoScore: 'B (Glass jar)'
    },
    aiIntakeAdvice: {
      productSummary: 'Suspicious commercial honey batch flagged for probable C4 sugar syrup dilution and unverified apiary origin.',
      contextualAdvice: 'Exercise caution if purchasing for medicinal or bioactive antibacterial purposes. Laboratory testing advised.',
      timingAdvice: 'Avoid feeding any unpasteurized or unverified honey to infants under 12 months (Infant Botulism risk).',
      safetyScoreIndex: 56,
      servingRecommendation: 'Limit intake until isotopic purity testing is verified.',
      healthProfileImpacts: [
        {
          condition: 'diabetic',
          status: 'danger',
          headline: 'High Fructose & Glucose Spike',
          description: 'Diluted commercial syrups possess higher glycemic index than raw honey.'
        },
        {
          condition: 'weight_loss',
          status: 'caution',
          headline: 'Concentrated Liquid Calories',
          description: '64 kcal per tablespoon with zero satiety fiber.'
        }
      ]
    },
    fraudIntelligence: {
      knownFakesCount: 88,
      reportedIncidentLocations: ['Online Marketplaces', 'Unlicensed Farmers Stalls'],
      riskLevel: 'MEDIUM',
      officialManufacturerContact: 'honey-verification@veripure.io'
    }
  },

  // 9. Maggi 2-Minute Noodles (SAFE - High Sodium Warning)
  {
    id: 'maggi-noodles',
    barcode: '8901058814728',
    barcodeFormat: 'EAN-13',
    productName: 'Maggi 2-Minute Masala Instant Noodles (70g)',
    brand: 'Nestlé India Ltd.',
    category: 'Instant Noodles & Ready Meals',
    originCountry: 'India',
    verifiedTimestamp: 'Verified via Nestlé India Global GS1 Registry',
    authenticityStatus: 'SAFE',
    authenticityScore: 100,
    msrpPrice: 0.50,
    reportedMarketPrice: 0.48,
    lotBatchNumber: 'NST-IN-2409-M1',
    packagingFrontImage: 'https://images.openfoodfacts.org/images/products/890/105/881/4728/front_en.35.400.jpg',
    checks: {
      barcodeRegistry: {
        status: 'pass',
        title: 'GS1 India Nestlé Master Allocation',
        summary: 'EAN 8901058814728 verified registered to Nestlé India Ltd., New Delhi',
        details: [
          'GTIN Checksum validated',
          'Company prefix 8901058 allocated to Nestlé India',
          'FSSAI central food license #10012011000168 verified active'
        ],
        metricLabel: 'Registry Confidence',
        metricValue: '100%'
      },
      typographyInspection: {
        status: 'pass',
        title: 'FSSAI License & Red-Yellow Maggi Logo Proof',
        summary: 'Classic bright yellow packaging and red cursive Maggi emblem match master vectors',
        details: [
          'FSSAI green vegetarian dot symbol compliant with statutory size',
          'Tastemaker spice blend ingredients declaration verified'
        ],
        metricLabel: 'OCR Match Ratio',
        metricValue: '100%'
      },
      packagingHologram: {
        status: 'pass',
        title: 'Pillow Pack Polyethylene Heat Seal',
        summary: 'Hermetic factory serrated crimp packaging with nitrogen head space',
        details: ['Noodle cake and seasoning sachet vacuum intact'],
        metricLabel: 'Seal Score',
        metricValue: '100%'
      },
      priceDistribution: {
        status: 'pass',
        title: 'National Convenience Grocery Index',
        summary: 'Complies with statutory Maximum Retail Price (MRP) mandated by government',
        details: ['Audited DSD logistics from Moga / Pantnagar factories'],
        metricLabel: 'Price Variance',
        metricValue: '-4.0%'
      }
    },
    xaiHeatmapRegions: [
      {
        id: 'maggi-1',
        label: 'Maggi Signature Red-Yellow Brandmark',
        confidence: 100,
        box: { x: 22, y: 16, width: 56, height: 24 },
        status: 'authentic',
        findingDescription: 'Authentic Nestlé Maggi brandmark with crisp yellow sunburst',
        inspectionDetail: 'Pantone 109 C yellow and Pantone 185 C red verified.'
      },
      {
        id: 'maggi-2',
        label: 'FSSAI License & Green Veg Mark',
        confidence: 99.8,
        box: { x: 12, y: 72, width: 32, height: 16 },
        status: 'authentic',
        findingDescription: 'Valid FSSAI license #10012011000168 with statutory green veg symbol',
        inspectionDetail: 'Compliant with Indian Food Safety and Standards Regulations.'
      }
    ],
    nutrition: {
      nutriScore: 'D',
      nutriScoreScore: 18,
      novaGroup: 4,
      servingSize: '70g (1 pack prepared)',
      calories: 312,
      macros: {
        protein: { label: 'Protein', amount: 8.0, unit: 'g', dailyValuePercentage: 16, status: 'moderate' },
        carbs: { label: 'Carbs', amount: 43.6, unit: 'g', dailyValuePercentage: 16, status: 'moderate' },
        sugars: { label: 'Sugars', amount: 2.2, unit: 'g', dailyValuePercentage: 2, status: 'optimal' },
        fats: { label: 'Total Fats', amount: 11.9, unit: 'g', dailyValuePercentage: 17, status: 'moderate' },
        saturatedFats: { label: 'Saturated Fat', amount: 5.6, unit: 'g', dailyValuePercentage: 28, status: 'high' },
        fiber: { label: 'Dietary Fiber', amount: 3.6, unit: 'g', dailyValuePercentage: 13, status: 'moderate' },
        sodium: { label: 'Sodium (HIGH)', amount: 860, unit: 'mg', dailyValuePercentage: 37, status: 'high' }
      },
      additives: [
        { code: 'E501(i)', name: 'Potassium Carbonate', riskLevel: 'low', description: 'Acidity regulator creating springy noodle texture', commonUses: 'Ramen & noodles' },
        { code: 'E635', name: 'Disodium 5\'-ribonucleotides', riskLevel: 'low', description: 'Savory umami flavor enhancer in tastemaker', commonUses: 'Savory broths' },
        { code: 'E412', name: 'Guar Gum', riskLevel: 'low', description: 'Natural plant thickener', commonUses: 'Sauces & noodles' }
      ],
      allergens: ['Wheat (Gluten)', 'May contain milk and soy'],
      ingredientsListText: 'Noodles: Wheat Flour, Palm Oil, Salt, Wheat Gluten, Potassium Carbonate, Sodium Polyphosphate, Guar Gum. Tastemaker: Hydrolysed Peanut Protein, Mixed Spices (Onion Powder, Coriander, Chili Powder, Turmeric, Garlic Powder, Cumin, Aniseed, Ginger), Sugar, Salt, Edible Palm Oil, Disodium Ribonucleotides.',
      packagingEcoScore: 'C (Multilayer plastic laminate)'
    },
    aiIntakeAdvice: {
      productSummary: 'Authentic popular instant noodles manufactured under ISO 22000 hygiene. Ultra-processed high-sodium food with fried wheat noodle cake.',
      contextualAdvice: '⚠️ HIGH SODIUM ALERT: Contains 860mg sodium in a single pack (over 37% of daily adult limit). Consider using half the tastemaker seasoning sachet.',
      timingAdvice: 'Best paired with added fresh vegetables (spinach, carrots) and protein (egg/tofu) to balance nutrient density.',
      safetyScoreIndex: 62,
      servingRecommendation: 'Limit to occasional indulgence (max 1-2 times per month).',
      healthProfileImpacts: [
        {
          condition: 'hypertension',
          status: 'danger',
          headline: 'Severe 860mg Sodium Surge',
          description: 'Single serving delivers 860mg sodium, which can acutely elevate resting systolic blood pressure.'
        },
        {
          condition: 'low_sodium',
          status: 'danger',
          headline: 'Exceeds Renal Sodium Budget',
          description: 'Over 4x the strict 200mg sodium threshold for low-sodium diets.'
        },
        {
          condition: 'gluten_free',
          status: 'danger',
          headline: 'Contains Wheat Flour (Gluten)',
          description: 'Noodle cake is fabricated from refined wheat flour.'
        }
      ]
    },
    fraudIntelligence: {
      knownFakesCount: 0,
      reportedIncidentLocations: [],
      riskLevel: 'LOW',
      officialManufacturerContact: 'consumer@in.nestle.com'
    }
  },

  // 10. Fake Designer Perfume/Cosmetic (COUNTERFEIT)
  {
    id: 'fake-designer-cosmetic',
    barcode: '1111111111111',
    barcodeFormat: 'EAN-13 (REPLICATED COUNTERFEIT)',
    productName: 'Fake Designer Luxury Perfume / Cosmetic (Illicit Clone)',
    brand: 'UNAUTHORIZED COUNTERFEIT LAB',
    category: 'Counterfeit Cosmetics / Chemical Hazard Alert',
    originCountry: 'Unknown Illicit Bottling Plant',
    verifiedTimestamp: 'PACKAGING ASPECT RATIO VIOLATION & CHEMICAL HAZARD',
    authenticityStatus: 'COUNTERFEIT',
    authenticityScore: 12,
    msrpPrice: 115.00,
    reportedMarketPrice: 22.00,
    lotBatchNumber: 'FORGE-PERF-11',
    packagingFrontImage: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    checks: {
      barcodeRegistry: {
        status: 'fail',
        title: 'Replicated Barcode Sequence (1111111111111)',
        summary: 'Repeated numeral sequence 1111111111111 is a known counterfeit spoof code',
        details: [
          'Barcode is a fraudulent sequence never assigned by GS1 France or GS1 US',
          'Not linked to any licensed cosmetic manufacturer CPNP registration'
        ],
        metricLabel: 'Registry Confidence',
        metricValue: '0%'
      },
      typographyInspection: {
        status: 'fail',
        title: 'Distorted Lettering & Missing IFRA Batch Stamp',
        summary: 'Silk-screen print on glass bottle bleeds under 5x magnification',
        details: [
          'Missing mandatory International Fragrance Association (IFRA) safety declaration',
          'French origin text contains misspelled words ("Eau de Parfume" instead of "Eau de Parfum")'
        ],
        metricLabel: 'OCR Match Ratio',
        metricValue: '24.1%'
      },
      packagingHologram: {
        status: 'fail',
        title: 'Packaging Aspect Ratio Violation & Cheap Atomizer',
        summary: 'Bottle height-to-width ratio deviates by 19% from master luxury glass mold',
        details: [
          'Glass bottom is uneven with visible air bubbles and mold seam ridges',
          'Plastic dip tube inside bottle is curled and oversized (cheap generic atomizer pump)'
        ],
        metricLabel: 'Hardware Match',
        metricValue: '8.4%'
      },
      priceDistribution: {
        status: 'fail',
        title: '80% Discount Below Official Brand Floor',
        summary: 'Sold at $22.00 vs $115.00 authorized department store price',
        details: ['Flagged on unverified peer-to-peer social commerce listings'],
        metricLabel: 'Price Variance',
        metricValue: '-80.9%'
      }
    },
    xaiHeatmapRegions: [
      {
        id: 'f-perf-1',
        label: 'Bottle Aspect Ratio Distortion (19%)',
        confidence: 99.4,
        box: { x: 20, y: 18, width: 60, height: 62 },
        status: 'tampered',
        findingDescription: 'Aspect ratio deviates by 19% from authentic master CAD mold',
        inspectionDetail: 'Cheap generic glass bottle substituted for proprietary luxury bottle.'
      },
      {
        id: 'f-perf-2',
        label: 'Curled Plastic Dip Tube',
        confidence: 98.7,
        box: { x: 44, y: 38, width: 12, height: 42 },
        status: 'tampered',
        findingDescription: 'Excessively long, bent plastic siphon tube in bottle',
        inspectionDetail: 'Authentic luxury atomizers use straight, near-invisible fluoropolymer tubes.'
      },
      {
        id: 'f-perf-3',
        label: 'Spoof Barcode (1111111111111)',
        confidence: 100,
        box: { x: 28, y: 84, width: 44, height: 12 },
        status: 'tampered',
        findingDescription: 'Counterfeit placeholder barcode',
        inspectionDetail: 'Confirmed fraudulent lot circulating in illegal grey distribution.'
      }
    ],
    nutrition: {
      nutriScore: 'UNKNOWN',
      novaGroup: 0,
      servingSize: 'Topical Fragrance Spray',
      calories: 0,
      macros: {
        protein: { label: 'Protein', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        carbs: { label: 'Carbs', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        sugars: { label: 'Sugars', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        fats: { label: 'Total Fats', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        saturatedFats: { label: 'Saturated Fat', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        fiber: { label: 'Dietary Fiber', amount: 0, unit: 'g', dailyValuePercentage: 0, status: 'optimal' },
        sodium: { label: 'Sodium', amount: 0, unit: 'mg', dailyValuePercentage: 0, status: 'optimal' }
      },
      additives: [
        { code: 'TOXIC RESIDUE', name: 'Industrial Methanol / Solvents', riskLevel: 'high', description: 'Toxic denaturants substituted for cosmetic ethanol; risk of skin blistering and systemic toxicity', commonUses: 'Counterfeit perfumes' },
        { code: 'PHTHALATE DANGER', name: 'Banned Plasticizer Fixatives (DEHP)', riskLevel: 'high', description: 'Endocrine-disrupting chemicals used to simulate scent longevity', commonUses: 'Illicit fragrances' }
      ],
      allergens: ['Banned Synthetic Fragrances', 'Severe Contact Allergen Risk', 'Formaldehyde Precursors'],
      ingredientsListText: 'Industrial Methanol, Tap Water, Uncertified Synthetic Fragrance Oils, Phthalates, Artificial Colorants.',
      packagingEcoScore: 'E (Chemical hazard classification)'
    },
    aiIntakeAdvice: {
      productSummary: '🚨 CRITICAL CHEMICAL TOXICITY WARNING: CONFIRMED COUNTERFEIT COSMETIC. Contains toxic industrial methanol solvents and banned endocrine-disrupting phthalate fixatives.',
      contextualAdvice: 'DO NOT SPRAY ON SKIN OR CLOTHING. Applying counterfeit perfumes can cause chemical burns, severe contact dermatitis, eye irritation, and chronic systemic chemical absorption.',
      timingAdvice: 'If skin contact has occurred, wash thoroughly with soap and water immediately.',
      safetyScoreIndex: 0,
      servingRecommendation: 'DISCARD IMMEDIATELY AS HAZARDOUS WASTE.',
      healthProfileImpacts: [
        {
          condition: 'hypertension',
          status: 'danger',
          headline: 'Toxic Solvent Inhalation Hazard',
          description: 'Volatile industrial solvents irritate respiratory mucosa and trigger autonomic stress.'
        },
        {
          condition: 'diabetic',
          status: 'danger',
          headline: 'Compromised Skin Barrier Vulnerability',
          description: 'Chemical burns on diabetic skin carry elevated secondary infection risk.'
        }
      ]
    },
    fraudIntelligence: {
      knownFakesCount: 780,
      reportedIncidentLocations: ['Online Gray Marketplaces', 'Pop-up Flea Markets', 'Social Commerce Channels'],
      riskLevel: 'CRITICAL',
      officialManufacturerContact: 'counterfeit-reporting@veripure.io'
    }
  }
];

export const getMockProductByBarcode = (barcode: string): ProductVerificationData | undefined => {
  const cleanBarcode = barcode.trim().replace(/\s+/g, '');
  return MOCK_PRODUCTS.find(p => p.barcode === cleanBarcode || p.id === cleanBarcode);
};
