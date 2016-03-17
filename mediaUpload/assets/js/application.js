var Vega = Vega || {};
Vega.debugMode = 0;
Vega.Game = {};
Vega.User = {};
    
Vega.log = function(msg)
{
    if(typeof console == 'object')
    {
        window.console.log(msg);
    }
}

Vega.on = function(event, element, callback) {
    /* Used jQuery 1.7 event handler */
    $(element).live(event, function(e) {
        e.preventDefault();
        callback.apply(this, arguments); // Used arguments to fixed error in IE
    });
}

Vega.off = function(event, element) {
    /* Used jQuery 1.7 event handler */
    $(element).die(event);
}

Vega.ajax = function(settings) {
    $.ajax({
        type: settings.type ? settings.type : 'get',
        url: settings.url ? settings.url : '',
        data: settings.data ? settings.data : '',
        dataType: settings.dataType ? settings.dataType : 'json',
        timeout: 10000, // 10 seconds,
        beforeSend: function(xhr, token) {
            token = Vega.User.token ? Vega.User.token : Date();
            xhr.setRequestHeader('Gaba-Ajax-Token', token);
        },
        error : function(jqXHR, textStatus, errorThrown){
            if (Vega.debugMode) {
                console.log('XHR error: ' + textStatus);
                console.log('HTTP error: ' + errorThrown);
            }
            if (settings.error) settings.error.apply(this);
        },
        success: function(data){
            settings.success(data);
            if (Vega.callback) {
                Vega.callback.apply(this);
            }
        }
    });
}

Vega.alert = function($msg) {
    alert($msg);
}

Vega.refresh = function(url, timeout) {
    timeout = typeof(timeout) == 'undefined' ? 0 : timeout;
    return window.setTimeout(function() {
        if (typeof(url) == 'undefined' || url === '') {
            window.location.reload()
        } else {
            window.location = url;
        }
    }, timeout);
}


// var a = Vega.tmpl("Test {data.test}", {test:1});
Vega.tmpl = function(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
        var keys = key.split("."), v = data[keys.shift()];
        for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
        return (typeof v !== "undefined" && v !== null) ? v : "";
    });
}

