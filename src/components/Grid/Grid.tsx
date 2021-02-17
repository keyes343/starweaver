import './Grid.css';
import { t } from '../index';
import { Route,Switch } from 'react-router-dom'

// function Grid({data: {header = [], values = [], actions = []}}) {
//   return (
//     <table className='gridTable'>
//       <thead>
//         <tr>
//           {header.map(colName => <th key={colName}>{colName}</th>)}
//           {!!actions.length && <th>Actions</th>}
//         </tr>
//       </thead>
//       <tbody>
//         {values.map((row, index) => (
//           <tr key={index}>
//             {header.map((colName) => <td key={colName}>{row[colName]}</td>)}
//             {!!actions.length && 
//               <td className='gridActions'>
//                 {actions.map(({label, action}) => <button onClick={() => action(row)}>{label}</button>)}
//               </td>
//             }
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default Grid;

export interface GridProps {
  data: t.data
}
 
const Grid: React.FC<GridProps> = ({data}:GridProps) => {
  const { header, values, actions } = data;
  console.log({values,data})


  return ( 
    <div>
      {/* {values && values[0]? 'yes' : 'no'} */}
      <table className='gridTable'>
        <thead>
          <tr>
            {header.map(colName => <th key={colName}>{colName}</th>)}
            {!!actions.length && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {values.map((row, index) => (
            <tr key={index}>
              {header.map((colName) => t.hasKey(row,colName) && <td key={colName}>{row[colName]}</td>)}
              {!!actions.length && 
                <td className='gridActions'>
                  {actions.map(({label, action},i) => <button key={i} onClick={() => action(row)}>{label}</button>)}
                </td>
              }
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // <table className='gridTable'>
    //   <thead>
    //     <tr>
    //       {header && header.map(colName => <th key={colName}>{colName}</th>)}
    //       {actions && !!actions.length && <th>Actions</th>}
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {values && values.map((row, index) => (
    //       <tr key={index}>
    //         {header.map((colName) => t.hasKey(row,colName) && <td key={colName}>{row[colName]}</td>)}
    //         {!!actions.length && 
    //           <td className='gridActions'>
    //             {actions.map(({label, action}) => <button onClick={() => action(row)}>{label}</button>)}
    //           </td>
    //         }
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
   );
}
 
export default Grid;
