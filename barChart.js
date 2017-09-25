var xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		if (this.status == 200) {
			
			var response = JSON.parse(xhttp.responseText);
			var data = response.data;
			
			var color = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
			var x = -0.25;
			
			var scene = document.querySelector('a-scene');
			
			var title = document.createElement('a-text');
					title.setAttribute('value', "Temperature");
					title.setAttribute('position', {x:-0.65, y:0.05, z:0});
					title.setAttribute('rotation', '-90 90 0');
					title.setAttribute('scale', '0.5 0.5 0.5');
					scene.appendChild(title);
				
			for(var n = 0; n < data.length; n++){	 
				
				var chart_scale = (data[n].temp)*(-0.01);
				
				var max = data[0].temp;
				
				if (data[n].temp > max){
				  max = data[n].temp;
				 }
				
				var chart = document.createElement('a-box');
					chart.setAttribute('color', color[n]);
					chart.setAttribute('position', {x:x, y:0, z:chart_scale/2});
					chart.setAttribute('width', '0.1');
					chart.setAttribute('height', '0.1');
					chart.setAttribute('depth' , chart_scale);
					chart.setAttribute('material', 'opacity: 0.8;');
					scene.appendChild(chart);
				
				for (var i = 0; i < max+10; i += 10){ 
					
					var axis = document.createElement('a-box');
						axis.setAttribute('position', {x:-0.35, y:0.02, z:i*(-0.005)-0.05});
						axis.setAttribute('width', '0.01');
						axis.setAttribute('height', '0.01');
						axis.setAttribute('depth', (i*(-0.01))-0.1);
						scene.appendChild(axis);
					
					if(i > 0){
						var value_indicator = document.createElement('a-box');
							value_indicator.setAttribute('position', {x:-0.35, y:0.02, z: i*(-0.01)});
							value_indicator.setAttribute('width', '0.05');
							value_indicator.setAttribute('height', '0.01');
							value_indicator.setAttribute('depth', '0.01');
							scene.appendChild(value_indicator);
						}
					
					var value = document.createElement('a-text');
						value.setAttribute('value', i);
						value.setAttribute('color', 'white');
						value.setAttribute('position', {x:-0.55, y:0.02, z:i*(-0.01)});
						value.setAttribute('rotation', '-90 0 0');
						value.setAttribute('scale', '0.3 0.3 0.3');
						scene.appendChild(value);						
				}
				
				var legend = document.createElement('a-text');
					legend.setAttribute('value', data[n].value);
					legend.setAttribute('position', {x:x-0.05, y:0.1, z:0.05});
					legend.setAttribute('rotation', '-90 0 0');
					legend.setAttribute('scale', '0.3 0.3 0.3');
					scene.appendChild(legend);
				
					x += 0.15;
	
			}		
		}
	};
	xhttp.open("GET", "https://github.com/wxchoong/wxchoong.github.io/blob/master/data.json", true);
	xhttp.send();
