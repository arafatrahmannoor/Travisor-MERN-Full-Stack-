import { Link } from "react-router";


const StayCard = ({ type, country, image, price }) => (
    <div className="w-full md:w-1/3 p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={image} alt={type} className="w-full h-48 object-cover" />
            <div className="p-6 text-center">
                <h5 className="text-lg font-semibold"><i className="bi bi-buildings"></i> {type}</h5>
                <h5 className="text-lg font-semibold mt-2"><i className="bi bi-geo-alt"></i> {country}</h5>
                <p className="text-sm text-gray-600 mt-4">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <Link
                    to="/payment"
                    className="inline-block mt-6 bg-[#1C7EB7] text-white px-4 py-2 rounded hover:bg-[#166a97] transition"
                >
                    {price}
                </Link>
            </div>
        </div>
    </div>
);

export default StayCard;