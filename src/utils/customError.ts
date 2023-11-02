class kalasangamaError extends Error {
	public type:string;
	public message:string;

	constructor(type: string, message: string) {
		super(type);
		this.type = type;
		this.message = message;
	}
}

export default kalasangamaError;
