const header =  document.querySelector('[data-header]');
const openNavSubmenu =  document.querySelector('[data-open-navsubmenu]');
const navSubmenu =  document.querySelector(
'[data-navsubmenu]');
const userMenu = document.querySelector('[data-usermenu]');
const openUserMenu = document.querySelector('[data-open-usermenu]');

const OnWindowScroll = () => {
    if (window.scrollY > 20) {
        header.style.backgroundColor = '#0c0d14';
    }
    else{
        header.style.backgroundColor = 'transparent';
    }
}

const onTouchOpenNavSubmenu = (event) => {
    event.preventDefault()
    navSubmenu.classList.toggle('active')
}

const onTouchOpenUserMenu = (event) => {
    event.preventDefault()
    userMenu.classList.toggle('active')
}


const setListeners = () =>{
    window.addEventListener('scroll', OnWindowScroll); 
    openNavSubmenu.addEventListener('touchstart', onTouchOpenNavSubmenu);

    openUserMenu.addEventListener('touchstart', onTouchOpenUserMenu);
}

const init = () => 
{
    setListeners();
}

export default {
    init
}