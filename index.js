let btn = document.querySelector("button");
let input = document.querySelector("input");
let main = document.querySelector("main");
let i = 0;
let meta = document.querySelector("#meta");
function getResult(callback) {
    fetch(`http://api.alquran.cloud/v1/surah/${input.value}`)
        .then(res => res.json())
        .then(data => callback(data))
}

btn.onclick = () => {
    main.innerHTML = "";
    getResult((result) => {
        let engName = document.createElement("h1");
        engName.innerHTML = "Name: " + result.data.englishName;
        let englishNameTranslation = document.createElement("h1");
        englishNameTranslation.innerHTML = "Translation: " + result.data.englishNameTranslation;
        let numberOfAyahs = document.createElement("h1");
        numberOfAyahs.innerHTML = "Number of Ayahs: " + result.data.numberOfAyahs;
        meta.append(engName);
        meta.append(englishNameTranslation);
        meta.append(numberOfAyahs);
        while (i < result.data.ayahs.length) {
            let card = document.createElement("div");
            card.id = "card";
            let arabic = document.createElement("h1");
            arabic.innerHTML = result.data.ayahs[i].text;
            arabic.id = "arabic";
            let ayah = document.createElement("h1");
            ayah.id = "ayah";
            ayah.innerHTML = result.data.ayahs[i].numberInSurah;
            card.append(arabic);
            card.append(ayah);
            main.append(card);
            i++;
        }
        i = 0;
    });
}