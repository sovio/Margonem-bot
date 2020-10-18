// ==UserScript==
// @name         Bot do zarabianiav2"draidy"
// @version      1.7 Alfa
// @description  Bot by Sovio
// @author       Sovio
// @match        *://*/
// @match        https://www.margonem.pl/?task=*
// @grant        none
// ==/UserScript==
//--------------------------Bot made by Sovio----------------------------//

!function(_parseInput) {
    var idleTime = 0;
    var firstTime = true;
    parseInput = function(a, b, c) {
        _parseInput(a, b, c);
        if (firstTime) {
            setInterval(function() {
                idleTime++;
                if (idleTime > 5) {
                    idleTime = 0;
                    window.location.reload();
                }
            }, 1000);
            firstTime = false;
        }
        idleTime = 0;
    }
}(parseInput);

((old) => {
    globalThis.hero.margoMove = (x, y) => old.call(globalThis.hero, x, y);
})(globalThis.hero.searchPath);

//-------------------------------//
(function(_n, data, ut) {
    let dane = {};
    if (localStorage.getItem("sovioheros")) {
        dane = JSON.parse(localStorage.getItem("sovioheros"));
    }
    if (dane) {
        for (let i in dane) {
            if (ut() > dane[i].time) {
                delete dane[i];
            }
        }
    }
    function getTime() {
        let czas = new Date(),
            godzina = czas.getHours(),
            sekunda = czas.getSeconds(),
            minuta = czas.getMinutes();
        if (godzina < 10) godzina = `0${godzina}`;
        if (minuta < 10) minuta = `0${minuta}`;
        if (sekunda < 10) sekunda = `0${sekunda}`;
        return `${godzina}:${minuta}:${sekunda}`;
    }
    function sendToDiscord(lvl, nick, icon, x, y) {
        $.ajax({
            url: data[0],
            type: 'POST',
            data: JSON.stringify({
                'embeds': [{
                    'title': `${hero.nick} · ${hero.lvl}${hero.prof} znalazł herosa`,
                    'color': "14177041",
                    'description': `${nick} (${lvl}lvl)\n${map.name} (${x}, ${y})\n${getTime()}`,
                    'thumbnail': {
                        'url': `http://pandora.margonem.pl${icon}`
                    }
                }],
                content: `Zostałem znaleziony  na mapie ${map.name}`,
                username: nick,
                avatar_url: `http://pandora.margonem.pl${icon}`
            }),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false
        });
    }
    function checkHerosData(id) {
        if (dane[id]) {
            if (ut() > dane[id].time) {
                delete dane[id];
                return true;
            } else {
                return false;
            }
        }
        return true;
    }
    newNpc = function(e) {
        _n.apply(this, arguments);
        for (let i in e) {
            let heros = e[i];
            if (map.mode != 5 && heros.wt > 79 && g.worldname != "experimental" && checkHerosData(heros.id)) {
                dane[heros.id] = {
                    time: ut() + (10 * 60)
                }
                localStorage.setItem("sovioheros", JSON.stringify(dane));
                sendToDiscord(heros.lvl, heros.nick, heros.icon, heros.x, heros.y);
                break;
            }
        }
    }
})(newNpc, ["https://discordapp.com/api/webhooks/711536917425946626/HdISFxTP_uVfg85M-gYf3fiX74Md1XU_PhWOKCv3dnSjMhcCqA58FhVMqAgzUvM0k8qU"], unix_time);

//------------------------------------------------------------//
var url = "https://discordapp.com/api/webhooks/711536917425946626/HdISFxTP_uVfg85M-gYf3fiX74Md1XU_PhWOKCv3dnSjMhcCqA58FhVMqAgzUvM0k8qU";
function pouk(price){
        function Round(n)
{
    var factor = Math.pow(10, 0);
    return Math.floor(n*factor)/factor;
}
         function getTime() {
        let czas = new Date(),
            godzina = czas.getHours(),
            sekunda = czas.getSeconds(),
            minuta = czas.getMinutes();
        if (godzina < 10) godzina = `0${godzina}`;
        if (minuta < 10) minuta = `0${minuta}`;
        if (sekunda < 10) sekunda = `0${sekunda}`;
        return `${godzina}:${minuta}:${sekunda}`;
    }
    var dziesiatkitys = price/10000%10;
    var setkitys = price/100000%10;
    var milion = price/1000000%10;
    var dziesiatkimilionow = price/10000000%10;


fetch(url,{"method":"POST", "headers": {"content-type": "application/json"}, "body": JSON.stringify({
                'embeds': [{
                    'title': `Na postaci ${hero.nick} zarobiłeś ${Round(dziesiatkimilionow)}${Round(milion)}.${Round(setkitys)}${Round(dziesiatkitys)}Milionów (${price})`,
                    'color': "15535116",
                    'description': `o godzinie ${getTime()}`,
                }],
                username: "Tunia",
                avatar_url: `http://pandora.margonem.pl/obrazki/npc/kob/tunia.gif`
            })})
}
 //-------------------------------//
((_parseInput) => {
    window.parseInput = (data, b, c) => {
        if (data.hasOwnProperty("npc") && data.npc !== undefined && window.map.pvp === 2) {
            for (const [id, npc] of Object.entries(data.npc)) {
                if (window.g.npc[id] !== undefined && npc.hasOwnProperty("del") && npc.del === 1) {
                    const {x, y} = window.g.npc[id];

                    if(Math.hypot(window.hero.x - x, window.hero.y - y) > 16){
                        delete data.npc[id];
                    }
                }
            }
        }

        _parseInput(data, b, c);
    }
})(window.parseInput)
 //--------------------------------//

 //-------------------------------//
