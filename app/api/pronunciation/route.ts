import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PRONUNCIATION_API_URL = process.env.PRONUNCIATION_API_URL?.trim().replace(/\/+$/, "") || "https://sequence-precision-bubbly.ngrok-free.dev";
const PRONUNCIATION_API_KEY = process.env.PRONUNCIATION_API_KEY?.trim();

async function forwardToUpstream(path: string, method: string, body?: any) {
  const headers: Record<string, string> = {};
  if (PRONUNCIATION_API_KEY) headers["Authorization"] = `Bearer ${PRONUNCIATION_API_KEY}`;
  if (body && !(body instanceof FormData)) headers["Content-Type"] = "application/json";

  const res = await fetch(path, {
    method,
    headers,
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
    cache: "no-store",
  });

  return res;
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const text = url.searchParams.get("text") || "";

    if (!text) {
      return NextResponse.json({ status: "error", message: "Missing 'text' query param" }, { status: 400 });
    }

    // Try a simple GET forward first
    const upstream = `${PRONUNCIATION_API_URL}?text=${encodeURIComponent(text)}`;
    const res = await forwardToUpstream(upstream, "GET");
    const upstreamContentType = res.headers.get("content-type") || "";
    const upstreamLength = res.headers.get("content-length") || "";
    console.debug("[API /api/pronunciation] upstream status=", res.status, "content-type=", upstreamContentType, "content-length=", upstreamLength);

    if (!res.ok) {
      const raw = await res.text().catch(() => "");
      console.warn("[API /api/pronunciation] upstream error", res.status, raw);
      return NextResponse.json({ status: "error", message: "Upstream error", upstreamStatus: res.status, upstreamBody: raw }, { status: 502 });
    }

    const contentType = upstreamContentType || "";

    if (contentType.startsWith("audio/") || contentType === "application/octet-stream") {
      const arrayBuffer = await res.arrayBuffer();
      return new NextResponse(arrayBuffer, { status: 200, headers: { "Content-Type": contentType } });
    }

    // assume JSON or text (e.g., { url: '...' })
    const data = await res.json().catch(async () => ({ text: await res.text().catch(() => "") }));
    return NextResponse.json({ status: "success", data });
  } catch (err) {
    console.error("[API /api/pronunciation] Error:", err);
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const text = String(body?.text || "").trim();
    if (!text) {
      return NextResponse.json({ status: "error", message: "Missing 'text' in body" }, { status: 400 });
    }

    const upstream = PRONUNCIATION_API_URL;
    const res = await forwardToUpstream(upstream, "POST", { text });
    const upstreamContentType2 = res.headers.get("content-type") || "";
    const upstreamLength2 = res.headers.get("content-length") || "";
    console.debug("[API /api/pronunciation] upstream POST status=", res.status, "content-type=", upstreamContentType2, "content-length=", upstreamLength2);

    if (!res.ok) {
      const raw = await res.text().catch(() => "");
      console.warn("[API /api/pronunciation] upstream POST error", res.status, raw);
      return NextResponse.json({ status: "error", message: "Upstream error", upstreamStatus: res.status, upstreamBody: raw }, { status: 502 });
    }

    const contentType = upstreamContentType2 || "";
    if (contentType.startsWith("audio/") || contentType === "application/octet-stream") {
      const arrayBuffer = await res.arrayBuffer();
      return new NextResponse(arrayBuffer, { status: 200, headers: { "Content-Type": contentType } });
    }

    const data = await res.json().catch(async () => ({ text: await res.text().catch(() => "") }));
    return NextResponse.json({ status: "success", data });
  } catch (err) {
    console.error("[API /api/pronunciation] POST Error:", err);
    return NextResponse.json({ status: "error", message: "Server error" }, { status: 500 });
  }
}
