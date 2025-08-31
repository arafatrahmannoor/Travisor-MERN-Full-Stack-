import { Helmet } from "react-helmet";
import Pakage from "../Pakage";


const SudarBan = () => {

const comments = [
  { name: 'demo', date: 'May 13, 2014 at 4:25 pm', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, nostrum?' },
  { name: 'admin', date: 'May 13, 2014 at 4:25 pm', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ducimus soluta nihil.' },
  { name: 'demo', date: 'May 13, 2014 at 4:25 pm', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, nostrum?' }
];

const recentPosts = [
  { img: '../img/attraction/Tangaur.png', link: 'tangurhaur.html', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' },
  { img: '../img/attraction/pahar.png', link: 'paharpur.html', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' },
  { img: '../img/attraction/sajek.png', link: 'sajek.html', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' },
  { img: '../img/attraction/cox.png', link: 'coxsbazar.html', text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.' }
];

const categories = ['Travels', 'Nature', 'Sundarban', 'Sajek Valley', 'Favourit Spots'];
    return (
        <div>
            <Helmet>
                <meta name="description" content="Explore the Sundarbans, the largest mangrove forest in the world, home to the Royal Bengal Tiger and diverse wildlife." />
                <title>Sundarban</title>
            </Helmet>
                    <section className="py-8 px-50 gap-10">
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full md:w-2/3 p-4">
          <img src="../img/attraction/sundar.png" alt="" className="w-full h-[500px] object-cover" />
          <h4 className="text-2xl mt-4">THE SUNDARBAN GREATEST MANGROVE FOREST</h4>

          <ul className="flex items-center space-x-4 text-sm text-gray-500 my-4">
            <li><i className="bi bi-person"></i></li>
            <li><a href="" className="hover:underline">admin</a></li>
            <li><i className="bi bi-clock"></i></li>
            <li><a href="" className="hover:underline">may 13, 2024</a></li>
            <li><i className="bi bi-chat"></i></li>
            <li><a href="" className="hover:underline">comments</a></li>
          </ul>
          <hr className="my-2" />

          <div className="text-justify text-gray-700 space-y-6">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
            <div className="border-l-4 pl-4 italic text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit...</div>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit...</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit...</p>
          </div>

          <h3 className="text-xl text-gray-600 mt-10">6 COMMENTS</h3>
          <hr className="w-3/4 my-2" />

          {comments.map((comment, idx) => (
            <div key={idx} className="flex mb-6 ml-4">
              <img src="../img/attraction/blank-profile.png" alt="" className="w-14 h-14 rounded-full" />
              <div className="ml-4">
                <h6 className="font-semibold">{comment.name}</h6>
                <p className="text-gray-500 text-sm">Post author {comment.date}</p>
                <a href="" className="text-blue-500 text-sm">Reply</a>
                <p className="text-gray-600 mt-2">{comment.text}</p>
              </div>
            </div>
          ))}

          <form className="mt-8">
            <textarea rows="4" className="w-full border rounded p-2" placeholder="Write a comment..."></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Comment</button>
          </form>
        </div>

        <div className="w-full md:w-1/3 p-4">
          <div className="bg-purple-50 p-4 mb-10">
            <form className="flex space-x-2 mb-4">
              <input type="search" placeholder="Search" className="w-full border rounded p-2" />
              <button className="bg-blue-500 text-white px-4 rounded">Search</button>
            </form>
            <p className="font-semibold mb-4">RECENT POST</p>
            {recentPosts.map((post, idx) => (
              <div key={idx} className="flex mb-4">
                <img src={post.img} alt="" className="w-16 h-16 object-cover" />
                <a href={post.link} className="ml-4 text-sm text-gray-700 hover:underline">{post.text}</a>
              </div>
            ))}
          </div>

          <div className="bg-purple-50 p-4">
            <h4 className="text-lg font-semibold mb-4">CATEGORIES</h4>
            {categories.map((cat, idx) => (
              <div key={idx} className="border-b py-2">
                <a href="" className="text-gray-700 hover:underline">{cat}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
        <Pakage />
        </div>
    );
};

export default SudarBan;