window.SovioBot = new(function() {
    mAlert = function() {};
    let expowiska = {
        "Draki": {
            map: "Przysiółek Valmirów, Szczerba Samobójców, Żołnierski Korytarz, Szczerba Samobójców, Przysiółek Valmirów, Śnieżycowy Las, Śnieżna Granica, Śnieżycowy Las"
        },
        "Orki": {
            map: "Zburzona Twierdza, Opuszczony Bastion, Podziemne Przejście p.1, Opuszczony Bastion, Zburzona Twierdza, Nawiedzony Jar"
        },
        "Maddoki": {
            map: "Zawodzące Kaskady, Mglista Grota p.1 - sala 1, Przedsionek Mglistej Groty, Mglista Grota p.1 - sala 1, Mglista Grota p.1 - sala 2, Mglista Grota p.2, Mglista Grota - sala wyjściowa, Zawodzące Kaskady, Skryty Azyl, Błotna Grota p.2, Błotna Grota p.1,  Skryty Azyl, Błotna Grota p.1, Błotna Grota p.2, Skryty Azyl, Jaszczurze Korytarze p.1, Jaszczurze Korytarze p.2, Jaszczurze Korytarze p.3 - sala 2, Jaszczurze Korytarze p.3 - sala 1, Skryty Azyl, Jaszczurze Korytarze p.3 - sala 1, Jaszczurze Korytarze p.3 - sala 2, Jaszczurze Korytarze p.4 - sala 2, Jaszczurze Korytarze p.4 - sala 3, Jaszczurze Korytarze p.3 - sala 3, Jaszczurze Korytarze p.4 - sala 3, Jaszczurze Korytarze p.4 - sala 2, Jaszczurze Korytarze p.4 - sala 1, Skryty Azyl, Jaszczurze Korytarze p.4 - sala 1, Jaszczurze Korytarze p.5, Skryty Azyl, Jaszczurze Korytarze p.5, Jaszczurze Korytarze p.4 - sala 1, Jaszczurze Korytarze p.4 - sala 2, Jaszczurze Korytarze p.3 - sala 2, Jaszczurze Korytarze p.2, Grota Jaszczurzej Łuski, Jaszczurze Korytarze p.2, Jaszczurze Korytarze p.1, Skryty Azyl, Złota Dąbrowa, Oślizgłe Przejście - sala 1, Oślizgłe Przejście - sala 2, Złota Dąbrowa, Dolina Pełznącego Krzyku, Złota Dąbrowa, Mglisty Las, Mechata Jama p.1 - sala 2, Mechata Jama p.2, Mechata Jama p.1 - sala 1, Mglisty Las, Jaszczurza Nora, Mglisty Las, Grota porośniętych Stalagmitów - sala wyjściowa, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala boczna, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala główna, Grota Błotnej Magii, Grota porośniętych Stalagmitów - sala główna, Grota porośniętych Stalagmitów - przejście, Grota porośniętych Stalagmitów - sala wyjściowa, Mglisty Las, Złota Dąbrowa, Oślizgłe Przejście - sala 2, Oślizgłe Przejście - sala 1, Złota Dąbrowa, Skryty Azyl"
        },
         "Mobki w katakumbach": {
            map: "Pustynne Katakumby, Pustynne Katakumby - sala 2, Komnaty Bezdusznych - sala 1, Komnaty Bezdusznych - sala 2, Katakumby Odnalezionych Skrytobójców, Korytarz Porzuconych Nadziei, Katakumby Opętanych Dusz, Zachodni Tunel Jaźni, Katakumby Krwawych Wypraw, Wschodni Tunel Jaźni, Katakumby Gwałtownej Śmierci, Komnaty Bezdusznych - sala 2, Komnaty Bezdusznych - sala 1, Pustynne Katakumby - sala 2"
        },
        "Anuraki": {
            map: "Dolina Pełznącego Krzyku, Grzęzawisko Rozpaczy, Zatrute Torfowiska, Gnijące Topielisko, Bagna Umarłych, Urwisko Vapora, Bagna Umarłych, Gnijące Topielisko, Zatrute Torfowiska, Grzęzawisko Rozpaczy"
        },
        "Berki": {
            map: "Zaginiona Dolina, Opuszczona Twierdza, Szuwarowe Trzęsawisko, Czarcie Oparzeliska, Pustelnia Wojownika p.1, Pustelnia Wojownika p.2, Czarcie Oparzeliska, Grobowiec Przodków, Cenotaf Berserkerów p.1, Grobowiec Przodków, Czarcie Oparzeliska, Pustelnia Wojownika p.2, Pustelnia Wojownika p.1, Czarcie Oparzeliska, Szuwarowe Trzęsawisko, Opuszczona Twierdza"
        },
        "Drzewa": {
            map: "Urwisko Zdrewniałych, Wąwóz Zakorzenionych Dusz, Krzaczasta Grota p.2 - sala 1, Krzaczasta Grota p.2 - sala 3, Krzaczasta Grota p.2 - sala 2, Krzaczasta Grota p.2 - sala 3, Krzaczasta Grota p.1 - sala 3, Krzaczasta Grota - sala boczna, Krzaczasta Grota - korytarz, Krzaczasta Grota - sala boczna, Krzaczasta Grota p.1 - sala 3, Krzaczasta Grota p.1 - sala 2, Krzaczasta Grota p.1 - sala 1, Wąwóz Zakorzenionych Dusz, Regiel Zabłąkanych, Źródło Zakorzenionego Ludu, Jaskinia Korzennego Czaru p.2 - sala 1, Jaskinia Korzennego Czaru p.3, Źródło Zakorzenionego Ludu, Jaskinia Korzennego Czaru p.3, Jaskinia Korzennego Czaru p.2 - sala 1, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.1 - sala 3, Jaskinia Korzennego Czaru p.1 - sala 4, Jaskinia Korzennego Czaru p.1 - sala 3, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.1 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 4, Jaskinia Korzennego Czaru p.2 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.2 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 4, Jaskinia Korzennego Czaru p.1 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.2 - sala 1, Źródło Zakorzenionego Ludu, Piaskowa Gęstwina, Piachy Zniewolonych, Piaskowa Gęstwina, Źródło Zakorzenionego Ludu, Jaskinia Korzennego Czaru p.2 - sala 1, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.1 - sala 3, Jaskinia Korzennego Czaru p.1 - sala 4, Jaskinia Korzennego Czaru p.1 - sala 3, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.1 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 4, Jaskinia Korzennego Czaru p.2 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.2 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 4, Jaskinia Korzennego Czaru p.1 - sala 2, Jaskinia Korzennego Czaru p.1 - sala 1, Jaskinia Korzennego Czaru p.2 - sala 1, Źródło Zakorzenionego Ludu, Regiel Zabłąkanych, Wąwóz Zakorzenionych Dusz"
        },
        "Patrycjusze": {
            map: "Krypty Bezsennych p.1, Krypty Bezsennych p.2, Krypty Bezsennych p.2 - przejście - sala 1, Krypty Bezsennych p.2 - przejście - sala 2, Krypty Bezsennych p.2, Krypty Bezsennych p.3, Krypty Bezsennych p.2 - sala 2"
        },
        "mobki na pustyni": {
            map: "Jaskinia Próby, Jaskinia Odwagi, Smocze Skalisko, Urwisko Vapora, Smocze Skalisko, Pustynia Shaiharrud - zachód, Jurta Czcicieli, Jaskinia Szczęk, Pustynia Shaiharrud - zachód, Jaskinia Piaskowej Burzy s.1, Jaskinia Piaskowej Burzy s.2, Namiot Naznaczonych, Namiot Piechoty Piłowej, Pustynia Shaiharrud - zachód, Sępiarnia, Pustynia Shaiharrud - zachód, Namiot Gwardii Smokoszczękich, Pustynia Shaiharrud - zachód, Jaskinia Smoczej Paszczy p.1, Jaskinia Smoczej Paszczy p.2, Pustynia Shaiharrud - zachód, Jaskinia Smoczej Paszczy p.2, Jaskinia Smoczej Paszczy p.1, Jurta Chaegda, Pustynia Shaiharrud - zachód, Pustynia Shaiharrud - wschód, Namiot Błogosławionych, Jaskinia Sępa s.1, Pustynia Shaiharrud - wschód, Namiot Pustynnych Smoków, Pustynia Shaiharrud - wschód, Grota Poświęcenia, Pustynia Shaiharrud - wschód, Jurta Nomadzka, Pustynia Shaiharrud - wschód, Pustynia Shaiharrud - zachód, Skały Umarłych, Pustynia Shaiharrud - zachód, Smocze Skalisko, Jaskinia Odwagi"
        },
        "Piraty": {
            map: "Korsarska Nora - sala 1, Korsarska Nora - sala 2, Korsarska Nora - sala 3, Korsarska Nora - sala 4, Korsarska Nora p.1, Korsarska Nora - przejście 2, Korsarska Nora p.2, Korsarska Nora - przejście 2, Korsarska Nora - przejście 3, Korsarska Nora - przejście 2, Korsarska Nora - przejście 1, Korsarska Nora p.2, Korsarska Nora - przejście 1, Korsarska Nora - przejście 2, Korsarska Nora p.1, Korsarska Nora - sala 4, Korsarska Nora - sala 3, Korsarska Nora - sala 2"
        },
        "Furbole": {
            map: "Zapomniany Las, Rozległa Równina, Wzgórza Obłędu, Rozległa Równina, Dolina Gniewu, Zalana Grota p.1, Zalana Grota p.2, Zalana Grota p.3, Zalana Grota p.2, Zalana Grota p.1, Dolina Gniewu, Terytorium Furii, Zapadlisko Zniewolonych, Terytorium Furii"
        },
        "Mumie": {
            map: "Oaza Siedmiu Wichrów, Ciche Rumowiska, Wioska Rybacka, Ciche Rumowiska, Oaza Siedmiu Wichrów, Płaskowyż Arpan"
        },
        "Czerwone orki": {
            map: "Orcza Wyżyna, Grota Orczych Szamanów, Orcza Wyżyna, Osada Czerwonych Orków, Siedziba Rady Orków, Osada Czerwonych Orków"
        },
        "Wiedzmy": {
            map: "Wiedźmie Kotłowisko, Sabatowe Góry, Tristam, Dom Adariel, Tristam, Magazyn mioteł, Tristam, Dom starej czarownicy, Tristam, Dom nawiedzonej wiedźmy, Tristam, Dom Amry, Tristam, Dom czarnej magii, Tristam, Dom Atalii, Tristam, Opuszczone więzienie, Tristam, Splądrowana kaplica, Tristam, Splugawiona kaplica, Tristam, Ograbiona świątynia, Tristam, Sabatowe Góry"
        },
        "Duchy": {
            map: "Błota Sham Al, Ruiny Tass Zhil, Przeklęty Grobowiec, Tajemne Przejście, Przedsionek Grobowca, Ruiny Tass Zhil"
        },
         "Ogry": {
            map: ""
        },
        "Sekta": {
            map: "Przedsionek Kultu, Tajemnicza Siedziba, Mroczne Komnaty, Przerażające Sypialnie, Mroczne Komnaty, Tajemnicza Siedziba, Lochy Kultu, Sale Rozdzierania, Lochy Kultu, Tajemnicza Siedziba, Sala Tysiąca Świec, Tajemnicza Siedziba"
        },
};
    let way = {
        "Droga na Orki":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów, Ithan, Zniszczone Opactwo, Zburzona Twierdza"},
        "Droga na katakumby":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów, Tuzmer, Port Tuzmer, Wioska Rybacka, Ciche Rumowiska, Oaza Siedmiu Wichrów, Ruiny Pustynnych Burz, Pustynne Katakumby"},
        "Droga na Draki":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Rozlewisko Kai, Przysiółek Valmirów"},
        "Droga na Maddoki":{
        waymap:"Thuzal, Grań Gawronich Piór, Lazurowe Wzgórze, Kwieciste Przejście, Głuchy Las, Zawodzące Kaskady"},
        "Droga na Anuraki":{
        waymap:"Thuzal, Grań Gawronich Piór, Lazurowe Wzgórze, Kwieciste Przejście, Głuchy Las, Zawodzące Kaskady, Skryty Azyl, Złota Dąbrowa, Oślizgłe Przejście - sala 1, Oślizgłe Przejście - sala 2, wayrepet, Dolina Pełznącego Krzyku"},
        "Droga na Berki":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów, Eder, Fort Eder, Mokradła, Dolina Rozbójników, Wioska Ghuli, Zaginiona Dolina"},
        "Droga na Berki przez eder":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Thuzal, wayrepetnyberk, Lazurowe Wzgórze, Słoneczna Wyżyna, Zasłonięte Jezioro, Spokojne Przejście, Eder, Fort Eder, Mokradła, Dolina Rozbójników, Wioska Ghuli, Zaginiona Dolina"},
        "Droga na Drzewa":{
        waymap:"Kwieciste Przejście, Głuchy Las, Skarpa Trzech Słów, Zapomniana Ścieżyna, Liściaste Rozstaje, Las Dziwów, Złowrogie Bagna, Mythar, Urwisko Zdrewniałych"},
        "Droga na Patki":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Krypty Bezsennych - kaplica, Krypty Bezsennych p.1"},
        "Droga na pustynie":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów, Tuzmer, Port Tuzmer, Wioska Rybacka, Ciche Rumowiska, Oaza Siedmiu Wichrów, Ruiny Pustynnych Burz, Złote Szczyty, Smocze Skalisko, wayrepetpus1"},
        "Droga na Piraty":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów, Tuzmer, Port Tuzmer, Latarniane Wybrzeże, Korsarska Nora - sala 1"},
        "Droga na Furbole":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów, Torneg, Zapomniany Las"},
        "Droga na mumie":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów, Tuzmer, Stare Sioło, Sucha Dolina, Płaskowyż Arpan, Oaza Siedmiu Wichrów"},
        "Droga na czerwone orki":{
        waymap:"Thuzal, Grań Gawronich Piór, Lazurowe Wzgórze, Kwieciste Przejście, Złudny Trakt, Orcza Wyżyna"},
        "Droga na wiedzmy":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów, Werbin, Las Goblinów, Upiorna Droga, Wiedźmie Kotłowisko"},
        "Droga na Duchy":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Błota Sham Al"},
        "Droga na Ogry":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów, Nithal, Winnica Meflakasti, Jezioro Ważek, Grota Drążących Kropli p.1, Grota Drążących Kropli p.2, Pachnący Gąszcz, Jezioro Ważek, Las Zadumy, Agia Triada, Tunel pod Skałą p.1"},
        "Droga na sekte":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Gildia Magów, Nithal, Izba chorych płn., Izba chorych płn. - piwnica p.1, Izba chorych płn. - piwnica p.2, Izba chorych płn. - piwnica p.3, Izba chorych - piwniczne przejście, Kanały Nithal, Szlamowe Kanały, Przedsionek Kultu"},
        "Droga driady":{
        waymap:"Kwieciste Przejście, Lazurowe Wzgórze, Grań Gawronich Piór, Thuzal, Rozlewisko Kai"},
    };
    class AStar {
        constructor(collisionsString, width, height, start, end, additionalCollisions) {
            this.width = width;
            this.height = height;
            this.collisions = this.parseCollisions(collisionsString, width, height);
            this.additionalCollisions = additionalCollisions || {};
            this.start = this.collisions[start.x][start.y];
            this.end = this.collisions[end.x][end.y];
            this.start.beginning = true;
            this.start.g = 0;
            this.start.f = heuristic(this.start, this.end);
            this.end.target = true;
            this.end.g = 0;
            this.addNeighbours();
            this.openSet = [];
            this.closedSet = [];
            this.openSet.push(this.start);
        }

        parseCollisions(collisionsString, width, height) {
            const collisions = new Array(width);
            for (let w = 0; w < width; w++) {
                collisions[w] = new Array(height);
                for (let h = 0; h < height; h++) {
                    collisions[w][h] = new Point(w, h, collisionsString.charAt(w + h * width) === '1');
                }
            }
            return collisions;
        }

        addNeighbours() {
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.height; j++) {
                    this.addPointNeighbours(this.collisions[i][j])
                }
            }
        }

        addPointNeighbours(point) {
            const x = point.x,
                y = point.y;
            const neighbours = [];
            if (x > 0) neighbours.push(this.collisions[x - 1][y]);
            if (y > 0) neighbours.push(this.collisions[x][y - 1]);
            if (x < this.width - 1) neighbours.push(this.collisions[x + 1][y]);
            if (y < this.height - 1) neighbours.push(this.collisions[x][y + 1]);
            point.neighbours = neighbours;
        }

        anotherFindPath() {
            while (this.openSet.length > 0) {
                let currentIndex = this.getLowestF();
                let current = this.openSet[currentIndex];
                if (current === this.end) return this.reconstructPath();
                else {
                    this.openSet.splice(currentIndex, 1);
                    this.closedSet.push(current);
                    for (const neighbour of current.neighbours) {
                        if (this.closedSet.includes(neighbour)) continue;
                        else {
                            const tentative_score = current.g + 1;
                            let isBetter = false;
                            if (this.end == this.collisions[neighbour.x][neighbour.y] || (!this.openSet.includes(neighbour) && !neighbour.collision && !this.additionalCollisions[neighbour.x + 256 * neighbour.y])) {
                                this.openSet.push(neighbour);
                                neighbour.h = heuristic(neighbour, this.end);
                                isBetter = true;
                            } else if (tentative_score < neighbour.g && !neighbour.collision) {
                                isBetter = true;
                            }
                            if (isBetter) {
                                neighbour.previous = current;
                                neighbour.g = tentative_score;
                                neighbour.f = neighbour.g + neighbour.h;
                            }
                        }
                    }
                }
            }
        }

        getLowestF() {
            let lowestFIndex = 0;
            for (let i = 0; i < this.openSet.length; i++) {
                if (this.openSet[i].f < this.openSet[lowestFIndex].f) lowestFIndex = i;
            }
            return lowestFIndex;
        }

        reconstructPath() {
            const path = [];
            let currentNode = this.end;
            while (currentNode !== this.start) {
                path.push(currentNode);
                currentNode = currentNode.previous;
            }
            return path;
        }
    }

    class Point {
        constructor(x, y, collision) {
            this.x = x;
            this.y = y;
            this.collision = collision;
            this.g = 10000000;
            this.f = 10000000;
            this.neighbours = [];
            this.beginning = false;
            this.target = false;
            this.previous = undefined;
        }
    }

    function heuristic(p1, p2) {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    }

    function a_getWay(x, y) {
        return (new AStar(map.col, map.x, map.y, {
            x: hero.x,
            y: hero.y
        }, {
            x: x,
            y: y
        }, g.npccol)).anotherFindPath();
    }

    function a_goTo(x, y) {
        let _road_ = a_getWay(x, y);
        if (!Array.isArray(_road_)) return;
        window.road = _road_;
    }



    if (!localStorage.getItem(`Sovio_lastmaps`)) {
        localStorage.setItem(`Sovio_lastmaps`, JSON.stringify(new Array()));
    }

    let self = this;
    let blokada = false;
    let blokada2 = false;
    let $m_id;
    let herolx,
        heroly,
        increment = 0;


    let bolcka = false;
    let start = false;

    g.loadQueue.push({
        fun: () => {
            start = true;
        }
    });

    let deade = true;
    let globalArray = new Array();

    function addToGlobal(id) {
        let npc = g.npc[id];
        if (npc.grp) {
            for (let i in g.npc) {
                if (g.npc[i].grp == npc.grp && !globalArray.includes(g.npc[i].id)) {
                    globalArray.push(g.npc[i].id);
                }
            }
        } else if (!globalArray.includes(id)) {
            globalArray.push(id);
        }
    }

    function chceckBlockade() {
        for (let i in g.npc) {
            let n = g.npc[i];
            if ((n.type == 2 || n.type == 3) && n.wt < 19 && checkGrp(n.id) && hero.lvl + 30 >= n.lvl && Math.abs(hero.x - n.x) < 2 && Math.abs(hero.y - n.y) < 2) {
                return _g(`fight&a=attack&ff=1&id=-${n.id}`);
            }
        }
    }
     function getTime() {
    let czas = new Date(),
      godzina = czas.getHours(),
      sekunda = czas.getSeconds(),
      minuta = czas.getMinutes();
    if (godzina < 10) godzina = `0${godzina}`;
    if (minuta < 10) minuta = `0${minuta}`;
    if (sekunda < 10) sekunda = `0${sekunda}`;
    return `${godzina}:${minuta}:${sekunda}`;
  }

    setInterval(function() {
        if ($m_id) {
            $m_id = undefined;
        }
    }, 4000);
    let $map_cords = undefined;
    this.PI = parseInput;
    parseInput = function(a) {
        let ret = self.PI.apply(this, arguments);
        if (!g.battle && !g.dead && start) {
            if (!$m_id && !bolcka) {
                $m_id = self.findBestMob();
                if (!$m_id && localStorage.getItem(`Sovio_expowiska`)) {
                    let tmp_naj1,
                        tmp_naj2 = 9999;
                }
                blokada2 = false;
                blokada = false;
            }
            if ($m_id) {
                let mob = g.npc[$m_id];
                if (!mob) {
                    $m_id = undefined;
                    return ret;
                }
                if (Math.abs(hero.x - mob.x) < 2 && Math.abs(hero.y - mob.y) < 2 && !blokada) {
                    blokada = true;
                    if (checkGrp(mob.id)) {
                        _g(`fight&a=attack&ff=1&id=-${mob.id}`, function(res) {
                            if (res.alert && res.alert == `Przeciwnik walczy już z kimś innym`) {
                                addToGlobal(mob.id);
                                $m_id = undefined;
                            }
                        });
                    }
                    setTimeout(function() {
                        $m_id = undefined;
                    }, 500);
                } else if (!blokada2 && !blokada) {
                    a_goTo(mob.x, mob.y);
                    blokada2 = true;
                }
            } else if (document.querySelector(`#Sovio_maps`).value.length > 0) {
                $map_cords = self.findBestGw();
                if ($map_cords && !bolcka) {
                    if (hero.x == $map_cords.x && hero.y == $map_cords.y) {
                        _g(`walk`);
                    } else {
                        a_goTo($map_cords.x, $map_cords.y);
                        bolcka = true;
                        setTimeout(function() {
                            bolcka = false;
                        }, 2000);
                    }
                }
            }

            if (heroly == hero.y && herolx == herolx) {
                increment++;
                if (increment > 4) {
                    chceckBlockade();
                    increment = 0;
                    $m_id = undefined;
                    $map_cords = undefined;
                    bolcka = false;
                }
            } else {
                heroly = hero.y;
                herolx = hero.x;
                increment = 0;
            }
        }
 };
    document.addEventListener("keyup", async function (e) {
      if (
        e.target.tagName != "INPUT" &&
        e.target.tagName != "TEXTAREA" &&
        e.which == 90 &&
        !g.battle
      ) {
        if (!g.engineStopped && parseInput !== window.SovioBot.PI) {
          window.SovioBot.copyPI = parseInput;
          parseInput = window.SovioBot.PI;
          a_goTo(hero.x, hero.y);
          message("Bot zatrzymany");
        } else {
          parseInput = window.SovioBot.copyPI;
          message("Bot uruchomiony");
        }
      }
    });
    function checkGrp(id) {
        if (g.npc[id].grp) {
            if (!checke2(g.npc[id].grp)) {
                return false;
            }
        }
        return true;
    }

    function checke2(grpid) {
        for (let i in g.npc) {
            if (g.npc[i].grp == grpid && g.npc[i].wt > 19) {
                return false;
            }
        }
        return true;
    }

    this.findBestMob = function() {
        let b1,
            b2 = 9999,
            id;
        for (let i in g.npc) {
            let n = g.npc[i];
            let xxx;
            let min;
            let max;
            if (document.querySelector(`#Sovio_mobs`).value.indexOf(`-`) > -1) {
                xxx = document.querySelector(`#Sovio_mobs`).value.split(`-`);
                min = parseInt(xxx[0]);
                max = parseInt(xxx[1]);
            }

            if ((n.type == 2 || n.type == 3) && xxx && n.lvl <= max && n.lvl >= min && checkGrp(n.id) && !globalArray.includes(n.id) && n.wt < 20) {
                b1 = a_getWay(n.x, n.y);
                if (b1 == undefined) continue;
                if (b1.length < b2) {
                    b2 = b1.length;
                    id = n.id;
                }
            }
        }
        return id;
    }

    if (!localStorage.getItem(`alksjd`)) {
        localStorage.setItem(`alksjd`, 0);
    }

    this.findBestGw = function() {
        let obj,
            txt = document.querySelector(`#Sovio_maps`).value.split(`, `),
            inc = parseInt(localStorage.getItem(`alksjd`));
              if(map.name == "Rozlewisko Kai"){
                obj = {
                    x: 21,
                    y: 62
                }
                  if(hero.x == 21 && hero.y == 62){_g('talk&id=59358')};}
              if(map.name == "Gvar Hamryd"){

                obj = {
                    x: 24,
                    y: 1
                }
              if(hero.x == 24 && hero.y == 1){_g('talk&id=59356')};
              }

            if (obj) {
                return obj;
            }

        if(o != map.name){
        inc++;
        if (inc > txt.length) {
            inc = 0;
        }}
        localStorage.setItem(`alksjd`, parseInt(inc));
    }

    this.initHTML = function() {
        if (!localStorage.getItem(`Sovio_position`)) {
            let tmpobj = {
                x: 0,
                y: 0
            }
            localStorage.setItem(`Sovio_position`, JSON.stringify(tmpobj));
        }
        let position = JSON.parse(localStorage.getItem(`Sovio_position`));


        let box = document.createElement(`div`);
        box.id = `Sovio_box`;
        box.setAttribute(`tip`, `Przytrzymaj i przeciągnij`);

        let input3 = document.createElement(`input`);
        input3.type = `text`;
        input3.id = `Sovio_value`;
        input3.classList.add(`adi-bot_inputs`);
        input3.setAttribute(`tip`, `Wprowadź ilość mikstur które będzie zakupywał (1 - 12 mikstur)`);
        box.appendChild(input3);

        let input4 = document.createElement(`input`);
        input4.type = `text`;
        input4.id = `Sovio_tp`;
        input4.classList.add(`adi-bot_inputs`);
        input4.setAttribute(`tip`, `Wprowadź ilość teleportów do Tunii które bedzie zakupywał (1 - 5 teleportów)`);
        box.appendChild(input4);

        let input1 = document.createElement(`input`);
        input1.type = `text`;
        input1.id = `Sovio_mobs`;
        input1.classList.add(`adi-bot_inputs`);
        input1.setAttribute(`tip`, `Wprowadz przedział lvl'owy mobów np(20-35)`);
        box.appendChild(input1);

        let input2 = document.createElement(`input`);
        input2.type = `text`;
        input2.id = `Sovio_maps`;
        input2.classList.add(`adi-bot_inputs`);
        input2.setAttribute(`tip`, `Wprowadź nazwy map z expowiskiem`);
        box.appendChild(input2);

        let select = document.createElement(`select`);
        select.id = `adi-bot_list`;
        select.classList.add(`adi-bot_inputs`);
        select.setAttribute(`tip`, `Wybierz expowisko`);
        for (let i = 0; i < Object.keys(expowiska).length; i++) {
            let option = document.createElement(`option`);
            option.setAttribute(`value`, Object.keys(expowiska)[i]);
            option.text = Object.keys(expowiska)[i];
            select.appendChild(option);
        }
        box.appendChild(select);

        let select1 = document.createElement(`select`);
        select1.id = `adi-bot_list`;
        select1.classList.add(`adi-bot_inputs`);
        select1.setAttribute(`tip`, `Wybierz drogę na expowisko`);
        for (let i = 0; i < Object.keys(way).length; i++) {
            let option = document.createElement(`option`);
            option.setAttribute(`value`, Object.keys(way)[i]);
            option.text = Object.keys(way)[i];
            select1.appendChild(option);
        }
        box.appendChild(select1);

        let input5 = document.createElement(`input`);
        input5.type = `text`;
        input5.id = `Sovio_waymaps`;
        input5.classList.add(`adi-bot_inputs`);
        input5.setAttribute(`tip`, `Wprowadź nazwy mapy z drogą do expowiska`);
        box.appendChild(input5);

        let check = document.createElement(`input`);
        check.type = `checkbox`;
        check.id = `sovio_check`;
        check.classList.add(`sovio_check`);
        check.setAttribute(`tip`, `Odpalić na drakach!!!`);
        box.appendChild(check);

        let check1 = document.createElement(`input`);
        check1.type = `checkbox`;
        check1.id = `sovio_check_pat`;
        check1.classList.add(`sovio_check_pat`);
        check1.setAttribute(`tip`, `Odpalić na patrycjuszach/duchach!!!`);
        box.appendChild(check1);

        let check2 = document.createElement(`input`);
        check2.type = `checkbox`;
        check2.id = `sovio_check_ork`;
        check2.classList.add(`sovio_check_ork`);
        check2.setAttribute(`tip`, `Odpalić na Czerwonych orkach!!!`);
        box.appendChild(check2);

        document.body.appendChild(box);

        let style = document.createElement(`style`);
        style.type = `text/css`;
        let css = `
            #Sovio_box {
               position: absolute;
               border: 1px solid #373B3A;
               padding: 5px;
               text-align: center;
               background: linear-gradient(#253609, #DBBA2F);
               cursor: grab;
               left: ${position.x}px;
               top: ${position.y}px;
              width: auto;
               height: auto;
               z-index: 390;
             }
             #Sovio_box:active{
              cursor:grabbing;
             }

                .adi-bot_inputs {
                -webkit-box-sizing: content-box;
                -moz-box-sizing: content-box;
                box-sizing: content-box;
                margin: 0 auto;
                margin-bottom: 3px;
                padding: 2px;
                cursor:text;
                border: 1px solid #6F8B00;
                -webkit-border-radius: 5px;
                border-radius: 5px;
                font: normal 16px/normal "Times New Roman", Times, serif;
                color: black;
                -o-text-overflow: clip;
                text-overflow: clip;
                -webkit-box-shadow:  inset 0px 0px 10px 16px #6F8B00;
                box-shadow: inset 0px 0px 20px 2px #6F8B00;
                text-shadow: 1px 0px 0 #6F8B00 ;
                display: block;
              }
              input[id=Sovio_mobs] {
                  text-align: center;
              }
              input[id=Sovio_value] {
                  text-align: center;
              }
              input[id=Sovio_tp] {
                  text-align: center;
              }
        `;
        style.appendChild(document.createTextNode(css));
        document.head.appendChild(style);


        if (localStorage.getItem(`Sovio_mobs`)) {
            input1.value = localStorage.getItem(`Sovio_mobs`);
        }
        if (localStorage.getItem(`Sovio_maps`)) {
            input2.value = localStorage.getItem(`Sovio_maps`);
        }
        if (localStorage.getItem(`Sovio_value`)) {
            input3.value = localStorage.getItem(`Sovio_value`);
        }
        if (localStorage.getItem(`Sovio_tp`)) {
            input4.value = localStorage.getItem(`Sovio_tp`);
        }
        if (localStorage.getItem(`Sovio_waymaps`)) {
            input5.value = localStorage.getItem(`Sovio_waymaps`);
        }
        if(JSON.parse(localStorage.getItem(`sovio_check`))){
            var checked = JSON.parse(localStorage.getItem(`sovio_check`))
           document.getElementById(`sovio_check`).checked = checked;}

        if(JSON.parse(localStorage.getItem(`sovio_check_pat`))){
            var checked1 = JSON.parse(localStorage.getItem(`sovio_check_pat`))
           document.getElementById(`sovio_check_pat`).checked = checked1;}

         if(JSON.parse(localStorage.getItem(`sovio_check_ork`))){
            var checked2 = JSON.parse(localStorage.getItem(`sovio_check_ork`))
           document.getElementById(`sovio_check_ork`).checked = checked2;}

        if (localStorage.getItem(`Sovio_expowiska`)) {
            if (expowiska[localStorage.getItem(`Sovio_expowiska`)]) {
                select.value = localStorage.getItem(`Sovio_expowiska`);
            }}

        input3.addEventListener(`keyup`, () => {
            localStorage.setItem(`Sovio_value`, input3.value);
        });
        input4.addEventListener(`keyup`, () => {
            localStorage.setItem(`Sovio_tp`, input4.value);
        });
        input1.addEventListener(`keyup`, () => {
            localStorage.setItem(`Sovio_mobs`, input1.value);
        });
        input2.addEventListener(`keyup`, () => {
            localStorage.setItem(`Sovio_maps`, input2.value);
        });
        check.addEventListener(`click`, () => {
            	var checkbox = document.getElementById(`sovio_check`);
                   localStorage.setItem(`sovio_check`, checkbox.checked);
        });
        check1.addEventListener(`click`, () => {
            	var checkbox = document.getElementById(`sovio_check_pat`);
                   localStorage.setItem(`sovio_check_pat`, checkbox.checked);
        });
        check2.addEventListener(`click`, () => {
            	var checkbox = document.getElementById(`sovio_check_ork`);
                   localStorage.setItem(`sovio_check_ork`, checkbox.checked);
        });
        select.addEventListener(`change`, () => {
            localStorage.setItem(`Sovio_expowiska`, select.value);
            input2.value = expowiska[select.value].map;
            localStorage.setItem(`Sovio_maps`, input2.value);
            localStorage.setItem(`alksjd`, 0);
            localStorage.setItem(`o`, 0);
            message(`Zapisano expowisko "${select.value}"`);
        });
               select1.addEventListener(`change`, () => {
            localStorage.setItem(`Sovio_way`, select1.value);
            input5.value = way[select1.value].waymap;
            localStorage.setItem(`Sovio_waymaps`, input5.value);
            message(`Zapisano expowisko "${select1.value}"`);
        });
                input5.addEventListener(`keyup`, () => {
            localStorage.setItem(`Sovio_waymaps`, input5.value);
        });


        $(`#Sovio_box`).draggable({
            stop: () => {
                let tmpobj = {
                    x: parseInt(document.querySelector(`#Sovio_box`).style.left),
                    y: parseInt(document.querySelector(`#Sovio_box`).style.top)
                }
                localStorage.setItem(`Sovio_position`, JSON.stringify(tmpobj));
                message(`Zapisano pozycję`);
            }
        });
    }

        //--------------------------Bot made by Sovio----------------------------//
