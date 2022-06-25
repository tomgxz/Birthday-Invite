function inputHorizontalResize() {
    this.style.width = "auto";
    this.style.width = (this.scrollWidth+4)+"px"
}

function textAreaResize() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight+4)+"px"
}

function initTextEditor(element,name,classes,spanclasses,getHtml) {
    var content="";
    var inputElement;
    element.addEventListener("click",function(){
        if (this.innerHTML.includes("<input") || selectionActive) { return }
        content=this.innerText;
        if (getHtml) { content=this.innerHTML }
        this.innerHTML = `<input type="text" class="${classes} --${name.replaceAll("_","-")}" name="${name.replaceAll("-","_")}" id="${name.replaceAll("-","_")}" cols=1 value="${content}"></input><div class="${spanclasses} --input-underline --${name.replaceAll("_","-")}-underline"></div>`;
        inputElement=this.querySelector(`#${name.replaceAll("-","_")}`);
        inputElement.focus();
        this.querySelector(".--input-underline").style.opacity=1;
        inputElement.addEventListener("blur",function(){
            content=inputElement.value;
            element.innerHTML = "";
            element.innerText=content;
            if (getHtml) { element.innerHTML=content }
        });
        inputElement.setAttribute("style", "width:" + (inputElement.scrollWidth+4) + "px;overflow-x:hidden;");
        inputElement.addEventListener("input", inputHorizontalResize, false);
    });
}

function initTextAreaEditor(element,name,classes,spanclasses,getHtml) {
    var content="";
    var inputElement;
    element.addEventListener("click",function(){
        if (this.innerHTML.includes("<textarea") || selectionActive) { return }
        content=this.innerText;
        if (getHtml) { content=this.innerHTML }
        this.innerHTML = `<textarea class="${classes} --${name.replaceAll("_","-")}" name="${name.replaceAll("-","_")}" id="${name.replaceAll("-","_")}" rows=5></textarea><div class="${spanclasses} --input-underline --${name.replaceAll("_","-")}-underline"></div>`;
        inputElement=this.querySelector(`#${name.replaceAll("-","_")}`);
        inputElement.textContent=content;
        inputElement.focus();
        this.querySelector(".--input-underline").style.opacity=1;
        inputElement.addEventListener("blur",function(){
            content=inputElement.value;
            element.innerHTML = "";
            element.innerText=content;
            if (getHtml) { element.innerHTML=content }
        });
        inputElement.setAttribute("style", "width:" + (inputElement.scrollWidth+4) + "px;overflow-x:hidden;");
        inputElement.addEventListener("input", inputHorizontalResize, false);
        inputElement.setAttribute("style", "height:" + (this.scrollHeight+4) + "px;overflow-y:hidden;");
        inputElement.addEventListener("input", textAreaResize, false);
        inputElement.style.height=(inputElement.scrollHeight+4) + "px"
    });
}

function setFontsDropdown(fontsDict) {
    console.log(fontsDict["items"])
}

function activateSelection() {
    if (selectionActive) {return}
    var colours = ['#ca4234', '#cec6be', '#6c786e'];
    var i = 0;
    var colors = ["#caffbf","#a2d2ff","#fdffb6","#bdb2ff","#f08080"].sort(() => Math.random() - 0.5);
    var color;
    canEdit.forEach(element => {
      color = colors[i];i++
      element.style.zIndex = 100;
      element.style.background = color;
      element.style.boxShadow = "0px 0px 0px 4px "+color;
      element.style.cursor = "pointer";
      element.addEventListener("click",elementSelected);
    })
    var underlay = document.createElement("div")
    var underlayParent = document.querySelector(".--invite-container")
    underlay.id="js_selection_underlay"
    underlay.style=`opacity:0.5;background-color:#000000;position:absolute;top:0;left:0;right:0;bottom:0;width:${underlayParent.scrollWidth}px;height:${underlayParent.scrollHeight}px;`
    underlayParent.appendChild(underlay)
    elementSelectorBtn.addEventListener("click",deactivateSelection)
    elementSelectorBtn.removeEventListener("click",activateSelection)
    delete underlay
    selectionActive=true;
}

function elementSelected() {
    if (!selectionActive) {return}
    selectedElement=this;
    deactivateSelection();
    selectedElement.setAttribute("data-panel-editing","");
    document.getElementById("element_selector_btn").querySelector(".btn-content").innerText="Deselect Element";
    elementSelectorBtn.addEventListener("click",deselectElement);
    elementSelectorBtn.removeEventListener("click",activateSelection);
    fontSelectionDropdownSearch.removeAttribute("disabled");
    formattingSelectionActive = true;
}

