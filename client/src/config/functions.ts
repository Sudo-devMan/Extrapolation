import api from "./api";
import type { Upload } from "./types";

export async function fetchUploads(grade: number | string | undefined) {
    try {
        const uploads = await api.get(`/papers/grade/${grade}`)
        if (uploads.status === 200) {
            return uploads
        }
    } catch (err) {
        console.error(err)
        return Promise.reject(err)
    }
}

export async function upload(data: Upload) {
    try {
        const res = await api.post('/papers', data)
        if (res.status === 201) {
            return res.data
        }
    } catch (err) {
        console.error(err)
        return Promise.reject(err)
    }
}

export function formatTimeAgo(dateString: string | undefined): string {
    if (!dateString) return "recent";

    const now = new Date();
    const past = new Date(dateString);
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30.4375; // Average days per month
    const msPerYear = msPerDay * 365.25;   // Account for leap years

    const elapsed = now.getTime() - past.getTime();

    if (elapsed < msPerMinute) {
        const seconds = Math.round(elapsed / 1000);
        return `${seconds < 1 ? 1 : seconds}s ago`;
    }

    if (elapsed < msPerHour) {
        return `${Math.round(elapsed / msPerMinute)}m ago`;
    }

    if (elapsed < msPerDay) {
        return `${Math.round(elapsed / msPerHour)}h ago`;
    }

    if (elapsed < msPerMonth) {
        return `${Math.round(elapsed / msPerDay)}d ago`;
    }

    if (elapsed < msPerYear) {
        return `${Math.round(elapsed / msPerMonth)}mon ago`;
    }

    return `${Math.round(elapsed / msPerYear)}y ago`;
}