function wyliczenie(){
    var tab = [];
for(let a in g.item){
if(g.item[a].name == "Duża pomarańczowa mikstura"){
tab.push(a);
}}return tab;}

function fasttp(y){
      let q = document.getElementsByClassName("icon icon LINE_OPTION").length
      let z = document.getElementsByClassName("icon icon LINE_OPTION");
      for(var v = 0;v <= q;){
          if(z[v].innerText == y){
            break;
     }v++}return v;}

function buytp(){
    var a = [];
    for(var p in g.item) {
    if(g.item[p].name == 'Zwój teleportacji na Kwieciste Przejście'){
        a.push(p);
    }}return a.length};

function buypots(){
    var a = [];
    for(var p in g.item) {
    if(g.item[p].name == 'Duża pomarańczowa mikstura'){
        a.push(p);
    }}return a.length}

function tp(){
let m = [];
           let k = document.querySelector(`#Sovio_waymaps`).value.trim().split(`, `);
           for(let baka in k){
            m.push(k[baka]);
            };
            for(let x = 0;x<k.length;){
            if (k[1] == 'Ithan') {
                let p = "Ithan (500 sztuk złota).";
                document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();

            }else if(k[1] == 'Torneg'){
                let p = "Torneg (500 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();

            }else if(k[1] == 'Werbin'){
                let p = "Werbin (500 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();

            }else if(k[1] == 'Karka-han'){
                let p = "Karka-han (500 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();

            }else if(k[1] == 'Nithal'){
                let p = "Nithal (5000 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();

            }else if(k[1] == 'Eder'){
                let p = "Eder (500 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();

            }else if(k[1] == 'Tuzmer'){
                let p = "Trupia Przełęcz [Tuzmer] (5000 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();
              }
            k.shift();
            }};

    function backif(){

let m = [];
           let k = document.querySelector(`#Sovio_waymaps`).value.trim().split(`, `);
           for(let baka in k){
            m.push(k[baka]);
            };
            for(let x = 0;x<k.length;){
            if (k[0] == 'Ithan') {
                let p = "Ithan (500 sztuk złota).";
                document.getElementsByClassName("icon icon LINE_OPTION")[0].click();
                setInterval(function(){document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();},500)

            }else if(k[0] == 'Torneg'){
                let p = "Torneg (500 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[0].click();
                setInterval(function(){document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();},500)

            }else if(k[0] == 'Werbin'){
                let p = "Werbin (500 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[0].click();
                setInterval(function(){document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();},500)

            }else if(k[0] == 'Karka-han'){
                let p = "Karka-han (500 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[0].click();
                setInterval(function(){document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();},500)

            }else if(k[0] == 'Nithal'){
                let p = "Nithal (5000 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[0].click();
                setInterval(function(){document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();},500)

            }else if(k[0] == 'Eder'){
                let p = "Eder (500 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[0].click();
                setInterval(function(){document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();},500)

            }else if(k[0] == 'Thuzal'){
                let p = "Thuzal (5000 sztuk złota)."
                   document.getElementsByClassName("icon icon LINE_OPTION")[0].click();
                setInterval(function(){document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();},500)

            }else if(k[0] == 'Tuzmer'){
                let p = "Trupia Przełęcz [Tuzmer] (5000 sztuk złota)."
                document.getElementsByClassName("icon icon LINE_OPTION")[0].click();
                setInterval(function(){document.getElementsByClassName("icon icon LINE_OPTION")[fasttp(p)].click();},500)
              }
            k.shift();
            }
}

    function sell(){
       var a = ['Duża pomarańczowa mikstura',
         'Zwój teleportacji na Kwieciste Przejście',
         'Kamień teleportujący do Ithan',
         'Kamień teleportujący do Thuzal',
         'Kamień teleportujący do Werbin',
         'Kamień teleportujący do Mythar',
         'Kamień teleportujący do Tuzmer',
         'Kamień teleportujący do Karka-han',
         'Kamień teleportujący do Eder',
         'Kamień teleportujący do Nithal',
         'Kamień teleportujący do Torneg',
         'Pióro z Karka-han',
         'Talizman trzeźwienia VI',
         'Galop za doświadczeniem',
         'Zaklęte serce czarodziejki',
         'Błogosławieństwo leśnej przyjaciółki',
         'Męstwo nieugiętego rycerza',
         'Aura szybkiego pomocnika',
         'Kamienna łuska'];
       var granice = [
		[-1, 166],
		[197, 364],
		[395, 562]];
       var x = []
       var price = 0;
   for(let i in g.item){
   if ($("#item" + i).parent().attr('id') == "bag"){
       var list = a.some(function(operative){
           return operative == [g.item[i].name];});
       if(list == false){
   var topp = parseInt($("#item" + i).css("top").slice(0, -2));
	if (((topp > granice[0][0]) && (topp < granice[0][1])) || ((topp > granice[1][0]) && (topp < granice[1][1])) || ((topp > granice[2][0]) && (topp < granice[2][1]))){
        x.push(i);
        let item = g.item[i].pr;
        let price1 = item * 0.7;
        price = price + price1;
        price = Round(price);
    }}
   }
   }pouk(price);return x;}

    function Round(n)
{
    var factor = Math.pow(10, 0);
    return Math.round(n*factor)/factor;
}

    setInterval(function(){
       if((((g.bags[0][1] == g.bags[0][0]) && (g.bags[1][0] == g.bags[1][1]) && (g.bags[2][1] == g.bags[2][0])) || (wyliczenie().length == 0)) && (map.name != 'Kwieciste Przejście') && (map.name != 'Dom Tunii')){
    for(var i in g.item) {
    if(g.item[i].name == 'Zwój teleportacji na Kwieciste Przejście'){
      var item = g.item[this.g.item[i].id];
     _g("moveitem&st=1&id=" + item.id);
        break;
    }}
    }},2000)

