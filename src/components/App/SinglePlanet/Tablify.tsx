import * as React from 'react';
import { useState, useEffect } from 'react';
import {t} from './index';
import axios from 'axios';

export interface TablifyProps {
    planet: t.planet;
    header: string[];
    actions: string[];
    planetPropertyName: 'films'|'residents';
}

interface UnitedProperties extends t.film,t.planet {

}
 
const Tablify: React.FC<TablifyProps> = (props:TablifyProps) => {
    const {planet,header,actions,planetPropertyName} = props;

    const style = React.useMemo(()=>{
        return {
            overflowing:{
                overflow:'auto'
            },
            planetName:{
                fontSize: '2rem',
                padding:'2rem',
                // border:'2px solid red'
            },
            grid_wrapper: {
                overflow: "hidden",
                // border:'2px solid red',
                display:'grid',
                gridTemplateColumns: `repeat(${planetPropertyName==='films'?8:11},auto)`,
                gridTemplateRows: 'auto',
                gridAutoColumns: 'auto',
                gridAutoRows: 'auto',
                height:'auto', width:'auto',
            },
            leftbox:{
                border: '2px solid blue',
                padding: '2rem',
            },
            rightbox:{
                border: '2px solid green',
                padding: '2rem',
            },

            headerCell:{
                // border: '1px solid orange',
                // maxWidth: '15rem',
                overflow: 'hidden',
                padding: '1rem',
                fontWeight: "bold" as 'bold',
                fontSize: '1rem',
                textTransform:'uppercase' as 'uppercase'
            },
            datacell:{
                borderBottom: '1px solid',
                padding: '0 1rem',
                overflow: 'hidden',
                fontSize: '1.1rem',
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
            }
        }
    },[planetPropertyName])

    const [planetProperty, setPlanetProperty] = useState<false|UnitedProperties[]>(false); //t.film[]|t.residents[]|false


    const fetchProperty = React.useCallback(async()=>{
        if(!planetProperty){
            const urls = props.planet[props.planetPropertyName];

            const promises:any[] = [];
            urls.forEach(url=>{
                promises.push( axios.get(url) )
            })
            const results = await Promise.all([...promises]);
            if(results){
                const a = results.map((x,i)=>{
                    return x.data;
                });
                console.log({a,planetPropertyName})
                setPlanetProperty(a)
            }
        }
    },[planetProperty, planetPropertyName, props.planet, props.planetPropertyName])

    useEffect(() => {
        fetchProperty();
    }, [fetchProperty]);


    const datify = (obj:UnitedProperties,key:string) => {
        const focusKeys = ['created','edited'];
        if(t.hasKey(obj,key)){
            // if(planetProperty && t.hasKey(planetProperty,key)){
            //     return(
            //         <div key={`${Math.random()}`} style={{...style.datacell, border:'2px solid green' }}  >
            //             {
            //                 `
            //                 ${t.hasKey(planetProperty,key) && new Date(planetProperty[key] as any).getFullYear()}-${new Date(planetProperty[key] as any).getMonth()}-${new Date(planetProperty[key] as any).getDate()}                                          
            //                 ` 
            //             }
            //             date
            //         </div>
            //     )
            // }

            return(
                <div key={`${Math.random()}`} style={{...style.datacell }}  >
                    {
                        `
                        ${new Date(obj[key] as any).getFullYear()}-${new Date(obj[key] as any).getMonth()}-${new Date(obj[key] as any).getDate()}                                          
                        ` 
                    }
                </div>
            )

            
            // return focusKeys.map((key,i)=>{
            //     if(planetProperty && t.hasKey(planetProperty,key)){
            //         return(
            //             <div key={`${i}`} style={{...style.datacell, border:'2px solid green' }}  >
            //                 {/* {
            //                     `
            //                     ${new Date(planetProperty[key] as number).getFullYear()}-${new Date(planetProperty[key] as number).getMonth()}-${new Date(planetProperty[key] as number).getDate()}                                          
            //                     ` 
            //                 } */}
            //                 date
            //             </div>
            //         )
            //     }else return (
            //         <div style={{height:"2rem", width:'2rem', border:'2px solid red'}} >
            //             {key}
            //         </div>
            //     )
            // })
        }
    }

    return ( 
        <div>
            <div style={style.planetName} >
                Planet - {props.planet.name}
            </div>


            <div style={style.overflowing} >
                <div style={style.grid_wrapper} >
                    {/* TABLE HEADING ROW */}
                    {
                        props.header.map((head,i)=>{
                            return(
                                <div key={i} style={style.headerCell} >
                                    {head}
                                </div>
                            )
                        })
                    }


                    {/* MAP DATA */}
                    {
                        planetProperty && planetProperty.map((film,i)=>{
                            return props.header.map((head,j)=>{
                                if(head === 'actions'){
                                    return(
                                        <div key={`${i}${j}`}  style={{...style.datacell,padding:'0 1rem', width:'10rem', display:'flex',flexWrap:'wrap'}}>
                                            {
                                                props.actions.map((action,k)=>{
                                                    return(
                                                        <div key={`${i}${j}${k}`} style={{margin:'0.3rem'}} >
                                                            <button >
                                                                {/* {i} {j} {k} */}
                                                                {action}
                                                            </button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }else {
                                    if(['created','edited'].includes(head)){
                                        return datify(film,head);
                                    }else return <div  key={`${i}${j}`}  style={style.datacell} >
                                        {/* {planetProperty} */}
                                        { t.hasKey(film,head) && film[head] }
                                    </div>
                                }
                            })
                        })
                    }
                </div>
            </div>
            
        </div>
     );
}
 
export default Tablify;