"use client"

import usePlayer from "@/hooks/usePlayer"
import useLoadSongUrl from "@/hooks/useLoadSongUrl"
import useGetSongById from "@/hooks/useGetSongById"

import PlayerContent from "./PlayerContent"

const Player = () => {
  const player = usePlayer()
  const { song } = useGetSongById(player.activeId)

  const songUrl = useLoadSongUrl(song!)

  if (!song || !songUrl || !player.activeId) {
    return null
  }

  return (
    <div
      className="
        fixed 
        bottom-0 
        bg-zinc-900 
        shadow-lg
        w-full 
        py-2 
        h-fit
        md:h-[80px] 
        md:px-4
        rounded-t-md
      ">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default Player