setInterval(function(){
    if((((g.bags[0][1] == g.bags[0][0]) && (g.bags[1][1] == g.bags[1][0]) && (g.bags[2][1] == g.bags[2][0])) || (wyliczenie().length == 0) || (buytp() == 0)) && (map.name == 'Kwieciste Przejście')){
    a_goTo(20,17);
   if (hero.x == 20 && hero.y == 17) {
          _g(`walk`);}
    }},100)

setInterval(function(){
    if(((g.bags[0][1] == g.bags[0][0]) || (wyliczenie().length == 0) || (buytp() == 0)) && (map.name == 'Dom Tunii')){
    a_goTo(8,9);
    }},1000)

setTimeout(function(){
    if((hero.x == 8) && (hero.y == 9) && (map.name == 'Dom Tunii') && (g.bags[0][1] == g.bags[0][0]) || (buytp() == 0) || (wyliczenie.length == 0) && (g.talk.dialogCloud == null)){
    _g('talk&id=16366')
    }},6000)


    setTimeout(function(){
    if((hero.x == 8) && (hero.y == 9) && (map.name == 'Dom Tunii') && (g.bags[0][1] == g.bags[0][0]) || (wyliczenie.length == 0)){
    document.getElementsByClassName("icon icon LINE_SHOP")[0].click();
    }},7000)

