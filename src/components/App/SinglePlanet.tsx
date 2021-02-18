import * as React from 'react';
import { useState, useEffect } from 'react';
import { t,c } from '../index';

import { useParams, Route, Switch } from 'react-router-dom';

import { Residents, Films, PlanetDetails } from './SinglePlanet/index';

export interface SinglePlanetProps {
    
}
 
const SinglePlanet: React.FC<SinglePlanetProps> = () => {

    const params = useParams<{planet:string}>();
    const ctx = c.UseState()!;
    const dispatch = c.UseDispatch()!;

    const [selectedPlanet, setSelectedPlanet] = useState<false|t.planet>(false);

    useEffect(() => {
        if(!selectedPlanet && ctx.allPlanets ){
            const planet = ctx.allPlanets.find((obj,i)=>{
                return obj.name===params.planet;
            })
            if(planet){
                setSelectedPlanet(planet);
            }
        }
    }, [ctx.allPlanets, params.planet, selectedPlanet]);

    return ( 
        <div>
            <Switch>
                <Route exact path={`/${params.planet}`} >
                    {
                        selectedPlanet && <PlanetDetails planet={selectedPlanet} />
                    }
                </Route>
                <Route exact path={`/${params.planet}/films`} >
                    {
                        selectedPlanet && <Films planet={selectedPlanet} />
                    }
                </Route>
                <Route exact path={`/${params.planet}/residents`} >
                    {
                        selectedPlanet && <Residents planet={selectedPlanet} />
                    }
                </Route>
            </Switch>
        </div>
     );
}
 
export default SinglePlanet;