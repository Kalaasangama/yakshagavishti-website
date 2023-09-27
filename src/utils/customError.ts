class kalasangamaError extends Error {
	public type;
	public message;

	constructor(type: string, message: string) {
		super(type);
		this.type = type;
		this.message = message;
	}
}

export default kalasangamaError;
