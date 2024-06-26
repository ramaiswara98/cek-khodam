import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'

function Donasi() {
    const [currentPage, setCurrentPage] = useState(1);
    const [donaturData, setDonaturData] = useState([]);
    const [pageData, setPageData] = useState();
    const [total_page, setTotalPages] = useState(1);

    useEffect(()=>{
        getHistory('1');
    },[])

    
    const getHistory = (current) => {
        const base_url = "https://cek-khodam-api.vercel.app/donatur/get-data";
        axios.get(base_url+'?limit=10&page='+current).then((res)=>{
            const dataD = res.data.data.data; 
            const dataP = res.data.data.meta.pagination;
            setDonaturData(dataD);
            setPageData(dataP);
            setTotalPages(dataP.total_pages);
        }).catch((e)=>{console.error(e)})
    }

    const nextButton = () => {
        let current = currentPage;
        const total = total_page;
        if(current == total){
            console.log("food")
        }else{
            current = current+1;
            setCurrentPage(current);
            getHistory(current);
        }

    }
    const backButton = () => {
        let current = currentPage;
        const total = total_page;
        if(current == 1){

        }else{
            current = current-1;
            setCurrentPage(current);
            getHistory(current);
        }

    }
  return (
    <div>
    <div className='flex flex-col justify-center items-center gap-5'>
        <h1 className='text-white text-3xl font-custom underline'>List Pendukung</h1>
        <p className='text-white cursor-pointer' onClick={()=>{window.location.href='/'}}>◀︎ Kembali ke halaman awal</p>
    </div>
    <div className='mt-24'>
        {donaturData.length > 0 ? 
            donaturData.map((donatur, index) => {
                let rank='1';
                if(donatur.quantity <= 5){
                    rank = '1';
                }
                if(donatur.quantity > 5 && donatur.quantity <= 20){
                    rank = '2';
                }
                if(donatur.quantity > 20 && donatur.quantity <= 50){
                    rank = '3';
                }
                if(donatur.quantity > 50){
                    rank = '4';
                }

                return(
                    <div key={donatur.updated_at} className='flex flex-col justify-center items-center mt-4'>
                        <div className='rounded-md w-72 sm:w-[400px] p-2 don-card flex flex-col justify-start items-start'>
                            <div className='text-white text-sm text-left flex flex-row gap-1 justify-center items-start'>
                            <img src={'/images/rank/'+rank+'.png'} className='sm:w-5 sm:h-5 w-5 h-5'/><p ><span className='font-bold'>{donatur.supporter_name}</span> mentraktir {donatur.quantity} Kopikap senilai Rp.{donatur.amount}</p>
                            </div>
                            
                            
                            <p className='relative mt-2 ml-5 text-sm border-2 bg-white text-gray-800 border-white/30 rounded-tl-none rounded-tr-lg rounded-br-lg rounded-bl-lg px-3 py-2 w-fit text-left'>{donatur.support_message}</p>
                        </div>
                    </div>
                )
            })
        :(<></>)}
    
    </div>
    <div className='flex flex-row justify-around mt-10'>
        <div>
            <p className='text-white font-sans'>Halaman {pageData?.current_page?pageData.current_page:0} dari {pageData?.total_pages?pageData.total_pages:0}</p>
        </div>
        <div className='flex flex-row gap-3'>
            <div onClick={()=>{backButton()}} className='bg-red-500 w-7 h-7 cursor-pointer'><svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFF"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg></div>
            <div onClick={()=>{nextButton()}} className='bg-red-500 w-7 h-7 cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFF"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></div>
        </div>
    </div>
    
    </div>
  )
}

export default Donasi