/**
 * Module dependencies.
 */
var Prismic = require('prismic-nodejs');
var app = require('./config');
var PORT = app.get('port');
var PConfig = require('./prismic-configuration');
var request = require('request');

app.listen(PORT, function() {
  const repoEndpoint = PConfig.apiEndpoint.replace('/api', '');
  request.post(repoEndpoint + '/app/settings/onboarding/run', {});
  console.log('Point your browser to: http://localhost:' + PORT);
  console.log('For help point your browser to: http://localhost:' + PORT + '/help');
});


/**
* Function to render the 404 page
*/
function render404(req, res, message) {
  return res.status(404).render('error', { message: message });
}


/**
* Connect to the API
*/
app.use((req, res, next) => {
  Prismic.api(PConfig.apiEndpoint,{accessToken: PConfig.accessToken, req: req})
  .then((api) => {
    req.prismic = {api: api};
    res.locals.ctx = {
      endpoint: PConfig.apiEndpoint,
      linkResolver: PConfig.linkResolver
    };
    next();
  }).catch(function(err) {
    if (err.status == 404) {
      render404(req, res, 'There was a problem connecting to your API. Please configure your API-Endpoint in your configuration file.');
    } else {
      res.status(500).render('error', {message: err});
    }
  });
});


/**
* Query the site navigation with every route
*/
app.route('*').get((req, res, next) => {
  req.prismic.api.getSingle('navigation').then(function(navContent){
    
    // Define the navigation content
    res.locals.navContent = navContent;
    next();
  });
});


/**
* Preconfigured prismic preview
*/
app.get('/preview', function(req, res) {
  return Prismic.preview(req.prismic.api, PConfig.linkResolver, req, res);
});


/**
* Homepage Route
*/
app.get('/', function(req, res) {
  
  // Query the homepage content
  req.prismic.api.getSingle('homepage').then(function(homepageContent) {
    
    // Render the 404 page if this uid is not found
    if(!homepageContent) {
      return render404(req, res, 'Could not find a homepage document in your content repository.');
    }
    
    // Render the homepage
    res.render('homepage', { homepageContent: homepageContent });
  });
});


/**
* Help Page Route
*/
app.get('/help', function(req, res) {
  const repoRegexp = new RegExp('^(https?:\/\/([\\-\\w]+)\\.[a-z]+\\.(io|dev))\/api$');
  const match = PConfig.apiEndpoint.match(repoRegexp);
  const repoURL = match[1];
  const name = match[2];
  const host = req.headers.host;
  const isConfigured = name !== 'your-repo-name';
  res.render('help', {isConfigured, repoURL, name, host});
});


/**
* Page Route
*/
app.get('/page/:uid', function(req, res) {
  
  // Define the UID from the url
  var uid = req.params.uid;
  
  // Query the page by its uid
  req.prismic.api.getByUID('page', uid).then(function(pageContent) {
    
    // Render the 404 page if this uid is not found
    if(!pageContent) {
      return render404(req, res);
    }
    
    // Render the page
    res.render('page', { pageContent: pageContent });
  });
});


/**
* Render 404 for any other route
*/
app.use('*', function(req, res) {
  return render404(req, res);
});
