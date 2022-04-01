img="kid.jpg";
objects=[];
status="";
objectDetector=""; 
song=" ";

function preload() {
    song=loadSound("alamclock.mp3");
}
function setup() {
    canvas=createCanvas(640,420);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status : detecting objects";
}
function modelLoaded() {
    console.log("modelLoaded");
    status=true;
//    mp3.loop();
//    mp3.speed(1);
//    objectDetector.detect(img, gotResult);
}
function gotResult(error,results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw() {
    image(video,0,0,640,420);

    if (status !="") {
   r=random(255);
   g=random(255);
   b=random(255);
   objectDetector.detect(video,gotResult);

        for (var i=0; i< objects.length; i++) {
            document.getElementById("status").innerHTML="status : object detected.";

            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
    text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

    if (objects[i].label=="person") {
        document.getElementById("number_of_objects").innerHTML="baby found";
        console.log("stop");
        song.stop();
        
    }
    else{
        document.getElementById("number_of_objects").innerHTML="baby not found";
        console.log("play");
        song.play();
    }
        }
    
        if (objects.length==0) {
            document.getElementById("number_of_objects").innerHTML="baby not found";
            console.log("play");
            song.play();
        }
    }

    
}

