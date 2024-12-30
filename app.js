const textArea = document.getElementById('text');
const selectLan = document.getElementById('language-options');
const speakButton = document.getElementById('speak');

let userChooseLang;
selectLan.addEventListener('change', (event) => {
  userChooseLang = selectLan.value;
});

const translateText = async (text, lang) => {
  const url = `https://api.mymemory.translated.net/get?q=${text.replace(
    ' ',
    '%20'
  )}&langpair=en|${lang.split('-')[0].toLowerCase()}`;

  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${text.replace(
      ' ',
      '%20'
    )}&langpair=en|${lang.split('-')[0].toLowerCase()}`
  );
  const data = await res.json();
  return data.responseData.translatedText;
};

const generateVoiceOnUserChooseLang = async (texts, lang) => {
  const utternace = new SpeechSynthesisUtterance();

  utternace.lang = userChooseLang;
  utternace.text = texts;
  utternace.pitch = 1;
  utternace.rate = 1;
  utternace.volume = 1;

  console.log(userChooseLang);
  speechSynthesis.speak(utternace);
};

speakButton.addEventListener('click', async (event) => {
  const getText = textArea.value.trim();
  if (getText.length === 0) {
    alert('Please fill the input');
    textArea.value = '';
    return;
  }
  const translated = await translateText(textArea.value, userChooseLang);
  await generateVoiceOnUserChooseLang(translated, userChooseLang);
});
