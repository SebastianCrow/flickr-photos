
export class Photo {

	constructor(public id: string,
	            public authorId: number,
	            public authorName: string,
	            public date: Date,
	            public description: string,
	            public thumbnailUrl?: string,
	            public originalUrl?: string)
	{}

	public static fromData(data: any): Photo {
		return new Photo(
			data.id,
			data.owner,
			data.ownername,
			new Date(data.dateupload * 1000),
			data.description._content
		);
	}
}
