import React , { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

const datacolor = [            
'#FF6384',
'#36A2EB',
'#FFCE56',
'#FFF176',
'#EF9A9A',
'#F48FB1',
'#CE93D8',
'#B39DDB',
'#9FA8DA',
'#90CAF9',
'#81D4FA',
'#80DEEA',
'#A5D6A7',
'#80CBC4',
'#C5E1A5',
'#E6EE9C',
'#FFE082',
'#FFCC80',
'#BCAAA4',
'#E0E0E0',
'#FF5722',
'#FF9800',
'#CDDC39',
'#8BC34A']


export default class DoughnutExample extends Component {
    constructor(props){
        super(props)
    }

  render() {
    if(Object.keys(this.props.prefStats).length!==0){
        console.log("herehere")
        console.log(this.props.prefStats)
    var label=[]
    var data1=[]

    Object.keys(this.props.prefStats).forEach(i=>{
        label.push(i)
    } )
    Object.values(this.props.prefStats).forEach(i=>{
        data1.push(i)
    } )
    const legend = {
        "display":false
    }
    const data = {
        labels:label,
        datasets: [{
            data:data1 ,
            backgroundColor: datacolor,
            hoverBackgroundColor: datacolor
        }]
    };
    return (
      <div>
        <Doughnut data={data} legend={legend} width={500} height={500} options={{
		maintainAspectRatio: true
	}}/>
      </div>
    );
  }else{
      return(
        <h4>Be the first one to make selection!!</h4>
      );
  }
}
};
