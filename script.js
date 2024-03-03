document.addEventListener('DOMContentLoaded', function(){
    function handleAnchorClick(event){
        event.preventDefault();
        window.location.href = event.target.href;
    }

    function handleButtonClick(event){
        console.log('Button clicked!');
    }

    var anchorTags = document.querySelectorAll('a');
    var buttons = document.querySelectorAll('button');

    anchorTags.forEach(function(anchor){
        anchor.addEventListener('click', handleAnchorClick);
    });

    buttons.forEach(function(button){
        button.addEventListener('click', handleButtonClick);
    });
});
