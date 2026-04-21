import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PRONUNCIATION_API_URL = process.env.PRONUNCIATION_API_URL?.trim().replace(/\/+$/, "") || "https://sequence-precision-bubbly.ngrok-free.dev";
const PRONUNCIATION_API_KEY = process.env.PRONUNCIATION_API_KEY?.trim();

export async function POST(req: Request) {
  try {
    const contentType = String(req.headers.get("content-type") || "");

    let audioBase64: string | null = null;
    let mimeType = "audio/webm";
    let filename = "record.webm";
    let reference = "";

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      audioBase64 = body?.audioBase64 || null;
      mimeType = body?.mimeType || mimeType;
      filename = body?.filename || filename;
      reference = body?.reference || "";
    } else if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file") as any;
      if (file && typeof file.arrayBuffer === "function") {
        const ab = await file.arrayBuffer();
        audioBase64 = Buffer.from(ab).toString("base64");
        mimeType = file.type || mimeType;
        filename = file.name || filename;
      }
      reference = String(form.get("reference") || "");
    } else {
      const text = await req.text().catch(() => "");
      if (text) {
        try {
          const body = JSON.parse(text);
          audioBase64 = body?.audioBase64 || null;
          mimeType = body?.mimeType || mimeType;
          filename = body?.filename || filename;
          reference = body?.reference || "";
        } catch {
          // try data URL
          const maybe = text.trim();
          if (maybe.startsWith("data:")) {
            const parts = maybe.split(",");
            audioBase64 = parts[1] || null;
            const mt = maybe.match(/^data:([^;]+);/);
            if (mt) mimeType = mt[1];
          }
        }
      }
    }

    if (!audioBase64) {
      return NextResponse.json({ status: "error", message: "Missing 'audioBase64' in request" }, { status: 400 });
    }

    const buffer = Buffer.from(audioBase64, "base64");

    // First, try the upstream server's known endpoint /assess with the exact field names
    const attempts: Array<any> = [];

    const authHeaders: Record<string, string> = {};
    if (PRONUNCIATION_API_KEY) authHeaders["Authorization"] = `Bearer ${PRONUNCIATION_API_KEY}`;

    try {
      const url = PRONUNCIATION_API_URL.replace(/\/+$/, "") + "/assess";
      const form = new FormData();
      try {
        const blob = new Blob([buffer], { type: mimeType });
        form.append("audio_file", blob, filename);
      } catch (e) {
        form.append("audio_file", buffer as any, filename);
      }
      // upstream expects 'reference_text' as Form field per your server
      if (reference) form.append("reference_text", reference);

      const res = await fetch(url, {
        method: "POST",
        headers: { ...authHeaders },
        body: form as any,
        cache: "no-store",
      });

      const text = await res.text().catch(() => "");
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {
        json = { raw: text };
      }
      attempts.push({ url, mode: "form", field: "audio_file", status: res.status, body: json });
      if (res.ok) return NextResponse.json({ status: "success", result: json });
    } catch (err) {
      attempts.push({ url: PRONUNCIATION_API_URL + "/assess", error: String(err) });
    }

    // We'll try several candidate upstream paths and payload shapes (JSON or multipart)
    const candidatePaths = [
      "",
      "/assess",
      "/api/assess",
      "/api/pronunciation",
      "/pronunciation",
      "/check",
      "/api/check",
      "/evaluate",
      "/analyze",
      "/v1/assess",
      "/predict",
      "/assess/audio",
      "/audio/assess",
    ];

    const fieldNames = ["file", "audio", "audio_file", "upload"];

    // authHeaders already defined above

    // Helper to try JSON POST
    async function tryJsonPost(url: string) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { ...authHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({ audioBase64, mimeType, filename, reference }),
          cache: "no-store",
        });
        const text = await res.text().catch(() => "");
        let json = null;
        try {
          json = JSON.parse(text);
        } catch {
          json = { raw: text };
        }
        attempts.push({ url, mode: "json", status: res.status, body: json });
        if (res.ok) return { ok: true, body: json };
      } catch (err) {
        attempts.push({ url, mode: "json", error: String(err) });
      }
      return { ok: false };
    }

    // Helper to try FormData POST with a given field name
    async function tryFormPost(url: string, fieldName: string) {
      try {
        const form = new FormData();
        try {
          const blob = new Blob([buffer], { type: mimeType });
          form.append(fieldName, blob, filename);
        } catch (e) {
          form.append(fieldName, buffer as any, filename);
        }
        if (reference) form.append("reference", reference);

        const res = await fetch(url, {
          method: "POST",
          headers: { ...authHeaders },
          body: form as any,
          cache: "no-store",
        });

        const text = await res.text().catch(() => "");
        let json = null;
        try {
          json = JSON.parse(text);
        } catch {
          json = { raw: text };
        }
        attempts.push({ url, mode: "form", field: fieldName, status: res.status, body: json });
        if (res.ok) return { ok: true, body: json };
      } catch (err) {
        attempts.push({ url, mode: "form", field: fieldName, error: String(err) });
      }
      return { ok: false };
    }

    for (const p of candidatePaths) {
      const url = PRONUNCIATION_API_URL + (p.startsWith("/") || p === "" ? p : `/${p}`);

      // Try JSON first
      const jsonTry = await tryJsonPost(url);
      if (jsonTry.ok) return NextResponse.json({ status: "success", result: jsonTry.body });

      // Try form posts with different field names
      for (const f of fieldNames) {
        const formTry = await tryFormPost(url, f);
        if (formTry.ok) return NextResponse.json({ status: "success", result: formTry.body });
      }
    }

    console.warn("[API /api/pronunciation/check] all upstream attempts failed", attempts);
    return NextResponse.json({ status: "error", message: "Upstream error: no working endpoint", attempts }, { status: 502 });
  } catch (err) {
    console.error("[API /api/pronunciation/check] Error:", err);
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}
