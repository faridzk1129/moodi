"use client";
import { Fugaz_One } from "next/font/google";
import React, { useEffect, useState } from "react";
import Calender from "./Calender";
import { useAuth } from "@/context/authContext";
import { doc, setDoc } from "firebase/firestore";
import Loading from "./Loading";
import Login from "./Login";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Dashboard() {
  const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
  const { data, setData } = useState({});

  function countValues() {}

  async function handleSetMood(mood) {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();

    try {
      const newData = { ...userDataObj };

      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }

      newData[year][month][day] = mood;

      setData(newData);

      setUserDataObj(newData);

      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          year: {
            month: {
              day: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log(`failed to set data `, err.message);
    }
  }

  const statuses = {
    num_days: 14,
    time_remaining: "13:14:26",
    date: new Date().toDateString(),
  };

  const moods = {
    "&*@#$": "😭",
    Sad: "😥",
    Existing: "😶",
    Good: "😀",
    Elated: "😍",
  };

  useEffect(() => {
    if (!currentUser || userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);


  if (loading) {
    return <Loading />
  }

  if (!currentUser) {
    return <Login />
  }


  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16  ">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-md p-4 gap-4 ">
        {Object.keys(statuses).map((status, statuesIndex) => {
          return (
            <div key={statuesIndex} className="flex flex-col gap-1 sm:gap-2   ">
              <p className="font-medium uppercase text-xs sm:text-sm truncate ">
                {status.replaceAll("_", " ")}
              </p>
              <p className={"text-base sm:text-lg truncate " + fugaz.className}>
                {statuses[status]}
              </p>
            </div>
          );
        })}
      </div>
      <h4 className={"text-5xl sm:6xl md:text-7xl text-center " + fugaz.className}>
        how do you <span className="textGradient">feel</span> today
      </h4>
      <div className="flex flex-wrap items-stretch gap-4 ">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = moodIndex + 1;
                handleSetMood(currentMoodValue);
              }}
              className={
                "p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col gap-2 justify-center items-center flex-1"
              }
              key={moodIndex}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl ">{moods[mood]}</p>
              <p className={"text-indigo-500 text-sm sm:text-sm md:text-base " + fugaz.className}>
                {mood}
              </p>
            </button>
          );
        })}
      </div>
      <Calender data={data} handleSetMood={handleSetMood} />
    </div>
  );
}