//---------------Sprzedawanie u tunii------------------------//

    setInterval(function(){
        if(g.shop.id == 16366 && (hero.x == 8) && (hero.y == 9)){
        var z = sell();
       _g("shop&sell="+ z.toString());
        setTimeout(function(){document.getElementById("shop_accept").click();},1000)
        setTimeout(function(){shop_close(); g.shop = 0;},4000)
        }},8000)
//--------------------Kupowanie mixow----------------------------//
setTimeout(function(){
    for(var i in g.item) {
    if(g.item[i].name == 'Duża pomarańczowa mikstura'){
     var z = localStorage.getItem(`Sovio_value`);
     var item = g.item[this.g.item[i].id];
        z = (z - buypots())+1;
        for(var x = 1; x <= z;){
     document.getElementById("item" + item.id).click();x ++;}
        break;}}},7500)
//--------------------Kupowanie tepow-----------------------------//
setTimeout(function(){
    if(buytp() <= 1){
    for(var i in g.item){
    if(g.item[i].name == 'Zwój teleportacji na Kwieciste Przejście'){
     var item = g.item[this.g.item[i].id];
       var z = localStorage.getItem(`Sovio_tp`);
        for(var x = 1; x <= z;){
     document.getElementById("item" + item.id).click();x ++;}
        break;}}}},8000)

