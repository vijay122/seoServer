export function replaceRoutes(baseRoute = '', routes = [])
{
	return routes.map(rt =>
		baseRoute+`${rt}`
			.replace(new RegExp('\/+', 'g'), '/')
			.replace(new RegExp('^.*?|\/$', 'g'), '')
	);
}

export function applyQuery (paths = [], query = '', value = '')
{
	return paths.map(path => path.replace(query, value));
}
/*
export function replaceParams (paths = [], param = '', values = []) {

	const query = new RegExp(':' + param);

	values = Array.isArray(values) ? values : [values];

	return (
		values
			.map(value => applyQuery(paths, query, value))
			.reduce((result, path) => result.concat(path))
	);

}
*/

export function replaceParams (paths = [], params = [], rule = {})
{
	if (!params.length) {
		return paths;
	}
	const param = params.shift();
	const values = rule[param];
	paths = applyValues(paths, param, values);
	return replaceParams(paths, params, rule);
}

export function applyValues(paths = [], param = '', values = [])  {

	const query = new RegExp(':' + param);

	values = Array.isArray(values) ? values : [values];

	return (
		values
			.map(value => applyQuery(paths, query, value))
			.reduce((result, path) => result.concat(path))
	);

}

export function applyRule(path = '', rule = {})
{

	const params = Object.keys(rule);

	return replaceParams([path], params, rule);

}

export function applyRules(path = '', rules = [])
{

	return (
		rules
			.map(rule => applyRule(path, rule))
			.reduce((result, item) => result.concat(item), [])
	);

}
export function hasRules (path = '', paramsConfig = {})
{
	return !!paramsConfig[path];
}

export function applyParams(paths = [], paramsConfig)  {

	if (!paramsConfig) {
		return paths;
	}

	return paths.reduce((result, path) => {

		if (!hasRules(path, paramsConfig)) {
			return result.concat([path]);
		}

		return result.concat(
			applyRules(path, paramsConfig[path])
		);

	}, []);

}

