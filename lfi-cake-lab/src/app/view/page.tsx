"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { ArrowLeft, Skull, FileText } from "lucide-react";

function ViewContent() {
    const searchParams = useSearchParams();
    const file = searchParams.get('file') || "cake1.png";
    const [content, setContent] = useState<string | null>(null);
    const [isImage, setIsImage] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchFile = async () => {
            try {
                // Fetch from our vulnerable API
                const res = await fetch(`/api/image?file=${file}`);

                // If it's returning text (like an LFI dumped /etc/passwd)
                const contentType = res.headers.get("content-type");

                if (contentType && contentType.includes("text/plain")) {
                    setIsImage(false);
                    const text = await res.text();
                    setContent(text);
                } else if (res.redirected) {
                    setIsImage(true);
                    setContent(res.url); // Set the redirect URL as the image source
                } else {
                    setError("Failed to load file.");
                }
            } catch (e) {
                setError("Error connecting to server.");
            }
        };

        fetchFile();
    }, [file]);

    return (
        <div className="min-h-screen bg-pink-50 text-neutral-900 font-sans p-8 flex flex-col">
            <header className="mb-8">
                <a href="/" className="inline-flex items-center gap-2 text-pink-600 font-bold hover:text-pink-800 transition">
                    <ArrowLeft className="w-5 h-5" /> Back to Bakery
                </a>
            </header>

            <main className="flex-grow flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
                {error && <p className="text-red-500 font-bold">{error}</p>}

                {!error && isImage && content && (
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-pink-100 flex flex-col items-center">
                        <img src={content} alt="Cake Image" className="w-[400px] h-[400px] object-cover rounded-xl border border-neutral-100" />
                        <p className="mt-6 text-sm text-neutral-500 font-mono bg-neutral-50 px-4 py-2 rounded-lg border border-neutral-200">
                            Loaded: {file}
                        </p>
                    </div>
                )}

                {!error && !isImage && content && (
                    <div className="w-full bg-black text-green-400 p-8 rounded-xl shadow-2xl overflow-x-auto border border-green-900/50">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-900/40">
                            <Skull className="w-8 h-8 text-red-500 animate-pulse" />
                            <h2 className="text-xl font-bold font-mono text-red-500 tracking-widest uppercase">LFI Detected</h2>
                        </div>
                        <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap">
                            {content}
                        </pre>
                    </div>
                )}
            </main>
        </div>
    );
}

export default function ViewPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-pink-50 p-8 flex items-center justify-center">Loading...</div>}>
            <ViewContent />
        </Suspense>
    );
}
