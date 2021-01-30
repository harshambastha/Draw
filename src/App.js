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
  var [selectContextMenu,setContextMenu]=useState(null);
  var [circles,setCircles]=useState([]);
  var rect=useRef();
  var draggableCircleRef=useRef();

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
    var tr = new Konva.Transformer({
      // anchorStroke: 'blue',
      anchorFill: 'blue',
      anchorSize: 7,
      borderStroke: 'light blue',
      borderDash: [1,1,1,1],
      node: group,
    });
    layer.current.add(tr);
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

  

  return(

    <Stage ref={mainStage} width={window.innerWidth} height={window.innerHeight}>

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
          //  ...newCircles,
           {x:draggableCircleRef.current.getStage().getPointerPosition().x,
          y:draggableCircleRef.current.getStage().getPointerPosition().y, radius:50,draggable:true,fill:'blue'}
         );
         setCircles(newCircles);
         console.log(newCircles);
         createCircle();
         draggableCircle.current.position({x:65, y:250});
         mainStage.current.draw();
       }}/>

      <Line x={0} y={0} stroke='black' points={[20,350,110,350]} strokeWidth={8} onMouseDown={createLine}/>
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
      <Circle x={450} y={250} radius={50}   strokeWidth={5} stroke='black' draggable={true}/>
      <Circle x={600} y={250} radius={50}   strokeWidth={5} stroke='black' draggable={true}/>

      <Arrow tension={0.2} points={[100,100,150,150,200,200]} stroke='black' fill='black' strokeWidth={10} pointerWidth={6} draggable={true}/>
    </Layer>
    {/* <Layer>
    {circles.map(eachCircle=>{
      console.log(eachCircle);
      return(
          <Circle
          x={eachCircle.x}
          y={eachCircle.y}
          radius={eachCircle.radius}
          fill={eachCircle.fill}
          draggable={eachCircle.draggable}
        />
      );
      })}
      </Layer> */}
    </Stage>
  );

}
export default App;

// import React, { Component } from "react";
// import { render } from "react-dom";
// import { Stage, Layer, Rect, Text } from "react-konva";
// import Konva from "konva";

// export default class ColoredRect extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { color: "green", rects: [] };
//   }

//   handleClick = () => {
//     this.setState({
//       color: Konva.Util.getRandomColor()
//     });
//   };
//   render() {
//     return (
//       <Stage
//         width={window.innerWidth}
//         height={window.innerHeight}
//         ref="stageReference"
//       >
//         <Layer>
//           <Rect
//             ref="draggableRectReference"
//             x={20}
//             y={20}
//             width={50}
//             height={50}
//             fill={this.state.color}
//             shadowBlur={5}
//             onClick={this.handleClick}
//             draggable={true}
//             onDragEnd={() => {
//               var draggableRect = this.refs.draggableRectReference;
//               /* adding a new rect in in state, no need to call draw() or anything
//               because updating state triggers render() again */
//               this.setState({
//                 rects: [
//                   ...this.state.rects,
//                   {
//                     x: draggableRect.getStage().getPointerPosition().x,
//                     y: draggableRect.getStage().getPointerPosition().y,
//                     width: 50,
//                     height: 50,
//                     fill: "green",
//                     draggable: true
//                   }
//                 ]
//               });
//               //returning draggable rect to original position
//               draggableRect.position({ x: 20, y: 20 });
//               this.refs.stageReference.draw(); // or draggableRect.getStage().draw()
//             }}
//           />
//         </Layer>
//         <Layer>
//           {this.state.rects.map(eachRect => {
//             return (
//               <Rect
//                 x={eachRect.x}
//                 y={eachRect.y}
//                 width={eachRect.width}
//                 height={eachRect.height}
//                 fill={eachRect.fill}
//                 draggable={eachRect.draggable}
//               />
//             );
//           })}
//         </Layer>
//       </Stage>
//     );
//   }
// }
