import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'

function Donasi() {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        getHistory();
    },[])

    const getHistory = async() => {
        const headers = {
            header:{
                Key:'trapi-dVnrZcFHmrIzFjRv1A3nNRxJ'
            }
        }
        await axios.get('https://api.trakteer.id/v1/public/supports?limit=10&page='+currentPage, {headers}).then((res)=>{
            console.log(res);
        }).catch((e)=>{console.error(e)})
    }
  return (
    <div>
    <div className='flex flex-col justify-center items-center gap-5'>
        <h1 className='text-white text-3xl font-custom underline'>List Pendukung</h1>
        <p className='text-white cursor-pointer'>◀︎ Kembali ke halaman awal</p>
    </div>
    <div className='flex flex-col justify-center items-center mt-20'>
        <div className='rounded-md w-[400px] p-2 don-card flex flex-col justify-start items-start'>
            <p className='text-white text-sm text-left'>Nama Kamu Nama KamuNama Kamu mentraktir 1 Kopikap senilai Rp.2000</p>
            <p className='bg-white w-fit px-2 rounded-md text-sm'>Pesan Kamu</p>
        </div>
    </div>
    </div>
  )
}

export default Donasi