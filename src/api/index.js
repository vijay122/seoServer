import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import prds from './products';
import {addGround,GetProducts,generateSitemapXml,createSitemapindex,fetchXml} from './products';
import {loadUserInfo,disableUser,addUser,updateUser} from './users';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/app2/', (req, res) => {
		console.log("inside get of empty");
		res.json({ version });
	});
	api.get('/app2/index', function (request, response) {
		response.json("hello this is index");
	});
	api.get('/app2/generateSitemap',generateSitemapXml);
    api.get('/app2/createSitemap',createSitemapindex);

	return api;
}
