import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import prds from './products';
import {addGround,GetProducts,generateSitemapXml,fetchXml} from './products';
import {loadUserInfo,disableUser,addUser,updateUser} from './users';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});
	api.get('/index', function (request, response) {
		response.json("hello this is index");
	});
	api.get('/generateSitemap',generateSitemapXml);

	return api;
}
