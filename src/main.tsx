import React from "react";
import ReactDOM from "react-dom/client";
import {
  Apple,
  BadgeCheck,
  Briefcase,
  Calendar,
  Circle,
  Code2,
  Copy,
  Download,
  Globe,
  HeartPulse,
  Home,
  ImagePlus,
  Monitor,
  Moon,
  Package,
  Palette,
  Pill,
  Rocket,
  Shield,
  ShoppingCart,
  Smartphone,
  Square,
  Sparkles,
  Star,
  Upload,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import JSZip from "jszip";
import "./styles.css";

type Shape = "rounded" | "square" | "circle" | "squircle";
type IconKey =
  | "initials"
  | "rocket"
  | "zap"
  | "shield"
  | "home"
  | "cart"
  | "calendar"
  | "pill"
  | "wrench"
  | "health"
  | "briefcase"
  | "code"
  | "globe"
  | "star";
type Preset = {
  name: string;
  bg: string;
  fg: string;
  accent: string;
  shape: Shape;
};
type IconOption = {
  key: IconKey;
  label: string;
  Icon: LucideIcon;
};

const presets: Preset[] = [
  { name: "SaaS Blue", bg: "#1d4ed8", fg: "#ffffff", accent: "#38bdf8", shape: "rounded" },
  { name: "Launch Mint", bg: "#064e3b", fg: "#d1fae5", accent: "#34d399", shape: "squircle" },
  { name: "Studio Ink", bg: "#18181b", fg: "#fafafa", accent: "#f59e0b", shape: "square" },
  { name: "Founder Red", bg: "#991b1b", fg: "#fff7ed", accent: "#fb7185", shape: "circle" },
];

const exportSizes = [16, 32, 48, 180, 192, 512];
const iconOptions: IconOption[] = [
  { key: "initials", label: "Initials", Icon: Sparkles },
  { key: "rocket", label: "Launch", Icon: Rocket },
  { key: "zap", label: "Energy", Icon: Zap },
  { key: "shield", label: "Trust", Icon: Shield },
  { key: "home", label: "Home", Icon: Home },
  { key: "cart", label: "Shop", Icon: ShoppingCart },
  { key: "calendar", label: "Calendar", Icon: Calendar },
  { key: "pill", label: "Health", Icon: Pill },
  { key: "wrench", label: "Tools", Icon: Wrench },
  { key: "health", label: "Care", Icon: HeartPulse },
  { key: "briefcase", label: "Business", Icon: Briefcase },
  { key: "code", label: "Code", Icon: Code2 },
  { key: "globe", label: "Global", Icon: Globe },
  { key: "star", label: "Star", Icon: Star },
];
const installSnippet = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />`;

function roundedRect(ctx: CanvasRenderingContext2D, size: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  ctx.lineTo(size - radius, 0);
  ctx.quadraticCurveTo(size, 0, size, radius);
  ctx.lineTo(size, size - radius);
  ctx.quadraticCurveTo(size, size, size - radius, size);
  ctx.lineTo(radius, size);
  ctx.quadraticCurveTo(0, size, 0, size - radius);
  ctx.lineTo(0, radius);
  ctx.quadraticCurveTo(0, 0, radius, 0);
  ctx.closePath();
}

function roundedBox(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawShape(ctx: CanvasRenderingContext2D, shape: Shape, size: number) {
  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    return;
  }

  if (shape === "square") {
    ctx.rect(0, 0, size, size);
    return;
  }

  roundedRect(ctx, size, shape === "squircle" ? size * 0.34 : size * 0.2);
}

function drawCanvasIcon(ctx: CanvasRenderingContext2D, icon: IconKey, size: number, color: string) {
  const cx = size / 2;
  const cy = size / 2;
  const unit = size / 512;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 42 * unit;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (icon === "rocket") {
    ctx.beginPath();
    ctx.moveTo(cx - 74 * unit, cy + 80 * unit);
    ctx.quadraticCurveTo(cx - 10 * unit, cy - 120 * unit, cx + 128 * unit, cy - 156 * unit);
    ctx.quadraticCurveTo(cx + 92 * unit, cy - 18 * unit, cx - 108 * unit, cy + 46 * unit);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 44 * unit, cy - 74 * unit, 30 * unit, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 112 * unit, cy + 58 * unit);
    ctx.lineTo(cx - 154 * unit, cy + 134 * unit);
    ctx.lineTo(cx - 74 * unit, cy + 98 * unit);
    ctx.stroke();
  } else if (icon === "zap") {
    ctx.beginPath();
    ctx.moveTo(cx + 28 * unit, cy - 172 * unit);
    ctx.lineTo(cx - 92 * unit, cy + 18 * unit);
    ctx.lineTo(cx + 22 * unit, cy + 18 * unit);
    ctx.lineTo(cx - 28 * unit, cy + 172 * unit);
    ctx.lineTo(cx + 106 * unit, cy - 28 * unit);
    ctx.lineTo(cx - 14 * unit, cy - 28 * unit);
    ctx.closePath();
    ctx.fill();
  } else if (icon === "shield") {
    ctx.beginPath();
    ctx.moveTo(cx, cy - 172 * unit);
    ctx.lineTo(cx + 132 * unit, cy - 112 * unit);
    ctx.lineTo(cx + 108 * unit, cy + 66 * unit);
    ctx.quadraticCurveTo(cx + 78 * unit, cy + 128 * unit, cx, cy + 170 * unit);
    ctx.quadraticCurveTo(cx - 78 * unit, cy + 128 * unit, cx - 108 * unit, cy + 66 * unit);
    ctx.lineTo(cx - 132 * unit, cy - 112 * unit);
    ctx.closePath();
    ctx.stroke();
  } else if (icon === "home") {
    ctx.beginPath();
    ctx.moveTo(cx - 154 * unit, cy - 10 * unit);
    ctx.lineTo(cx, cy - 142 * unit);
    ctx.lineTo(cx + 154 * unit, cy - 10 * unit);
    ctx.stroke();
    ctx.strokeRect(cx - 106 * unit, cy - 8 * unit, 212 * unit, 154 * unit);
  } else if (icon === "cart") {
    ctx.beginPath();
    ctx.moveTo(cx - 158 * unit, cy - 118 * unit);
    ctx.lineTo(cx - 112 * unit, cy - 118 * unit);
    ctx.lineTo(cx - 76 * unit, cy + 54 * unit);
    ctx.lineTo(cx + 116 * unit, cy + 54 * unit);
    ctx.lineTo(cx + 148 * unit, cy - 54 * unit);
    ctx.lineTo(cx - 90 * unit, cy - 54 * unit);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx - 58 * unit, cy + 124 * unit, 24 * unit, 0, Math.PI * 2);
    ctx.arc(cx + 102 * unit, cy + 124 * unit, 24 * unit, 0, Math.PI * 2);
    ctx.stroke();
  } else if (icon === "calendar") {
    roundedBox(ctx, cx - 139 * unit, cy - 118 * unit, 278 * unit, 236 * unit, 20 * unit);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 139 * unit, cy - 36 * unit);
    ctx.lineTo(cx + 139 * unit, cy - 36 * unit);
    ctx.stroke();
  } else if (icon === "pill") {
    ctx.translate(cx, cy);
    ctx.rotate(-Math.PI / 4);
    roundedBox(ctx, -140 * unit, -58 * unit, 280 * unit, 116 * unit, 58 * unit);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 58 * unit);
    ctx.lineTo(0, -58 * unit);
    ctx.stroke();
    ctx.restore();
    return;
  } else if (icon === "wrench") {
    ctx.beginPath();
    ctx.arc(cx + 84 * unit, cy - 92 * unit, 62 * unit, Math.PI * 0.18, Math.PI * 1.38);
    ctx.moveTo(cx + 38 * unit, cy - 48 * unit);
    ctx.lineTo(cx - 126 * unit, cy + 116 * unit);
    ctx.arc(cx - 138 * unit, cy + 128 * unit, 28 * unit, Math.PI * 0.75, Math.PI * 2.6);
    ctx.stroke();
  } else if (icon === "health") {
    ctx.beginPath();
    ctx.moveTo(cx - 160 * unit, cy + 8 * unit);
    ctx.lineTo(cx - 86 * unit, cy + 8 * unit);
    ctx.lineTo(cx - 46 * unit, cy - 76 * unit);
    ctx.lineTo(cx + 18 * unit, cy + 104 * unit);
    ctx.lineTo(cx + 62 * unit, cy + 8 * unit);
    ctx.lineTo(cx + 160 * unit, cy + 8 * unit);
    ctx.stroke();
  } else if (icon === "briefcase") {
    roundedBox(ctx, cx - 146 * unit, cy - 60 * unit, 292 * unit, 200 * unit, 26 * unit);
    ctx.stroke();
    ctx.strokeRect(cx - 54 * unit, cy - 118 * unit, 108 * unit, 58 * unit);
  } else if (icon === "code") {
    ctx.beginPath();
    ctx.moveTo(cx - 42 * unit, cy - 152 * unit);
    ctx.lineTo(cx - 98 * unit, cy + 152 * unit);
    ctx.moveTo(cx - 142 * unit, cy - 68 * unit);
    ctx.lineTo(cx - 204 * unit, cy);
    ctx.lineTo(cx - 142 * unit, cy + 68 * unit);
    ctx.moveTo(cx + 142 * unit, cy - 68 * unit);
    ctx.lineTo(cx + 204 * unit, cy);
    ctx.lineTo(cx + 142 * unit, cy + 68 * unit);
    ctx.stroke();
  } else if (icon === "globe") {
    ctx.beginPath();
    ctx.arc(cx, cy, 154 * unit, 0, Math.PI * 2);
    ctx.moveTo(cx - 154 * unit, cy);
    ctx.lineTo(cx + 154 * unit, cy);
    ctx.moveTo(cx, cy - 154 * unit);
    ctx.bezierCurveTo(cx - 70 * unit, cy - 80 * unit, cx - 70 * unit, cy + 80 * unit, cx, cy + 154 * unit);
    ctx.moveTo(cx, cy - 154 * unit);
    ctx.bezierCurveTo(cx + 70 * unit, cy - 80 * unit, cx + 70 * unit, cy + 80 * unit, cx, cy + 154 * unit);
    ctx.stroke();
  } else if (icon === "star") {
    ctx.beginPath();
    for (let i = 0; i < 10; i += 1) {
      const radius = i % 2 === 0 ? 168 * unit : 70 * unit;
      const angle = -Math.PI / 2 + (i * Math.PI) / 5;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function canvasToBlob(canvas: HTMLCanvasElement, type = "image/png"): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Unable to export canvas"))), type);
  });
}

async function blobToArrayBuffer(blob: Blob) {
  return await blob.arrayBuffer();
}

function makeIconFile(images: { size: number; bytes: Uint8Array }[]) {
  const headerSize = 6;
  const entrySize = 16;
  const imageOffset = headerSize + images.length * entrySize;
  const totalSize = imageOffset + images.reduce((sum, image) => sum + image.bytes.length, 0);
  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);

  view.setUint16(0, 0, true);
  view.setUint16(2, 1, true);
  view.setUint16(4, images.length, true);

  let offset = imageOffset;
  images.forEach((image, index) => {
    const entry = headerSize + index * entrySize;
    view.setUint8(entry, image.size >= 256 ? 0 : image.size);
    view.setUint8(entry + 1, image.size >= 256 ? 0 : image.size);
    view.setUint8(entry + 2, 0);
    view.setUint8(entry + 3, 0);
    view.setUint16(entry + 4, 1, true);
    view.setUint16(entry + 6, 32, true);
    view.setUint32(entry + 8, image.bytes.length, true);
    view.setUint32(entry + 12, offset, true);
    bytes.set(image.bytes, offset);
    offset += image.bytes.length;
  });

  return new Blob([buffer], { type: "image/x-icon" });
}

function App() {
  const [brandName, setBrandName] = React.useState("Test Pilot");
  const [initials, setInitials] = React.useState("TP");
  const [bgColor, setBgColor] = React.useState("#1d4ed8");
  const [iconColor, setIconColor] = React.useState("#ffffff");
  const [accentColor, setAccentColor] = React.useState("#38bdf8");
  const [shape, setShape] = React.useState<Shape>("rounded");
  const [border, setBorder] = React.useState(true);
  const [shadow, setShadow] = React.useState(true);
  const [selectedIcon, setSelectedIcon] = React.useState<IconKey>("initials");
  const [uploadedLogo, setUploadedLogo] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [previewUrl, setPreviewUrl] = React.useState("");

  const displayText = initials.trim().slice(0, 3).toUpperCase() || "A";
  const appName = brandName.trim() || "My App";

  const drawFavicon = React.useCallback(
    async (size = 512) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas is not supported in this browser.");

      canvas.width = size;
      canvas.height = size;
      ctx.clearRect(0, 0, size, size);

      ctx.save();
      drawShape(ctx, shape, size);
      ctx.clip();

      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, bgColor);
      gradient.addColorStop(1, accentColor);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      if (shadow) {
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.beginPath();
        ctx.arc(size * 0.78, size * 0.18, size * 0.36, 0, Math.PI * 2);
        ctx.fill();
      }

      if (uploadedLogo) {
        const image = new Image();
        image.src = uploadedLogo;
        await image.decode();
        const inset = size * 0.2;
        ctx.drawImage(image, inset, inset, size - inset * 2, size - inset * 2);
      } else if (selectedIcon === "initials") {
        ctx.fillStyle = iconColor;
        ctx.font = `800 ${size * (displayText.length > 2 ? 0.33 : 0.42)}px Inter, Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(displayText, size / 2, size / 2 + size * 0.035);
      } else {
        drawCanvasIcon(ctx, selectedIcon, size, iconColor);
      }

      ctx.restore();

      if (border) {
        ctx.save();
        drawShape(ctx, shape, size);
        ctx.strokeStyle = "rgba(255,255,255,0.58)";
        ctx.lineWidth = Math.max(2, size * 0.035);
        ctx.stroke();
        ctx.restore();
      }

      return canvas;
    },
    [accentColor, bgColor, border, displayText, iconColor, selectedIcon, shadow, shape, uploadedLogo],
  );

  React.useEffect(() => {
    let cancelled = false;

    async function renderPreview() {
      const icon = await drawFavicon(512);
      if (cancelled) return;
      setPreviewUrl(icon.toDataURL("image/png"));
    }

    renderPreview();
    return () => {
      cancelled = true;
    };
  }, [drawFavicon]);

  async function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function downloadPng(size: number, filename = `favicon-${size}x${size}.png`) {
    const canvas = await drawFavicon(size);
    await downloadBlob(await canvasToBlob(canvas), filename);
  }

  async function downloadIco() {
    const images = await Promise.all(
      [16, 32, 48].map(async (size) => {
        const canvas = await drawFavicon(size);
        const blob = await canvasToBlob(canvas);
        return { size, bytes: new Uint8Array(await blobToArrayBuffer(blob)) };
      }),
    );
    await downloadBlob(makeIconFile(images), "favicon.ico");
  }

  function manifestContent() {
    return JSON.stringify(
      {
        name: appName,
        short_name: appName.slice(0, 12),
        icons: [
          { src: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
        ],
        theme_color: bgColor,
        background_color: bgColor,
        display: "standalone",
      },
      null,
      2,
    );
  }

  async function downloadManifest() {
    await downloadBlob(new Blob([manifestContent()], { type: "application/manifest+json" }), "site.webmanifest");
  }

  async function downloadKit() {
    const zip = new JSZip();
    for (const size of exportSizes) {
      const canvas = await drawFavicon(size);
      const filename =
        size === 180 ? "apple-touch-icon.png" : size === 192 || size === 512 ? `favicon-${size}x${size}.png` : `favicon-${size}x${size}.png`;
      zip.file(filename, await canvasToBlob(canvas));
    }

    const icoImages = await Promise.all(
      [16, 32, 48].map(async (size) => {
        const canvas = await drawFavicon(size);
        return { size, bytes: new Uint8Array(await blobToArrayBuffer(await canvasToBlob(canvas))) };
      }),
    );
    zip.file("favicon.ico", makeIconFile(icoImages));
    zip.file("site.webmanifest", manifestContent());
    zip.file("install-instructions.html", installSnippet);
    await downloadBlob(await zip.generateAsync({ type: "blob" }), "favicon-kit.zip");
  }

  async function handleLogoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setUploadedLogo(String(reader.result));
    reader.readAsDataURL(file);
  }

  function chooseIcon(icon: IconKey) {
    setSelectedIcon(icon);
    setUploadedLogo(null);
  }

  async function copyInstallSnippet() {
    await navigator.clipboard.writeText(installSnippet);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  function applyPreset(preset: Preset) {
    setBgColor(preset.bg);
    setIconColor(preset.fg);
    setAccentColor(preset.accent);
    setShape(preset.shape);
  }

  return (
    <main className="app-shell">
      <section className="hero-band">
        <div>
          <p className="eyebrow">Launch Asset Tool</p>
          <h1>Favicon Creator</h1>
          <p className="hero-copy">Create a professional favicon kit for your app, website, or SaaS in 60 seconds.</p>
        </div>
        <button className="primary-action" type="button" onClick={downloadKit}>
          <Package size={18} />
          Download full kit
        </button>
      </section>

      <section className="workspace-grid">
        <form className="panel controls-panel">
          <div className="panel-heading">
            <Sparkles size={20} />
            <h2>Design</h2>
          </div>

          <label>
            <span>Brand name</span>
            <input value={brandName} onChange={(event) => setBrandName(event.target.value)} placeholder="Test Pilot" />
          </label>

          <div className="input-row">
            <label>
              <span>Initials</span>
              <input
                value={initials}
                onChange={(event) => {
                  setInitials(event.target.value);
                  setSelectedIcon("initials");
                  setUploadedLogo(null);
                }}
                maxLength={3}
                placeholder="TP"
              />
            </label>
            <label className="upload-box">
              <ImagePlus size={18} />
              <span>{uploadedLogo ? "Logo loaded" : "Upload logo"}</span>
              <input type="file" accept="image/png,image/jpeg,image/svg+xml,image/webp" onChange={handleLogoUpload} />
            </label>
          </div>

          <div className="icon-picker">
            <span className="field-title">Icon picker</span>
            <div className="icon-grid">
              {iconOptions.map(({ key, label, Icon }) => (
                <button
                  aria-pressed={selectedIcon === key && !uploadedLogo}
                  className={selectedIcon === key && !uploadedLogo ? "active" : ""}
                  key={key}
                  type="button"
                  title={label}
                  onClick={() => chooseIcon(key)}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="preset-grid">
            {presets.map((preset) => (
              <button key={preset.name} type="button" onClick={() => applyPreset(preset)}>
                <span style={{ background: `linear-gradient(135deg, ${preset.bg}, ${preset.accent})` }} />
                {preset.name}
              </button>
            ))}
          </div>

          <div className="color-grid">
            <label>
              <span>Background</span>
              <input type="color" value={bgColor} onChange={(event) => setBgColor(event.target.value)} />
            </label>
            <label>
              <span>Icon/Text</span>
              <input type="color" value={iconColor} onChange={(event) => setIconColor(event.target.value)} />
            </label>
            <label>
              <span>Accent</span>
              <input type="color" value={accentColor} onChange={(event) => setAccentColor(event.target.value)} />
            </label>
          </div>

          <div>
            <span className="field-title">Shape</span>
            <div className="shape-grid">
              {[
                ["rounded", Square, "Rounded"],
                ["square", Square, "Square"],
                ["circle", Circle, "Circle"],
                ["squircle", Palette, "Squircle"],
              ].map(([value, Icon, label]) => (
                <button
                  className={shape === value ? "active" : ""}
                  key={String(value)}
                  type="button"
                  onClick={() => setShape(value as Shape)}
                >
                  <Icon size={17} />
                  {label as string}
                </button>
              ))}
            </div>
          </div>

          <div className="toggle-row">
            <label>
              <input type="checkbox" checked={border} onChange={(event) => setBorder(event.target.checked)} />
              Border
            </label>
            <label>
              <input type="checkbox" checked={shadow} onChange={(event) => setShadow(event.target.checked)} />
              Highlight
            </label>
          </div>
        </form>

        <section className="panel preview-panel">
          <div className="panel-heading">
            <Monitor size={20} />
            <h2>Preview</h2>
          </div>

          <div className="browser-tab">
            {previewUrl ? <img src={previewUrl} alt="" /> : null}
            <div>
              <strong>{appName}</strong>
              <span>app.example.com</span>
            </div>
          </div>

          <div className="big-preview">
            {previewUrl ? <img src={previewUrl} alt="" /> : null}
          </div>

          <div className="device-grid">
            <div>
              <Smartphone size={18} />
              {previewUrl ? <img src={previewUrl} alt="" /> : null}
              <span>Mobile</span>
            </div>
            <div>
              <Moon size={18} />
              {previewUrl ? <img src={previewUrl} alt="" /> : null}
              <span>Dark tab</span>
            </div>
            <div>
              <Apple size={18} />
              {previewUrl ? <img src={previewUrl} alt="" /> : null}
              <span>Apple</span>
            </div>
          </div>
        </section>

        <section className="panel export-panel">
          <div className="panel-heading">
            <Download size={20} />
            <h2>Export</h2>
          </div>
          <div className="export-grid">
            <button type="button" onClick={() => downloadPng(16)}>
              16x16 PNG
            </button>
            <button type="button" onClick={() => downloadPng(32)}>
              32x32 PNG
            </button>
            <button type="button" onClick={() => downloadPng(180, "apple-touch-icon.png")}>
              Apple icon
            </button>
            <button type="button" onClick={downloadIco}>
              favicon.ico
            </button>
            <button type="button" onClick={downloadManifest}>
              Manifest
            </button>
            <button className="accent-button" type="button" onClick={downloadKit}>
              Full ZIP kit
            </button>
          </div>
        </section>

        <section className="panel checklist-panel">
          <div className="panel-heading">
            <BadgeCheck size={20} />
            <h2>Launch Check</h2>
          </div>
          <ul>
            <li>Favicon files exported</li>
            <li>Manifest linked in app shell</li>
            <li>Browser tab checked at 16x16</li>
            <li>Mobile icon checked on dark and light backgrounds</li>
          </ul>
        </section>
      </section>

      <section className="install-band">
        <div>
          <h2>Install snippet</h2>
          <pre>{installSnippet}</pre>
        </div>
        <button type="button" onClick={copyInstallSnippet}>
          <Copy size={18} />
          {copied ? "Copied" : "Copy"}
        </button>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
