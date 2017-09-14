import location from './base/location';

class Plot extends location {
	constructor(props) {
		super(props);
			this.length = String,
			this.breadth = String
	}

	static collectionName() {
		return 'companies';
	}
}

export default Plot;