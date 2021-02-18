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
            {header.map((colName,i) => {

              const getType = () => {
                const value = t.hasKey(values[0],colName) && values[0][colName];

                if(typeof value === 'string') {
                  if(/([a-z A-Z])\w+/.test(value)){ // contains characters
                    return 'string';
                  }else return 'number';
                }else if( Array.isArray(value) ) return 'array';
                
              }

              return(
                <th key={colName}>
                  {colName} <br/> {getType()}
                </th> 
              )})
            }

            {!!actions.length && <th>Actions</th>}


          </tr>
        </thead>

        <tbody >
          {values.map((row, index) => (
            <tr key={index} >
              {header.map((colName) => {
                if(t.hasKey(row,colName)){
                  if(colName === 'residents' || colName === 'films'){
                    return(
                      <td key={colName}>{row[colName].length}</td>
                    )
                  }else return <td key={colName}>{row[colName]}</td>
                }else return <div />;
              })}

              {!!actions.length && 
                <td className='gridActions'>
                  {actions.map(({label, action},i) => {
                    if(label === 'Go to Films' && !!row.films.length ){
                      return(
                        <button key={i} onClick={() => action(row)}>{label}</button>
                        )
                    } else if( label === 'Go to Residents' && !!row.residents.length ) {
                      return(
                        <button key={i} onClick={() => action(row)}>{label}</button>
                        )
                    } else if( label === 'Planet Details' ) {
                      return(
                        <button key={i} onClick={() => action(row)}>{label}</button>
                        )
                    } else return <div key={i} />
                    })
                  }                  
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
