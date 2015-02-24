readyList = []

function onReady(handler) {

	if (!readyList.length) {
		bindReady(function() {
			for(var i=0; i<readyList.length; i++) {
				readyList[i]()
			}
		})
	}

	readyList.push(handler)
}
