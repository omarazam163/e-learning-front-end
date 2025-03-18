import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  imports: [NavbarComponent , CommonModule , FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  activeChat : string = "instructorsChats";
  instructorsChats : any = [
    {
      "name": "Nathael Roy",
      "message": "Good Morning!",
      "time": "10:30",
      "unread": 2,
      "profile_pic": "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      "name": "Paris Liana",
      "message": "Let me check that!",
      "time": "10:30",
      "unread": 3,
      "profile_pic": "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      "name": "Ellise Remmi",
      "message": "I will come tomorrow",
      "time": "10:30",
      "unread": 0,
      "profile_pic": "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      "name": "Walter Osborne",
      "message": "No!",
      "time": "10:30",
      "unread": 0,
      "profile_pic": "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      "name": "Rosallie Adelyn",
      "message": "That's for your next...",
      "time": "10:30",
      "unread": 5,
      "profile_pic": "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      "name": "Murphey",
      "message": "Good Morning!",
      "time": "10:30",
      "unread": 0,
      "profile_pic": "https://randomuser.me/api/portraits/men/4.jpg"
    }
  ]
  peersChats : any = [
    {
      "name": "Liam Carter",
      "message": "Hey, are you free today?",
      "time": "09:15",
      "unread": 1,
      "profile_pic": "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      "name": "Sophia Bennett",
      "message": "I'll send you the files soon.",
      "time": "08:45",
      "unread": 2,
      "profile_pic": "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      "name": "Ethan Martinez",
      "message": "Great job on the project!",
      "time": "11:20",
      "unread": 0,
      "profile_pic": "https://randomuser.me/api/portraits/men/6.jpg"
    },
    {
      "name": "Olivia Parker",
      "message": "Let's meet at 6 PM.",
      "time": "14:05",
      "unread": 4,
      "profile_pic": "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      "name": "Noah Harrison",
      "message": "Call me when you're available.",
      "time": "12:30",
      "unread": 3,
      "profile_pic": "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
      "name": "Ava Collins",
      "message": "Did you finish the report?",
      "time": "10:50",
      "unread": 0,
      "profile_pic": "https://randomuser.me/api/portraits/women/5.jpg"
    }
  ]

  messages: any[] = [
    {
      sender: "Client",
      text: "Hi Mashok, I love the work you did on the cleaning service landing page. Are you available for hire at the moment?",
      time: "5 min ago",
      isUser: false,
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      sender: "Mashok",
      text: "Hello, Thank you for your reply. The landing page I am looking for is for a mobile application which I am launching soon...",
      time: "10 min ago",
      isUser: true,
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      sender: "Client",
      text: "Thanks, I see your website. I can provide you design and development both. Our price range is $450-$500 with 3-5 revisions.",
      time: "15 min ago",
      isUser: false,
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
    }
  ];
  newMessage = '';
  sendMessage() {
    if (this.newMessage.trim() === '') return;
    this.messages.push({
      sender: "You",
      text: this.newMessage,
      time: "Just now",
      isUser: true,
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
    });
    this.newMessage = '';
  }


}
