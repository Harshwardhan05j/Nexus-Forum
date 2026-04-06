import os

CSS_DIR = r"c:\Users\Lenovo\OneDrive\Desktop\nexus-forum-main\static"
TPL_DIR = r"c:\Users\Lenovo\OneDrive\Desktop\nexus-forum-main\templates"

replacements = {
    # Backgrounds
    "#0A0C10": "#050505",
    "rgba(10, 12, 16,": "rgba(5, 5, 5,",
    "rgba(15, 25, 36, 0.8)": "rgba(30, 30, 30, 0.8)",
    
    # Primary Accent - White
    "#00FF66": "#FFFFFF",
    "rgba(0, 255, 102": "rgba(255, 255, 255",
    
    # Secondary Accent - Silver
    "#2979FF": "#DDDDDD",
    "rgba(41, 121, 255": "rgba(220, 220, 220",
    
    # Hover states - Light gray
    "#00CC52": "#E0E0E0",
    
    # Gradients to monochromatic
    "linear-gradient(135deg, #00FF66 0%, #2979FF 100%)": "linear-gradient(135deg, #FFFFFF 0%, #AAAAAA 100%)",
    "linear-gradient(90deg, #00FF66, #2979FF)": "linear-gradient(90deg, #FFFFFF, #AAAAAA)",
    "linear-gradient(135deg, #00FF66 0%, #00CC52 100%)": "linear-gradient(135deg, #FFFFFF 0%, #E0E0E0 100%)",
    
    # Fonts update (just in case)
    '"Plus Jakarta Sans"': '"Space Grotesk", "Plus Jakarta Sans"'
}

for d in [CSS_DIR, TPL_DIR]:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith("css") or file.endswith("html"):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, "r", encoding="utf-8") as f:
                        content = f.read()
                    
                    new_content = content
                    for old, new in replacements.items():
                        new_content = new_content.replace(old, new)
                    
                    if new_content != content:
                        print(f"Updated {filepath}")
                        with open(filepath, "w", encoding="utf-8") as f:
                            f.write(new_content)
                except Exception as e:
                    print(f"Skipped {filepath}: {e}")
print("Snarex monochrome theme update complete.")
