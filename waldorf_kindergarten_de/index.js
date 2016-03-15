var request = require('request'),
    cheerio = require('cheerio'),
    async = require('async'),
    fs = require('fs');

var cities = [
  'Berlin',
  'Hamburg',
  'München',
  'Köln',
  'Frankfurt',
  'Essen',
  'Dortmund',
  'Stuttgart',
  'Düsseldorf',
  'Bremen',
  'Hannover',
  'Duisburg',
  'Nürnberg',
  'Leipzig',
  'Dresden',
  'Bochum',
  'Wuppertal',
  'Bielefeld',
  'Bonn',
  'Mannheim',
  'Karlsruhe',
  'Gelsenkirchen',
  'Wiesbaden',
  'Münster',
  'Mönchengladbach',
  'Chemnitz',
  'Augsburg',
  'Braunschweig',
  'Aachen',
  'Krefeld',
  'Halle',
  'Kiel',
  'Magdeburg',
  'Oberhausen',
  'Lübeck',
  'Freiburg',
  'Hagen',
  'Erfurt',
  'Kassel',
  'Rostock',
  'Mainz',
  'Hamm',
  'Saarbrücken',
  'Herne',
  'Mülheim',
  'Solingen',
  'Osnabrück',
  'Ludwigshafen',
  'Leverkusen',
  'Oldenburg',
  'Neuss',
  'Paderborn',
  'Heidelberg',
  'Darmstadt',
  'Potsdam',
  'Würzburg',
  'Göttingen',
  'Regensburg',
  'Recklinghausen',
  'Bottrop',
  'Wolfsburg',
  'Heilbronn',
  'Ingolstadt',
  'Ulm',
  'Remscheid',
  'Pforzheim',
  'Bremerhaven',
  'Offenbach',
  'Fürth',
  'Reutlingen',
  'Salzgitter',
  'Siegen',
  'Gera',
  'Koblenz',
  'Moers',
  'Bergisch Gladbach',
  'Cottbus',
  'Hildesheim',
  'Witten',
  'Zwickau',
  'Erlangen',
  'Iserlohn',
  'Trier',
  'Kaiserslautern',
  'Jena',
  'Schwerin',
  'Gütersloh',
  'Marl',
  'Lünen',
  'Esslingen',
  'Velbert',
  'Ratingen',
  'Düren',
  'Ludwigsburg',
  'Wilhelmshaven',
  'Hanau',
  'Minden',
  'Flensburg',
  'Dessau',
  'Villingen-Schwenningen'
];

