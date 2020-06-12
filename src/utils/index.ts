const DEFAULT_SUBS = [
    'all', 'popular',
]

export async function setLinkTargets(target: string) {
    for (let i = 0; i < document.links.length; i++) {
        document.links[i].target = target;
    }
}

export function setQueryParam(key: string, value: string | null) {
    const params = new URLSearchParams(window.location.search);

    if (value) {
        params.set(key, value);
    } else {
        params.delete(key);
    }

    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();
    window.history.pushState(null, '', newUrl);
}

export function getQueryParam<T = string>(key: string) {
    const params = new URLSearchParams(window.location.search);

    return params.get(key) as T | null;
}

function saveSubReddits(subs: string[]) {
    const uniqueSorted = Array.from(new Set(subs.sort()));
    localStorage.setItem('savedSubReddits', JSON.stringify(uniqueSorted));
}

export function saveSubReddit(sub: string) {
    const saved = getSavedSubs();
    saved.push(sub);
    saveSubReddits(saved);
}

export function getSavedSubs(): string[] {
    const json = localStorage.getItem('savedSubReddits');
    if (json) {
        return JSON.parse(json);
    } else {
        return DEFAULT_SUBS;
    };
}

export function deleteSavedSubReddit(sub: string) {
    const saved = getSavedSubs();
    const filtered = saved.filter(el => el !== sub);
    saveSubReddits(filtered);
}
