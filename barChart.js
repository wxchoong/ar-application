var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "data.json", true);
	xhttp.onload = function() {
		if (this.status == 200) {
			
			var response = JSON.parse(xhttp.responseText);
			var data = response.data;
			
			var color = ['deeppink', 'orangered', 'gold', 'yellowgreen', 'deepskyblue', 'darkorchid']
			var x = -0.25;
			var z = -0.5;
				
			var scene = document.querySelector('a-scene');
			
			var title = document.createElement('a-text');
					title.setAttribute('value', "Temperature");
					title.setAttribute('color', 'red');
					title.setAttribute('position', '-0.65 0.05 0.5');
					title.setAttribute('rotation', '-90 90 0');
					title.setAttribute('scale', '0.5 0.5 0.5');
					scene.appendChild(title);
			
			var user_alert = document.createElement('a-circle');
				user_alert.setAttribute('color', 'lawngreen');
				user_alert.setAttribute('radius', '0.045');
				user_alert.setAttribute('position', '-0.65 0.05 -0.25');
				user_alert.setAttribute('rotation', '-90 0 0');
				scene.appendChild(user_alert);
				
			for(var n = 0; n < data.length; n++){	 
				
				var chart_scale = (data[n].temp)*(-0.01);
				
				var max = data[0].temp;
				
				if (data[n].temp > max){
				  max = data[n].temp;
				 }
				 
				if (max > 100){
					user_alert.setAttribute('color', 'crimson');
				}
				
				var chart = document.createElement('a-box');
					chart.setAttribute('color', color[n]);
					chart.setAttribute('position', {x:x, y:0, z:chart_scale/2+0.5});
					chart.setAttribute('width', '0.1');
					chart.setAttribute('height', '0.1');
					chart.setAttribute('depth' , chart_scale);
					chart.setAttribute('material', 'opacity: 0.8;');
					scene.appendChild(chart);
				
				for (var i = 0; i < max+5; i += 5){ 
					
					var axis = document.createElement('a-box');
						axis.setAttribute('color', 'red');
						axis.setAttribute('position', {x:-0.35, y:0.02, z:i*(-0.005)+0.475});
						axis.setAttribute('width', '0.01');
						axis.setAttribute('height', '0.01');
						axis.setAttribute('depth', i*(-0.01)-0.05);
						scene.appendChild(axis);
					
					if(i > 0){
						var value_indicator = document.createElement('a-box');
							value_indicator.setAttribute('color', 'red');
							value_indicator.setAttribute('position', {x:-0.35, y:0.02, z: i*(-0.01)+0.5});
							value_indicator.setAttribute('scale', '0.05 0.01 0.01');
							scene.appendChild(value_indicator);
						}
					
					var value = document.createElement('a-text');
						value.setAttribute('value', i);
						value.setAttribute('color', 'red');
						value.setAttribute('position', {x:-0.42, y:0.02, z:i*(-0.01)+0.5});
						value.setAttribute('rotation', '-90 0 0');
						value.setAttribute('align', 'right');
						value.setAttribute('scale', '0.2 0.2 0.2');
						scene.appendChild(value);						
					}
					
					var name = document.createElement('a-text');
						name.setAttribute('value', data[n].name);
						name.setAttribute('color', 'red');
						name.setAttribute('position', {x:x-0.05, y:0.1, z:0.55});
						name.setAttribute('rotation', '-90 0 0');
						name.setAttribute('scale', '0.3 0.3 0.3');
						scene.appendChild(name);
						
					var legend = document.createElement('a-text');
						legend.setAttribute('value', data[n].name + ': ' + data[n].legend);
						legend.setAttribute('color', 'red');
						legend.setAttribute('position', {x:0.75, y:0.1, z:z});
						legend.setAttribute('rotation', '-90 0 0');
						legend.setAttribute('scale', '0.2 0.2 0.2');
						scene.appendChild(legend);
					
					var legend_color = document.createElement('a-box');
						legend_color.setAttribute('color', color[n]);
						legend_color.setAttribute('position', {x:0.73, y:0.1, z:z});
						legend_color.setAttribute('scale', '0.03 0 0.03');
						scene.appendChild(legend_color);
						
				
					x += 0.15;
					z += 0.07;

			}		
		}
	};
	xhttp.send();
