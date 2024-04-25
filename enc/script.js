const inputText = document.getElementById('inputText')
const buttonSubmit = document.getElementById('buttonSubmit')

var cryptoCode = {}
var pathCryptoCode
var pathCryptoCodeVerif = false
var textCryptoVerif = false

function readCryptoCode(path){
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
        cryptText(inputText.value)
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
    document.getElementById('encryptedText').value = textCrypt
}

document.getElementById('fileInput').addEventListener('change', function(event) {
    var input = event.target;

    if (input.files && input.files[0]) {
        var file = input.files[0];
        x = file.name.split('.')[1]
        if(x == "cyp"){
            var fileInfo = "Nom du fichier: " + file.name + "<br>" +
                           "Type de fichier: " + "crypto" + "<br>" +
                           "Taille du fichier: " + file.size + " octets";
    
            document.getElementById('fileInfo').innerHTML = fileInfo;
            var path = URL.createObjectURL(file);
            console.log(path);
            pathCryptoCodeVerif = true
            pathCryptoCode = path
            verifGet()
        }
    }
});

function showMessage(message, duration) {
    var messageElement = document.createElement('div')
    document.body.appendChild(messageElement)
    messageElement.classList.add('msg')
    messageElement.innerHTML = message
    setTimeout(function(){
        messageElement.remove()
    }, duration)
}

document.getElementById('copyButton').addEventListener('click', (e)=>{
    console.log('cocuoc')
    document.getElementById('encryptedText').select()
    document.execCommand('copy')
    showMessage('copier', 3000)
})

function sendText(){
    readCryptoCode(pathCryptoCode)
}

inputText.addEventListener('input', (e)=>{
    if(inputText.value.length > 0){
        textCryptoVerif = true
        verifGet()
    }else{
        textCryptoVerif = false
    }
})

function verifGet(){
    if(textCryptoVerif && pathCryptoCodeVerif){
        buttonSubmit.disabled = false
    }
    else{
        buttonSubmit.disabled = true;
    }
}

verifGet()