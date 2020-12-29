var ActiveID;

$(document).ready(function() {
    $('.sectionmenu ul li a').click(function(event) {
        /* Act on the event */
        $('.sectionmenu ul li a').removeClass('active');
        $(this).addClass('active');
        thisAttrHref = $(this).attr('href');
        thisAttrHrefOffset = $(thisAttrHref).offset().top - 50;
        $('html,body').animate({scrollTop:thisAttrHrefOffset}, 800);
        event.preventDefault();
    });
});

$(window).scroll(function() {
    $('.section_row').each(function() {
        section_rowTop = $(this).offset().top;
        if($(document).scrollTop() > section_rowTop - 100){
            thisOfs = $(this).attr('id');
            $('.section_row').removeClass('active');
            ActiveID = $(this).addClass('active').attr('id');
        }
    });
    $('.sectionmenu ul li').each(function(index, el) {
        thisChildren = $(this).children('a');
        thisChildrenHref = $(this).children('a').attr('href');
        if(thisChildrenHref === '#'+ActiveID){
            $('.sectionmenu ul li a').removeClass('active');
            $(thisChildren).addClass('active')
        }
    });
});