$(function () {
    'use strict';

    var file_image_upload_tmpl = '<li class ="item sort-item">'+
    '<div class = "thumb-url" href ="javascript:void();">'+
    '<img class="img-thumbnail" data-src="{url}" alt="Xóa File" src="{thumbnail_url}"  style = "height:{preview.height}px;" />'+
    //'<img class="img-rounded" data-src="{url}" alt="Xóa File" src="{thumbnailUrl}"  style = "width:{preview.height}px; height:{preview.height}px;" />'+
    '<span class ="btn btn-danger del-file" data-name = {name} title ="Xóa File">'+
    '<i class ="fa fa-trash-o"></i>'+
    '</span>'+             			
    '</div>'+           
    //'<div class ="title" title ="{name}">{name}</div>'+	
    '<input type ="hidden" name ="FileUpload[{preview.hiden_name}][]" value ="{thumbnail_url}" />'+
    '</li>';

    var media_upload_tmpl = '<li class ="item sort-item">'+
    '<div class = "thumb-url" href ="javascript:void();">'+
    '<img class="img-thumbnail" data-src="{url}" alt="Xóa File" src="{thumbnail_url}"  style = "height:{preview.height}px;" />'+
    //'<img class="img-rounded" data-src="{url}" alt="Xóa File" src="{thumbnailUrl}"  style = "width:{preview.height}px; height:{preview.height}px;" />'+
    '<span class ="btn btn-danger del-file" data-name = {name} title ="Xóa File">'+
    '<i class ="fa fa-trash-o"></i>'+
    '</span>'+ 
    '<input style="margin-top: 5px; display: block; width:100%;" type="text" name="FileUpload[{preview.url_video_name}][]" value ="" placeholder="Nhập url video" />' +                                                 
    '</div>'+           
    //'<div class ="title" title ="{name}">{name}</div>'+   
    '<input type ="hidden" name ="FileUpload[{preview.hiden_name}][]" value ="{thumbnail_url}" />'+
    '</li>';

	
    $('._upload_file').live('click', function(){
        if($(this).attr('rel')=='uploaded'){
            return true;
        }

        $(this).attr('rel','uploaded');
        var $button_upload = $(this);
        var $parent_upload = $button_upload.parents('.file-upload');
        var $type_plugin = $button_upload.parents(".fileinput-button").find('._file_upload_type').val();
		
        var maxItem = $parent_upload.find('ul.thumb li.sort-item').size();
        //alert(maxItem );
        if(maxItem == 8){
            alert('Chỉ được đăng tối đa 8 ảnh.');
            return false;
        }
		
        var parten = /(\.|\/)(jpg|png|jpeg|gif)$/i;
		console.log('Chào các bạn');
        // Select File:
        $button_upload.fileupload({
            url: '/handler/upload-thumbnail/?w='+Vega.Game.upload.width+'&h='+Vega.Game.upload.height,
            dataType: 'json',
            acceptFileTypes: parten,
            //acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
            //acceptFileTypes: /(\.|\/)(png)$/i,
            maxFileSize: 5000000, // 5 MB,
            maxNumberOfFiles: 8,
            imageMinWidth: 200,
            imageMinHeight: 200,
            imageMaxWidth:2000,
            imageMaxHeight:2000,
            messages: {
                maxNumberOfFiles: ' - Lỗi: số lượng file upload không cho phép.',
                acceptFileTypes: ' - Lỗi: định dạng file không đúng.',
                maxFileSize: ' - Lỗi: dung lượng file lớn hơn quy định.',
                minFileSize: ' - Lỗi: dung lượng file nhỏ hơn quy định.',
                imageMinWidth: ' - Lỗi: kích thước ảnh không hợp lệ.'
            },        
            imageCrop: true,            
            done: function (e, data) {
                var file = data.result.files[0];
                console.log(file);
                file.preview = {
                    width: Vega.Game.upload.previewWidth,
                    height: Vega.Game.upload.previewHeight,
                    hiden_name: $parent_upload.data('hidden'), 
                    url_video_name: $parent_upload.data('url-name')
                };
                var tmpl;
                if ($type_plugin === 'image') {
                    tmpl = Vega.tmpl(file_image_upload_tmpl, file);    
                } else {
                    tmpl = Vega.tmpl(media_upload_tmpl, file);  
                }
                
                
                if($parent_upload.data('multiple') != 1){
                    $parent_upload.find('li._add_new_file').hide();
                }            
                $parent_upload.find('li._add_new_file').before(tmpl);
            //$('#FileUpload_icon-delete').val('');
            },
            fileuploadsubmit :function(){
                alert('start');
            },
            progressall: function (e, data) { // Process, init 0%
                var progress = parseInt(data.loaded / data.total * 100, 10);
            // code here
            }
        }).on('fileuploadprocessalways', function (e, data) {
            var index = data.index,
            file = data.files[index];
            if (file.error) {
                console.log('Chào tôi');
                alert(file.error);
            }
        }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
	
    });

    Vega.on('click', '.del-file', function(){
        var $delete = $(this);
        var $parent_upload = $delete.parents('.file-upload');
        //        var $target = $delete.data('target');
        //        if($target != "underfined"){
        //            var $input = $('#FileUpload_'+$parent_upload.data('hidden')+'-delete');
        //            if($input.val() == "")
        //                $input.val($delete.data('target'));
        //            else 
        //                $input.val($input.val()+','+$delete.data('target'));
        //        }else
        //            $.ajax({
        //                url: '/ajax/upload/?file='+$delete.data('name'),
        //                type: 'DELETE',
        //                success: function(data){
        //					
        //                }
        //            });
        $delete.parents('li.item').remove();
        $parent_upload.find('li._add_new_file').show();
    });
});