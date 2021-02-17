import * as React from 'react';
import { useState, useEffect } from 'react';
import { t,c,d } from '../../index';
import axios from 'axios';
import Tablify from './Tablify';

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

    // const style = React.useMemo(()=>{
    //     return {
    //         overflowing:{
    //             overflow:'auto'
    //         },
    //         planetName:{
    //             fontSize: '2rem',
    //             padding:'2rem',
    //             border:'2px solid red'
    //         },
    //         grid_wrapper: {
    //             overflow: "hidden",
    //             border:'2px solid red',
    //             display:'grid',
    //             gridTemplateColumns: 'repeat(8,auto)',
    //             gridTemplateRows: 'auto',
    //             gridAutoColumns: 'auto',
    //             gridAutoRows: 'auto',
    //             height:'auto', width:'auto',
    //         },
    //         leftbox:{
    //             border: '2px solid blue',
    //             padding: '2rem',
    //         },
    //         rightbox:{
    //             border: '2px solid green',
    //             padding: '2rem',
    //         },

    //         headerCell:{
    //             border: '1px solid orange',
    //             maxWidth: '15rem',
    //             overflow: 'hidden',
    //             padding: '1rem',
    //             fontWeight: "bold" as 'bold',
    //             fontSize: '1.1rem',
    //             textTransform:'uppercase' as 'uppercase'
    //         },
    //         datacell:{
    //             borderBottom: '1px solid',
    //             padding: '1rem',
    //             overflow: 'hidden',
    //             fontSize: '1.3rem',
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //         }
    //     }
    // },[])

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
        <div >
            {/* HELLOOOOO */}
            <Tablify
                planet ={planet}
                header={header}
                actions={actions}
                planetPropertyName='films'
            />
        </div>
     );
}
 
export default Films;