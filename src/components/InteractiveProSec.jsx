"use client"

import dynamic from "next/dynamic"

const LiveProCom = dynamic(() => import("./LiveProCom"), {
  ssr: false,
  loading: () => <div className="h-[410px] animate-pulse rounded-3xl bg-slate-200" />,
})

export default function InteractiveProSec() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        <LiveProCom status="completed" />
        <LiveProCom status="ongoing" />
      </div>
    </section>
  )
}