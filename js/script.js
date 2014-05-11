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
            
            if(document.addEventListener){
                $(this).parent().append(deleteFile);
            }

        }).change();

        // Удаление выбранного файла
        $(deleteFile).on('click', function(){

            // Кешируем this в переменную
            var self = this;

            // Анимиции скрытия и изменения цвет
            $(this).parent().stop(true, true).animate({
                backgroundColor: '#f48475',
            },400).stop(true,true).animate({
                backgroundColor: '#FFF',
            },400);

            $(this).parent().find(divTxt).animate({
                opacity: '0',
            });

            $(this).parent().find(self).animate({
                opacity: '0',
            });

            // Вызовем с задержкой функцию удаления
            setTimeout(function(){
                funcDelete.call($(self));
            }, 600);

        });

        // Функция удаления файла и замены текста
        function funcDelete(){
            var thisFile = $(this).parent().find('input[type="file"]');
            $(thisFile).replaceWith($(thisFile).clone());

            $(this).parent().find(divTxt).removeClass('select-file').text('Файл не выбран');
            $(this).parent().find(divTxt).animate({
                opacity: '1',
            },400)

            $(this).remove();
        }

    });

});