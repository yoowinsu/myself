/*
 * 1、闪动的效果（瞬间让图片的宽高变为0，scale，随机）
 * 2、图片从小变到大，同时透明度也有变化（必需是上一个运动走完了，才走这一步）
 * 3、图片旋转，同时透明度也有变化（当所有图片透明度变为0的时候，才会走这一步）
 */
window.onload = function() {

	function tab1(obj) {
		var navlist = document.querySelectorAll('.nav li');
		var TO = document.querySelectorAll('ul .TO ');
		var first = document.querySelector('.first');

		for(var i = 0; i < navlist.length; i++) {
			navlist[i].index = i;
			navlist[i].onclick = function() {
				first.style.display = 'none';
				for(var i = 0; i < navlist.length; i++) {
					TO[i].style.display = 'none';
				}

				TO[this.index].style.display = 'block';
			};
		}
	}
	var body = document.getElementById("body");
	tab1(body);
	
	function tab2(obj) {
		var habittitle = document.querySelectorAll('.habittitle li');
		var habitcontent = document.querySelectorAll('.habitcontent .h ');

		for(var i = 0; i < habittitle.length; i++) {
			habittitle[i].index = i;
			habittitle[i].onclick = function() {
				for(var i = 0; i < habittitle.length; i++) {
					habittitle[i].style.background='';
					habitcontent[i].style.display = 'none';
				}
				this.style.background=' rgba(253, 253, 238, 0.8)';
				habitcontent[this.index].style.display = 'block';
			};
		}
	}
	var habit = document.querySelector('.habit');
	tab2(habit);
	
	var photos=document.querySelector('.photos');
				var ul=photos.querySelector('.photos ul');
				var div=photos.querySelector('.photos div');
				var n=0;
				var timer;
				
				var textArr=[
					{"title":'盛惠而来',"content":'京东携手天天果园百万车厘子，29元包邮畅想'},
					{"title":'荣耀7',"content":'有点不同，0元预约，免费抽奖1999元'},
					{"title":'老板购物节',"content":'2015我要更省，老板XX购物节精彩来袭'},
					{"title":'送钱送美酒',"content":'大盘让我心碎，我在京东买醉送钱送美酒'},
					{"title":'玩转暑假',"content":'追风少年，联想拯救者全国独家抢购'},
					{"title":'游园门票',"content":'奔跑吧周末游游园门票一元秒杀'}
				];
				
				ul.innerHTML=ul.innerHTML+ul.innerHTML;
				
				var lis=ul.querySelectorAll('li');
				var w=parseInt(getComputedStyle(lis[0]).width);
				ul.style.width=lis.length*w+'px';
				
				div.innerHTML='<h3>'+textArr[n].title+'</h3><p>'+textArr[n].content+'</p>';
				
				
				timer=setInterval(pic,2000);
				
				function pic(){
					n++;
						
					move(div,{"bottom":-70},1000,'linear',function(){
						move(ul,{"left":-300*n},2000,'linear',function(){
							if(n==lis.length/2){
								ul.style.left=0;
								n=0;
							}
							
							div.innerHTML='<h3>'+textArr[n].title+'</h3><p>'+textArr[n].content+'</p>';
							move(div,{"bottom":0},1000,'linear');
						});
					});
				}
				
				photos.onmouseover=function(){
					clearInterval(timer);
				};
				
				photos.onmouseout=function(){
					timer=setInterval(pic,2000);
				};
				

	var body = document.getElementById('body');

	//	body.onclick=function(){
	//		canvas.style.background= 'pink';
	//		canvas.style.backgroundImage: -webkit-linear-gradient(left, red, #E6D205 25%, #147B96 50%, #E6D205 75%, blue);
	//	}

	var btn = document.getElementById('btn');
	var imgWrap = document.getElementById('imgWrap');
	var imgs = document.querySelectorAll("img");
	var on = false; //代表用户是否可以点击(如果正在运动让它的值为true,运动完成了，让它的值为false)

	//给图片墙添加事件
	imgWrap.onclick = function() {
			if(on) {
				return;
			}
			on = true;
			toClick();
		}
		//点击❤添加事件
	btn.onclick = function() {
		if(on) {
			return;
		}
		on = true;
		toClick();
	}

	function toClick() {
		var endNum = 0; //代表图片运动完成的数量
		var allEnd = 0; //所有的图片都走完了，才让用户再次点击
		for(var i = 0; i < imgs.length; i++) {
			//为什么用这种方法，因为我们想在定时器里面用i的值，所以只能用这种方法
			(function(i) {
				//以下是第一个效果
				setTimeout(function() {
					motion(imgs[i], '10ms', function() {
						this.style.transform = 'scale(0)';
					}, function() {
						//第二个效果需要在这个函数里面去写
						motion(this, '1s', function() {
							this.style.transform = 'scale(1)';
							this.style.opacity = 0;
						}, function() {
							//这个函数执行，代表某一张图片完成了
							//怎么知道所有图片都运动完了？
							endNum++;

							if(endNum == 50) {
								//这个条件成立，代表所有的图片走运动完了
								//在这里做第三个效果
								toBig();
							}

							//console.log(endNum);
						});
					});
				}, Math.random() * 1000);
			})(i);
		}

		//这个函数做的是第三个效果
		function toBig() {
			//alert("这是第三个效果");
			/*
			 * 坐标
			 * 	X轴（平行地面）
			 * 	Y轴（垂直地面）
			 *  Z轴（垂直屏幕）
			 * 
			 * 	让图片围绕Y轴旋转
			 * 	要让图片在Z轴上位移
			 * 	
			 */

			for(var i = 0; i < imgs.length; i++) {
				//提前给每个图片设一个初始值
				imgs[i].style.transition = '';
				imgs[i].style.transform = 'rotateY(0deg) translateZ(-' + Math.random() * 500 + 'px)';

				(function(i) {
					setTimeout(function() {
						motion(imgs[i], '2s', function() {
							//在这里需要运动三个属性（旋转、位移、透明度）
							this.style.opacity = 1;
							imgs[i].style.transform = 'rotateY(-360deg) translateZ(0)';
						}, function() {
							allEnd++;
							if(allEnd == 50) {
								on = false; //运动完成了，就它的值为false(用户可以再次点击了)
							}
						});
					}, Math.random() * 1000);
				})(i);

			}
		}

		/*
		 * 函数自执行
		 * 函数声明,转表达式：用一个括号把它括起来
		 * 函数表达式，它加一个括号就可以自执行
		 */

		/*(function(){
			alert(1);
		})();*/

		/*
		 * //这个叫函数声明
		function a(){
			alert(1);
		}
					
		//这个叫函数表达式
		var b=function(){
			alert(2);
		}
		*/

	};

	//这个函数是用来做运动的
	//运动谁（运动的对象），运动的时间，运动的属性(函数)，运动完了要做的事情
	function motion(obj, time, doFn, callBack) {
		obj.style.transition = time; //给对象添加运动 
		doFn.call(obj); //call用来调用函数，并且改变this指向，指向参数

		var called = false; //解决transitionend调多次的问题

		//transitionend		代表运动完成后要做的事（事件）
		obj.addEventListener('transitionend', function() {
			if(!called) {
				callBack && callBack.call(obj);
				called = true;
			}
		}, false);
	}

	//canvas气泡效果
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight + 400;
	var context = canvas.getContext('2d');
	var balls = [];
	var colors = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', 'hotpink', '#5aefb8', '#F9D423'];
	var timer;

	/*
	 * 一个圆
	 * 	1、半径不同
	 * 	2、颜色不同
	 * 	3、位置不同
	 * 	4、速度不同
	 * 
	 * var ball={
	 *	x:x轴的位置,
	 * 	y:y轴的位置,
	 * 	r:圆的半径,
	 * 	vx:x轴的速度,
	 * 	vy:y轴的速度,
	 * 	color:颜色
	 * }
	 * 
	 * 角度转弧度
	 * 		角度*π/180
	 * 		360*π/180
	 */

	//在canvas上画圆
	function draw(ball) {
		context.beginPath(); //开始的路径
		//arc(x轴位置,y轴位置,半径,起始弧度,结束弧度)
		context.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
		context.fillStyle = ball.corlor; //给圆填充颜色
		context.globalCompositeOperation = 'lighter'; //合成
		context.fill();
	}

	//取x到y之间随机数：Math.round(Math.random()*(y-x)+x)
	function random(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	//给canvas添加移动事件
	var on = true; //用来让鼠标移动的时候定时器也可以跑
	canvas.onmousemove = function(ev) {
		//在移动的时候创建两个圆就够了
		for(var i = 0; i < 2; i++) {
			var ball = {
				x: random(-5, 5) + ev.clientX,
				y: random(-5, 5) + ev.clientY + window.pageYOffset,
				r: random(10, 45),
				vx: Math.random() - 0.5,
				vy: Math.random() - 0.5,
				corlor: colors[random(0, colors.length - 1)]
			};

			balls.push(ball);
			if(balls.length > 300) {
				balls.shift();
			}
		}

		//让定时器只开启一次
		if(on) {
			clearInterval(timer);
			timer = setInterval(drallBall, 30);
			on = false;
		}

		function drallBall() {
			context.clearRect(0, 0, canvas.width, canvas.height);

			for(var i = 0; i < balls.length; i++) {
				//需要在画的时候把球的位置还有半径都改了，这样的话看上去球才会动
				balls[i].x += balls[i].vx * 8; //通过速度改变x轴的位置
				balls[i].y += balls[i].vy * 8; //通过速度改变y轴的位置
				balls[i].r = balls[i].r * 0.94; //改变球的半径

				balls[i].index = i; //添加这个索引为了在下面能够找到它并删除

				//如果小球的半径小于1的话，就不让canvas再画它了
				if(balls[i].r < 1) {
					balls.splice(balls[i].index, 1);
					continue; //如果小球已经被删了，下面的代码就不用再走了
				}

				draw(balls[i]);

				//如果balls的数组里已经没有东西了，就把定时器清除掉
				if(!balls.length) {
					clearInterval(timer);
					on = true; //让on的值与定时器保持一致
				}
			}
		}
	}
};