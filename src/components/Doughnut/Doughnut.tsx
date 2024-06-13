import { Doughnut } from 'react-chartjs-2';
import './Doughnut.css';
import React from 'react';
interface ChartData{
    numbers:number[],
    label:string,
}
export const CustomDoughunt:React.FC<ChartData> = ({numbers,label})=>{
    const data = {       
        labels: ['Food', 'Electricity', 'Restaurant', 'Vacation', 'Healthcare', 'Gaming'],
        datasets: [
          {
            label: 'Coupons',
            data: [numbers[0], numbers[1],
            numbers[2], numbers[3],
            numbers[4], numbers[5]],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 2,
          },
        ],
      };
    const options = {
        plugins: {
          legend: {
            position: 'right' as const, 
            labels: {
              boxWidth: 20,
              outside: true,
            },
          },
        },
        cutout: '60%',
        title: {
          display: true,
          text: 'Doughnut Chart',
        },
      };
    return (<div className='DoughnutContainer'>
        <div className='DoughnutContainerBackGround'>
           <div> {label}</div>
            <Doughnut  data={data} options={options}/>
            </div>
        </div>)
}