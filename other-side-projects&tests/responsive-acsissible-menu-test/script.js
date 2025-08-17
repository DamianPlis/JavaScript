function updateNavbar() {
    const isSmall = window.matchMedia("(max-width: 750px)").matches
    const hamburgerMenuIcon = document.getElementById("hamburger-menu")
    const PCmenu = document.getElementById("PCmenu")
    const mobileMenu = document.getElementById("mobileMenu")

    if (isSmall) {
        // hamburgerMenuIcon.classList.remove("hide")
        // mobileMenu.classList.remove("hide")

        hamburgerMenuIcon.classList.add("show-icon")
        hamburgerMenuIcon.classList.remove("hide")
        PCmenu.classList.add("hide")
        mobileMenu.classList.add("show-mobile")
        mobileMenu.classList.remove("hide")
        return
    } 
    PCmenu.classList.remove("hide")
    mobileMenu.classList.add("hide")
    hamburgerMenuIcon.classList.add("hide")
    hamburgerMenuIcon.classList.remove("show-icon")


}

function openMenu() {
    const mobileMenu = document.getElementById("mobileMenu")
    const hamburgerMenuIcon = document.getElementById("hamburger-menu")
    const isOpen = mobileMenu.classList.contains("open")

    if (isOpen) {
        hamburgerMenuIcon.setAttribute("aria-expanded", "false")
        mobileMenu.setAttribute("inert", "")
    } else {
        hamburgerMenuIcon.setAttribute("aria-expanded", "true")
        mobileMenu.removeAttribute("inert", "")
    }
    mobileMenu.classList.toggle("open")
}

const navLinks = document.querySelectorAll("#mobileMenu a")
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        openMenu()
    })
});

window.addEventListener("load" , updateNavbar)
window.addEventListener("resize" , updateNavbar)