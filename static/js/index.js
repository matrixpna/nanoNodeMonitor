var template;

init.push(function(){
    $.get('templates/index.hbs', function (data) {
        template=Handlebars.compile(data);

        setInterval(updateStats, GLOBAL_REFRESH * 1000);
        updateStats();
    }, 'html');
});

function updateStats(){
    $.get('api.php')
    .done(function (apidata) {
        $('#content').html(template(apidata));
        new ClipboardJS('#copyAccount');
    })
    .fail(function (apidata) {
        $('#content').html(apidata.responseText);
        console.log('FAIL', apidata.responseText);
    });
}