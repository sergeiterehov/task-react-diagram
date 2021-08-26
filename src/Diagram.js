import { useState, useEffect, useCallback, useMemo, memo, Fragment } from 'react';
import "./Diagram.css";

const months = [
     "Янв.",
     "Фев.",
     "Мар.",
     "Апр.",
     "Май.",
     "Июн.",
     "Июл.",
     "Авг.",
     "Сен.",
     "Окт.",
     "Ноя.",
     "Дек.",
]
const SVG_WIDTH = 400;
const SVG_HEIGHT = 300;

export const Diagram = memo(function Diagram({ widget }) {
 
    


    const x0 = 50;
    const xAxisLength = SVG_WIDTH - x0 * 2;
  
    const y0 = 50;
    const yAxisLength = SVG_HEIGHT - y0 * 2;
  
    const xAxisY = y0 + yAxisLength;



const dataYMax = widget.data.reduce(function(prev, current){
  if(current.value+1>prev.value+1){
    return current;
  }
  return prev;

})

const dataYMin = widget.data.reduce(function(prev, current){

  if(current.value+1<prev.value+1){
    return current;
  }
  return prev;

})
console.log(dataYMax);

const dataYRange = dataYMax.value - dataYMin.value;

const numYTicks = 15;

const barPlotWidth = xAxisLength / widget.data.length;


  
widget.data.sort(function(a, b) {
  var c = new Date(a.date);
  var d = new Date(b.date);
  return c-d;
});


	return (
        <Fragment>
            <div className="widget-title">{widget.title} 
           {widget.series.map((series)=>{
             return(
               
               <div > 
                 {series.name} 
                 <svg width='20px' height='20px'>
                

                 
                 <rect
                 x={'10'}
                 y ={'10'}
                 width={'10'}
                 height={'10'}
                 fill={series.color}
                 />
                 
                 </svg>
                  </div>
             )
           })}

           
           
            
            </div>
            <div className="diagram">
            <svg width={SVG_WIDTH} height={SVG_HEIGHT}>
              
      {/* X axis */}

      <line
      
        x1={x0}
        y1={xAxisY}
        x2={x0 + xAxisLength}
        y2={xAxisY}
        
      />
     
    
      <text x={x0 + xAxisLength + 5} y={xAxisY + 4}>
        months
      </text>

      {/* Y axis */}
      <line x1={x0} y1={y0} x2={x0} y2={y0 + yAxisLength} stroke="grey" />
      {Array.from({ length: numYTicks }).map((_, index) => {
        const y = y0 + index * (yAxisLength / numYTicks);

        const yValue = Math.round(dataYMax.value - index * (dataYRange / numYTicks));

        return (
          <g key={index}>
            <line x1={x0} y1={y} x2={x0 - 5} y2={y} stroke="grey" />
            <text x={x0 - 5} y={y + 5} textAnchor="end">
              {yValue}
            </text>
          </g>
        );
      })}
      <text x={x0} y={y0 - 8} textAnchor="middle">
        
    $$$
      </text>

      {/* Bar plots */}
      {widget.data.map((el, index) => {
        const x = x0 + index * barPlotWidth;

        const yRatio = (el.value - dataYMin.value) / dataYRange;

        const y = y0 + (1 - yRatio) * yAxisLength;
        const height = yRatio * yAxisLength;

        const sidePadding = 10;
     

        return (
          <g key={index}>
            <rect
              x={x + sidePadding / 2}
              y={y}
              width={barPlotWidth - sidePadding}
              height={height}
              fill={el.seriesId===1? 'red':'green'}
            />
            
            <text x={x + barPlotWidth / 4} y={xAxisY + 16} textAnchor="middle">
        {index}
            </text>
          </g>
        );
      })}

    </svg>

     
       
   

            
            </div>
        </Fragment>
    );
});
