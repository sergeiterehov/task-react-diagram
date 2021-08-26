import { useState, useEffect, useCallback, useMemo, memo, Fragment } from 'react';
import "./Diagram.css";

const months = {
    0: "Янв.",
    1: "Фев.",
    2: "Мар.",
    3: "Апр.",
    4: "Май.",
    5: "Июн.",
    6: "Июл.",
    7: "Авг.",
    8: "Сен.",
    9: "Окт.",
    10: "Ноя.",
    11: "Дек.",
};


export const Diagram = memo(function Diagram({ widget }) {


  const Chart = ({children, width, height}) => (
    <svg
      viewBox={`0 0 ${width} ${0.001*height}`}
      width={width}
      height={0.001*height}
    >
      {children}
    </svg>
  )
  
  const Bar = ({x, y, width, height, idColor, date}) => 
  {
    console.log(idColor)
    return(
    
    <rect
      x={x}
      y={y>0 ? 0.001*y : 0}
      width={width}
      height={height}
      fill = {idColor === 1 ?  'red' : 'green' }
      date ={date}
    
    />
  )}


  const itemWidth = 20

 
  const itemMargin = 5

  const dataLength = widget.data.length

  widget.data.sort(function(a,b){
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 :0;
  });
  const massagedData = widget.data.map(datum =>
    Object.assign({}, datum, { repos: datum.value * 0.25 })
  )

  const mostValue = massagedData.reduce((acc, cur) => {
    const { value } = cur
    return value > acc ? value : acc
  }, 0)
  
  const chartHeight = mostValue

  


	return (
        <Fragment>
            <div className="widget-title">{widget.title} 
            <div className='work'>
            Работа

            </div>
            <div className='you'>
            Youtube

            </div>
            
            </div>
            <div className="diagram">
            <Chart
      width={dataLength * (itemWidth + itemMargin)}
      height={chartHeight}
    >
      {massagedData.map((datum, index) => {
        const itemHeight = datum.value
        const idColor = datum.seriesId;
        console.log(idColor);
        const date = datum.date;

        return (
          <Bar
            key={datum.name}
            x={index * (itemWidth + itemMargin)}
            y={chartHeight - itemHeight}
            width={itemWidth}
            height={itemHeight}
            idColor = {idColor}
            date = {date}
          />
        )
      })}
    </Chart>
    <div>
      
    </div>

            
            </div>
        </Fragment>
    );
});
