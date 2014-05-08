$(function(){

    $('.file-button').on('click', function(){

        // Определение переменных
        var fileWrap = $(this).parent('.file-wrap'),
        inputFile  = fileWrap.find('input[type="file"]'),
        button = fileWrap.find('button.file-button'),
        divTxt  = fileWrap.find('div.file-name'),
        deleteFile = $('<span class="delFile">&#215;</a>');

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
            button.text('Выбрать');
            
            $(this).parent().append(deleteFile);

        }).change();


        $(deleteFile).on('click', function(){
            var t = $(this).parent().find('input[type="file"]');
            $(t).replaceWith($(t).clone());
            $(this).parent().find(divTxt).removeClass('select-file').text('Файл не выбран');
            $(this).remove();
        });

    });

});