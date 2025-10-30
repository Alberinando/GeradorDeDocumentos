"use client";

import { useCallback, useState } from "react";

export function useCopyToClipboard() {
    const [isCopying, setIsCopying] = useState(false);

    const copy = useCallback(async (text: string) => {
        if (typeof window === "undefined") return false;
        if (!text) return false;

        setIsCopying(true);
        try {
            if (window.isSecureContext && navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(text);
                setIsCopying(false);
                return true;
            }

            const ta = document.createElement("textarea");
            ta.value = text;

            // Evita zoom e rolagem
            ta.setAttribute("readonly", "");
            ta.style.position = "fixed";
            ta.style.top = "0";
            ta.style.left = "0";
            ta.style.opacity = "0";
            ta.style.pointerEvents = "none";

            document.body.appendChild(ta);

            ta.focus();
            ta.select();

            try {
                const range = document.createRange();
                range.selectNodeContents(ta);
                const sel = window.getSelection();
                sel?.removeAllRanges();
                sel?.addRange(range);
                ta.setSelectionRange(0, ta.value.length);
            } catch {}

            const ok = document.execCommand("copy");
            document.body.removeChild(ta);

            setIsCopying(false);
            return ok;
        } catch {
            setIsCopying(false);
            return false;
        }
    }, []);

    return { copy, isCopying };
}
