
export class License {

	constructor(public id: number, public name: string) {}

	public static fromData(data: any) {
		return new License(
			data.id,
			data.name
		);
	}
}
