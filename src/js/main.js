$(function(){
    $('.main').fullpage({
        verticalCentered:false,
        anchors:['intro','work','skill','code','link','end'],
        menu:true,
        navigation:true
    });

    $('.section_loading').fadeOut(1000);
});
