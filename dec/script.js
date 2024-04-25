var cryptoCode = {}

function readText(path){
    fetch(path)
      .then(response => response.text())
      .then(text => { 
        console.log(text)
        var dataArray = text.split(',');
        for (var i = 0; i < dataArray.length; i++) {
            var key = dataArray[i].split(':')[0].trim().replace(/['"]+/g, '')
            var value = dataArray[i].split(':')[1].trim().replace(/['"]+/g, '')
            console.log('val : ', key, value)
            cryptoCode[key] = value
        }
        console.log(cryptoCode)
        cryptText("coucou")
    })
      .catch(error => console.error('Erreur lors du chargement du fichier :', error));
}

function cryptText(text){
    var textCrypt = ""
    console.log("___________________________________________________________________")
    console.log(text)
    console.log(text.length)
    for(i = 0; i < text.length; i++){
        console.log(text[i])
        console.log(cryptoCode[text[i]])
        textCrypt += cryptoCode[text[i]]
    }
    console.log(textCrypt)
}

readText("../code/code1.cyp")