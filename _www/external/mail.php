<?php

	if( !@$_POST ){
		header('HTTP/1.0 417 Expectation failed');
		die();
	}

	require( "PHPMailer/class.phpmailer.php" );

	$data = json_decode(file_get_contents("../strings.json"));

	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->SMTPDebug = 0;
	$mail->Debugoutput = 'html';
	$mail->CharSet = 'UTF-8';
	$mail->Host = 'mail.futuraagencia.com.br';
	$mail->Port = 587;
	$mail->SMTPAuth = true;
	$mail->Username = 'suporte@futuraagencia.com.br';
	$mail->Password = 'Lzp2*8Ek';
	$mail->AddReplyTo( $_POST["mail"], $_POST["name"] );
	$mail->SetFrom( 'suporte@futuraagencia.com.br' , 'Futura Agência' );
	$mail->IsHTML(true);

	$site_name = @$data->global->title ? $data->global->title : $data->website->title;
	$mail->Subject = "Contato através do site {$site_name}";

	$form_mail = @$data->contact->form_mail ? $data->contact->form_mail : $data->website->contact_mail;	
	foreach( $form_mail as $recipient ){
		$mail->AddAddress( $recipient->mail, $recipient->name );
	}

	$message = "Olá!<br/>";
	$message .= "Você recebeu uma nova mensagem de contato através do site <b>{$site_name}</b>.<br/><br/>";
	$message .= "Dados da mensagem:<br/>";

	$fields = @$data->contact->form->fields ? $data->contact->form->fields : $data->pages->contact->form->fields;
	$textarea_title = @$data->contact->form->textarea->title ? $data->contact->form->textarea->title : $data->pages->contact->form->message_field->name;
	foreach( $fields as $key => $field ){
		if( @$_POST["{$field->name}"] ){
			$message .= "<b>" . ( @$field->title ? $field->title : $field->label ) . "</b>: {$_POST["{$field->name}"]}<br/>";
		}
	}
	$message .= "<b>{$textarea_title}</b>: {$_POST["message"]}<br/>";

	$mail->Body = $message;
	$mail->AltBody = $message;

	$ret = $mail->Send();

	$mail->ClearAllRecipients();
	$mail->ClearAttachments();

	header( "Content-Type: application/json" );
	header( "HTTP/1.0 " . ( $ret ? "200 Ok" : "420 Method Failure" ) );

	echo json_encode([]);

?>