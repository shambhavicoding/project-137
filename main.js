video="";
objects=[];
status="";
function preload(){
    video=createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas=createCanvas(480,280);
    canvas.center();
}
function draw(){
    image(video,0,0,480,280);
    if(status!=""){
        objectDetector.detect(video,gotResult);
    }
    for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="Status : Objects detected";
        document.getElementById("number_of_objects").innerHTML="Number of objects detected are:"+objects.length;

        fill("#FF0000");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
        noFill();
        stroke("#FF0000");
        rect(objects[i].x , objects[i].y , objects[i].height , objects[i].width);
    }
    if(object[i].label==object_name){
        video.stop();
        objectDetector.detect(gotResult);
        document.getElementById("status_objects").innerHTML=object_name + "Found";
        synth=window.SpeechSynthesis;
        utterThis=new SpeechSynthesisUtterance(object_name + "Found");
        synth.speak(utterThis);
    }
    else{
        document.getElementById("status_objects").innerHTML=object_name + "Not found";
    }
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting objects";
}
function modelLoaded(){
    console.log('Model Loaded!');
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