function deselectElement() {
    selectedElement.removeAttribute("data-panel-editing");
    document.getElementById("element_selector_btn").querySelector(".btn-content").innerText="Select Element to Edit";
    elementSelectorBtn.removeEventListener("click",deselectElement);
    elementSelectorBtn.addEventListener("click",activateSelection);
    fontSelectionDropdownSearch.setAttribute("disabled","");
    selectedElement=null;
    formattingSelectionActive=false;
}

function deactivateSelection() {
    if (!selectionActive) {return}
    var underlay = document.getElementById("js_selection_underlay");
    underlay.parentNode.removeChild(underlay);
    canEdit.forEach(element => {
        element.style.zIndex = null;
        element.style.background = null;
        element.style.boxShadow = null;
        element.style.cursor = null;
        element.removeEventListener("click",elementSelected);
    });
    elementSelectorBtn.addEventListener("click",activateSelection)
    elementSelectorBtn.removeEventListener("click",deactivateSelection)
    delete underlay
    selectionActive=false;
}

function fontOptionsListener() {
    fontDropdownOptions = [];
    fontDropdownElement.querySelectorAll(".input-dropdown-option").forEach(e=>{ if (e.style.display != "none") { fontDropdownOptions.push(e) }})
    if (fontDropdownOptions.length == 0) {
       fontDropdownElement.style.visibliliy="hidden";
       fontDropdownElement.style.opacity=0;
    } else {
        fontDropdownElement.style.visibliliy="visible";
        fontDropdownElement.style.opacity=1;
    }
    fontDropdownOptions.forEach(e=>{
        fontName = e.querySelector(".input-dropdown-option-text").innerText.toLowerCase()
        var i=0;var font;var link;
        while (true) {
            if (fonts[i]["family"].toLowerCase() == fontName) { font=fonts[i]; break }
            i++
        }

        if (!(linkedFontFamilies.includes(font["family"]))) {
            link = `https://fonts.googleapis.com/css2?family=${font["family"].replace(" ","+")}:ital,wght@0,100;0,200;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap`

            var linkElement = document.createElement("link");
            linkElement.href=link
            linkElement.rel="stylesheet"
            document.head.appendChild(linkElement)

            linkedFontFamilies.push(font["family"])

            e.style.fontFamily = font["family"];
        }

    })
}

var hasInvitedYou = document.querySelector(".--has-invited-you");
var toName = document.querySelector(".--to-name");
var thePartyIs = document.querySelector(".--the-party-is");
var inviteAddress = document.querySelector(".--invite-address");
var pleaseRsvpTo = document.querySelector(".--please-rsvp-to");
var elementSelectorBtn = document.getElementById("element_selector_btn");
var canEdit = document.querySelectorAll("[data-panel-editable]");
var fontSelectionDropdownSearch = document.getElementById("style_option_font_search");
var fontDropdownItem = `<span class="input-dropdown-option-icon"><i class="faicon fa-regular fa-font-case"></i></span><span class="input-dropdown-option-text">[text]</span>`;
var fonts = fontsDict["items"];
var selectionActive = false;
var formattingSelectionActive = false;
var fontDropdownArray = [];
var linkedFontFamilies = [];
var fontDropdownOptions = [];
var selectedElement, canvasData, fontDropdownElement;

invitees = invitees.replaceAll("\n",",");
invitees = invitees.slice(0,invitees.length).split(",").filter(function(v,i,a){return v != "";});

initTextEditor(hasInvitedYou,"card-has-invited-you","--header --card-text-input","",false);
initTextEditor(toName,"card-to-name","--header --card-text-input","",false);
initTextEditor(thePartyIs,"card-the-party-is","--text --card-text-input","",false);
initTextAreaEditor(inviteAddress,"card-invite-address","--text --card-text-input","",true);
initTextEditor(pleaseRsvpTo,"card-please-rsvp-to","--header --card-text-input","",false);

elementSelectorBtn.addEventListener("click",activateSelection);

fonts.forEach(font => { fontDropdownArray.push(fontDropdownItem.replace("[text]",font["family"])) });

initInputDropdownFilter("#style_option_font",fontDropdownArray,"#style_option_font_search",fontOptionsListener,true,"#style_option_font_search");

fontDropdownElement = document.querySelector("#style_option_font .input-dropdown-options-container");
fontSelectionDropdownSearch.setAttribute("disabled","")

//html2canvas(document.querySelector(".invite-container")).then(function(canvas) {
//    canvasData = canvas.toDataURL("image/png",1);
//    document.body.innerHTML += '<img src="'+canvasData+'"/>';
//});
