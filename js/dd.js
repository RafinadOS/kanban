(function ()
{
	// "use strict";

	jsDD = {
		objects: [],
		
		currentNode: null,


		registerObjects: function (objNode)
		{
			objNode.addEventListener('mousedown', this.startDrag, false);
		},

		registerDest: function (objDest, piority)
		{

		},

		startDrag: function (e)
		{

			console.log('startDrag');

			e = e || window.event;

			
			this.currentNode = e.currentTarget;
			
			this.start_x = e.clientX;
			this.start_y = e.clientY;
			
			document.addEventListener('mousemove', this.drag, false);
			
		},

		drag: function (e)
		{
			e = e || window.event;
		},

		stopDrag: function ()
		{

		}
	}


})();


