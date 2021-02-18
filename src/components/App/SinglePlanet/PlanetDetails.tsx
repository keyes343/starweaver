import * as React from 'react';
import { useState, useEffect } from 'react';
import { t } from './index';

import Modal from './Modal';

export interface PlanetDetailsProps {
    planet: t.planet
}
 
const PlanetDetails: React.FC<PlanetDetailsProps> = ({planet}:PlanetDetailsProps) => {
    
    const style = React.useMemo(()=>{
        return {
            wrapper0: {
                // border: '1px solid red'
            },
            planetName:{
                fontSize: '2rem',
                padding:'2rem',
                // border:'2px solid red'
            },
            grid: {
                overflow: "hidden",
                // border:'2px solid red',
                display:'grid',
                gridTemplateColumns: `repeat(12,auto)`,
                gridTemplateRows: 'auto',
                gridAutoColumns: 'auto',
                gridAutoRows: 'auto',
                height:'auto', width:'auto',
            },
            flex_wrapper: {
                diplay:'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                // border:'2px solid blue'
            },
            flex_cell: {
                // border: '2px solid green',
                fontSize:'1.3rem',
                padding:'0.3rem'
            }
        }
    },[])

    const header = [

        "name",
        "rotation_period",
        "orbital_period",
        "diameter",
        "climate", 
        "gravity", 
        "terrain",
        "surface_water",
        "population",

        // "url",
        // "actions"
    ]
    
    const dates = [
        "created",
        "edited",    
    ]

    const count = [
        'residents','films'
    ]

    const planetProperties = () => {
        return [...header, ...dates, ...count].map((key,i)=>{
            if(t.hasKey(planet,key)){
                return (
                    <div key={i} style={style.flex_cell} >
                        {
                            count.includes(key) ? `${planet[key].length} ${key} ` :

                            `${ planet[key]}`
                        }
                    </div>  
                )
            }
        })
    }

    const [showModal, setShowModal] = useState(false);

    return ( 
        <div style={style.wrapper0} >

            {
                showModal && <Modal
                planet={planet}
                x={{showModal,setShowModal}} />
            }
            <div style={style.planetName} >
                {planet.name}
            </div>

            <div style={{...style.flex_wrapper, padding:'1rem', }} >

                <div style={{display:'flex',flexDirection:'row' }} >
                    <div  >
                        {
                            [...header, ...dates, ...count].map((key,i)=>{
                                return(
                                    <div key={i} style={{...style.flex_cell}} >
                                        {key}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div style={{ margin:'0 1rem'}} >
                        {planetProperties()}
                    </div>

                    <div style={{ display:'flex', padding:'2rem', flex:'1',
                        alignItems:'center',justifyContent:'center'
                    }} >
                        <div style={{fontSize:'2rem', textAlign:'center', border:'1px solid', borderRadius:'10px', padding:'2rem', cursor:'pointer'}}
                            onMouseEnter={(e)=>{
                                e.currentTarget.style.backgroundColor = 'lightblue';
                            }}
                            onMouseLeave={(e)=>{
                                e.currentTarget.style.backgroundColor = '';
                            }}
                            onClick={()=> setShowModal(true)}
                        >
                            Edit Planet Details
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default PlanetDetails;