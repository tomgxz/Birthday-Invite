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
        if (this.innerHTML.includes("<input")) { return }
        content=this.innerText;
        if (getHtml) { content=this.innerHTML }
        this.innerHTML = `<input type="text" class="${classes} ${name.replaceAll("_","-")}" name="${name.replaceAll("-","_")}" id="${name.replaceAll("-","_")}" cols=1 value="${content}"></input><div class="${spanclasses} input-underline ${name.replaceAll("_","-")}-underline"></div>`;
        inputElement=this.querySelector(`#${name.replaceAll("-","_")}`);
        inputElement.focus();
        this.querySelector(".input-underline").style.opacity=1;
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
        if (this.innerHTML.includes("<textarea")) { return }
        content=this.innerText;
        if (getHtml) { content=this.innerHTML }
        this.innerHTML = `<textarea class="${classes} ${name.replaceAll("_","-")}" name="${name.replaceAll("-","_")}" id="${name.replaceAll("-","_")}" rows=6></textarea><div class="${spanclasses} input-underline ${name.replaceAll("_","-")}-underline"></div>`;
        inputElement=this.querySelector(`#${name.replaceAll("-","_")}`);
        inputElement.textContent=content;
        inputElement.focus();
        this.querySelector(".input-underline").style.opacity=1;
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
        inputElement.style.height=(this.scrollHeight+4) + "px"
    });
}

invitees = invitees.replaceAll("\n",",")
invitees = invitees.slice(0,invitees.length).split(",").filter(function(v,i,a){return v != "";});
var canvasData;

var hasInvitedYou = document.querySelector(".has-invited-you");
var toName = document.querySelector(".to-name");
var thePartyIs = document.querySelector(".the-party-is");
var inviteAddress = document.querySelector(".invite-address");
var pleaseRsvpTo = document.querySelector(".please-rsvp-to");

initTextEditor(hasInvitedYou,"card-has-invited-you","header card-text-input","",false)
initTextEditor(toName,"card-to-name","header card-text-input","",false)
initTextEditor(thePartyIs,"card-the-party-is","text card-text-input","",false)
initTextAreaEditor(inviteAddress,"card-invite-address","text card-text-input","",true)
initTextEditor(pleaseRsvpTo,"card-please-rsvp-to","header card-text-input","",false)

html2canvas(document.querySelector(".invite-container")).then(function(canvas) {
    canvasData = canvas.toDataURL("image/png",1);
    //document.body.innerHTML += '<img src="'+canvasData+'"/>';
});
