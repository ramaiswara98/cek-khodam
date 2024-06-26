import React, { useState,useRef } from 'react'
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, doc, setDoc, getDoc } from "firebase/firestore"; 
import { toPng } from 'html-to-image';


import KhodamList from '../data/khodam.json'
import NamaList from '../data/nama.json'
import {app} from '../firebase/firebase'
import './Home.css'

function Home() {
    const [khodamList, setKhodamList] = useState(KhodamList);
    const [namaList, setNamaList] = useState(NamaList);
    const [khodam, setKhodam] = useState(null);
    const [nama, setNama] = useState('');
    const [loading, setLoading] = useState(false);
    const elementRef = useRef(null);

    const cekOnClick = async() => {
        setLoading(true);
        checkFirebase(nama);
        if(nama.length<3){
            
        }else{
            const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, '');
            const cekNama = normalizeString(nama);
            console.log(cekNama);
            const exist = await checkFirebase(cekNama);
            console.log(exist);
            if(exist != '0'){
                console.log(exist);
                setKhodam(khodamList[exist]);
                setLoading(false);
            }else{
                const randNum =  Math.floor(Math.random()*51);
                setKhodam(khodamList[randNum]);
                const normalizeString = (str) => str.toLowerCase().replace(/\s+/g, '');
                const cekNama = normalizeString(nama);
                addFirebase(cekNama, randNum);
                setLoading(false);
            }
        }
        
    }
    const htmlToImageConvert = () => {
        toPng(elementRef.current, { cacheBust: false })
          .then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "cek-khodam.png";
            link.href = dataUrl;
            link.click();
          })
          .catch((err) => {
            console.log(err);
          });
      };

    const checkFirebase = async(newnama) => {
        const db = getFirestore(app);
        const fbNama = doc(db, "nama",newnama);
        const docSnap =  await getDoc(fbNama);
        if(docSnap.exists){
            if(docSnap.data() != undefined){
                const data =docSnap.data();
                const khodamNumber =  data.khodam;
                return khodamNumber
            }else{
                return "0";
            }
            
        }else{
            return "0";
        }

 
    }

    const addFirebase = async(newnama,kd) => {
        const db = getFirestore(app);
        const coll = collection(db, "nama");
        await setDoc(doc(coll,newnama),{
            khodam:kd
        });
    }


  return (

    <div className='flex justify-center flex-col items-center sm:mt-28 bgs'>
    <div className='flex flex-col justify-center items-start mb-3'>
    <h1 className='text-5xl font-bold text-white font-custom text-red-500'>Cek Khodam</h1>
    <p className='text-white font-sans'>by @rama_iswara7</p>
    </div>
    
    {khodam ? (
        <>
        <div className='w-72 sm:w-96  rounded-md p-4 flex flex-col justify-center items-center card-cos mt-4' ref={elementRef}>
        <h1 className='text-sm font-bold text-white mb-4'>Khodam <span className='underline'>{nama}</span> adalah..</h1>
        <img src={'/images/khodam/'+khodam.id+'.jpeg'} style={{width:72,height:72}}/>
        <h1 className='text-2xl font-bold text-white'>{khodam.name}</h1>
        <p className='text-white'>{khodam.description}</p>
        <div>
            
        </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-2'>
        <button className='bg-red-500 py-2 px-4 rounded-lg text-white mt-3 flex flex-row gap-1 items-center justify-center' onClick={()=>{htmlToImageConvert()}}><img src='/images/download-circular-button.png' width={16}/>Download</button>  
        <button className='bg-red-500 py-2 px-4 rounded-lg text-white mt-3 flex flex-row gap-1 items-center' onClick={()=>{setNama('');setKhodam(null)}}><img src='/images/ball.png' width={16}/>Coba Nama Lain</button>
       </div>
        </>
    ):(<>
    <div className='bg-white rounded-lg items-center justify-center flex w-72 p-4 mt-2 sm:w-96' id='form'>
        <div className='form flex sm:flex-row flex-col items-star sm:items-end justify-center sm:align-middle gap-3 sm:gap-0'>
        <div className='input-nama'>
        <p className='font-bold text-sm p-1'>Masukkan Nama Kamu</p>
        <input type='text' style={{borderColor:'#EF4444'}} className='py-2 sm:mr-8 border-2 px-2 rounded-lg border-red-57 ' name='nama' value={nama} onChange={(e)=>{setNama(e.target.value)}} placeholder='Abe'/> 
        </div>
       <button className='bg-red-500 py-2 px-4 rounded-lg text-white flex flex-row items-center justify-center gap-1' onClick={cekOnClick}><img src='/images/ball.png' width={16}/>Cek</button>
       </div>
    </div>
        {loading?(
            <div className='flex flex-col justify-center items-center'>
            <img src='/images/loading.gif' style={{width:92}}/>
            <p className='text-white'>Sedang mengecek khodam mu... </p>
            </div>
        ):(<></>)}
    

    </>)}
    <div className='flex flex-col items-center justify-center gap-4 mt-10'>
        <button className='bg-red-500 py-2 px-4 rounded-lg text-white flex flex-row items-center gap-1 mt-9' onClick={()=>{window.location.href="https://trakteer.id/rama_iswara7/tip"}}><img src='https://cdn.trakteer.id/images/embed/trbtn-icon.png' style={{width:12}} className='animate-bounce'/>Donasi di Trakteer</button>
        <p className='text-white underline cursor-pointer' onClick={()=>{window.location.href='/list-donasi'}}>Lihat siapa aja yang udah donasi 😁 </p>
    </div>
    <div className='flex flex-col justify-center items-center mt-12'>
        <p className='text-white'>Made with ❤ by</p>
        <div className='flex flex-col sm:flex-row gap-5 mt-3'>
            {/* <div className='flex flex-row gap-1 items-center'>
                <img src='/images/instagram.png' className='bg-white rounded-xl border'/>
                <p className='text-white'>rama_iswara7</p>
            </div> */}
            <div className='flex flex-row gap-1 items-center'>
                <img src='/images/tiktok.png' className='bg-white rounded-xl border'/>
                <p className='text-white'>@cekkhodam.pro</p>
            </div>
            <div className='flex flex-row gap-1 items-center'>
                <img src='/images/tiktok.png' className='bg-white rounded-xl border'/>
                <p className='text-white'>rama_iswara7</p>
            </div>
            
        </div>
    </div>
    </div>
  )
}

export default Home