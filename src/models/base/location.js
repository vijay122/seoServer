const {Database, Model} = require('mongorito');
export class location extends Model {}

 export class Location {
	 constructor(props) {

	 }

	static mapper(props)
	{
		return new location({
			_id: props._id,
			name: props.name,
			title: props.title,
			type: props.type,
			plotArea: props.plotArea,
			length: props.length,
			breadth: props.breadth,
			assets: [],
			location: {
				coordinates: [props.latitude, props.longitude],
				index: Boolean
			},
			city: props.city,
			state: props.state,
			pin: props.pin,
			displayPicture: props.displayPicture,
			description: props.description,
			landmark: props.landmark,
			image: [],
			createdDate: {type: Date, default: Date.now},
			createdBy: props.createdBy

		});
	}
}

export default Location;