var baseUrl = 'http://www.waldorfkindergarten.de/index.php?eID=tx_locator_eID';
var distance = 1000;
var actionParam = 'getMarkers';
var pwParam = '0';
var dataParam = '%7B%22includeLibs%22%3A%22typo3conf%5C%2Fext%5C%2Flocator%5C%2Fpi1%5C%2Fclass.tx_locator_pi1.php%22%2C%22userFunc%22%3A%22tx_locator_pi1-%3Emain%22%2C%22pid_list%22%3A%22197%22%2C%22displayMode%22%3A%22ajaxSearchWithMap%22%2C%22showAreas%22%3A%22%22%2C%22showPoiTable%22%3A%220%22%2C%22defaultMapType%22%3A%22%22%2C%22defaultZoomLevel%22%3A%22%22%2C%22enableStreetViewOverlay%22%3A%221%22%2C%22enableStreetView%22%3A0%2C%22enableMoreButton%22%3A%220%22%2C%22additionalLayers%22%3A%22%22%2C%22apiV3Layers%22%3A%22%22%2C%22storeTitle%22%3A%22store(s)%22%2C%22linkTarget%22%3A%22_blank%22%2C%22routeViewTarget%22%3A%22_top%22%2C%22templateFile%22%3A%22EXT%3Alocator%5C%2Fpi1%5C%2Ftemplate.html%22%2C%22cssFile%22%3A%22EXT%3Alocator%5C%2Fpi1%5C%2Flayout.css%22%2C%22finderTemplate%22%3A%220%22%2C%22uidOfSingleView%22%3A%221%22%2C%22useFeUserPageTitle%22%3A%220%22%2C%22showOverviewMap%22%3A%220%22%2C%22useFeUserData%22%3A%224%22%2C%22externalLocationTable%22%3A%22tx_cal_location%22%2C%22feUserGroup%22%3A%22%22%2C%22tt_addressStorenameField%22%3A%22company%22%2C%22tt_addressAllowedGroups%22%3A%22%22%2C%22tt_addressNotAllowedGroups%22%3A%22%22%2C%22showTabbedInfoWindow%22%3A%220%22%2C%22showVideoPlayer%22%3A%220%22%2C%22numberOfMails%22%3A%223%22%2C%22showOnlyMailResultTable%22%3A%220%22%2C%22shapeFile%22%3A%22fileadmin%5C%2Fincludes%5C%2Flocator%5C%2Fshape.shp%22%2C%22fillZipcodeArea%22%3A%221%22%2C%22zoomZipcodeArea%22%3A%22%22%2C%22additionalMapTypes%22%3A%22G_PHYSICAL_MAP%2CG_HYBRID_MAP%22%2C%22helpPageId%22%3A%22%22%2C%22useNotesInternal%22%3A%220%22%2C%22enableLogs%22%3A%220%22%2C%22debug%22%3A%220%22%2C%22radiusPresets%22%3A%2220%2C50%2C100%2C500%2C1000%22%2C%22resultLimit%22%3A%2250%22%2C%22googleApiKey%22%3A%22%22%2C%22googleApiVersion%22%3A%223.x%22%2C%22useCurl%22%3A%22%22%2C%22countryCodes%22%3A%22de%22%2C%22searchByName%22%3A0%2C%22resultPageId%22%3A%22%22%2C%22countrySelectorResultPageId%22%3A%22%22%2C%22routePageId%22%3A%22%22%2C%22feUserListingPageId%22%3A%22%22%2C%22showStoreImage%22%3A%220%22%2C%22distanceUnit%22%3A%22km%22%2C%22useCookie%22%3A0%2C%22cookieLifeTime%22%3A%223600%22%2C%22showResultTable%22%3A0%2C%22showRoute%22%3A0%2C%22_GP%22%3A%7B%22mode%22%3A%22ajaxSearchWithMap%22%2C%22lat%22%3A%22%22%2C%22lon%22%3A%22%22%7D%2C%22lang%22%3A%22de%22%2C%22pageId%22%3A%22197%22%7D';

var results = {};

async.map(cities, function(city, callback) {
  var search = city + ':DE:' + distance;
  request.post(baseUrl, {
    form: {
      'data': dataParam,
      'ref': search,
      'tx_locator_pi1[action]': actionParam,
      'tx_locator_pi1[search]': search,
      'tx_locator_pi1[pw]': pwParam
    }
  }, function(err, httpResponse, body) {
    if (!err) {
      $ = cheerio.load(body);
      var entries = $('.storename');
      for (var i = 0; i < entries.length; i++) {
        var element = entries.eq(i);
        var name = element.text().trim();
        var street = element.next().next().next().next();
        var city = street.next();
        var phone = city.next().next().next();
        var email = phone.next().next().next();
        var web = email.next();
        var cityName = city.text().trim().replace('\r\n', '').replace(/ +/, ' ');
        var key = name + ':' + cityName;
        results[key] = {
          name: name,
          street: street.text().trim(),
          city: cityName,
          phone: phone.text().replace('Telefon:', '').trim(),
          mail: email.text().replace('E-Mail:', '').trim(),
          web: web.text().replace('Web:', '').trim()
        };
      }
    }
    callback(null, !err);
  });
}, function() {
  results = Object.keys(results).map(function(key) { return results[key]; });
  console.log("Found " + results.length + " Results");
  var json = JSON.stringify(results, null, 4);
  var now = new Date();
  var filename = 'kindergarten-' + now.toISOString().slice(0,10) + '.json';
  fs.writeFile(filename, json);
});