//-----------------------------------------------------------------//

setInterval(function(){if((g.bags[0][1] != g.bags[0][0]) && (map.name == 'Dom Tunii') && (g.shop == 0)){
    a_goTo(9,12);
    }},2000)
    function checkAdult(i) {
  return i != map.name;
}
    //------------chodzenie po mapach by Sovio-------------------//
    setInterval(function(){
           var kmap = document.querySelector(`#Sovio_waymaps`).value.trim().split(`, `);
           var kmap1 = document.querySelector(`#Sovio_maps`).value.trim().split(`, `);
       if(((g.bags[0][1] != g.bags[0][0]) || (g.bags[1][1] != g.bags[1][0]) || (g.bags[2][1] != g.bags[2][0])) && (wyliczenie().length != 0) && (buytp() != 0)){
        for(let x = 0;x<kmap.length;){
        if(kmap.length == 1){delete kmap;break;}else{
        //----------------Dodatkowe ustawienia--------------------//
        if(document.querySelector(`#sovio_check_pat`).checked){a_goTo(50,63);}
        if((kmap[3] == "wayrepet") && (map.name == kmap[0])){a_goTo(0,57);}
        if((kmap[0] == "wayrepetnyberk") && (kmap[1] == "Lazurowe Wzgórze") && (map.name == "Grań Gawronich Piór")){a_goTo(34,63);}
        if((kmap[2] == "wayrepetnyberk") && (kmap[0] == "Lazurowe Wzgórze") && (kmap[0] == map.name)){a_goTo(95,18); if (hero.x == 95 && hero.y == 18){_g(`walk`);}}
        if((map.name == "Smocze Skalisko") && (kmap[1] == "wayrepetpus1")){(a_goTo(30,50))}
        //--------------------------------------------------------//
        if(map.name == kmap[0]){
        //----------------Dodatkowe ustawienia--------------------//
            if((kmap[1] == "wayrepetnyberk") && (map.name == "Thuzal")){a_goTo(49,63);}
           if(kmap[1] == "wayrepet"){
          window.SovioBot.copyPI = parseInput;
          parseInput = window.SovioBot.PI;
          a_goTo(11,33);break;}
        //--------------------------------------------------------//
        for(let i in g.townname){
        if (kmap[1] == g.townname[i].replace(/ +(?= )/g, '')) {
        let c = g.gwIds[i].split(`.`);
          window.SovioBot.copyPI = parseInput;
          parseInput = window.SovioBot.PI;
            a_goTo(c[0], c[1]);
       if (hero.x == c[0] && hero.y == c[1]) {
          _g(`walk`);
       }
        }
        };
        break;
       }
        kmap.shift();

        }}
}},100)
    //-----------------tp by Sovio----------------------//
