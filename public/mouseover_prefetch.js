$(document).ready(function(){
	var tag = "%c[mouseover_prefetch]%c "
	var logStyle = "color: purple;"
	console.info(tag + "loaded mouseover_prefetch.js", logStyle);
	
	var xhr = new XMLHttpRequest();
			
	// ハンドラの登録.
	xhr.onreadystatechange = function() {
		
		switch ( xhr.readyState ) {
			case 0:
				// 未初期化状態.
				console.info(tag + 'uninitialized!' , logStyle);
				break;
			case 1: // データ送信中.
				console.info(tag + 'loading...', logStyle);
				break;
			case 2: // 応答待ち.
				console.info(tag + 'loaded.', logStyle);
				break;
			case 3: // データ受信中.
				console.info(tag + 'interactive... ' + xhr.responseText.length + ' bytes.', logStyle);
				break;
			case 4: // データ受信完了.
				if( xhr.status == 200 || xhr.status == 304 ) {
					var data = xhr.responseText; // responseXML もあり
					console.info(tag + 'COMPLETE! :' + data, logStyle);
				} else {
					console.info(tag + 'Failed. HttpStatus: ' + xhr.statusText, logStyle);
				}
				xhr.abort(); // 再利用する際にも abort() しないと再利用できないらしい.
				break;
		}
	};
	
	
	
	var listener = function(ev){
		console.info(tag + "target:" + ev.target + " relatedTarget:" + ev.relatedTarget, logStyle);
		console.info(tag + "href = " + ev.target.href, logStyle);
		xhr.open('GET', ev.target.href, true );
		xhr.setRequestHeader( 'Content-Type', 'text/html' );
		// // 
		xhr.send('');
	};

	$('a').each(function(){
		// console.info($(this));
		$(this)[0].addEventListener('mouseover' , listener, false);
	})
});
