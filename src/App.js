import emailIcon from './email.svg';
import React, { useEffect, useRef, useState } from 'react';
import { Stage,Text,Rect, Layer, Circle, Line} from 'react-konva';
import Konva from 'konva';
import './App.css';



function App(){
  var mainStage=useRef();
  var layer=useRef();
  var email=useRef();
  const [circles,setCircles]=useState([]);
  const [rectangles,setRectangles]=useState([]);
  var draggableRectangleRef=useRef();
  var draggableCircleRef=useRef();
  let countOfShapes=0;
  let shapesPosition=[];
  let totalShapes=[];
  let connectors=[];
  let prevCount=0;

  useEffect(()=>{
    console.log('Welcome');
    createEmailIcon();
  });

  const createEmailBox=()=>{

    let emailText=new Konva.Text({
      x:210,y:405,text:'EMAIL',fill:'white',fontSize:10
    });
    let rectangle1=new Konva.Rect({
      x:180,y:400,width:100,height:20,stroke:'orange',fill:'orange',cornerRadius:[5,5,0,0]
    });
    let rectangle2=new Konva.Rect({
      x:180,y:400,width:100,height:100,stroke:'orange',strokeWidth:3,cornerRadius:5
    });

    let group=new Konva.Group({draggable:true});
    group.add(rectangle1);
    group.add(rectangle2);
    group.add(emailText);
    Konva.Image.fromURL(emailIcon,(imageNode)=>{
      imageNode.setAttrs({
        x:190,y:403,width:12,height:12
      });
      // layer.current.add(imageNode);
      group.add(imageNode);
      mainStage.current.draw();
    });
    // var tr = new Konva.Transformer({
    //   // anchorStroke: 'blue',
    //   anchorFill: 'blue',
    //   anchorSize: 7,
    //   borderStroke: 'light blue',
    //   borderDash: [1,1,1,1],
    //   node: group,
    // });
    // layer.current.add(tr);
    layer.current.add(group);
    mainStage.current.draw();
  }

  const createEmailIcon=()=>{
    Konva.Image.fromURL(emailIcon,(imageNode)=>{
      layer.current.add(imageNode);
      imageNode.setAttrs({
        width:50,height:50,x:40,y:410
      });
      layer.current.batchDraw();
    });
    let emailText=new Konva.Text({
      x:40,y:470,text:'EMAIL',fill:'orange',fontSize:20
    });
    layer.current.add(emailText);
  }
  // const createRectangle=()=>{
  //   let rectangle=new Konva.Rect({
  //     x:160,y:50,width:100,height:100,stroke:'black',strokeWidth:5,
  //     onContextMenu:handleContextMenu
  //   });
  //   console.log(rectangle);
  //   let textNode=new Konva.Text({
  //     text:'Activity',
  //     x:180,y:80,fontSize:20
  //   });
  //   let group=new Konva.Group({draggable:true});
  //   group.add(rectangle);
  //   group.add(textNode);
  //   layer.current.add(group);
  //   textNode.on('dblclick', () => {
  //     // at first lets find position of text node relative to the stage:
  //     var textPosition = textNode.getAbsolutePosition();

  //     // then lets find position of stage container on the page:
  //     var stageBox = mainStage.current.container().getBoundingClientRect();

  //     // so position of textarea will be the sum of positions above:
  //     var areaPosition = {
  //       x: stageBox.left + textPosition.x,
  //       y: stageBox.top + textPosition.y,
  //     };

  //     // create textarea and style it
  //     var textarea = document.createElement('textarea');
  //     document.body.appendChild(textarea);

  //     textarea.value = textNode.text();
  //     textarea.style.position = 'absolute';
  //     textarea.style.top = areaPosition.y + 'px';
  //     textarea.style.left = areaPosition.x + 'px';
  //     textarea.style.width = textNode.width();

  //     textarea.focus();

  //     textarea.addEventListener('keydown', function (e) {
  //       // hide on enter
  //       if (e.keyCode === 13) {
  //         textNode.text(textarea.value);
  //         layer.current.draw();
  //         document.body.removeChild(textarea);
  //       }
  //     });
  //   });
  //   mainStage.current.draw(layer);
  //   console.log('Rectangle Created');
  // }
  const createCircle= ()=>{
      let eachCircle=circles[circles.length-1];
      console.log(eachCircle);
      let circle=new Konva.Circle({
        id:'shape-'+shapesPosition.length, x:eachCircle.x,y:eachCircle.y,radius:eachCircle.radius,fill:eachCircle.fill,draggable:eachCircle.draggable
      });
      layer.current.add(circle);
      mainStage.current.draw(circle);
      prevCount++;
  }

  const createText=()=>{
    var textNode = new Konva.Text({
      text: 'Some text here',
      x: 160,
      y: 10,
      fontSize: 25,
      draggable:true
    });

    layer.current.add(textNode);
    layer.current.draw();
    textNode.on('dblclick', () => {
      // create textarea over canvas with absolute position

      // first we need to find position for textarea
      // how to find it?

      // at first lets find position of text node relative to the stage:
      var textPosition = textNode.getAbsolutePosition();

      // then lets find position of stage container on the page:
      var stageBox = mainStage.current.container().getBoundingClientRect();

      // so position of textarea will be the sum of positions above:
      var areaPosition = {
        x: stageBox.left + textPosition.x,
        y: stageBox.top + textPosition.y,
      };

      // create textarea and style it
      var textarea = document.createElement('textarea');
      document.body.appendChild(textarea);

      textarea.value = textNode.text();
      textarea.style.position = 'absolute';
      textarea.style.top = areaPosition.y + 'px';
      textarea.style.left = areaPosition.x + 'px';
      textarea.style.width = textNode.width();

      textarea.focus();

      textarea.addEventListener('keydown', function (e) {
        // hide on enter
        if (e.keyCode === 13) {
          textNode.text(textarea.value);
          layer.current.draw();
          document.body.removeChild(textarea);
        }
      });
    });
    console.log('Text');
  }

  const getConnectorPoints=(from,to)=>{
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let angle = Math.atan2(-dy, dx);

    const radius = 50;

    return [
      from.x + -radius * Math.cos(angle + Math.PI),
      from.y + radius * Math.sin(angle + Math.PI),
      to.x + -radius * Math.cos(angle),
      to.y + radius * Math.sin(angle)
    ];
  }
  const updateArrows=()=>{
    // totalShapes.forEach(shape=>{
    //   let node=layer.current.findOne('#'+shape.id);
    //   console.log(shape.id);
    // });
    connectors.forEach(connect=>{
      let line=layer.current.findOne('#'+connect.id);
      let fromNode=layer.current.findOne('#'+connect.from);
      let toNode=layer.current.findOne('#'+connect.to);
      let newPoints=getConnectorPoints(fromNode.position(),toNode.position());
      // console.log(line);
      line.points(newPoints);
      
    });
    layer.current.batchDraw();
  }
  return(
    <Stage ref={mainStage} width={window.innerWidth} height={window.innerHeight}   onClick={(e)=>{
      if(e.target===e.target.getStage()){
        mainStage.current.find('.Tran').destroy();
        layer.current.draw();
        return;
      }
      
      mainStage.current.find('.Tran').destroy();
      let tr=new Konva.Transformer({name:'Tran'});
      layer.current.add(tr);
      tr.nodes([e.target]);
      mainStage.current.draw();
    }} 
    onDragEnd={(e)=>{
     countOfShapes++;
     let x=mainStage.current.getPointerPosition().x;
     let y=mainStage.current.getPointerPosition().y;

    shapesPosition.push({x,y});
    totalShapes.push({id:'shape-'+totalShapes.length,x:x,y:y});
     if(countOfShapes>2) shapesPosition.shift();
     if(countOfShapes>=2){
       if(prevCount===totalShapes.length){
        let arrow=new Konva.Arrow({
          points:[shapesPosition[0].x,shapesPosition[0].y,shapesPosition[1].x,shapesPosition[1].y],
          id:'connector-'+connectors.length,pointerLength:10,pointerWidth:10,fill:'black',stroke:'black',hitStrokeWidth:4,tension:5
        });
        connectors.push({id:'connector-'+connectors.length,
        from:'shape-'+connectors.length,to:'shape-'+(connectors.length+1)});
        layer.current.add(arrow);
        mainStage.current.draw();

      }
       if(prevCount!==totalShapes.length){
         updateArrows()
        prevCount=totalShapes.length};
      console.log(prevCount,totalShapes.length);
      console.log(connectors);
    }}}>
    <Layer ref={layer}>

      <Text draggable text="Create Text" fontSize={25} x={10} y={10} onMouseDown={createText}/>
      <Rect x={20} y={50} width={100} height={100} strokeWidth={5} stroke='black'/>
      <Rect ref={draggableRectangleRef} x={20} y={50} width={100} height={100} strokeWidth={5} stroke='black' draggable onDragEnd={(e)=>{
        let rect=rectangles;
        rect.push({x:draggableRectangleRef.current.getStage().getPointerPosition().x,
        y:draggableRectangleRef.current.getStage().getPointerPosition().y,
      width:100,height:100,stroke:'black',strokeWidth:5});
      setRectangles(rect);
      let eachRectangle=rectangles[rectangles.length-1];
      let rectangle=new Konva.Rect({
        id:'shape-'+shapesPosition.length,x:eachRectangle.x,y:eachRectangle.y,width:eachRectangle.width,height:eachRectangle.height,stroke:eachRectangle.stroke,strokeWidth:eachRectangle.strokeWidth,draggable:true
      });
      layer.current.add(rectangle);
      draggableRectangleRef.current.position({x:20,y:50});
      mainStage.current.draw(layer);
      prevCount++;
      console.log('Rectangle Created');
      }}/>
 
       <Circle x={65} y={250} radius={50}   strokeWidth={5} stroke='black' />
       <Circle x={65} y={250} radius={50} ref={draggableCircleRef}  strokeWidth={5} stroke='black' draggable={true}
       onDragEnd={(e)=>{
         let newCircles=circles;
         newCircles.push(
           {x:draggableCircleRef.current.getStage().getPointerPosition().x,
          y:draggableCircleRef.current.getStage().getPointerPosition().y, radius:50,draggable:true,fill:'blue'}
         );
         setCircles(newCircles);
         createCircle();
         draggableCircleRef.current.position({x:65, y:250});
         mainStage.current.draw();
       }}/>
      <Line x={0} y={0} stroke='black' points={[150,0,150,window.innerHeight]} strokeWidth={5}/>
      <Rect ref={email} x={20} y={400} width={100} height={100} stroke='orange' strokeWidth={5} onClick={createEmailBox}/>

    </Layer>
    </Stage>

  );

}
export default App;