
const dowload = document.querySelector(".dowload");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
const qrContainer = document.querySelector("#qr-code");
const qrText = document.querySelector(".qr-text");
const shareBtn = document.querySelector(".share-btn");
const sizes = document.querySelector(".sizes");
/*const translationBtn = document.createElement("button");
translationBtn.innerHTML = "Translate";
document.body.appendChild(translationBtn);*/


dark.addEventListener("input", handleDarkColor);
light.addEventListener("input", handleLightColor);
qrText.addEventListener("input", handleQRText);
sizes.addEventListener("input", handleSize);
shareBtn.addEventListener("input", handleShare);

const defaultUrl = "https://youtube.com";
let colorLight = "#fff",
    colorDark = "#000",
    text = defaultUrl,
    size = 300;

function handleDarkColor(e){
    colorDark = e.target.value;
    generateQRCode();
}

function handleLightColor(e){
    colorLight = e.target.value;
    generateQRCode();
}

function handleQRText(e){
    const value = e.target.value;
    text = value;
    if (!value){
        text = defaultUrl;
    }
    generateQRCode();
}

async function generateQRCode(){
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: size,
        width: size,
        colorLight,
        colorDark
    })
    dowload.href = await resolveDataUrl();
}

async function handleShare(){
    setTimeout(async () =>{
        try{
            const base64url = await resolveDataUrl();
            const blob = await (await fetch(base64url)).blob();
            const file = new File([blob], "QRCode.png",{
                type: blob.type,
            });
            await navigator.share({
                files: [file],
                title: text,
            });
        }catch (error){
            alert("You browser doesn't support sharing");
        }
        }, 100);
    }

    function handleSize(e){
        size = e.target.value;
        generateQRCode();
    }

    function resolveDataUrl(){
        return new Promise((resolve,reject) => {
            setTimeout(() => {
                const img = document.querySelector("#qr-code img");
                if(img.currentSrc){
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
        });
    }
    generateQRCode();

   //Translation abaixo vai ficar pra depois//
    
    /*translationBtn.addEventListener("click", function () {
        const allText = document.body.innerText;
        translateText(allText, function (translatedText) {
          document.body.innerText = translatedText;
        });
      });
      function translateText(text, callback) {
        const API_KEY = "your_api_key";
        const targetLanguage = "pt";
        const url = `https://translation.googleapis.com/language/translate/v2?q=${text}&target=${targetLanguage}&key=${API_KEY}`;
      }

      {fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const translatedText = data.data.translations[0].translatedText;
      callback(translatedText);
    })
    .catch((error) => console.error(error));
}*/