import React from "react";
import PageWrapper from "./PageWrapper";
import { Container, Typography } from "@mui/material";
import VideoControlPanel from "../components/VideoCompoents/VideoControlPanel";
import Description from "../components/VideoCompoents/VideoDescription";
import VideoInputComment from "../components/VideoCompoents/VideoInputCommet";
import VideoOutputComment from "../components/VideoCompoents/VideoOutputComment";
import VideoCard from "../components/VideoCompoents/VideoCard";
import VideoPlayer from "../components/VideoCompoents/VideoPlayer";

const videoDescription = `Welcome to our comprehensive C++ tutorial series! In this video, we delve into the world of C++ programming, offering a detailed guide for both beginners and experienced programmers. Our goal is to equip you with the knowledge and skills necessary to master C++ and leverage its powerful features.

Video Highlights:

Introduction to C++:
- Overview of C++ and its history
- Key features and benefits of using C++
- Comparison with other programming languages like C and Java

Setting Up Your Development Environment:
- Installing and configuring a C++ compiler (GCC, Clang, etc.)
- Choosing an Integrated Development Environment (IDE) or text editor
- Setting up your first C++ project

Basic Syntax and Structure:
- Understanding the structure of a C++ program
- Writing and compiling a simple “Hello, World!” program
- Introduction to C++ keywords, identifiers, and operators

Variables and Data Types:
- Declaring and initializing variables
- Understanding primitive data types (int, float, double, char, etc.)
- Working with constants and enumerations

Control Structures:
- Using conditional statements (if, else, switch)
- Implementing loops (for, while, do-while)
- Practical examples of control flow in C++ programs

Functions and Modular Programming:
- Defining and calling functions
- Understanding function parameters and return types
- Function overloading and default arguments

Object-Oriented Programming (OOP) Basics:
- Introduction to classes and objects
- Understanding constructors and destructors
- Exploring encapsulation, inheritance, and polymorphism

Working with Arrays and Strings:
- Declaring and initializing arrays
- Accessing and manipulating array elements
- Basic string handling and operations

Pointers and Dynamic Memory:
- Understanding pointers and their use cases
- Dynamic memory allocation with new and delete
- Common pointer pitfalls and how to avoid them

File Input and Output (I/O):
- Reading from and writing to files
- Handling file streams with ifstream and ofstream
- Practical examples of file operations in C++

Error Handling and Debugging:
- Introduction to exception handling with try, catch, and throw
- Debugging techniques and tools
- Common C++ errors and how to resolve them

Advanced C++ Topics:
- Templates and generic programming
- Standard Template Library (STL) overview
- Multithreading and concurrency in C++`;

const videoDetails = {
  thumbnail: "./src/assets/thumbnail 1.jpg",
  title: "C++ Tutorial for Beginners 2024",
  views: 200,
  channel: "Code In C++",
  channelImage: "./src/assets/channel_icon.png",
  uploadTime: "7 days ago",
};
export default function VideoPage() {
  return (
    <PageWrapper>
      {/* Container for the main content */}
      <div className="px-auto px-4 pt-4">
        <div className="flex flex-wrap h-[calc(84vh-0px)]">
          {/* Main content area */}
          <div className=" w-[70%] flex flex-wrap">
            {/* Video player */}
            <div className="w-full  aspect-[16/9] flex">
              <div className=" aspect-[16/9]  flex">
                <VideoPlayer />
              </div>
            </div>

            {/* Video control panel */}
            <div className="w-full ">
              <VideoControlPanel />
            </div>

            {/* Video description */}
            <div className="w-full ">
              <Description text={videoDescription} />
            </div>

            {/* Comment input and comments */}
            <div className=" p-4 w-full ">
              <Typography component="h1" variant="h5">
                131 Comments
              </Typography>
              <VideoInputComment />
              <ul>
                {Array.from({ length: 40 }, (_, idx) => (
                  <li key={idx}>
                    <VideoOutputComment key={idx} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar for video suggestions */}
          <div className="bg-white-500 w-[30%] flex flex-col flex-wrap gap-0">
            {Array.from({ length: 5 }, (_, idx) => (
              <VideoCard
                key={idx}
                sidebar={true}
                channelImage={videoDetails.channelImage}
                thumbnail={videoDetails.thumbnail}
                title={videoDetails.title}
                views={videoDetails.views}
                channel={videoDetails.channel}
                uploadTime={videoDetails.uploadTime}
              />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
