/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import useSound from "use-sound"
import { useEffect, useState } from "react"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"

import { Song } from "@/types"
import usePlayer from "@/hooks/usePlayer"

import LikeButton from "./LikeButton"
import MediaItem from "./MediaItem"
import Slider from "./Slider"

interface PlayerContentProps {
  song: Song
  songUrl: string
}

function secondsToMinutesSeconds(duration: any) {

  const min = Math.floor((duration / 1000 / 60) << 0);
  const sec = Math.floor((duration / 1000) % 60);

  return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer()
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval || 0);
    }
    return () => {
      clearInterval(interval || 0);
    };
  }, [isActive]);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return
    }

    const currentIndex = player.ids.findIndex(id => id === player.activeId)
    const nextSong = player.ids[currentIndex + 1]

    if (!nextSong) {
      return player.setId(player.ids[0])
    }

    player.setId(nextSong)
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return
    }

    const currentIndex = player.ids.findIndex(id => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }

    player.setId(previousSong)
  }

  const [play, { pause, sound, duration }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false)
      onPlayNext()
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  })

  useEffect(() => {
    sound?.play()
    setIsActive(true);

    return () => {
      sound?.unload()
    }
  }, [sound])

  const handlePlay = () => {
    if (!isPlaying) {
      play()
      setIsActive(true);
    } else {
      pause()
      setIsActive(false);
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }

  return (
    <div className="flex flex-col md:grid grid-cols-2 md:grid-cols-3 h-full relative">
      <div className="flex flex-1 w-full justify-start">
        <div className="flex items-center md:justify-normal w-full md:w-auto justify-between gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <hr className="w-screen my-2 bg-zinc-900 border-zinc-500 md:hidden" />
      <div className="flex flex-col-reverse md:flex-col items-center gap-4 md:gap-3 m-auto">
        <div
          className="
            h-full
            flex 
            justify-between
            px-10
            md:px-0
            md:justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          ">
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30}
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          />
          <div
            onClick={handlePlay}
            className="
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            ">
            <Icon size={30} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30}
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          />
        </div>

        <div className="flex items-center gap-5">
          <p className="md:w-10 w-6 mr-2 text-xs md:text-md">{secondsToMinutesSeconds(time)}</p>
          <div className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <div className="h-1 relative border-none w-0 bg-green-800 rounded-full" style={{ width: `${duration ? ((time / duration) * 100) : 0}%` }} >
              <div className="absolute bg-white w-3 h-4 right-0 -top-2 rounded-full"></div>
            </div>
          </div>
          <p className="md:w-10 w-6 text-xs md:text-md">{secondsToMinutesSeconds(duration)}</p>
        </div>
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon onClick={toggleMute} className="cursor-pointer" size={34} />
          <Slider value={volume} onChange={value => setVolume(value)} />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
