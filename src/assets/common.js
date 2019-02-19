var scene = new THREE.Scene();
scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
scene.fog = new THREE.Fog( scene.background, 1, 5000 );

var camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 0.1, 1000 );

camera.position.set( 0, 90, 250 );
camera.lookAt(new THREE.Vector3(0,0,0));//让相机指向原点

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMapEnabled = true;


document.body.appendChild( renderer.domElement );

var now_site = [0,0,0]
var cube_i = [20,40,20]
var direct_i = 1

function addCube(x,y,z){
var geometry = new THREE.BoxGeometry( 20, 40, 20 );
let mats=[],colors=[0xFFEB3B,0xFFEB3B,0xFF9800,0xFFEB3B,0xFFC107,0xFF9800];
for(let i = 0;i<geometry.faces.length;i++){
    let material = new THREE.MeshBasicMaterial({ color: new THREE.Color(colors[i])});
    mats.push(material);
}  
//让物体放置的一面投射阴影
let material_dest = new THREE.MeshPhongMaterial({ color: new THREE.Color(colors[2])});
    mats[2] = material_dest;
var cube = new THREE.Mesh( geometry, mats );

 cube.position.x = x || 0;
 cube.position.y = y || 0;
 cube.position.z = z || 0;
cube.castShadow = true
cube.receiveShadow = true
scene.add( cube );
}

function initGrid(){ //辅助网格
                var helper = new THREE.GridHelper( 1000, 100 ,0x0000ff, 0xff8080);
               // helper.setColor( 0x0000ff, 0x808080 );
                scene.add( helper );
            }


function addBridge(x,y,z){
var geometry = new THREE.BoxGeometry( 1, 10, 20 );

let mats=[],colors=[0xC5C5C5,0xEAEAEA,0xA8A8A8,0xC5C5C5,0xC5C5C5,0xA8A8A8];
for(let i = 0;i<geometry.faces.length;i++){
    let material = new THREE.MeshBasicMaterial({ color: new THREE.Color(colors[i])});
    mats.push(material);
}  
//让物体放置的一面投射阴影
let material_dest = new THREE.MeshPhongMaterial({ color: new THREE.Color(colors[2])});
    mats[2] = material_dest;
var bridge = new THREE.Mesh( geometry, mats );
bridge.position.set(0,0,0);
// bridge.rotation.y = 1;
bridge.castShadow = true
bridge.receiveShadow = true

var Pivot = 
changePivot(x || 8,y || 20,z || 0,bridge);
scene.add( Pivot );
document.body.addEventListener('mouseup',function(){
console.log('鼠标释放，共'+count+'ms')
// changePivot(0,25,0,bridge)
window.clearInterval(counter)
bridge_down()
})

let count = 0,counter = null,count_h = 10;

document.body.addEventListener('mousedown',function(){
let e = window.event || event
if(e.button === 0) //左键
{
    if(direct_i == 2){
        Pivot.rotation.y = 1.6
        Pivot.position.x -=8;
    }
counter = setInterval(function(){
count++
bridge.scale.y += 0.4;
bridge.position.set(0,bridge.scale.y*5,0);
renderer.render( scene, camera );
},100)
}
})


var ballScroll = null;
var bridgeDown = null;

function setBridge(){
    addBridge(now_site[0]+10,0,now_site[2])
    window.cancelAnimationFrame(bridgeDown);
}

function ball_scroll(){
   
    ballScroll = requestAnimationFrame(ball_scroll)
    if(direct_i == 2){
        if(ball.position.z > now_site[2]){
            ball.position.z -= 1.2;
            ball.rotation.y += 1.2;
        }
    }else{
        if(ball.position.x < now_site[0]){
            ball.position.x += 1.2;
            ball.rotation.y += 1.2;
        }
    }
    //判断球是否抵达
    if(direct_i ==1&&ball.position.x>=now_site[0]-10&&ball.position.x<=now_site[0]+10){
        console.log("创建一个障碍物")
        window.cancelAnimationFrame(ballScroll);
        scene.remove(Pivot);
        randomCube()
    }
    if(direct_i ==2&&ball.position.z<=now_site[2]-10&&ball.position.z<=now_site[2]+10){
        console.log("创建一个障碍物")
        window.cancelAnimationFrame(ballScroll);
        scene.remove(Pivot);
        randomCube()
    }
    renderer.render( scene, camera );
    camera.lookAt(new THREE.Vector3(now_site[0],0,now_site[2]));//让相机指向原点
}


function bridge_down(){
    bridgeDown = requestAnimationFrame(bridge_down)
if(Pivot.rotation.z >= -1.55){
    Pivot.rotation.z -= 0.06;
    // Pivot.setRotationZ(Pivot.rotation.z)
}else{
    setBridge();
ball_scroll();
}
renderer.render( scene, camera );
}
return bridge;
}





function createC(){
var sphereGeo = new THREE.SphereGeometry(5, 20, 20);//创建球体
var sphereMat = new THREE.MeshLambertMaterial({//创建材料
    color:0x0000FF,
    wireframe:false
});
var sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);//创建球体网格模型
sphereMesh.position.set(0, 25, 0);//设置球的坐标
sphereMesh.castShadow = true
sphereMesh.receiveShadow = true
scene.add(sphereMesh);//将球体添加到场景
return sphereMesh;

}

function addLight(sphereMesh){
hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );
hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
scene.add( hemiLightHelper );
//
dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( 1.8, 2.85, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 50;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;
dirLightHeper = new THREE.DirectionalLightHelper( dirLight, 10 );
scene.add( dirLightHeper );
}

function addGround(){
var groundGeo = new THREE.PlaneBufferGeometry( 10000, 10000 );
var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0xEEEEEE } );
groundMat.color.setHSL( 0.095, 1, 0.75 );
var ground = new THREE.Mesh( groundGeo, groundMat );
ground.rotation.x = - Math.PI / 2;
ground.position.y = - 23;
scene.add( ground );
ground.receiveShadow = true;

}

function randomCube(){
    let x = getRandom();
    let y = 0;
    let z = - getRandom();
    while(x<(now_site[0]+11)){
        x = getRandom();
    }
    while(z>(now_site[1]+11)){
        z = - getRandom();
    }
    if(x!=now_site.x&&z!=now_site[2]){
        if(Math.random()>.5){
            z = now_site[2];
            direct_i = 1;
        }else{
            x = now_site[0];
            direct_i = 2;
        }
    }
    now_site = [x,y,z]
    addCube(x,y,z);
}

function getRandom(){
   return Math.random()*100+10;
}

initGrid();
addLight();
addGround();
var ball = createC();
addCube();
randomCube()
var bridge = addBridge();


var animate = function () {
// requestAnimationFrame( animate );

// bridge.rotation.x += 0.01;

renderer.render( scene, camera );
};

var makeBridge = function(){
requestAnimationFrame(makeBridge)
// bridge.rotation.y += 0.01;
if(bridge.scale.y<2){
// bridge.scale.y+= 0.01;
bridge.position.y +=0.01
}
renderer.render( scene, camera );
}

function changePivot(x,y,z,obj){
let wrapper = new THREE.Object3D();
wrapper.position.set(x,y,z);
wrapper.add(obj);
obj.position.set(-x,-y,-z);
return wrapper;
}

animate();