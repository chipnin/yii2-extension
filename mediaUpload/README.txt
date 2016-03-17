How to use:
- Copy file "UploadHandler.php" in "components" directory into "application/components".
- Static Parrams:
	Yii::$app->params['upload_tmp']
	Yii::$app->params['upload_tmp_url']
- Action Controller:	
    public function actionUploadHandler()
    {
        $upload_handler = new UploadHandler(array(
                    'upload_dir' => Yii::$app->params['upload_tmp'],
                    'upload_url' => Yii::$app->params['upload_tmp_url'],
                    'image_versions' => array(
                        'thumbnail' => array(
                            //'upload_dir' => dirname($this->get_server_var('SCRIPT_FILENAME')).'/thumb/',
                            //'upload_url' => $this->get_full_url().'/thumb/',
                            'crop' => true,
                            'max_width' => 160,
                            'max_height' => 120
                        ),
                    ),
                ));
    }
- Use:
	<?php echo FileUpload::widget([]); ?>