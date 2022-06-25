function initInputDropdown(query,options,triggerVisible=false, triggerElement=null,triggerType="focus",triggerTypeInverse="blur") {
    var element = document.querySelector(query);
    var optionsContainer = document.createElement('div');
    optionsContainer.classList.add("input-dropdown-options-container")
    element.appendChild(optionsContainer)
    var spanOption;
    options.forEach(option => {
        spanOption = document.createElement("span");
        spanOption.classList.add("input-dropdown-option");
        spanOption.innerHTML = option;
        optionsContainer.appendChild(spanOption);
    });
    var optionsElements = optionsContainer.querySelectorAll(".input-dropdown-option")
    if (triggerVisible) {
        optionsContainer.style.visibliliy="hidden";
        optionsContainer.style.opacity=0;
        document.querySelector(triggerElement).addEventListener(triggerType,function(){
            optionsContainer.style.visibliliy="visible";
            optionsContainer.style.opacity=1;
        });
        document.querySelector(triggerElement).addEventListener(triggerTypeInverse,function(){
            optionsContainer.style.visibliliy="hidden";
            optionsContainer.style.opacity=0;
            filterElement.value="";
        });
    }
    return element
}

function initInputDropdownFilter(query,options,filterElement,functionCall,triggerVisible=false, triggerElement=null,triggerType="focus",triggerTypeInverse="blur") {
    var element = document.querySelector(query);
    var optionsContainer = document.createElement('div');
    optionsContainer.classList.add("input-dropdown-options-container")
    element.appendChild(optionsContainer)
    var spanOption;
    options.forEach(option => {
        spanOption = document.createElement("span");
        spanOption.classList.add("input-dropdown-option");
        spanOption.innerHTML = option;
        spanOption.style.display = "none";
        optionsContainer.appendChild(spanOption);
    });
    var optionsElements = optionsContainer.querySelectorAll(".input-dropdown-option")
    if (triggerVisible) {
        optionsContainer.style.visibliliy="hidden";
        optionsContainer.style.opacity=0;
        document.querySelector(triggerElement).addEventListener(triggerType,function(){
            optionsContainer.style.visibliliy="visible";
            optionsContainer.style.opacity=1;
        });
        document.querySelector(triggerElement).addEventListener(triggerTypeInverse,function(){
            optionsContainer.style.visibliliy="hidden";
            optionsContainer.style.opacity=0;
            filterElement.value="";
        });
    }
    filterElement = document.querySelector(filterElement);
    filterElement.addEventListener("keyup",function(){
        var content = filterElement.value.toLowerCase();
        var displayedElements=[];var e,j,check=true;
        for (var i=0; i<optionsElements.length; i++) {
            e = optionsElements[i]
            if (content.length == 0) { e.style.display = "none"; continue }
            textValue=e.querySelector(".input-dropdown-option-text").innerText.toLowerCase();
            j=0;
            while (true) {
                if (j == content.length) { e.style.display = null; displayedElements.push(e); break }
                if (textValue[j] != content[j]) { e.style.display = "none";break }
                j++
            }
        }

        if (displayedElements.length > 5) {
            for (var i=5; i<displayedElements.length; i++) {
                displayedElements[i].style.display="none";
            }
            displayedElements=displayedElements.slice(0,5)
        }

        functionCall();

    });
    return element
}
