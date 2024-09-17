import getLikedSongs from "@/actions/getLikedSongs"
import Header from "@/components/Header"
import Image from "next/image"
import LikedContent from "./components/LikedContent"

export const revalidate = 0

export default async function Liked() {
  const songs = await getLikedSongs()

  return (
    <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mt-20">
          <div className="flex flex-col md:flex-row items-center gap-x-5">
            <div className="relative w-32 h-32 lg:w-44 lg:h-44">
              <Image className="object-cover" src="/images/liked.png" alt="Playlist" fill />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
              <p className="hidden md:block font-semibold text-sm">Playlist</p>
              <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold">Liked songs</h1>
            </div>
          </div>
        </div>
      </Header>
      <LikedContent songs={songs} />
    </div>
  )
}
