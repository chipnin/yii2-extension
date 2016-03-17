<?php

/**
 * Description of Gridview File Upload
 *
 * @author NgocTV
 */

namespace extensions\mediaUpload;

use yii\base\Widget;
use yii\web\View;
use \Yii;

class MediaUpload extends Widget
{

    public $id = '';
    public $filename = 'Unknown';
    public $thumb_width = 320;
    public $thumb_height = 240;
    public $preview_width = 128;
    public $preview_height = 96;
    public $files = array();
    public $hiden_name = 'url';
    public $multiple = true;

    public $type = 'image';
    public $url_video_name = 'url_video';

    protected $clientScript = '';

    public function init()
    {
        parent::init();
        $this->publicAssets();
    }

    public function run()
    {
        return $this->render('index', [
            'id' => $this->id, 
            'filename' => $this->filename, 
            'thumb_width' => $this->thumb_width, 
            'thumb_height' => $this->thumb_height, 
            'preview_width' => $this->preview_width, 
            'preview_height' => $this->preview_height, 
            'files' => $this->files, 
            'hiden_name' => $this->hiden_name, 
            'multiple' => $this->multiple, 
            'clientScript' => $this->clientScript, 

            'type' => $this->type, 
            'url_video_name' => $this->url_video_name, 
        ]);
    }

    protected function publicAssets()
    {
        $view = $this->getView();

        $assetManager = Yii::$app->assetManager->publish(dirname(__FILE__) . DS . 'assets');
        $this->clientScript = $assetManager[1];
        //var_dump($this->clientScript);die();
        $view->registerCssFile($this->clientScript . '/css/style.css');
        $view->registerCssFile($this->clientScript . '/css/jquery.fileupload-ui.css');
        $view->registerJsFile($this->clientScript . '/js/jquery-ui.min.js', ["position"=>View::POS_BEGIN]);
        //$view->registerJsFile('http://code.jquery.com/ui/1.10.3/jquery-ui.js');
        $view->registerJsFile($this->clientScript . '/js/jquery.ui.widget.js', ["position"=>View::POS_END]);
        $view->registerJsFile($this->clientScript . '/js/tmpl.min.js', ["position"=>View::POS_END]);
        $view->registerJsFile($this->clientScript . '/js/load-image.min.js', ["position"=>View::POS_END]);
        $view->registerJsFile($this->clientScript . '/js/jquery.iframe-transport.js', ["position"=>View::POS_END]);
        $view->registerJsFile($this->clientScript . '/js/jquery.fileupload.js', ["position"=>View::POS_END]);
        $view->registerJsFile($this->clientScript . '/js/jquery.fileupload-process.js', ["position"=>View::POS_END]);
        $view->registerJsFile($this->clientScript . '/js/jquery.fileupload-image.js', ["position"=>View::POS_END]);
        $view->registerJsFile($this->clientScript . '/js/jquery.fileupload-audio.js', ["position"=>View::POS_END]);
        $view->registerJsFile($this->clientScript . '/js/jquery.fileupload-video.js', ["position"=>View::POS_END]);
        $view->registerJsFile($this->clientScript . '/js/jquery.fileupload-validate.js', ["position"=>View::POS_END]);
        //$view->registerJsFile($this->clientScript . '/js/holder.js', ["position"=>View::POS_END]);
        $view->registerJsFile($this->clientScript . '/js/application.js?v=5', ["position"=>View::POS_END]);

        $js = <<< SCRIPT
        Vega.Game.upload={
            width: $this->thumb_width, height: $this->thumb_height ,
            previewWidth: $this->preview_width , previewHeight: $this->preview_height 
        };                
SCRIPT;
        $view->registerJs($js, View::POS_END);
    }

}

?>
