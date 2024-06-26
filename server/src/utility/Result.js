export class Result {
	success = false;
	result = null;

	constructor(success, result) {
		this.success = success;
		this.result = result;
	}

	static failed() {
		return new Result(false, null);
	}
}