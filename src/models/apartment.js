var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
	_id:  String,
	name: String,
	title:String,
	type :String,
	builtUpArea:String,
	uds:String,
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
	createdBy:String
});

var Apartment = mongoose.model('apartment', ProductSchema);
export default Apartment;


//location: {
//type: Schema.ObjectId,
//	ref: 'locationSchema'
//},