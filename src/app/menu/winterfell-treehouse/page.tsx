'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import '/styles.css';
export default function Page() {

    const menuData = [
        // Tea and Coffee Category
        {
          category: "Tea and Coffee",
          items: [
            { name: "Black Tea", price: 20, thumbnail: "/images/black-tea.jpg" },
            { name: "Milk Tea", price: 30, thumbnail: "/images/milk-tea.jpg" },
            { name: "Black Coffee", price: 30, thumbnail: "/images/black-coffee.jpg" },
            { name: "Milk Coffee", price: 60, thumbnail: "/images/milk-coffee.jpg" },
          ]
        },
      
        // Cold Drinks Category
        {
          category: "Cold Drinks",
          items: [
            { name: "Lemon Water", price: 20, thumbnail: "/images/lemon-water.jpg" },
            { name: "Cold Coffee", price: 100, thumbnail: "/images/cold-coffee.jpg" },
            { name: "Lemon Soda", price: 50, thumbnail: "/images/lemon-soda.jpg" },
          ]
        },
      
        // Shakes Category
        {
          category: "Shakes",
          items: [
            { name: "Banana", price: 120, thumbnail: "/images/banana-shake.jpg" },
            { name: "Mango", price: 120, thumbnail: "/images/mango-shake.jpg" },
          ]
        },
      
        // Breakfast Category
        {
          category: "Breakfast",
          items: [
            { name: "Plain Parantha", price: 50, thumbnail: "/images/plain-parantha.jpg" },
            { name: "Aalu Parantha", price: 80, thumbnail: "/images/aalu-parantha.jpg" },
            { name: "Gobhi Parantha", price: 80, thumbnail: "/images/gobhi-parantha.jpg" },
            { name: "Paneer Parantha", price: 100, thumbnail: "/images/paneer-parantha.jpg" },
            { name: "Aalu Pyaz Parantha", price: 80, thumbnail: "/images/aalu-pyaz-parantha.jpg" },
            { name: "Egg Parantha", price: 90, thumbnail: "/images/egg-parantha.jpg" },
          ]
        },
      
        // Omeltes Category
        {
          category: "Omlates",
          items: [
            { name: "Plain Omlt.", price: 50, thumbnail: "/images/plain-omlette.jpg" },
            { name: "Bread Omlt.", price: 100, thumbnail: "/images/bread-omlette.jpg" },
            { name: "Cheese Omlt.", price: 150, thumbnail: "/images/cheese-omlette.jpg" },
          ]
        },
      
        // Tosts Category
        {
          category: "Tosts",
          items: [
            { name: "Plain", price: 20, thumbnail: "/images/plain-toast.jpg" },
            { name: "Butter", price: 40, thumbnail: "/images/butter-toast.jpg" },
            { name: "Honey", price: 50, thumbnail: "/images/honey-toast.jpg" },
          ]
        },
      
        // Sandwich Category
        {
          category: "Sandwich",
          items: [
            { name: "Veg", price: 100, thumbnail: "/images/veg-sandwich.jpg" },
            { name: "Chicken", price: 150, thumbnail: "/images/chicken-sandwich.jpg" },
            { name: "Egg", price: 120, thumbnail: "/images/egg-sandwich.jpg" },
            { name: "Cheese", price: 150, thumbnail: "/images/cheese-sandwich.jpg" },
          ]
        },
      
        // ... Add the rest of your categories in a similar manner
      ];

    const categories = new Set(menuData.map(category => category.category));
    const [selectedCategory, setSelectedCategory] = useState<any>(null); // Initial state set to null

    useEffect(() => {
        setSelectedCategory('All'); // Set the initial state after the component mounts
    }, []);
    // Filtered menu data based on selected category
    const filteredMenuData = selectedCategory === 'All' ? menuData : menuData.filter(category => category.category === selectedCategory);

    return (
        <div className="menu-container flex flex-col gap-2">
            <div className='flex flex-col gap-2 justify-center items-center
     text-center bg-slate-950 text-white p-5 font-serif tracking-widest rounded-lg'>
        <div className='w-20 h-20 mx-auto   p-1 bg-white rounded-full'>
            <Image src='/images/winterfell/winterfell.jpeg' alt='winterfell logo'
            height={100} width={100} style={{height:'100%' , width:'100%',objectFit:'cover'}}
            className='rounded-full'/>
        </div>
        <h1 className='text-4xl uppercase  '>Food Menu</h1>
        <h2>Winterfell Treehouse Jibhi</h2>
    </div>

            <section className="category-section sticky top-0 bg-white rounded-lg">
                
                   
                <ul
        
         className=' flex overflow-scroll gap-3 p-3 w-[95%] mx-auto text-sm border-b border-blue-950'
        
      >
        
        <li className={`min-w-fit bg-teal-100 p-2 rounded-md ${selectedCategory === 'All' ? 'bg-teal-500 text-white' : ''}`}
           onClick={() => setSelectedCategory('All')}>
             All 
                        </li>
      
                        {
                        [...categories].map(category => (
                            <li
                                key={category}
                                className={`border  border-slate-600 min-w-fit w-20  p-2 rounded-md ${selectedCategory === category ? 'bg-teal-500 text-white' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </li>
                        ))
                    }
      
      
                </ul>
            </section>

            {/* Display filtered menu items */}
            {filteredMenuData.map((category) => (
                <section key={category.category} className='bg-gray-100 px-4 flex flex-col gap-3 py-5'>
                    <h2 className='bold text-3xl'>{category.category}</h2>
                    <div className="item-grid flex flex-col gap-4 ">
                        {category.items.map((item) => (
                            <div className="item-card flex gap-4 bg-teal-300 p-4 rounded-md" key={item.name}>
                                <div className='h-16 w-16'>
                                    <Image
                                        src='https://cdn.pixabay.com/photo/2016/10/13/11/44/chocolates-1737503_1280.jpg'
                                        alt={item.name}
                                        height={60}
                                        width={60}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        className='rounded-full'
                                    />
                                </div>
                                <div>
                                    <h3 className='font-bold'>{item.name}</h3>
                                    <p>₹{item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}
