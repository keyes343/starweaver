import './Planets.css';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '../Grid';
import { t,c } from '../index';
import axios from 'axios';

import { useHistory } from 'react-router-dom';

export interface PlanetsProps {
  
}
 
const Planets: React.FC<PlanetsProps> = () => {
  const history = useHistory();

  const ctx = c.UseState()!;
  // const dispatch = c.UseDispatch()!;


  const [data, setData] = React.useState<t.data|false>(false);

  const wrapData = React.useCallback(async() => {
    if(ctx.allPlanets){
      const header = [
        'name',
        'rotation_period',
        'orbital_period',
        'diameter',
        'climate',
        'gravity',
        'terrain',
        'surface_water',
        'population'
      ]
      const data_ : t.data = {
        values: ctx.allPlanets,
        header,
        actions: [
          {
            label: 'Go to Films',
            action: (row:t.planet) => { 
              console.log({row});
              history.push(`/${row.name}/films`);
              console.log(`redirect to grid with ${row.films.length} Films`)
          }
          },
          {
            label: 'Go to Residents',
            action: (row:t.planet) => { 
              history.push(`/${row.name}/residents`);
              console.log(`redirect to grid with ${row.residents.length} Residents`)
            }
          }
        ]
      }

      setData(data_)
    }
  },[ctx.allPlanets, history])

  useEffect(() => {
    wrapData();
  }, [wrapData]);


  return ( 
    <div className='App'>
      {
        data ? <Grid data={data} /> : 'LOADING WAIT ....'
      }
    </div>
   );
}
 
export default Planets;