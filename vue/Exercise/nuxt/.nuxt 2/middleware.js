const middleware = {}

middleware['auth'] = require('../middleware/auth.js');
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['stats'] = require('../middleware/stats.js');
middleware['stats'] = middleware['stats'].default || middleware['stats']

export default middleware
