import emailIcon from './email.svg';
import React, { useEffect, useRef, useState } from 'react';
import { Stage,Text,Rect, Layer, Circle, Line,Arrow} from 'react-konva';
import Konva from 'konva';
import './App.css';
import ContextMenu from "./ContextMenu";
import Portal from "./Portal";



function App(){
  var mainStage=useRef();
  var layer=useRef();
  var email=useRef();
  let draggableArrow=useRef();
  const [selectContextMenu,setContextMenu]=useState(null);
  const [circles,setCircles]=useState([]);
  var rect=useRef();
  var draggableCircleRef=useRef();
  let countOfShapes=0;
  let shapesPosition=[];

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
  var handleContextMenu=(e)=>{
    e.evt.preventDefault(true);
    const mousePosition = e.target.getStage().getPointerPosition();
    setContextMenu(
      selectContextMenu= {
        type: "START",
        position: mousePosition
      });
    console.log(selectContextMenu);
    console.log(mousePosition);
  }
  const createRectangle=()=>{
    let rectangle=new Konva.Rect({
      x:160,y:50,width:100,height:100,stroke:'black',strokeWidth:5,
      onContextMenu:handleContextMenu
    });
    console.log(rectangle);
    let textNode=new Konva.Text({
      text:'Activity',
      x:180,y:80,fontSize:20
    });
    let group=new Konva.Group({draggable:true});
    group.add(rectangle);
    group.add(textNode);
    layer.current.add(group);
    textNode.on('dblclick', () => {
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
    mainStage.current.draw(layer);
    console.log('Rectangle Created');
  }
  const createCircle=()=>{
      let eachCircle=circles[circles.length-1];
      console.log(eachCircle);
      let circle=new Konva.Circle({
        x:eachCircle.x,y:eachCircle.y,radius:eachCircle.radius,fill:eachCircle.fill,draggable:eachCircle.draggable
      });
      layer.current.add(circle);
      mainStage.current.draw(circle);
  }

  const handleOptionSelected=(option)=>{
    console.log(option);
    if(option==='option1') {
      rect.fill='blue';
    }
    setContextMenu(selectContextMenu=null);
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

  return(
    <Stage ref={mainStage} width={window.innerWidth} height={window.innerHeight} onClick={(e)=>{
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
     if(countOfShapes>2) shapesPosition.shift();
     if(countOfShapes>=2){
      //Draw Arrow
      let arrow=new Konva.Arrow({
        points:[shapesPosition[0].x,shapesPosition[0].y,shapesPosition[1].x,shapesPosition[1].y],
        pointerLength:10,pointerWidth:10,fill:'black',stroke:'black',hitStrokeWidth:4
      });
      layer.current.add(arrow);
      mainStage.current.draw();
     }
    }}>
    <Layer ref={layer}>

      <Text draggable text="Create Text" fontSize={25} x={10} y={10} onMouseDown={createText}/>
      <Rect
        ref={rect}
        x={20}
        y={50}
        width={100}
        height={100}
        strokeWidth={5}
        stroke='black'
        onMouseDown={createRectangle}
        onContextMenu={handleContextMenu}
      />
 
       <Circle x={65} y={250} radius={50}   strokeWidth={5} stroke='black' />
       <Circle x={65} y={250} radius={50} ref={draggableCircleRef}  strokeWidth={5} stroke='black' draggable={true}
       onDragEnd={(e)=>{
         let draggableCircle=draggableCircleRef;
         let newCircles=circles;
         newCircles.push(
           {x:draggableCircleRef.current.getStage().getPointerPosition().x,
          y:draggableCircleRef.current.getStage().getPointerPosition().y, radius:50,draggable:true,fill:'blue'}
         );
         setCircles(newCircles);
         console.log(newCircles);
         createCircle();
         draggableCircle.current.position({x:65, y:250});
         mainStage.current.draw();
       }}/>

      <Arrow x={0} y={0} stroke='black' points={[20,350,110,350]} strokeWidth={8}/>
      <Arrow x={0} y={0} stroke='black' points={[20,350,110,350]} strokeWidth={8} draggable ref={draggableArrow} onDragEnd={e=>{
        draggableArrow.current.position({x:0,y:0});
        mainStage.current.draw();
      }}/>
      <Line x={0} y={0} stroke='black' points={[150,0,150,window.innerHeight]} strokeWidth={5}/>
               {selectContextMenu && (
            <Portal>
              <ContextMenu
                {...selectContextMenu}
                onOptionSelected={handleOptionSelected}
              />
            </Portal>
          )}
      <Rect ref={email} x={20} y={400} width={100} height={100} stroke='orange' strokeWidth={5} onClick={createEmailBox}/>
      <Circle x={400} y={250} radius={50}   strokeWidth={5} stroke='black' draggable={true} />
      <Circle x={600} y={250} radius={50}   strokeWidth={5} stroke='black' draggable={true} />

    </Layer>
    </Stage>

  );

}
export default App;