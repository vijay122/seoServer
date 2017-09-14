var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	_id:  String,
	name: String,
	title:String,
	type :String,
	builtUpArea:String,
	plotArea:String,
	length:String,
	breadth:String,
	numberOfFloor:Number,
	floorNumber:Number,
	apartmentFeatures:[String],
	assets:[],
	households:[],
	location:{
		coordinates : [String,String],
		index: Boolean
	},
	city :String,
	state:String,
	pin:String,
	displayPicture:String,
	description:String,
	landmark: String,
	image: [],
	createdDate: { type: Date, default: Date.now },
	createdBy:String,
	season: String,
});

var IndividualHouse = mongoose.model('individualHouse', ProductSchema);
export default IndividualHouse;