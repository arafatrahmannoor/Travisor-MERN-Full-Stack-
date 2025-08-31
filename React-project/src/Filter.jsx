
const Filter = () => {
    return (
        <div>
            <section className="container mx-auto max-w-6xl px-6 py-12">
                <h3 className="text-3xl font-semibold text-indigo-600 mb-8">Filter Packages</h3>

                <form className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Destination Filter */}
                    <div>
                        <label htmlFor="destination" className="block mb-2 font-medium text-gray-700">
                            Destination
                        </label>
                        <select
                            id="destination"
                            name="destination"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">All Destinations</option>
                            <option>Paris</option>
                            <option>Tokyo</option>
                            <option>New York</option>
                            <option>London</option>
                            <option>Thailand</option>
                            <option>Indonesia</option>
                            <option>Bangkok</option>
                            <optgroup label="Bangladesh">
                                <option value="sundarban">Sundarban</option>
                                <option value="coxs-bazar">Cox's Bazar</option>
                                <option value="tanguar-haor">Tangaur Haor</option>
                                <option value="jaflong">Jaflong</option>
                                <option value="sajek">Sajek Valley</option>
                            </optgroup>
                        </select>
                    </div>

                    {/* Duration Filter */}
                    <div>
                        <label htmlFor="duration" className="block mb-2 font-medium text-gray-700">
                            Duration
                        </label>
                        <select
                            id="duration"
                            name="duration"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Any Duration</option>
                            <option>3-5 days</option>
                            <option>6-10 days</option>
                            <option>10+ days</option>
                        </select>
                    </div>

                    {/* Price Filter */}
                    <div>
                        <label htmlFor="price" className="block mb-2 font-medium text-gray-700">
                            Price Range
                        </label>
                        <select
                            id="price"
                            name="price"
                            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="">Any Price</option>
                            <option>$ - Budget</option>
                            <option>$$ - Midrange</option>
                            <option>$$$ - Luxury</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold px-6 py-3 rounded shadow hover:bg-indigo-700 transition duration-200"
                        >
                            Apply Filters
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Filter;