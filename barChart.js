var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "data.json", true);
	xhttp.onload = function() {
		if (this.status == 200) {
			
			var response = JSON.parse(xhttp.responseText);
			var data = response.data;
			
			var color = ['deeppink', 'orangered', 'gold', 'yellowgreen', 'deepskyblue', 'darkorchid']
			var x = -0.25;
			var z = -0.8;
				
			var scene = document.querySelector('a-scene');
			
			var title = document.createElement('a-text');
					title.setAttribute('value', "Temperature");
					title.setAttribute('color', 'red');
					title.setAttribute('position', {x:-0.65, y:0.05, z:0});
					title.setAttribute('rotation', '-90 90 0');
					title.setAttribute('scale', '0.5 0.5 0.5');
					scene.appendChild(title);
			
			var user_alert = document.createElement('a-circle');
				user_alert.setAttribute('color', 'lawngreen');
				user_alert.setAttribute('radius', '0.05');
				user_alert.setAttribute('position', '-0.65 0.05 -0.8');
				user_alert.setAttribute('rotation', '-90 0 0');
				scene.appendChild(user_alert);
				
			for(var n = 0; n < data.length; n++){	 
				
				var chart_scale = (data[n].temp)*(-0.01);
				
				var max = data[0].temp;
				
				if (data[n].temp > max){
				  max = data[n].temp;
				 }
				 
				if (max > 100){
					alarm.setAttribute('color', 'crimson');
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
						axis.setAttribute('color', 'red');
						axis.setAttribute('position', {x:-0.35, y:0.02, z:i*(-0.005)-0.05});
						axis.setAttribute('width', '0.01');
						axis.setAttribute('height', '0.01');
						axis.setAttribute('depth', (i*(-0.01))-0.1);
						scene.appendChild(axis);
					
					if(i > 0){
						var value_indicator = document.createElement('a-box');
							value_indicator.setAttribute('color', 'red');
							value_indicator.setAttribute('position', {x:-0.35, y:0.02, z: i*(-0.01)});
							value_indicator.setAttribute('width', '0.05');
							value_indicator.setAttribute('height', '0.01');
							value_indicator.setAttribute('depth', '0.01');
							scene.appendChild(value_indicator);
						}
					
					var value = document.createElement('a-text');
						value.setAttribute('value', i);
						value.setAttribute('color', 'red');
						value.setAttribute('position', {x:-0.55, y:0.02, z:i*(-0.01)});
						value.setAttribute('rotation', '-90 0 0');
						value.setAttribute('scale', '0.3 0.3 0.3');
						scene.appendChild(value);						
					}
					
					var name = document.createElement('a-text');
						name.setAttribute('value', data[n].name);
						name.setAttribute('color', 'red');
						name.setAttribute('position', {x:x-0.05, y:0.1, z:0.05});
						name.setAttribute('rotation', '-90 0 0');
						name.setAttribute('scale', '0.3 0.3 0.3');
						scene.appendChild(name);
						
					var legend = document.createElement('a-text');
						legend.setAttribute('value', data[n].name + ': ' + data[n].legend);
						legend.setAttribute('color', 'red');
						legend.setAttribute('position', {x:0.8, y:0.1, z:z});
						legend.setAttribute('rotation', '-90 0 0');
						legend.setAttribute('scale', '0.2 0.2 0.2');
						scene.appendChild(legend);
					
					var legend_color = document.createElement('a-box');
						legend_color.setAttribute('color', color[n]);
						legend_color.setAttribute('position', {x:0.76, y:0.1, z:z});
						legend_color.setAttribute('scale', '0.04 0 0.04');
						scene.appendChild(legend_color);
						
				
					x += 0.15;
					z += 0.07;

			}		
		}
	};
	xhttp.send();
