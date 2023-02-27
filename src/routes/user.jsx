import "../index.css"
import profilepic from '../assets/profilepic.jpeg'; 
export default function User() {
  
    return (

          <div className="userPage">
            <div className="userMainArea">
            
                <div className="userGreetings">
                <img src={profilepic} alt="Profile picture" />
                    <h1>Nick Arty</h1>

            <h5>Welcome to my profile page! This page is super good! Lorem ipsum dolor sit amet! Filler text</h5>
            </div>

            <div className="post">
            <p>This is a post on my page.</p>
            </div>
            <div className="post">
            <p>This is a post on my page.</p>
            </div>            <div className="post">
            <p>This is a post on my page.</p>
            </div>
            <div className="post">
            <p>This is a post on my page.</p>
            </div>
            </div>
            </div>
    );
  }