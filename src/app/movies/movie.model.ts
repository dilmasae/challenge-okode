export interface Movie {
    id: number,
    title: string,
    original_language: string,
    overview: string,
    original_title: string,
    poster_path: string,
    release_date: string,
}

export interface MovieOption {
    page: number,
    q?: string,
}