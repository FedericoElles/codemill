Your task will be, if you shall accept it, to scrape public data from a website and to store it as JSON file

*Tech requirement*
- JavaScript/ NodeJS
- one file
- magic words are configurable on top of file

*Website*
http://www.waldorfkindergarten.de/kindergarten/suche/national.html

The search is geospatial - to display all possible result, you have to search accross the whole of germany, e.g. "Kassel"
After a search a list is display with values like this:


Waldorfkindergarten Kassel  
Brabanter Str. 47  
34131 Kassel  
  
Telefon: 0561-935130  
E-Mail: mail@waldorfschule-kassel.de  
Web: www.waldorfschule-kassel.de  

Convert all entries into JSON objects

*Output*
JSON file with an array of objects

    [
      {
        "name": "Waldorfkindergarten Kassel",
        "street": "Brabanter Str. 47",
        "city": "34131 Kassel",
        "phone": "0561-935130",
        "mail": "mail@waldorfschule-kassel.de",  
        "web": "www.waldorfschule-kassel.de"
      }
    ]
    
*Hints*
- Use request to fetch the data, use cheerio to scrape the html content
- Watch out for dublicate entries. The name combined with the city shall be unique

*Usage*
Start the scraping by running  

    node index.js

which creates or overwrittes a file: kindergarten-yyyy-mm-dd.json

*Super awesome bonus feature+
- Geocode all addresses adding coordinates (lat & lng) to each entry
