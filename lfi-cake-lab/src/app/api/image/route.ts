import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get('file');

    if (!file) {
        return NextResponse.json({ error: "No file specified" }, { status: 400 });
    }

    // --- LFI VULNERABILITY SIMULATION ---
    // In a real insecure App, they might read: fs.readFileSync(`./public/images/${file}`)
    // If the attacker puts `../../../../etc/passwd`, it traverses out of public.

    if (file.includes('etc/passwd') || file.includes('../')) {
        const fakePasswd = `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin

# --- CTF FLAG ---
# LWY{LFI_C4K3_M4ST3R}
# ----------------`;

        return new NextResponse(fakePasswd, {
            headers: {
                "Content-Type": "text/plain"
            }
        });
    }

    // Normal behavior (Returns an actual URL we can proxy/redirect)
    const imageMap: Record<string, string> = {
        'cake1.jpg': '/cake1.jpg',
        'cake2.jpg': '/cake2.jpg',
        'cake3.jpg': '/cake3.jpg'
    };

    const targetUrl = imageMap[file as string] || '/cake1.jpg';
    return NextResponse.redirect(new URL(targetUrl, request.url));
}
