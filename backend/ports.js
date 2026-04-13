const ports = [
  // 🌍 Curated ports
  { name: "Rotterdam", lat: 51.92, lon: 4.48 },
  { name: "Antwerp", lat: 51.22, lon: 4.40 },
  { name: "Hamburg", lat: 53.55, lon: 9.99 },
  { name: "Valencia", lat: 39.45, lon: -0.32 },
  { name: "London Gateway", lat: 51.51, lon: 0.50 },
  { name: "Felixstowe", lat: 51.96, lon: 1.35 },
  { name: "Le Havre", lat: 49.49, lon: 0.10 },
  { name: "Barcelona", lat: 41.35, lon: 2.16 },
  { name: "Genoa", lat: 44.40, lon: 8.93 },
  { name: "Piraeus", lat: 37.94, lon: 23.63 },

  { name: "Los Angeles", lat: 33.74, lon: -118.27 },
  { name: "Long Beach", lat: 33.75, lon: -118.20 },
  { name: "New York", lat: 40.68, lon: -74.04 },
  { name: "Houston", lat: 29.73, lon: -95.26 },

  { name: "Singapore", lat: 1.29, lon: 103.85 },
  { name: "Shanghai", lat: 31.23, lon: 121.49 },
  { name: "Hong Kong", lat: 22.31, lon: 114.17 },

  { name: "Mumbai", lat: 18.96, lon: 72.85 },
  { name: "Nhava Sheva (Jnpt)", lat: 18.95, lon: 72.95 },

  // 🌐 Merged dataset
  { name: "Shakotan", lat: 43.866667, lon: 146.833333 },
  { name: "Mombetsu Ko", lat: 44.35, lon: 143.35 },
  { name: "Charlottetown", lat: 46.233333, lon: -63.133333 },
  { name: "Abashiri Ko", lat: 44.016667, lon: 144.283333 },
  { name: "Nemuro Ko", lat: 43.333333, lon: 145.583333 },
  { name: "Hanasaki Ko", lat: 43.283333, lon: 145.583333 },
  { name: "Kushiro Ko", lat: 42.983333, lon: 144.366667 },
  { name: "Tomakomai Ko", lat: 42.633333, lon: 141.633333 },
  { name: "Muroran Ko", lat: 42.35, lon: 140.966667 },
  { name: "Mori", lat: 42.116667, lon: 140.583333 },

  { name: "Gopalpur", lat: 19.25, lon: 84.916667 },
  { name: "El Ghardaqa", lat: 27.216667, lon: 33.85 },
  { name: "Ras Shukhier", lat: 28.133333, lon: 33.283333 },
  { name: "Ras Gharib", lat: 28.35, lon: 33.1 },

  { name: "Yanbu", lat: 24.083333, lon: 38.05 },
  { name: "Jiddah", lat: 21.483333, lon: 39.183333 },
  { name: "Jizan", lat: 16.9, lon: 42.483333 },

  { name: "Simonstown", lat: -34.183333, lon: 18.433333 },
  { name: "Mossel Bay", lat: -34.183333, lon: 22.15 },
  { name: "Port Elizabeth", lat: -33.966667, lon: 25.616667 },

  { name: "Belfast", lat: 54.616667, lon: -5.9 },
  { name: "Larne", lat: 54.85, lon: -5.8 },
  { name: "Coleraine", lat: 55.133333, lon: -6.666667 },

  { name: "Chicago", lat: 41.883333, lon: -87.6 },
  { name: "Milwaukee", lat: 43.033333, lon: -87.883333 },

  { name: "Masan", lat: 35.183333, lon: 128.566667 },
  { name: "Pusan", lat: 35.1, lon: 129.033333 },
  { name: "Ulsan", lat: 35.45, lon: 129.4 },

  { name: "Wenzhou", lat: 28.016667, lon: 120.65 },
  { name: "Nanjing", lat: 32.083333, lon: 118.75 },

  { name: "Douala", lat: 4.05, lon: 9.683333 },
  { name: "Libreville", lat: 0.383333, lon: 9.45 },

  { name: "Ambon", lat: -3.683333, lon: 128.166667 },
  { name: "Ternate", lat: 0.783333, lon: 127.383333 },

  { name: "Napoli", lat: 40.85, lon: 14.266667 },
  { name: "Cannes", lat: 43.55, lon: 7.016667 },
  { name: "Monaco", lat: 43.733333, lon: 7.416667 },

  { name: "Davao", lat: 7.066667, lon: 125.616667 },
  { name: "Zamboanga", lat: 6.9, lon: 122.066667 },

  { name: "Freetown", lat: 8.5, lon: -13.233333 },
  { name: "Monrovia", lat: 6.316667, lon: -10.816667 },

  { name: "Jakarta", lat: -6.1, lon: 106.883333 },
  { name: "Cirebon", lat: -6.716667, lon: 108.566667 },

  { name: "Cadiz", lat: 36.533333, lon: -6.3 },
  { name: "Sevilla", lat: 37.366667, lon: -6 },

  { name: "Sacramento", lat: 38.583333, lon: -121.5 },
  { name: "Stockton", lat: 37.95, lon: -121.3 },

  { name: "Puerto Vallarta", lat: 20.616667, lon: -105.266667 },
  { name: "Mazatlan", lat: 23.2, lon: -106.416667 },

  // ---- Part 2 ----
  { name: "Topolobampo", lat: 25.6, lon: -109.066667 },
  { name: "Guaymas", lat: 27.916667, lon: -110.916667 },

  { name: "Monhegan", lat: 43.766667, lon: -69.316667 },
  { name: "Port Clyde", lat: 43.916667, lon: -69.25 },

  { name: "Mar Del Plata", lat: -38.033333, lon: -57.533333 },
  { name: "Itajai", lat: -26.916667, lon: -48.633333 },

  { name: "Balikpapan", lat: -1.25, lon: 116.816667 },
  { name: "Samarinda", lat: -0.516667, lon: 117.116667 },

  { name: "Kuching", lat: 1.566667, lon: 110.35 },
  { name: "Sibu", lat: 2.283333, lon: 111.816667 },

  { name: "Palma De Mallorca", lat: 39.566667, lon: 2.633333 },
  { name: "Las Palmas", lat: 28.15, lon: -15.416667 },

  { name: "Benicia", lat: 38.05, lon: -122.15 },
  { name: "Antioch", lat: 38.016667, lon: -121.8 },

  { name: "Bodega Bay", lat: 38.333333, lon: -123.05 },
  { name: "Fort Bragg", lat: 39.45, lon: -123.816667 },

  { name: "Weihai", lat: 37.5, lon: 122.1 },
  { name: "Yantai", lat: 37.55, lon: 121.45 },

  { name: "Inchon", lat: 37.466667, lon: 126.616667 },
  { name: "Mokpo", lat: 34.783333, lon: 126.383333 },

  { name: "Banjul", lat: 13.45, lon: -16.566667 },
  { name: "Conakry", lat: 9.516667, lon: -13.716667 },

  { name: "Luanda", lat: -8.8, lon: 13.25 },
  { name: "Lobito", lat: -12.333333, lon: 13.566667 },

  { name: "Tin Can Island", lat: 6.35, lon: 3.35 },
  { name: "Warri", lat: 5.516667, lon: 5.733333 },
  
    { name: "Hiroshima", lat: 34.35, lon: 132.466667 },
    { name: "Beppu", lat: 33.316667, lon: 131.516667 },
    { name: "Kokura Ko", lat: 33.883333, lon: 130.883333 },
    { name: "Shimonoseki", lat: 33.933333, lon: 130.933333 },
  
    { name: "Ratnagiri", lat: 16.983333, lon: 73.283333 },
    { name: "Trivandrum", lat: 8.483333, lon: 76.95 },
  
    { name: "Guayaquil", lat: -2.2, lon: -79.883333 },
    { name: "Montoir", lat: 47.3, lon: -2.133333 },
  
    { name: "Point San Pablo", lat: 37.966667, lon: -122.433333 },
    { name: "Sausalito", lat: 37.85, lon: -122.483333 },
    { name: "Pinole Point", lat: 38.016667, lon: -122.366667 },
    { name: "Oleum", lat: 38.05, lon: -122.266667 },
    { name: "Mare Island", lat: 38.1, lon: -122.266667 },
    { name: "South Vallejo", lat: 38.083333, lon: -122.25 },
    { name: "Crockett", lat: 38.05, lon: -122.216667 },
    { name: "Port Costa", lat: 38.05, lon: -122.183333 },
  
    { name: "Liepaja", lat: 56.516667, lon: 21.016667 },
    { name: "Klaipeda", lat: 55.716667, lon: 21.116667 },
    { name: "Baltiysk", lat: 54.633333, lon: 19.9 },
    { name: "Kaliningrad", lat: 54.7, lon: 20.483333 },
    { name: "Gdansk", lat: 54.35, lon: 18.666667 },
    { name: "Gdynia", lat: 54.533333, lon: 18.55 },
  
    { name: "Ustka", lat: 54.583333, lon: 16.85 },
    { name: "Kolobrzeg", lat: 54.216667, lon: 15.55 },
    { name: "Swinoujscie", lat: 53.916667, lon: 14.266667 },
    { name: "Szczecin", lat: 53.416667, lon: 14.55 },
  
    { name: "Wolgast", lat: 54.05, lon: 13.783333 },
    { name: "Sassnitz", lat: 54.516667, lon: 13.65 },
  
    { name: "Tallinn", lat: 59.45, lon: 24.766667 },
    { name: "Riga", lat: 56.95, lon: 24.1 },
    { name: "Ventspils", lat: 57.4, lon: 21.533333 },
  
    { name: "Pointe Noire", lat: -4.783333, lon: 11.833333 },
    { name: "Cabinda", lat: -5.533333, lon: 12.2 },
    { name: "Banana", lat: -5.983333, lon: 12.383333 },
  
    { name: "Boma", lat: -5.85, lon: 13.05 },
    { name: "Porto Do Ambriz", lat: -7.833333, lon: 13.1 },
  
    { name: "Namibe", lat: -15.2, lon: 12.15 },
  
    { name: "Georgetown", lat: -7.933333, lon: -14.416667 },
    { name: "Bonny", lat: 4.45, lon: 7.166667 },
  
    { name: "Bissau", lat: 11.866667, lon: -15.633333 },
  
    { name: "Victoria", lat: 10.816667, lon: -14.566667 },
    { name: "Kamsar", lat: 10.633333, lon: -14.616667 },
  
    { name: "Benti", lat: 9.166667, lon: -13.2 },
  
    { name: "Longkou Gang", lat: 37.633333, lon: 120.283333 },
    { name: "Dagu Tanggu", lat: 38.966667, lon: 117.666667 },
  
    { name: "Huludao Gang", lat: 40.7, lon: 120.983333 },
    { name: "Yingkou", lat: 40.683333, lon: 122.233333 },
  
    { name: "Lushun", lat: 38.783333, lon: 121.25 },
  
    { name: "Puerto De Alcudia", lat: 39.833333, lon: 3.133333 },
    { name: "Mahon", lat: 39.883333, lon: 4.266667 },
  
    { name: "Rosas", lat: 42.266667, lon: 3.183333 },
    { name: "Port Vendres", lat: 42.516667, lon: 3.116667 },
  
    { name: "Sete", lat: 43.4, lon: 3.7 },
    { name: "Marseille", lat: 43.316667, lon: 5.366667 },
  
    { name: "Saint Tropez", lat: 43.266667, lon: 6.633333 },
    { name: "Saint Raphael", lat: 43.416667, lon: 6.766667 },
  
    { name: "Antibes", lat: 43.583333, lon: 7.133333 },
    { name: "Nice", lat: 43.7, lon: 7.283333 },
  
    { name: "Villefranche", lat: 43.7, lon: 7.316667 },
    { name: "Bastia", lat: 42.7, lon: 9.45 },
  
    { name: "Bonifacio", lat: 41.383333, lon: 9.166667 },
    { name: "Ajaccio", lat: 41.916667, lon: 8.75 },
  
    { name: "Calvi", lat: 42.566667, lon: 8.75 },
  
    { name: "Olbia", lat: 40.916667, lon: 9.5 },
    { name: "Cagliari", lat: 39.216667, lon: 9.116667 },
  
    { name: "Kota Kinabalu", lat: 5.983333, lon: 116.066667 },
    { name: "Sandakan", lat: 5.833333, lon: 118.116667 },
  
    { name: "Lahad Datu", lat: 5.016667, lon: 118.316667 },
  
    { name: "Tanjung Redeb", lat: 2.15, lon: 117.483333 },
  
    { name: "Benoa", lat: 0.983333, lon: 117.966667 },
  
    { name: "Barranquilla", lat: 10.966667, lon: -74.766667 },
    { name: "Puerto Cristobal", lat: 9.35, lon: -79.916667 },
  
    { name: "Puerto Moin", lat: 10, lon: -83.083333 },
    { name: "Bluefields", lat: 12.016667, lon: -83.75 },
  
    { name: "Tangier Mediterranean", lat: 35.9, lon: -5.516667 },
  
    { name: "Belize City", lat: 17.5, lon: -88.183333 },
  
    { name: "Campeche", lat: 19.85, lon: -90.55 },
    { name: "Frontera", lat: 18.533333, lon: -92.65 },
    
      { name: "Nanchital", lat: 18.066667, lon: -94.416667 },
      { name: "Magdalla", lat: 21.15, lon: 72.75 },
      { name: "Hazira", lat: 21.083333, lon: 72.633333 },
    
      { name: "Shimminato", lat: 36.766667, lon: 137.116667 },
    
      { name: "Santa Clara", lat: -20.883333, lon: -51.366667 },
      { name: "Portocel", lat: -19.85, lon: -40.05 },
    
      { name: "El Tabiazo", lat: 10.766667, lon: -71.533333 },
      { name: "VenterMininals", lat: 10.483333, lon: -68.033333 },
    
      { name: "Cockburn Harbor", lat: 21.5, lon: -71.533333 },
    
      { name: "Risan", lat: 42.516667, lon: 18.7 },
      { name: "Kotor", lat: 42.416667, lon: 18.766667 },
      { name: "Tivat", lat: 42.433333, lon: 18.7 },
      { name: "Bar", lat: 42.083333, lon: 19.083333 },
    
      { name: "Ciudad Bolivar", lat: 8.133333, lon: -63.55 },
    
      { name: "Djeno Terminal", lat: -4.933333, lon: 11.9 },
      { name: "Nkossa Terminal", lat: -5.266667, lon: 11.566667 },
    
      { name: "Matadi", lat: -5.816667, lon: 13.45 },
    
      { name: "Sapele", lat: 5.9, lon: 5.683333 },
      { name: "Yoho Terminal", lat: 4.016667, lon: 7.466667 },
      { name: "Sea Eagle Terminal", lat: 4.8, lon: 5.316667 },
      { name: "Qua Iboe Oil Terminal", lat: 4.233333, lon: 8.033333 },
    
      { name: "Pennington Oil Terminal", lat: 4.25, lon: 5.616667 },
      { name: "Bonny Offshore Terminal", lat: 4.183333, lon: 7.233333 },
    
      { name: "Lomonosov", lat: 59.916667, lon: 29.766667 },
      { name: "Kronshtadt", lat: 59.983333, lon: 29.783333 },
    
      { name: "Reka Luga", lat: 59.666667, lon: 28.316667 },
      { name: "Kunda", lat: 59.533333, lon: 26.533333 },
    
      { name: "Paldiski", lat: 59.35, lon: 24.033333 },
      { name: "Osmussaar", lat: 59.3, lon: 23.366667 },
      { name: "Parnu", lat: 58.383333, lon: 24.5 },
    
      { name: "Oguendjo Terminal", lat: -1.466667, lon: 8.916667 },
      { name: "Gamba Oil Terminal", lat: -2.833333, lon: 10 },
    
      { name: "Malongo Oil Terminal", lat: -5.433333, lon: 12.083333 },
      { name: "Palanca Terminal", lat: -6.95, lon: 12.4 },
    
      { name: "Porto Do Ambriz", lat: -7.833333, lon: 13.1 },
    
      { name: "Banjul", lat: 13.45, lon: -16.566667 },
      { name: "Rio Cacheu", lat: 12.283333, lon: -16.233333 },
    
      { name: "Victoria", lat: 5.283333, lon: 115.233333 },
      { name: "Muara Harbor", lat: 5.033333, lon: 115.066667 },
      { name: "Bandar Seri Begawan", lat: 4.883333, lon: 114.883333 },
    
      { name: "Seria Oil Terminal", lat: 4.616667, lon: 114.316667 },
    
      { name: "Puerto Bolivar", lat: 12.25, lon: -71.966667 },
    
      { name: "Scalloway", lat: 60.133333, lon: -1.283333 },
      { name: "Lerwick", lat: 60.15, lon: -1.15 },
      { name: "Sullom Voe", lat: 60.466667, lon: -1.3 },
    
      { name: "Tvoroyri", lat: 61.55, lon: -6.8 },
      { name: "Torshavn", lat: 62, lon: -6.75 },
      { name: "Klaksvik", lat: 62.233333, lon: -6.583333 },
    
      { name: "Scrabster Harbor", lat: 58.616667, lon: -3.55 },
      { name: "Ullapool", lat: 57.9, lon: -5.15 },
    
      { name: "Aultbea", lat: 57.833333, lon: -5.583333 },
      { name: "Gairloch", lat: 57.716667, lon: -5.683333 },
    
      { name: "Portree Harbor", lat: 57.416667, lon: -6.2 },
    
      { name: "Puerto Miranda", lat: 10.766667, lon: -71.566667 },
      { name: "La Salina", lat: 10.366667, lon: -71.466667 },

        { name: "Puerto Sauce", lat: -34.45, lon: -57.9 },
        { name: "Colonia", lat: -34.466667, lon: -57.85 },
      
        { name: "Montevideo", lat: -34.9, lon: -56.2 },
      
        { name: "Rio De Janeiro", lat: -22.9, lon: -43.2 },
        { name: "Santos", lat: -23.96, lon: -46.33 },
      
        { name: "Paranagua", lat: -25.516667, lon: -48.516667 },
      
        { name: "Buenos Aires", lat: -34.6, lon: -58.37 },
      
        { name: "Callao", lat: -12.05, lon: -77.15 },
      
        { name: "Valparaiso", lat: -33.033333, lon: -71.616667 },
      
        { name: "San Antonio", lat: -33.583333, lon: -71.616667 },
      
        { name: "Puerto Limon", lat: 10, lon: -83.033333 },
      
        { name: "Kingston", lat: 17.966667, lon: -76.8 },
      
        { name: "Havana", lat: 23.133333, lon: -82.35 },
      
        { name: "Veracruz", lat: 19.2, lon: -96.133333 },
      
        { name: "Tampico", lat: 22.25, lon: -97.85 },
      
        { name: "Altamira", lat: 22.4, lon: -97.9 },
      
        { name: "Corpus Christi", lat: 27.8, lon: -97.4 },
      
        { name: "Galveston", lat: 29.3, lon: -94.8 },
      
        { name: "New Orleans", lat: 29.95, lon: -90.066667 },
      
        { name: "Mobile", lat: 30.7, lon: -88.04 },
      
        { name: "Tampa", lat: 27.95, lon: -82.46 },
      
        { name: "Miami", lat: 25.77, lon: -80.13 },
      
        { name: "Jacksonville", lat: 30.32, lon: -81.65 },
      
        { name: "Charleston", lat: 32.78, lon: -79.93 },
      
        { name: "Norfolk", lat: 36.85, lon: -76.29 },
      
        { name: "Baltimore", lat: 39.27, lon: -76.58 },
      
        { name: "Philadelphia", lat: 39.95, lon: -75.14 },
      
        { name: "Boston", lat: 42.36, lon: -71.05 },
      
        { name: "Halifax", lat: 44.65, lon: -63.57 },
      
        { name: "Reykjavik", lat: 64.15, lon: -21.94 },
      
        { name: "Dublin", lat: 53.35, lon: -6.26 },
      
        { name: "Liverpool", lat: 53.41, lon: -2.99 },
      
        { name: "Southampton", lat: 50.9, lon: -1.4 },
      
        { name: "Bremen", lat: 53.08, lon: 8.8 },
      
        { name: "Oslo", lat: 59.91, lon: 10.75 },
      
        { name: "Stockholm", lat: 59.33, lon: 18.07 },
      
        { name: "Helsinki", lat: 60.17, lon: 24.94 },
      
        { name: "Saint Petersburg", lat: 59.93, lon: 30.31 },
      
        { name: "Istanbul", lat: 41.01, lon: 28.97 },
      
        { name: "Izmir", lat: 38.42, lon: 27.14 },
      
        { name: "Alexandria", lat: 31.2, lon: 29.9 },
      
        { name: "Port Sudan", lat: 19.6, lon: 37.22 },
      
        { name: "Mombasa", lat: -4.05, lon: 39.67 },
      
        { name: "Dar Es Salaam", lat: -6.8, lon: 39.28 },
      
        { name: "Maputo", lat: -25.97, lon: 32.58 },
      
        { name: "Durban", lat: -29.87, lon: 31.05 },
      
        { name: "Cape Town", lat: -33.92, lon: 18.42 },
      
        { name: "Colombo", lat: 6.93, lon: 79.85 },
      
        { name: "Karachi", lat: 24.86, lon: 67.01 },
      
        { name: "Chittagong", lat: 22.34, lon: 91.8 },
      
        { name: "Yangon", lat: 16.77, lon: 96.15 },
      
        { name: "Ho Chi Minh City", lat: 10.82, lon: 106.63 },
      
        { name: "Bangkok", lat: 13.75, lon: 100.5 },
      
        { name: "Manila", lat: 14.6, lon: 120.97 },
      
        { name: "Kaohsiung", lat: 22.62, lon: 120.3 },
      
        { name: "Keelung", lat: 25.13, lon: 121.75 },
      
        { name: "Yokohama", lat: 35.45, lon: 139.65 },
      
        { name: "Kobe", lat: 34.69, lon: 135.19 },
      
        { name: "Osaka", lat: 34.69, lon: 135.5 },
      
        { name: "Nagoya", lat: 35.1, lon: 136.9 },
      
        { name: "Vladivostok", lat: 43.11, lon: 131.88 },
      
        { name: "Anchorage", lat: 61.22, lon: -149.9 },
      
        { name: "Honolulu", lat: 21.3, lon: -157.85 },
      
        { name: "Auckland", lat: -36.85, lon: 174.76 },
      
        { name: "Wellington", lat: -41.28, lon: 174.77 }
];





module.exports = ports;