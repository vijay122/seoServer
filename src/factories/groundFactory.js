const {FOO} = require('../Enums/Enum');
import apartment from '../models/apartment';
import plot from '../models/plot';
import Location from '../models/base/location';
import individualHouse from '../models/individualHouse';


var GROUNDTYPE = {
	Apartment: "APARTMENT",
	Plot: "PLOT",
	IndividualHouse: "INDIVIDUALHOUSE"
};

class GroundFactory {
	static initializeGround(payload) {
		return new Promise((resolve, reject) => {
			if(payload.type==GROUNDTYPE.Apartment)
			{
				resolve(new apartment());
			}
			else if(payload.type==GROUNDTYPE.Plot)
			{
				resolve(new plot());
			}
			else if(payload.type==GROUNDTYPE.IndividualHouse)
			{
				resolve(new individualHouse());
			}
		});
	}
	static getInstance(payload) {
		return Location;
	}
}

export default GroundFactory;