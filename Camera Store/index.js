const header = document.querySelector('header');
const sectionOne = document.querySelector('.home-intro');

var sectionOneOptions = { 
    rootMargin: "-200px 0px 0px 0px"
 };

const sectionOneObserver = new IntersectionObserver(function(entries, sectionOneObserver){

    entries.forEach(entry => {
        if(!entry.isIntersecting){
            header.classList.add('nav-scrolled');
        }else{
            header.classList.remove('nav-scrolled');
        }
    })

}, sectionOneOptions);

if(sectionOne != null){
    sectionOneObserver.observe(sectionOne);
}else{
    const sectionOne = document.querySelector('.login_section');
    sectionOneObserver.observe(sectionOne);
}