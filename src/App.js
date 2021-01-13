import logo from './logo.svg';
import React, { useRef, useState } from 'react';
import { Stage,Text,Rect, Layer, Circle, Line} from 'react-konva';
import Konva from 'konva';
import './App.css';

function App() {
  var mainStage=useRef();
  var layer=useRef();
  const handleContextMenu=()=>{
    console.log('Hey');
  }
  const createRectangle=()=>{
    let rectangle=new Konva.Rect({
      x:160,y:50,width:100,height:100,stroke:'black',strokeWidth:5,
      onContextMenu:handleContextMenu
    });
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
    let circle=new Konva.Circle({
      x:210,y:250,radius:50,draggable:true,stroke:'black',strokeWidth:5
    });
    layer.current.add(circle);
    mainStage.current.draw(circle);
  }

  const createLine=()=>{
    let line=new Konva.Line({
      x:10,y:10,points:[150,340,240,340], draggable:true, strokeWidth:8, stroke:'black'
    });
    layer.current.add(line);
    mainStage.current.draw(line);
    console.log('line created');
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


  return (

    <Stage ref={mainStage} width={window.innerWidth} height={window.innerHeight}>
    <Layer ref={layer}>

      <Text draggable text="Create Text" fontSize={25} x={10} y={10} onMouseDown={createText}/>
      <Rect
        x={20}
        y={50}
        width={100}
        height={100}
        strokeWidth='5'
        stroke='black'
        onMouseDown={createRectangle}
        onContextMenu={()=>{
          console.log('Button Clicked');
        }}
      />
       <Circle x={65} y={250} radius={50}   strokeWidth='5' stroke='black' onMouseDown={createCircle}/>

      <Line x={0} y={0} stroke='black' points={[20,350,110,350]} strokeWidth='8' onMouseDown={createLine}/>
      <Line x={0} y={0} stroke='black' points={[150,0,150,window.innerHeight]} strokeWidth='5'/>
    </Layer>
    </Stage>
  );

}

export default App;
