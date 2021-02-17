import * as React from 'react';
import { useState, useEffect } from 'react';
import { t,c,d } from '../../index';
import axios from 'axios';

import { useParams } from 'react-router-dom';

export interface FilmsProps {
    planet: t.planet;
}
 
const Films: React.FC<FilmsProps> = ({planet}:FilmsProps) => {

    // const params = useParams<{planet:string}>();
    const ctx = c.UseState()!;
    const dispatch = c.UseDispatch()!;

    const header = [ // text for display + button or not

        "title",
        "episode_id",
        
        "director",
        "producer",
        "release_date",

        "created",
        "edited",
        // "url",
        "actions"
    ]
    
    const actions = [
        "planets",
        "species",
        "opening_crawl",
        "starships",
        "vehicles",
        "characters"
    ]

    const style = React.useMemo(()=>{
        return {
            overflowing:{
                overflow:'auto'
            },
            planetName:{
                fontSize: '2rem',
                padding:'2rem',
                border:'2px solid red'
            },
            grid_wrapper: {
                overflow: "hidden",
                // border:'2px solid red',
                display:'grid',
                gridTemplateColumns: 'repeat(8,auto)',
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
                fontSize: '1.1rem',
                textTransform:'uppercase' as 'uppercase'
            },
            datacell:{
                borderBottom: '1px solid',
                padding: '1rem',
                overflow: 'hidden',
                fontSize: '1.3rem',
                display: 'flex',
                // justifyContent: 'center',
                alignItems: 'center',
            }
        }
    },[])

    const [films, setFilms] = useState<t.film[]|false>(false);


    const fetchFilms = React.useCallback(async()=>{
        if(!films){
            const urls = planet.films;

            const promises:any[] = [];
            urls.forEach(url=>{
                promises.push( axios.get(url) )
            })
            const results = await Promise.all([...promises]);
            if(results){
                const a = results.map((x,i)=>{
                    return x.data;
                });
                console.log({a})
                setFilms(a)
            }
        }
    },[films, planet.films])

    useEffect(() => {
        fetchFilms();
    }, [fetchFilms]);

    return ( 
        <div>
            <div style={style.planetName} >
                Planet - {planet.name}
            </div>


            <div style={style.overflowing} >
                <div style={style.grid_wrapper} >
                    {
                        header.map((head,i)=>{
                            return(
                                <div key={i} style={style.headerCell} >
                                    {head}
                                </div>
                            )
                        })
                    }


                    {/* MAP DATA */}
                    {
                        films && films.map((film,i)=>{
                            return header.map((head,j)=>{
                                if(head === 'actions'){
                                    return(
                                        <div key={`${i}${j}`}  style={{padding:'1rem'}}>
                                            {
                                                actions.map((action,k)=>{
                                                    return(
                                                        <div key={`${i}${j}${k}`}  >
                                                            <button >
                                                                {action}
                                                            </button>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }else return(
                                    <div key={`${i}${j}`} style={{...style.datacell }}  >
                                        {
                                            ['release_date','created','edited'].includes(head) && t.hasKey(film,head) ? 
                                            `
                                            ${new Date(film[head] as 'title').getFullYear()}-${new Date(film[head] as 'title').getMonth()}-${new Date(film[head] as 'title').getDate()}                                          
                                            ` 
                                            :
                                            t.hasKey(film,head) ? film[head] : 'blank'
                                        }
                                    </div>
                                )
                            })
                        })
                    }
                </div>
            </div>
            
        </div>
     );
}
 
export default Films;