setInterval(function(){
    let f = document.querySelector(`#sovio_check`);
    let n = document.querySelector(`#sovio_check_ork`)
    if((f.checked==false) && (n.checked == false)){
     if((map.name == "Gildia Magów") && (f.checked == false) && (n.checked == false)){
    a_goTo(18,14);
         window.SovioBot.copyPI = parseInput;
          parseInput = window.SovioBot.PI;
    if((hero.x == 18) && (hero.y == 14) && (g.talk.dialogCloud == null)){
        _g('talk&id=59861');}
        if((hero.x == 18) && (hero.y == 14)){
            tp();
}}}else if(((f.checked == true) || (n.checked == true)) && (map.name == "Gildia Magów")){
     a_goTo(18,22);
}else if((map.name == "Ithan") && (f.checked == true)){
    a_goTo(56,27);
    if((hero.x == 56) && (hero.y == 27) && (g.talk.dialogCloud == null)){
        _g('talk&id=44099');}
            backif();
     }else if((map.name == "Nithal") && (n.checked == true)){
     a_goTo(56,41);
      if((hero.x == 56) && (hero.y == 41)){
           _g('talk&id=18951');
            backif();
     }}},1000)

    setInterval(function(){
        if(map.name == "Trupia Przełęcz"){
            _g('talk&id=32691');
        setTimeout(function(){document.getElementsByClassName("icon icon LINE_OPTION")[12].click(); },500)}

    },1000)
 //-----------------------fight webhook-----------------------//
   function pvpinfo(info){

fetch(url,{"method":"POST", "headers": {"content-type": "application/json"}, "body": JSON.stringify({
                'embeds': [{
                    'title': `${info}`,
                    'color': "15132188",
                    'description': `o godzinie ${getTime()}`,
                }],
            })})
}
    function pvpwin(nick){
fetch(url,{"method":"POST", "headers": {"content-type": "application/json"}, "body": JSON.stringify({
                'embeds': [{
                    'title': `Wygrałeś z ${nick} !!!`,
                    'color': "7730947",
                    'description': `o godzinie ${getTime()}`,
                }],
            })})
}
        function pvplose(nick){
fetch(url,{"method":"POST", "headers": {"content-type": "application/json"}, "body": JSON.stringify({
                'embeds': [{
                    'title': `Przegrałeś z ${nick} !!!`,
                    'color': "15421662",
                    'description': `o godzinie ${getTime()}`,
                }],
            })})
}
    setInterval(function(){
            function checkAdult(i) {
  return i == 0;
}
    var v = [];
    if(g.battle != 0){
    for(var i in g.battle.f){if(g.battle.f[i] != 0){v.push(g.battle.f[i].npc)}}
    if(v.every(checkAdult) && localStorage.getItem(`informacja`) == 0){localStorage.setItem(`informacja`,1);pvpinfo(g.battle.forumLog[0].replace(/b|\/b|[|]/gi,"*"))}
    for(var p in g.battle.f){if(g.battle.f[p] != 0){if(g.battle.f[p].name != hero.nick){localStorage.setItem(`name`,g.battle.f[p].name)}}}
    for(var o in g.battle.log){if((g.battle.log[o] == "0;0;winner="+ hero.nick) && (v.every(checkAdult))){localStorage.setItem(`informacja`,0);pvpwin(localStorage.getItem(`name`))}}
    for(var b in g.battle.log){if((g.battle.log[b] == "0;0;loser="+ hero.nick) && (localStorage.getItem(`pvplose`) == 0) && (v.every(checkAdult))){localStorage.setItem(`pvplose`,1); pvplose(localStorage.getItem(`name`));}}
    if(g.battle == 0){}
    }},75)
