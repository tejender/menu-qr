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
            { name: "Black Tea", price: 20, thumbnail: "black-tea.png" },
            { name: "Milk Tea", price: 30, thumbnail: "milk-tea.webp" },
            { name: "Black Coffee", price: 30, thumbnail: "black-coffee.jpeg" },
            { name: "Milk Coffee", price: 60, thumbnail: "milk-coffee.jpeg" },
          ]
        },
      
        // Cold Drinks Category
        {
          category: "Cold Drinks",
          items: [
            { name: "Lemon Water", price: 20, thumbnail: "lemon-water.jpeg" },
            { name: "Cold Coffee", price: 100, thumbnail: "cold-coffee.png" },
            { name: "Lemon Soda", price: 50, thumbnail: "lemon-soda.jpeg" },
          ]
        },
      
        // Shakes Category
        {
          category: "Shakes",
          items: [
            { name: "Banana Shake", price: 120, thumbnail: "banana-shake.jpeg" },
            { name: "Mango Shake", price: 120, thumbnail: "mango-shake.webp" },
          ]
        },
      
        // Breakfast Category
        {
          category: "Breakfast",
          items: [
            { name: "Plain Parantha", price: 50, thumbnail: "plain-parantha.jpeg" },
            { name: "Aalu Parantha", price: 80, thumbnail: "aalu-parantha.jpeg" },
            { name: "Mix Parantha", price: 80, thumbnail: "mix-parantha.webp" },
            { name: "Paneer Parantha", price: 100, thumbnail: "paneer-parantha.jpeg" },
            { name: "Aalu Pyaz Parantha", price: 80, thumbnail: "pyaz-parantha.jpeg" },
            { name: "Egg Parantha", price: 90, thumbnail: "egg-parantha.jpeg" },
          ]
        },
      
        // Omeltes Category
        {
          category: "Omlates",
          items: [
            { name: "Plain Omlatte", price: 50, thumbnail: "plain-omelette.jpeg" },
            { name: "Bread Omlatte", price: 100, thumbnail: "bread-omelette.jpeg" },
            { name: "Cheese Omlatte", price: 150, thumbnail: "cheese-omelette.jpeg" },
          ]
        },
      
        // Tosts Category
        {
          category: "Tosts",
          items: [
            { name: "Plain toast", price: 20, thumbnail: "plain-toast.jpeg" },
            { name: "Butter toast", price: 40, thumbnail: "butter-toast.webp" },
            { name: "Honey toast", price: 50, thumbnail: "honey-toast.jpeg" },
          ]
        },
      
        // Sandwich Category
        {
          category: "Sandwich",
          items: [
            { name: "Veg Sandwich", price: 100, thumbnail: "veg-sandwich.jpeg" },
            { name: "Chicken Sandwich", price: 150, thumbnail: "chicken-sandwich.jpeg" },
            { name: "Egg Sandwich", price: 120, thumbnail: "egg-sandwich.jpeg" },
            { name: "Cheese Sandwich", price: 150, thumbnail: "cheese-sandwich.jpeg" },
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
        <div className="menu-container flex flex-col gap-2 mb-16">
            <div className='h-[200px] w-[200px] mx-auto flex flex-col gap-2 justify-center items-center
     text-center bg-slate-950 text-white p-5 font-serif tracking-widest rounded-full z-20
     border-8 border-white'>
        <div className='w-20 h-20 mx-auto   p-1 bg-white rounded-full'>
            <Image src='/images/winterfell/winterfell.jpeg' alt='winterfell logo'
            height={100} width={100} style={{height:'100%' , width:'100%',objectFit:'cover'}}
            className='rounded-full'/>
        </div>
        <h1 className='text-xl uppercase  '>Food Menu</h1>
        <h2 className='text-xs mx-5'>Winterfell Treehouse </h2>
    </div>

            {/* Display filtered menu items */}
            <div className='bg-slate-200 w-full pt-20 -mt-24 rounded-3xl'>

{filteredMenuData.map((category) => (
    <section key={category.category} className=' px-2 flex flex-col gap-3 py-5'>
        <h2 className='bold text-xl font-serif text-center'>{category.category}</h2>
        <div className="item-grid flex flex-wrap gap-4 ">
            {category.items.map((item, index) => (
                <div
                    className={`item-card ${category.items.length % 2 !== 0 && index === category.items.length - 1 ?
                         'w-[98%] mx-auto h-[150px] flex-row gap-5 justify-start ' : 'w-[47%] flex-col h-[200px] justify-center'}
                      flex  items-center  gap-4 bg-gray-50 p-1  rounded-md`}
                    key={item.name}
                >
                    <div className='h-20 w-20'>
                        <Image
                            src={`/images/winterfell/food-icon/${item.thumbnail}`}
                            alt={item.name}
                            height={60}
                            width={60}
                            style={{ width: '100%', height: '100%',objectFit:'cover'}}
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

<section className=" w-full fixed bottom-0 left-0 category-section   bg-white rounded-lg ">
 <ul
   className='overflow-scroll flex  gap-3 p-5 w-[95%] mx-auto text-sm border-b border-blue-950 '>
        
        <li className={`min-w-fit  p-2 rounded-full border  border-[#FEBD2D] ${selectedCategory === 'All' ? 'bg-[#FEBD2D] text-white' : ''}`}
           onClick={() => setSelectedCategory('All')}>
             All 
                        </li>
      
                        {
                        [...categories].map(category => (
                            <li
                                key={category}
                                className={`border  border-[#FEBD2D] min-w-fit w-20  p-2 rounded-full ${selectedCategory === category ? 'bg-[#FEBD2D] text-white' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </li>
                        ))
                    }
      
      
                </ul>
            </section>
        </div>
    );
}
