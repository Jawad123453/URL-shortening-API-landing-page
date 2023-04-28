// and the copy button is not too
const anylink = "https://fontawesome.com"
let mainullink = document.querySelector(".header .contaner > i");
let ulparts = document.querySelector(".header .contaner ul.mainlist");
let mappapp = document.querySelector(".advance .contaner .mainapp");
let maininput = document.querySelector(".advance .contaner .maininput input");
let mainbtn = document.querySelector(".advance .contaner .maininput button");
let wrongp = document.querySelector(".maininput > p");

mainullink.addEventListener("click", function () {
  ulparts.classList.toggle("appear");
})

mainbtn.addEventListener("click", function () {
  if (maininput.value) {
    shortenUrl(maininput.value);
    maininput.value = "";
  } else if(!maininput.value){
    setTimeout(() => {
      wrongp.classList.remove("appear")
      maininput.classList.remove("Wrong");
    }, 3000);
      wrongp.classList.add("appear")
      maininput.classList.add("Wrong");
  }
})

const shortenUrl = async (url) => {
  try {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`);
    if (!response.ok) {
      throw new Error('API request failed');
    }
    const data = await response.json();
    createanoutput(url, data.result.short_link);
  } catch (error) {
    console.error('Error fetching API:', error);
    return '';
  }
};


function createanoutput(maininput,result) {
  let box = document.createElement("div");
  box.classList.add("box");
  let closingdiv = document.createElement("div");
  closingdiv.classList.add("closing");
  closingdiv.innerText = "x";
  box.appendChild(closingdiv);
  let h1 = document.createElement("h1");
  h1.innerText = maininput;
  box.appendChild(h1);
  let boxTranslate = document.createElement("div");
  boxTranslate.classList.add("box-translate");
  let p = document.createElement("p");
  p.innerHTML = result;
  p.value=result
  boxTranslate.appendChild(p);
  let button = document.createElement("button");
  button.classList.add("mainbtn");
  button.innerText = "Copy";
  boxTranslate.appendChild(button);
  box.appendChild(boxTranslate);

  mappapp.appendChild(box);

  button.addEventListener("click", function () {
    setTimeout(() => {
      button.classList.remove("done");
      button.innerText="Copy"
    }, 2000);
    button.innerText="Copy!"
    button.classList.add("done");

    var textArea = document.createElement("textarea");
    textArea.value = p.innerText;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(textArea);
  })

  closingdiv.addEventListener("click", function () {
    closingdiv.parentElement.remove();
  })
}
