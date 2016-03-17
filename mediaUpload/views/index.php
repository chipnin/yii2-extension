<div <?php if($id != '') echo "id = '{$id}'"; ?> class ="file-upload" data-multiple ="<?php echo $multiple; ?>" data-hidden ="<?php echo $hiden_name; ?>" data-url-name ="<?php echo $url_video_name; ?>">
    <ul class ="thumb <?php if ($multiple) echo "sortable"; ?> mgleft">
        <?php if (count($files) > 0): ?>
            <?php foreach ($files as $key => $file): ?>
                <li class ="item sort-item">
                    <div class ="thumb-url" href ="javascript:void();">
                        <?php if (isset($file['thumb_url']) && $file['thumb_url'] != ''): ?>
                            <img class="img-thumbnail" style="height:<?php echo $preview_height; ?>px;" data-src="<?php echo isset($file['thumb_url']) ? $file['thumb_url'] . '?v=' . time() : ''; ?>" alt="Xóa File" src="<?php echo $file['thumb_url']; ?>"/>
                        <?php else: ?>
                            <img class="img-thumbnail" style="height:<?php echo $preview_height; ?>px;" data-src="holder.js/<?php echo $preview_width; ?>x<?php echo $preview_height; ?>" alt="Xóa File" src="" />
                        <?php endif; ?>

                        <span class ="btn del-file" title ="Xóa File" data-target ="<?php echo $key; ?>">
                            <i class="fa fa-trash-o"></i>
                        </span> 
                        <?php if ($type == 'video') : ?>
                            <input style="margin-top: 5px; display: block; width:100%;" type="text" name="FileUpload[<?php echo $url_video_name; ?>][]" value ="<?php echo $file['video_url']; ?>" placeholder="Nhập url video" />                           
                        <?php endif; ?>
                    </div>
                    <input type ="hidden" name ="FileUpload[<?php echo $hiden_name; ?>][]" value ="<?php echo $file['thumb_url']; ?>" />
                </li>
                <?php if (!$multiple) break; ?>
            <?php endforeach; ?>
        <?php endif; ?>
        <li class ="item _add_new_file" style ="display: <?php echo!$multiple && count($files) > 0 ? 'none' : 'inline-block'; ?>; <?php if ($multiple) echo "position: relative;"; ?>">
            <img class="img-thumbnail" style="width:<?php echo $preview_width; ?>px" data-src="holder.js/<?php echo $preview_width; ?>x<?php echo $preview_height; ?>" alt="Upload File" src="<?php echo $clientScript.'/img/140.png'?>" />
            <!-- The fileinput-button span is used to style the file input field as button -->
            <span class="btn btn-success fileinput-button">
                <i class="fa fa-plus"></i>       
                <!-- The file input field used as target for the file upload widget -->
                <input class ="_upload_file" type="file" name="files" >
                <input type="hidden" class="_file_upload_type" value="<?php echo $type; ?>" />
            </span>
        </li>
    </ul>
    <?php //echo CHtml::hiddenField("FileUpload[$hiden_name-delete]", ''); ?>
</div>

<?php if ($multiple): ?>
    <script>
        $( ".sortable" ).sortable({
            items: '.sort-item'               
        });
    </script>
<?php endif; ?>