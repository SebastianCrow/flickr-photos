/**
 * Photo sizes
 */
export enum PhotoSize {
	Thumbnail = "t",
	Smallest = "s",
	Small = "m",
	Medium = "z",
	Large = "b"
}

/**
 * Search filters
 */
export interface Filters {
	color: string;
	license: string;
}

/**
 * Photo file info
 */
export interface PhotoInfo {
	id: string;
	farm: string;
	server: string;
	secret: string;
}

/**
 * Url param info
 */
export class Param {

	constructor(private name: string, private value: string) {}

	public getString(): string {
		return `${this.name}=${this.value}`;
	}
}

/**
 * API endpoint data
 */
export interface UrlData {
	method: string;
	extras?: string[];
}
