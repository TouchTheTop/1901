export default class Stake {
    // size = {
    //     x:0,
    //     y:0,
    //     z:0
    // }
    // pos = {
    //     x:0,
    //     y:0,
    //     z:0
    // }
    constructor(s,p){
        this.setSizeData(s);
        var geometry = new THREE.BoxGeometry( this.size.x, this.size.y, this.size.z );
        let mats=[],colors=[0xFFEB3B,0xFFEB3B,0xFF9800,0xFFEB3B,0xFFC107,0xFF9800];
        for(let i = 0;i<geometry.faces.length;i++){
            let material = new THREE.MeshBasicMaterial({ color: new THREE.Color(colors[i])});
            mats.push(material);
        }  
        //让物体放置的一面投射阴影
        let material_dest = new THREE.MeshPhongMaterial({ color: new THREE.Color(colors[2])});
            mats[2] = material_dest;
        var cube = new THREE.Mesh( geometry, mats );

        this.setSizeData(p);
         cube.position.x = this.pos.x || 0;
         cube.position.y = this.pos.y || 0;
         cube.position.z = this.pos.z || 0;
        cube.castShadow = true
        cube.receiveShadow = true
        scene.add( cube );
    }
    setSizeData(d){
        Object.assign(this.size,d)
    }
    setPosData(d){
        Object.assign(this.pos,d)
    }
}

