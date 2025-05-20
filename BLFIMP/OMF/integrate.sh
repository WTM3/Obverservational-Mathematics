#!/bin/bash

# OMF Integration Script
# ---------------------
# This script helps integrate the Observational Mathematics Framework
# into the main BLF codebase by creating necessary links and references

echo "🧮 Integrating Observational Mathematics Framework (OMF)..."

# Create symbolic links to key OMF files from main codebase if needed
if [ ! -d "../Core/BLFCore/OMF" ]; then
  echo "Creating symbolic link to OMF in BLFCore..."
  mkdir -p "../Core/BLFCore/OMF"
  ln -sf "$(pwd)/README.md" "../Core/BLFCore/OMF/README.md"
fi

# Verify formula files exist
echo "Verifying formula files..."
missing=0
for dir in formulas applications research; do
  if [ ! -d "$dir" ]; then
    echo "❌ Missing directory: $dir"
    missing=1
  fi
done

if [ $missing -eq 1 ]; then
  echo "Creating missing directories..."
  mkdir -p formulas applications research
fi

# Update implementation status
echo "Updating implementation status in README.md..."
implemented=$(grep -l "Implementation Status: ✅" formulas/*.md applications/*.md 2>/dev/null | wc -l)
in_progress=$(grep -l "Implementation Status: 🔄" formulas/*.md applications/*.md 2>/dev/null | wc -l)
theoretical=$(grep -l "Implementation Status: 📝" formulas/*.md applications/*.md 2>/dev/null | wc -l)

echo "Status summary:"
echo "✅ Implemented: $implemented"
echo "🔄 In Progress: $in_progress"
echo "📝 Theoretical: $theoretical"

# Generate visual diagram if Graphviz is installed
if command -v dot >/dev/null 2>&1; then
  echo "Generating formula relationship diagram..."
  
  # Create .dot file for visualization
  echo "digraph OMF {
  rankdir=LR;
  node [shape=box, style=filled, fillcolor=lightblue];
  
  // Core formulas
  CognitiveAlignment [label=\"Cognitive Alignment\"];
  BufferMechanics [label=\"Buffer Mechanics\"];
  NeuralJSON [label=\"Neural JSON\"];
  LLSDT [label=\"LLSDT Integration\"];
  SpeechRecognition [label=\"Speech Recognition\"];
  
  // Applications
  Accessibility [label=\"Accessibility\", fillcolor=lightgreen];
  Recovery [label=\"Recovery Systems\", fillcolor=lightgreen];
  PatternDetection [label=\"Pattern Detection\", fillcolor=lightgreen];
  Uncertainty [label=\"Uncertainty Quantification\", fillcolor=lightgreen];
  
  // Relationships
  CognitiveAlignment -> BufferMechanics;
  BufferMechanics -> Recovery;
  NeuralJSON -> CognitiveAlignment;
  NeuralJSON -> PatternDetection;
  PatternDetection -> Accessibility;
  SpeechRecognition -> Accessibility;
  LLSDT -> Uncertainty;
  Recovery -> CognitiveAlignment;
}" > omf_diagram.dot
  
  # Generate PNG
  dot -Tpng omf_diagram.dot -o omf_diagram.png
  echo "✅ Diagram generated: omf_diagram.png"
else
  echo "⚠️ Graphviz not installed. Skipping diagram generation."
fi

echo "✅ OMF integration complete!" 