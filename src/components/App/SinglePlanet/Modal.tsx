import { ECHILD } from 'constants';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { t } from './index';

export interface ModalProps {
    planet:t.planet
    x:{
        showModal:any,
        setShowModal:any
    }
}
 
const Modal: React.FC<ModalProps> = ({x, planet}:ModalProps) => {

    const fields = [
        'name',
        'rotation_period',
        'orbital_period',
        'diameter',
        'climate',
        'gravity',
        'terrain',
        'surface_water'
    ]

    const modalBasic = {
        // border:'2px solid blue',
        backgroundColor:'rgba(0,0,0,0.8)',
        height:'100vh',
        width:'100vw',
        overflow:'hidden',
        left:'0',
        position: 'fixed' as 'fixed',
        zindx:'10',
        // color:'white',
        // padding:'2rem'
    }

    const toggleModal = (e:React.SyntheticEvent<HTMLDivElement>) => {
        console.log('step 1');
        if(e.currentTarget === e.target){
            console.log('step 2');
            x.setShowModal(false);
        }
    }

    const [newData, setnewData] = useState<{
        name:string,
        rotation_period: number,
        orbital_period: number,
        diameter: number,
        climate: string,
        gravity: string,
        terrain: string[],
        surface_water : number,
    }>({
        name: planet.name,
        rotation_period: parseInt(planet.rotation_period,10),
        orbital_period: parseInt(planet.orbital_period,10),
        diameter: parseInt(planet.diameter,10),
        climate: planet.climate,
        gravity: planet.gravity,
        terrain: planet.terrain.split(','),
        surface_water : parseInt(planet.surface_water,10),
    });

    // useEffect(() => {
    //     console.log({newData})
    // }, [newData]);

    const [dropdown, setDropdown] = useState(newData.terrain[0]);
    const [showDropdown, setShowDropdown] = useState(false);

    const inputChecker = (e:React.SyntheticEvent<HTMLInputElement>,check:'string'|'number') => {
        switch (check){
            // case 'string':
            //     if(e.)
            //     if(typeof e === 'string'){
            //         return true;
            //     }else {
            //         alert('Please enter only characters');
            //         return false;
            //     };
            case 'number':
                if(typeof e.currentTarget.value === 'number'){
                    return true;
                }else {
                    alert('Please enter only numbers');
                    return false;
                }
            default: return false;
        }

    }

    const inputify = (planet:t.planet, field:string) => {
        if(t.hasKey(planet,field) && t.hasKey(newData,field)){
            if(field === 'terrain'){
                return(
                    <div style={{border:'1px solid',width:'auto', position:'relative', padding:'0 0.2rem', fontSize:'1.1rem'}} onClick={()=> setShowDropdown(!showDropdown)} >
                        {dropdown}
                        
                        <div style={{position:'absolute',left:'0',top:`calc(100% + 5px)`,maxHeight: showDropdown? '10rem':'0', height:'auto',width:'100%',overflow:'hidden', backgroundColor:'white' }} >

                            <div style={{display:'flex', border:'2px solid', padding:'0 10px', flexDirection: 'column' }} >
                                {
                                    newData.terrain.map((landType,i)=>{
                                        return(
                                            <div key={i} onClick={()=> {
                                                setDropdown(landType);
                                                setShowDropdown(false);
                                            }} style={{color:'blue', cursor:'pointer', fontSize:'1.1rem'}} >
                                                {landType}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                )
            }else return(
                <div >
                    <input placeholder={field} value={newData[field]} 
                    style={{fontSize:'1.1rem'}}

                    onKeyDown={(e)=>{


                        if( e.nativeEvent.code[0] === 'K' && typeof newData[field] === 'number' ){
                            alert('You entered an alphabet. Please enter only number')
                        }else if( e.nativeEvent.code[0] === 'D' && typeof newData[field] === 'string' ){
                            alert('You entered a number. Please enter only alphabets')
                        }

                        // console.log({code:e.nativeEvent.code[0]})
                        // console.log( e.key, newData[field] )
                    }}

                    onChange={(e)=>{
                        // console.log('yes')

                        // if( e.nativeEvent.code[0] === 'K' && typeof newData[field] === 'number' ){
                        //     alert('You entered an alphabet. Please enter only number')
                        // }else if( e.nativeEvent.code[0] === 'D' && typeof newData[field] === 'string' ){
                        //     alert('You entered a number. Please enter only alphabets')
                        // }

                        setnewData({
                            ...newData,
                            [field]: e.currentTarget.value
                        })
                    }}
                    />
                </div>
            )
        }
    }

    return ( 
        <div style={{width:'auto'}} >
            <div style={modalBasic}  >
                <div style={{
                    // border: '2px solid green',
                    display: 'flex',
                    flexDirection: 'row',
                    width:'100%',height:'100%',
                    padding:'2rem',
                    justifyContent: 'center',alignItems: 'center'
                }}onClick={toggleModal} >
                    
                    <div style={{ backgroundColor:'white', padding:'2rem', borderRadius:'1rem'}} >
                        
                        {
                            fields.map((field,i)=>{
                                if(t.hasKey(planet,field)){
                                    return(
                                        <div key={i} style={{
                                            display:'flex',
                                            flexDirection: 'row',
                                            margin:'0.5rem 0'
                                        }} >
                                            <div style={{ width:'10rem', fontSize:'1.1rem' }} >
                                                {field}
                                            </div>

                                            <div style={{margin:'0 0 0 1rem' , flex:'1' }} >
                                                {inputify(planet,field)}
                                            </div>

                                        </div>
                                    )
                                }else return <div />
                            })
                        }


                        <div style={{color:'black', border:'2px solid maroon', borderRadius:'1rem', margin:'2rem 0 0', textAlign:'center', fontSize:'1.4rem',
                        cursor:'pointer'}} onClick={()=>{
                            x.setShowModal(false);
                            alert('Your data has been saved')
                        }} >
                            Submit
                        </div>
                    </div>

                </div>
            </div>
        </div>
     );
}
 
export default Modal;