//--------------------------------------------------------------------------------//
     //---------------------security------------------------------------//
    var ptable = []
var time = 0
    setTimeout(function(){
    function x(){
        setTimeout(function(){
        if(time < 200){
       if(((hero.x == ptable[0] && hero.y == ptable[1]) || ptable == 0) && g.dead != true){
       ptable.push(hero.x);ptable.push(hero.y)
           x();
           time++;
       }else{
           ptable.length = 0;
           x();
           time = 0;
       }}},1000)}x();},1000)
    setInterval(function(){if(time == 200){
    for(var i in g.item) {
    if(g.item[i].name == 'Zwój teleportacji na Kwieciste Przejście'){
      var item = g.item[this.g.item[i].id];
     _g("moveitem&st=1&id=" + item.id);
        break;
    }}}},1000)
   //-----------------------------------------------------------------------//


    setInterval(function(){ if((g.dead == true)&&(g.battle != 0)){
    canLeave();
    setTimeout(function(){localStorage.setItem(`informacja`,0); localStorage.setItem(`pvplose`,0)},300)
    }},600)

setInterval(function(){if((map.name == "Ithan") || (map.name == "Thuzal") || (map.name == "Tuzmer") || (map.name == "Kwieciste Przejście") || (map.name == "Eder") || (map.name == "Mythar") || (map.name == "Karka-han") || (map.name == "Werbin") || (map.name == "Nithal") || (map.name == "Torneg")){localStorage.setItem(`o`,0); localStorage.setItem(`alksjd`,0); localStorage.setItem(`informacja`,0); localStorage.setItem(`pvplose`,0);}},2000)

    //----------------------------------------//
    this.initHTML();
})()