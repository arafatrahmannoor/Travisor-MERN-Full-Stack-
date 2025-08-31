import React from 'react';
import { Helmet } from 'react-helmet';
import StayCard from './stays/StayCard';

const Stays2 = [
    {
        type: 'Hotels',
        country: 'Bangladesh',
        image: 'img/Stays/hotel.png',
        price: '$50/night',
    },
    {
        type: 'Resort',
        country: 'Bangladesh',
        image: 'img/Stays/resorts.png',
        price: '$70/night',
    },
    {
        type: 'Apartment',
        country: 'Bangladesh',
        image: 'img/Stays/apartment.png',
        price: '$60/night',
    },
    {
        type: 'Hotels',
        country: 'Thailand',
        image: 'img/Stays/hotel.png',
        price: '$50/night',
    },
    {
        type: 'Resort',
        country: 'Thailand',
        image: 'img/Stays/resorts.png',
        price: '$70/night',
    },
    {
        type: 'Apartment',
        country: 'Thailand',
        image: 'img/Stays/apartment.png',
        price: '$60/night',
    },
    {
        type: 'Hotels',
        country: 'Malaysia',
        image: 'img/Stays/hotel.png',
        price: '$50/night',
    },
    {
        type: 'Resort',
        country: 'Malaysia',
        image: 'img/Stays/resorts.png',
        price: '$70/night',
    },
    {
        type: 'Apartment',
        country: 'Malaysia',
        image: 'img/Stays/apartment.png',
        price: '$60/night',
    },
];



const Stays = () => {

    return (
        <div>
            <Helmet>
                <title>Stayes</title>
                <meta name="description" content="Find the best places to stay during your travels." />
            </Helmet>
            <div className="bg-gray-100 py-12">
                {/* Header Section */}
                <section className="text-center mb-12">
                    <div className="h-[650px] bg-[url('img/bgimg/fernando-alvarez-rodriguez-M7Gdd.jpg')] bg-cover bg-fixed relative mt-0" id="at-text">
                        <div className="text-center pt-[100px]  text-white text-shadow-lg   text-shadow-10xl">
                            <h2 className="text-[80px] font-bold">Stays</h2>
                            <h4 className="text-[40px] mt-2">Your Dream Place</h4>

                        </div>
                    </div>

                    <div className="pt-10">
                        <h2 className="text-3xl font-semibold mb-4">Find Your Next Stay</h2>
                        <hr className="mx-auto w-24 border-t-2 border-indigo-600" />
                    </div>
                </section>

                {/* Cards */}
                <section className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        {Stays2.map((stay, index) => (
                            <StayCard
                                key={`${stay.type}-${stay.country}-${index}`}
                                type={stay.type}
                                country={stay.country}
                                image={stay.image}
                                price={stay.price}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
export default Stays;