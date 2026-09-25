"use client"

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const PROJECTS = {
  completed: [
    { name: "Tiruvallur Solar Project", location: "Tiruvallur, Tamil Nadu", capacity: "32.5 MWp", position: [13.14, 79.91] },
    { name: "Viluppuram Solar Project", location: "Viluppuram, Tamil Nadu", capacity: "9.1 MWp", position: [11.94, 79.49] },
    { name: "Kallakurichi Solar Project", location: "Kallakurichi, Tamil Nadu", capacity: "97.5 MWp", position: [11.74, 78.96] },
    { name: "Trichy Renewable Project", location: "Tiruchirappalli, Tamil Nadu", capacity: "110 kV Grid", position: [10.79, 78.70] },
    { name: "Tuticorin Wind Project", location: "Thoothukudi, Tamil Nadu", capacity: "139 MW", position: [8.81, 78.14] },
  ],
  ongoing: [
    { name: "Nagapattinam Solar Project", location: "Nagapattinam, Tamil Nadu", capacity: "19 MW", position: [10.77, 79.84] },
    { name: "Ramanathapuram Renewable Project", location: "Ramanathapuram, Tamil Nadu", capacity: "65 MW", position: [9.37, 78.83] },
    { name: "Karur Wind Project", location: "Karur, Tamil Nadu", capacity: "49.5 MW", position: [10.96, 78.08] },
    { name: "Tiruvannamalai Solar Project", location: "Tiruvannamalai, Tamil Nadu", capacity: "6.5 MWp", position: [12.23, 79.07] },
  ],
}

const STATUS = {
  completed: { label: "Completed projects", color: "#0f766e", markerClass: "project-map-marker-completed" },
  ongoing: { label: "Ongoing projects", color: "#d97706", markerClass: "project-map-marker-ongoing" },
}

function createMarkerIcon(status) {
  return L.divIcon({
    className: "project-map-marker-wrap",
    html: `<span class="project-map-marker ${STATUS[status].markerClass}"><span></span></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -13],
  })
}

export default function LiveProCom({ status }) {
  const projects = PROJECTS[status]
  const statusInfo = STATUS[status]

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-12px_rgba(15,23,42,0.28)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Renfra Energy</p>
          <h2 className="mt-1 text-lg font-bold text-slate-800 sm:text-xl">{statusInfo.label}</h2>
        </div>
        <span
          className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold"
          style={{ backgroundColor: `${statusInfo.color}18`, color: statusInfo.color }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: statusInfo.color }} />
          {projects.length} locations
        </span>
      </div>

      <div className="relative h-[360px] sm:h-[410px]">
        <MapContainer
          center={[11.15, 78.65]}
          zoom={7}
          minZoom={6}
          maxZoom={12}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {projects.map((project) => (
            <Marker key={project.name} position={project.position} icon={createMarkerIcon(status)}>
              <Popup>
                <div className="min-w-[160px] p-1">
                  <strong className="block text-sm text-slate-800">{project.name}</strong>
                  <span className="mt-1 block text-xs text-slate-500">{project.location}</span>
                  <span className="mt-2 block text-xs font-bold" style={{ color: statusInfo.color }}>
                    {project.capacity}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div className="pointer-events-none absolute bottom-4 left-4 rounded-xl bg-white/90 px-3 py-2 text-xs font-semibold text-slate-600 shadow-md backdrop-blur-sm">
          Drag to explore | Click a marker for details
        </div>
      </div>
    </article>
  )
}
