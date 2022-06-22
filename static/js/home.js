function textAreaResize() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight+4)+"px"
}

document.querySelectorAll(".large-text-input").forEach(o => {
    o.setAttribute("style", "height:" + (o.scrollHeight+4) + "px;overflow-y:hidden;");
    o.addEventListener("input", textAreaResize, false);
})
