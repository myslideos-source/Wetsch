import { NextResponse } from "next/server";

// Nimmt Anfragen aus dem mehrstufigen Kontaktformular entgegen.
// Validiert serverseitig und gibt eine Bestätigung zurück. Die Anbindung an
// ein E-Mail-Postfach oder CRM (z. B. via Transaktions-E-Mail-Dienst) ist an
// dieser Stelle zu ergänzen, sobald entsprechende Zugangsdaten vorliegen.

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_FILES = 6;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const projectType = String(formData.get("projectType") ?? "").trim();
    const location = String(formData.get("location") ?? "").trim();
    const timeline = String(formData.get("timeline") ?? "").trim();

    if (!name) {
      return NextResponse.json({ ok: false, error: "Name fehlt." }, { status: 400 });
    }
    if (!email && !phone) {
      return NextResponse.json(
        { ok: false, error: "Bitte Telefonnummer oder E-Mail angeben." },
        { status: 400 }
      );
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "E-Mail ist ungültig." }, { status: 400 });
    }
    if (!projectType || !location || !timeline) {
      return NextResponse.json(
        { ok: false, error: "Bitte alle Pflichtfelder ausfüllen." },
        { status: 400 }
      );
    }

    const photos = formData.getAll("photos").filter((p): p is File => p instanceof File);
    if (photos.length > MAX_FILES) {
      return NextResponse.json(
        { ok: false, error: `Maximal ${MAX_FILES} Fotos möglich.` },
        { status: 400 }
      );
    }
    for (const photo of photos) {
      if (photo.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { ok: false, error: `${photo.name} ist zu groß (max. 10 MB).` },
          { status: 400 }
        );
      }
    }

    // TODO: Anfrage an E-Mail-Postfach / CRM von Wetsch übermitteln, sobald
    // Zugangsdaten für einen E-Mail-Versanddienst konfiguriert sind.

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Anfrage konnte nicht verarbeitet werden." },
      { status: 500 }
    );
  }
}
