var nav = document.querySelector("nav");
var outer = document.querySelector(".nav-modal");
var body = document.querySelector("body");
var navhidden = window.getComputedStyle(nav, null).getPropertyValue("left") == "-300px";

if(navhidden){
  outer.className = "dark-background";
  nav.className = "slide-nav";
}

document.getElementById("bars").addEventListener("click", () => {
  if(window.innerWidth > 800 && !navhidden){
    if(window.getComputedStyle(nav, null).getPropertyValue("display") == "none"){
      nav.style.display = "block";
      document.querySelector(".main-content").style.width = "calc(100% - 300px)";
    } else {
      nav.style.display = "none";
      document.querySelector(".main-content").style.width = "100%";
    }
  } else {
    if(window.getComputedStyle(nav, null).getPropertyValue("left") == "-300px"){
      nav.style.left = "0px";
      outer.style.display = "block";
      body.style.overflow = "hidden";
    } else {
      nav.style.left = "-300px";
      outer.style.display = "none";
      body.style.overflow = "auto";
    }
  }
});
window.onclick = function(event){
  if (event.target == outer) {
    nav.style.left = "-300px";
    outer.style.display = "none";
    body.style.overflow = "auto";
  }
};