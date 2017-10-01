var AutoComplete = require('mongoose-in-memory-autocomplete').AutoComplete;
var crypto = require('crypto');
var Async = require('async');
var MongoClient = require('mongodb').MongoClient;
import {replaceRoutes,applyParams} from '../lib/sitemapUtils';
var Pkgcollection;

var sm = require('sitemap')
	, fs = require('fs');

var distance = require('google-distance');
distance.apiKey = 'AIzaSyAVebFb0CRGtfPyIz0VPv9nul-vxRMYt5U';

var connectionString = 'mongodb://root:Vjy4livelytrips@148.72.246.39:27017/placesDB?authSource=admin';
var blogconnectionString = 'mongodb://root:Vjy4livelytrips@148.72.246.39:27017/blog?authSource=admin';
var database;
var blogdatabase;
MongoClient.connect(connectionString, function(err, db) {
	if(err) { return console.dir(err); }
	database = db;
});
MongoClient.connect(blogconnectionString, function(err, db) {
    if(err) { return console.dir(err); }
    blogdatabase = db;
});

var database;


function getCollectionNameByPath(path)
{
	switch(path)
	{
		case '/':
			return '';
		case '/posts/::param':
			return 'posts';
		case '/blog/post::slug':
			return 'posts';
		case '/detail/id::param/category::subparam':
			return 'packages';
		case '/detail/id::productid':
			return 'products';
		default:
			return undefined;
	}
}

function generateFullPath(path,value)
{

}
function * arrIterate(arr){
	var i = 0;
	while(i != arr.length){
		yield arr[i];
		i++
	}
};
exports.generateSitemapXml = function(req,res)
{
    //let paths = ['/blog/post::slug'];
try {
console.log("inside generateSitemapXml");

    let paths = ["/detail/id::param/category::subparam", '/blog/post::slug', '/', '/about', '/newblog', '/posts/::param', '/categories::id/searchtype::id/search::id', '/contact', '/join-us', '/products'];


    let requests = paths.map((item, index) => {
        return new Promise((resolve) => {
            processXMLFileCreation(item, index);
        });
    })

    Promise.all(requests).then(() => {
        debugger;
        console.log('done')
    });

}
catch(ex)
{
	console.log("exception inside generateSitemapXml");
}
	//var iter = processXMLFileCreation(paths[9],i);
	//paths.forEach(function(entry,index) {
		//iter.next(entry,index);
	//	processXMLFileCreation(entry,index);
	//});

	//http://www.livelytrips.com/detail/id:TrivenisangamamAllahabadUttarPradeshbd/category:products
    //http://www.livelytrips.com/detail/id:KeralaHoneymoonTourkochikerala/category:packages
}

function renameKeys(oldName,newName,inputArray)
{
	for (var i=0; i<inputArray.length; i++) {

	}
}

Array.prototype.renameProperty = function (oldName, newName) {
	// Do nothing if the names are the same
	for(var i=0;i<this.length;i++) {
		for(var j=0;j<oldName.length; j++) {
			if (oldName[j] == newName[j]) {
				return this[i];
			}
			// Check for the old property name to avoid a ReferenceError in strict mode.
			if (this[i].hasOwnProperty(oldName[j])) {
				this[i][newName[j]] = this[i][oldName[j]];
			}
			//if (!this[i].hasOwnProperty(oldName[j])) {
			//	this[i][newName[j]] = oldName[j];
			//}
			delete this[i][oldName[j]];
		}
	}
	return this;
};

Array.prototype.addAdditionalParams = function (oldName, newName) {
	// Do nothing if the names are the same
	for(var i=0;i<this.length;i++) {
		for(var j=0;j<oldName.length; j++) {
			if (oldName[j] == newName[j]) {
				return this[i];
			}
			// Check for the old property name to avoid a ReferenceError in strict mode.
			//if (this[i].hasOwnProperty(oldName[j])) {
			//	this[i][newName[j]] = this[i][oldName[j]];
			//}
			if (!this[i].hasOwnProperty(oldName[j])) {
				this[i][newName[j]] = oldName[j];
			}
			//delete this[i][oldName[j]];
		}
	}
	return this;
};

var getPostUrls=function(path)
{
	let allPaths=[];
	switch(path)
	{
		case 'posts/:param':
			let iterator = myGenerator();
			let firstYield = iterator.next();
			allPaths = firstYield;
			break;

	}
}
function getPathConfigValues(path,findItem)
{
	let config;
	var collectionName = getCollectionNameByPath(path);
	database.collection[collectionName].find({},{findItem:1},function (err,result){
		//console.log(JSON.stringify(result));
		result.toArray().then(function(data){
			config[path]=data;
			//res.status( 400 ).send( JSON.stringify(data) );
		});
});
}


	function fetchRecordsFromDatabase(path) {
		return new Promise((resolve) => {

			var collectionName = getCollectionNameByPath(path);
			var findElement = '_id';
			if(collectionName) {
				var collection = database.collection(collectionName);
				if(collectionName=="posts")
				{
                    findElement = 'slug';
                     collection = blogdatabase.collection(collectionName);
				}
				collection.find({}, {slug:1}, function (err, result) {
					result.toArray().then(function (data) {
						resolve(data);
					})
				});
			}
			else {
                resolve();
			}
		});
	}
function buildUrlsFromData(baseurl,data,path) {
	return new Promise((resolve) => {
		try{
			let config=[];
			if(path=="/detail/id::param/category::subparam") {
                data = data.renameProperty(["_id"], ["param"]);
                data = data.addAdditionalParams(["packages"], ["subparam"]);
            }
			config[path] = data;
			const paths = [path];
			var res = replaceRoutes(baseurl, applyParams(paths, config));
			resolve(res);
		}
		catch(ex)
		{

		}
	});
}
fs.isDir = function(dpath) {
    try {
        return fs.lstatSync(dpath).isDirectory();
    } catch(e) {
        return false;
    }
};
fs.mkdirp = function(dirname) {
    dirname = path.normalize(dirname).split(path.sep);
    dirname.forEach((sdir,index)=>{
        var pathInQuestion = dirname.slice(0,index+1).join(path.sep);
        if((!fs.isDir(pathInQuestion)) && pathInQuestion) fs.mkdirSync(pathInQuestion);
    });
};
function createSitemapFromUrls(urls,index) {
	return new Promise((resolve) => {
		var sitemap = sm.createSitemap({
			hostname: '',
			cacheTime: 600000,  //600 sec (10 min) cache purge period
			urls: urls
		});
		sitemap.toXML(function (err, xml) {
			if (err) {

			}
			else
			{
				var sitemapGeneratedName='sitemap_'+index+'.xml';
				fs.writeFile("/"+sitemapGeneratedName, xml, function (err) {
					if (err) throw err;
					console.log('It\'s saved!');
					//sitemapurls.push(baseurl + sitemapGeneratedName);
					resolve(sitemapGeneratedName);
				});

				//return res.status(500).end();
			}
		});
	});
}

function processXMLFileCreation(path,index) {
	try {
        console.log("inside processXMLFileCreation for path:"+path);
        return new Promise((resolve) => {
		const data =  fetchRecordsFromDatabase(path).then(function(data){
			buildUrlsFromData('http://livelytrips.com',data,path).then(function(urls)
			{
			 createSitemapFromUrls(urls,index).then(function(xmlname){
				resolve(xmlname);
				 });
			})
		});
	});
	}
	catch (e)
	{
		console.error(String(e));
	}
}




