import Image from "next/image";
import imageManifest from "@/lib/image-manifest.json";

type ManifestEntry = { width: number; height: number; blurDataURL: string };
const manifest = imageManifest as Record<string, ManifestEntry>;

interface DemoImageProps {
  /** Pfad relativ zu /public, z. B. "/images/services/hausbau.jpg" */
  src: string;
  alt: string;
  /** CSS-Verlauf, der angezeigt wird, solange das Bild nicht heruntergeladen wurde */
  fallbackGradient: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** CSS object-position, z. B. "50% 15%" um bei schmalen Hochkant-Fotos den oberen Bildbereich im Fokus zu halten */
  objectPosition?: string;
}

/**
 * Rendert ein echtes, optimiertes Foto (mit Blur-Placeholder), sobald es via
 * `npm run images:setup` heruntergeladen wurde. Bis dahin – und im Build,
 * bevor die Bilder vorliegen – wird die gestaltete Verlaufs-Optik gezeigt,
 * damit die Seite immer funktioniert.
 */
export default function DemoImage({
  src,
  alt,
  fallbackGradient,
  sizes = "100vw",
  priority = false,
  className = "",
  objectPosition,
}: DemoImageProps) {
  const meta = manifest[src];

  if (!meta) {
    return (
      <div
        className={`absolute inset-0 h-full w-full ${className}`}
        style={{ background: fallbackGradient }}
        role="img"
        aria-label={alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      placeholder="blur"
      blurDataURL={meta.blurDataURL}
      className={`object-cover ${className}`}
      style={objectPosition ? { objectPosition } : undefined}
    />
  );
}
