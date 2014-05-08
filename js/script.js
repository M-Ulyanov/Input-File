$(function(){

    $('.file-button').on('click', function(){

        // Определение переменных
        var fileWrap = $(this).parent('.file-wrap'),
        inputFile  = fileWrap.find('input[type="file"]'),
        button = fileWrap.find('button.file-button'),
        divTxt  = fileWrap.find('div.file-name');

        // Имититация клика по inputFile
        inputFile.click();

        // Есть ли поддержка file Api
        var fileApi = (window.File) ? true : false;

        // По событию change
        $(inputFile).on('change',function(){

            var fileName;

            // True и файл получен
            if(fileApi && inputFile[0].files[0]){
                fileName = inputFile[0].files[0].name;
            }
            else{
                fileName = inputFile.val().split('\\');
                fileName = fileName[fileName.length -1];             
            }

            // Если имя файла не получено
            if(!fileName.length){
                return;
            }

            // Изменяем поле с именем файла и текст на кнопки
            divTxt.addClass('select-file').text(fileName);
            button.text('Изменить');

        }).change();


    });

});